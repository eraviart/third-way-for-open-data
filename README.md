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
```

## To generate stats from data

```bash
node generate_data_gouv_fr_stats.js
```
