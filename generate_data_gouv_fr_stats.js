const fs = require("fs")
const path = require("path")

const dataDir = "data.gouv.fr"

{
  console.log("Generating packages stats")
  const datasets = JSON.parse(fs.readFileSync(path.join(dataDir, "datasets.json"), { encoding: "utf-8" }))
  const countByCreationDate = {}
  const countByModificationDate = {}
  const countByResourceModificationDate = {}
  const countByUpdateDate = {}
  for (let dataset of datasets) {
    // if (dataset.deleted) continue
    const creationDate = dataset.created_at.split("T")[0]
    countByCreationDate[creationDate] = (countByCreationDate[creationDate] || 0) + 1
    const modificationDate = dataset.last_modified.split("T")[0]
    if (modificationDate > creationDate) {
      countByModificationDate[modificationDate] = (countByModificationDate[modificationDate] || 0) + 1
    }

    let resourceModificationDate = ""
    for (let resource of dataset.resources) {
      if (resource.last_modified > resourceModificationDate) {
        resourceModificationDate = resource.last_modified
      }
    }
    resourceModificationDate = resourceModificationDate.split("T")[0]
    if (resourceModificationDate > creationDate) {
      countByResourceModificationDate[resourceModificationDate] =
        (countByResourceModificationDate[resourceModificationDate] || 0) + 1
    }

    const updateDate = dataset.last_update.split("T")[0]
    if (updateDate > creationDate) {
      countByUpdateDate[updateDate] = (countByUpdateDate[updateDate] || 0) + 1
    }
  }
  fs.writeFileSync(
    path.join(dataDir, "datasets-count-by-creation-date.json"),
    JSON.stringify(countByCreationDate, null, 2)
  )
  fs.writeFileSync(
    path.join(dataDir, "datasets-count-by-modification-date.json"),
    JSON.stringify(countByModificationDate, null, 2)
  )
  fs.writeFileSync(
    path.join(dataDir, "datasets-count-by-resource-modification-date.json"),
    JSON.stringify(countByResourceModificationDate, null, 2)
  )
  fs.writeFileSync(path.join(dataDir, "datasets-count-by-update-date.json"), JSON.stringify(countByUpdateDate, null, 2))
}

{
  console.log("Generating discussions stats")
  const discussions = JSON.parse(fs.readFileSync(path.join(dataDir, "discussions.json"), { encoding: "utf-8" }))
  const countByCreationDate = {}
  const countByPostDate = {}
  const orphanCountByCreationDate = {}
  for (let discussion of discussions) {
    const creationDate = discussion.created.split("T")[0]
    countByCreationDate[creationDate] = (countByCreationDate[creationDate] || 0) + 1
    for (let post of discussion.discussion) {
      const postDate = post.posted_on.split("T")[0]
      countByPostDate[postDate] = (countByPostDate[postDate] || 0) + 1
    }
    if (discussion.discussion.length <= 1) {
      orphanCountByCreationDate[creationDate] = (orphanCountByCreationDate[creationDate] || 0) + 1
    }
  }
  fs.writeFileSync(
    path.join(dataDir, "discussions-count-by-creation-postDate.json"),
    JSON.stringify(countByCreationDate, null, 2)
  )
  fs.writeFileSync(path.join(dataDir, "discussions-count-by-post-date.json"), JSON.stringify(countByPostDate, null, 2))
  fs.writeFileSync(
    path.join(dataDir, "discussions-orphan-count-by-creation-date.json"),
    JSON.stringify(orphanCountByCreationDate, null, 2)
  )
}

{
  console.log("Generating issues stats")
  const issues = JSON.parse(fs.readFileSync(path.join(dataDir, "issues.json"), { encoding: "utf-8" }))
  const countByCloseDate = {}
  const countByCreatedDate = {}
  for (let issue of issues) {
    if (issue.closed) {
      const closeDate = issue.closed.split("T")[0]
      countByCloseDate[closeDate] = (countByCloseDate[closeDate] || 0) + 1
    }
    const creationDate = issue.created.split("T")[0]
    countByCreatedDate[creationDate] = (countByCreatedDate[creationDate] || 0) + 1
  }
  fs.writeFileSync(path.join(dataDir, "issues-count-by-close-date.json"), JSON.stringify(countByCloseDate, null, 2))
  fs.writeFileSync(
    path.join(dataDir, "issues-count-by-creation-date.json"),
    JSON.stringify(countByCreatedDate, null, 2)
  )
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
