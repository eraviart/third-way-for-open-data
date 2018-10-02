const assert = require("assert")
const commandLineArgs = require("command-line-args")
const fs = require("fs")
const { compressSync, decompressSync } = require("iltorb")
const fetch = require("node-fetch")
const path = require("path")
const resolveUrl = require("url-resolve")

const BROTLI_MODE_TEXT = 1

const baseUrl = "https://www.europeandataportal.eu/data/en/"
const dataTypes = ["group", "package", "tag"]

async function fetchData(dataType, startPart) {
  const dataDir = "europeandataportal.eu"
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }

  let dataList = null
  const dataListFilePath = path.join(dataDir, `${dataType}s-list.json.br`)
  if (startPart <= 0) {
    const url = resolveUrl(baseUrl, `api/3/action/${dataType}_list`)
    console.log(`Fetching "${url}"`)
    const response = await fetch(url)
    const result = await response.json()
    dataList = result.result
    fs.writeFileSync(
      dataListFilePath,
      compressSync(Buffer.from(JSON.stringify(dataList, null, 2)), { mode: BROTLI_MODE_TEXT })
    )
  } else {
    dataList = JSON.parse(decompressSync(fs.readFileSync(dataListFilePath)))
  }

  let dataById = {}
  let index = 0
  let part = 0
  for (let id of dataList) {
    if (part < startPart) {
      index += 1
      if (index >= 10000) {
        index = 0
        part += 1
      }
      continue
    }

    const url = resolveUrl(baseUrl, `api/3/action/${dataType}_show?id=${id}`)
    console.log(`Fetching "${url}"`)
    let response = null
    for (let retry = 0; ; retry++) {
      try {
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            id,
          }),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        break
      } catch (error) {
        console.log(`An error occured while fetching "${url}" (try number ${retry + 1}):`, error)
        if (retry >= 3) {
          throw error
        }
      }
    }
    const result = await response.json()
    dataById[id] = result.result
    index += 1
    if (index >= 10000) {
      fs.writeFileSync(
        path.join(dataDir, `${dataType}s-${part}.json.br`),
        compressSync(Buffer.from(JSON.stringify(dataById, null, 2)), { mode: BROTLI_MODE_TEXT })
      )
      dataById = {}
      index = 0
      part += 1
    }
  }
  if (part >= startPart && index >= 0) {
    fs.writeFileSync(
      path.join(dataDir, `${dataType}s-${part}.json.br`),
      compressSync(Buffer.from(JSON.stringify(dataById, null, 2)), { mode: BROTLI_MODE_TEXT })
    )
  }
}

const optionsDefinition = [
  { alias: "s", defaultValue: 0, name: "start-part", type: Number },
  { defaultOption: true, name: "type", type: String },
]
const options = commandLineArgs(optionsDefinition)
assert(dataTypes.includes(options.type), `Type must belong to ${JSON.stringify(dataTypes, null, 2)}`)

fetchData(options.type, options["start-part"]).catch(error => {
  console.log(error.stack || error)
  process.exit(1)
})
