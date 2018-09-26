const fs = require("fs")
const path = require("path")

const dataDir = "data.gouv.fr"

{
  const filename = "datasets-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const datasets = JSON.parse(fs.readFileSync(path.join(dataDir, "datasets.json"), { encoding: "utf-8" }))
  for (let dataset of datasets) {
    // if (dataset.deleted) continue
    const date = dataset.created_at.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "discussions-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const discussions = JSON.parse(fs.readFileSync(path.join(dataDir, "discussions.json"), { encoding: "utf-8" }))
  for (let discussion of discussions) {
    const date = discussion.created.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "issues-count-by-close-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const issues = JSON.parse(fs.readFileSync(path.join(dataDir, "issues.json"), { encoding: "utf-8" }))
  for (let issue of issues) {
    if (!issue.closed) continue
    const date = issue.closed.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "issues-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const issues = JSON.parse(fs.readFileSync(path.join(dataDir, "issues.json"), { encoding: "utf-8" }))
  for (let issue of issues) {
    const date = issue.created.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "organizations-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const organizations = JSON.parse(fs.readFileSync(path.join(dataDir, "organizations.json"), { encoding: "utf-8" }))
  for (let organization of organizations) {
    // if (organization.deleted) continue
    const date = organization.created_at.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "reuses-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const reuses = JSON.parse(fs.readFileSync(path.join(dataDir, "reuses.json"), { encoding: "utf-8" }))
  for (let reuse of reuses) {
    // if (reuse.deleted) continue
    const date = reuse.created_at.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}

{
  const filename = "users-count-by-creation-date.json"
  console.log(`Generating ${filename}...`)
  const countByDate = {}
  const users = JSON.parse(fs.readFileSync(path.join(dataDir, "users.json"), { encoding: "utf-8" }))
  for (let user of users) {
    const date = user.since.split("T")[0]
    countByDate[date] = (countByDate[date] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(countByDate, null, 2))
}
