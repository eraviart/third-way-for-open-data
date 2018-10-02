# Third-Way-for-Open-Data

_Analysis of open data web sites_

Note: The main repository of this project is on [FramaGit](https://framagit.org/eraviart/third-way-for-open-data).

## To update data

```bash
git clone https://framagit.org/eraviart/third-way-for-open-data.git
cd third-way-for-open-data
npm install
node --max-old-space-size=2048 fetch_data_gouv_fr.js datasets
node fetch_data_gouv_fr.js discussions
node fetch_data_gouv_fr.js issues
node fetch_data_gouv_fr.js organizations
node fetch_data_gouv_fr.js posts
node fetch_data_gouv_fr.js reuses
node fetch_data_gouv_fr.js users
node fetch_data_gouv_fr.js topics

node fetch_data_europa_eu.js package

node --max-old-space-size=2048 fetch_europeandataportal_eu.js package
```

## To generate stats from data

```bash
node --max-old-space-size=2048 generate_data_gouv_fr_stats.js
node generate_data_europa_eu_stats.js
node --max-old-space-size=2048 generate_europeandataportal_eu_stats.js
```
