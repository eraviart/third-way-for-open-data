const fs = require("fs")
const path = require("path")

const dataDir = "data.europa.eu"

{
  const filename = "packages-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const datasets = JSON.parse(fs.readFileSync(path.join(dataDir, "packages.json"), { encoding: "utf-8" }))
  for (let dataset of Object.values(datasets)) {
    const date = dataset.release_date
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}
