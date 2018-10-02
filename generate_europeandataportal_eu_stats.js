const fs = require("fs")
const { decompressSync } = require("iltorb")
const path = require("path")

const dataDir = "europeandataportal.eu"

{
  const filename = "packages-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const packagesFilenames = fs.readdirSync(dataDir).filter(filename => /^packages-[0-9]+\.json\.br$/.test(filename))
  const countByDate = {}
  for (let packageFilename of packagesFilenames) {
    console.log(`  Reading ${packageFilename}...`)
    const datasets = JSON.parse(decompressSync(fs.readFileSync(path.join(dataDir, packageFilename))))
    for (let dataset of Object.values(datasets)) {
      const date = dataset.metadata_created.split("T")[0]
      countByDate[date] = (countByDate[date] || 0) + 1
    }
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}
