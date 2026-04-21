---
title: "A Simple Data Lake Project"
layout: splash
header:
  overlay_image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*fA4GjCq6KKKtET2pOJV-NQ.jpeg"
  overlay_filter: 0.3
  caption: "Simple Data Lake for Json to Parquet Transformation to Run Quries on AWS Athenea for Downstream Users"
  actions:
    - label: "View on GitHub"
      url: "https://github.com/your-username/your-repo"
    - label: "Download Slides"
      url: "/assets/files/sample-slides.pdf"
excerpt: "Demonstration of ingetion of spotify data into AWS"
external_url: "https://github.com/your-username/your-repo"
download_url: "/assets/files/sample-slides.pdf"
# internal_url: "/about.html"
actions:
  - label: "View GitHub Repo"
    url: "/about.html"
  - label: "Download Slides"
    url: "/about.html"
modified: 2026-04-20
read_time: true
related: true
share: true
slidesurl: /assets/files/sample-slides.pdf
tags:
  - AWS Athena
  - AWS Glue 
  - Terraform
  - S3 Buckets
  - Medallion Architecture
type: Mini Project
venue: Virtual
---
# Introduction 

first we have 2 json files files of amzon produxts and review in json format in s3 bucket which is our primary data storage here in this project we have to clean and transform the data using GLUE ETL Jobs (defeined by terraform) python and then convert this json file to parquet using pandas and spark libraries and then populate data catalouge using the glue crawler which is given to the aws athena to crawl like any other sql database 

# Processing raw json files 
first import this json data into tabular data then optmised the columns as based on the porject utlity 
|
|
v
the porcess the data into by extracting useful information like year and month in this project 
|
same for both json files 
after processing the json file 

# Glue ETL jobs 
which containts the following script to in this porject 
-> Glue T.f 
--> Iam roles
--> iam policies 
--> variable
--> outputs 
--> netowrk terraform file 
--> 