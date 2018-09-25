const fs = require("fs")
const path = require("path")

const dataDir = "data.gouv.fr"
const datasets = JSON.parse(fs.readFileSync(path.join(dataDir, "datasets.json"), { encoding: "utf-8" }))

const countByDate = {}
for (let dataset of datasets) {
  if (dataset.deleted) continue
  const date = dataset.created_at.split("T")[0]
  countByDate[date] = (countByDate[date] || 0) + 1
}
fs.writeFileSync(path.join(dataDir, "datasets-count-by-creation-date.json"), JSON.stringify(countByDate, null, 2))
