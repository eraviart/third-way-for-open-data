const fs = require("fs")
const { decompressSync } = require("iltorb")
const path = require("path")

const dataDir = "europeandataportal.eu"

{
  console.log("Generating packages stats")
  const packagesFilenames = fs.readdirSync(dataDir).filter(filename => /^packages-[0-9]+\.json\.br$/.test(filename))
  const countByMetadataCreationDate = {}
  const countByMetadataModificationDate = {}
  const countByResourceRevisionDate = {}
  const countByMetadataCreationDateByLicense = {}
  for (let packageFilename of packagesFilenames) {
    console.log(`  Reading ${packageFilename}...`)
    const datasets = JSON.parse(decompressSync(fs.readFileSync(path.join(dataDir, packageFilename))))
    for (let dataset of Object.values(datasets)) {
      const metadataCreationDate = dataset.metadata_created.split("T")[0]
      countByMetadataCreationDate[metadataCreationDate] = (countByMetadataCreationDate[metadataCreationDate] || 0) + 1

      const license = dataset.license_title
      let countByCreationDateAtLicense = countByMetadataCreationDateByLicense[license]
      if (countByCreationDateAtLicense === undefined) {
        countByCreationDateAtLicense = countByMetadataCreationDateByLicense[license] = {}
      }
      countByCreationDateAtLicense[metadataCreationDate] = (countByCreationDateAtLicense[metadataCreationDate] || 0) + 1

      const metadataModificationDate = dataset.metadata_modified.split("T")[0]
      if (metadataModificationDate > metadataCreationDate) {
        countByMetadataModificationDate[metadataModificationDate] =
          (countByMetadataModificationDate[metadataModificationDate] || 0) + 1
      }

      let resourceRevisionDate = ""
      for (let resource of dataset.resources) {
        if (resource.revision_timestamp > resourceRevisionDate) {
          resourceRevisionDate = resource.revision_timestamp
        }
      }
      resourceRevisionDate = resourceRevisionDate.split("T")[0]
      if (resourceRevisionDate > metadataCreationDate) {
        countByResourceRevisionDate[resourceRevisionDate] = (countByResourceRevisionDate[resourceRevisionDate] || 0) + 1
      }
    }
  }
  fs.writeFileSync(
    path.join(dataDir, "packages-count-by-metadata-creation-date.json"),
    JSON.stringify(countByMetadataCreationDate, null, 2)
  )
  fs.writeFileSync(
    path.join(dataDir, "packages-count-by-metadata-modification-date.json"),
    JSON.stringify(countByMetadataModificationDate, null, 2)
  )
  fs.writeFileSync(
    path.join(dataDir, "packages-count-by-resource-revision-date.json"),
    JSON.stringify(countByResourceRevisionDate, null, 2)
  )
  fs.writeFileSync(
    path.join(dataDir, "licenses-count-by-metadata-creation-date.json"),
    JSON.stringify(countByMetadataCreationDateByLicense, null, 2)
  )
}
