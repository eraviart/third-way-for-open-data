const assert = require("assert")
const commandLineArgs = require("command-line-args")
const fs = require("fs")
const fetch = require("node-fetch")
const path = require("path")

const dataTypes = ["datasets", "discussions", "issues", "organizations", "posts", "reuses", "users", "topics"]

async function fetchData(dataType) {
  let data = []
  let url = `https://www.data.gouv.fr/api/1/${dataType}/?page_size=100`
  while (url) {
    let response = null
    console.log(`Fetching "${url}"`)
    try {
      response = await fetch(url)
    } catch (error) {
      console.log(`An error occured while fetching "${url}":`, error)
      break
    }
    const result = await response.json()
    if (result.data) {
      data = [...data, ...result.data]
    }
    url = result.next_page
  }

  const dataDir = "data.gouv.fr"
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir)
  }
  fs.writeFileSync(path.join(dataDir, `${dataType}.json`), JSON.stringify(data, null, 2))
}

const optionsDefinition = [{ defaultOption: true, name: "type", type: String }]
const options = commandLineArgs(optionsDefinition)
assert(dataTypes.includes(options.type), `Type must belong to ${JSON.stringify(dataTypes, null, 2)}`)

fetchData(options.type).catch(error => {
  console.log(error.stack || error)
  process.exit(1)
})
