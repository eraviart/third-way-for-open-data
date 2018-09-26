const assert = require("assert")
const commandLineArgs = require("command-line-args")
const fs = require("fs")
const fetch = require("node-fetch")
const path = require("path")
const resolveUrl = require("url-resolve")

const baseUrl = "https://data.europa.eu/euodp/data/"
const dataTypes = ["group", "package", "tag"]

async function fetchData(dataType) {
  const url = resolveUrl(baseUrl, `api/3/action/${dataType}_list`)
  console.log(`Fetching "${url}"`)
  const response = await fetch(url)
  const result = await response.json()
  const dataList = result.result

  const dataById = {}
  for (let id of dataList) {
    const url = resolveUrl(baseUrl, `api/3/action/${dataType}_show?id=${id}`)
    console.log(`Fetching "${url}"`)
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    const result = await response.json()
    dataById[id] = result.result
  }
  const dataDir = "data.europa.eu"
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }
  fs.writeFileSync(path.join(dataDir, `${dataType}s.json`), JSON.stringify(dataById, null, 2))
}

const optionsDefinition = [{ defaultOption: true, name: "type", type: String }]
const options = commandLineArgs(optionsDefinition)
assert(dataTypes.includes(options.type), `Type must belong to ${JSON.stringify(dataTypes, null, 2)}`)

fetchData(options.type).catch(error => {
  console.log(error.stack || error)
  process.exit(1)
})
