---
permalink: "/"
author_profile: true
redirect_from:
- "/about/"
- "/about.html"
---
---

# Data Engineer | Specializing in Scalable ETL & Data Reliability

I am a **Data Engineer** with a foundation in **Full-Stack Software Development**. I specialize in building "Data-as-Code" ecosystems that are idempotent, observable, and cost-efficient. 

My mission is to eliminate "Data Downtime" by applying rigorous software engineering principles—like CI/CD, unit testing, and version control—to the data warehouse.

---

## 🛠 Technical Toolkit

| Category | technologies |
| :--- | :--- |
| **Languages** | Python (Expert), SQL (PostgreSQL, Snowflake), Java, Bash |
| **Data Orchestration** | Apache Airflow, Dagster, Prefect |
| **Processing & Compute** | Apache Spark (PySpark), Pandas, Dask, AWS Lambda |
| **Data Warehousing** | Snowflake, Amazon Redshift, Google BigQuery, dbt (Core/Cloud) |
| **Cloud & DevOps** | AWS (S3, EMR, Glue), Docker, Terraform, Kubernetes, GitHub Actions |
| **Data Quality** | Great Expectations, Monte Carlo, SodaSQL |

---

## 📈 Professional Impact & Experience

### **Senior Data Engineer** | [Current Company] 
*Jan 2022 – Present*

* **Cost Optimization:** Re-architected Spark-based ETL jobs to utilize **Spot Instances** and optimized partitioning, reducing monthly AWS compute costs by **35% ($12k/mo savings)**.
* **Scalability:** Developed 50+ modular pipelines in **Airflow** processing over **10TB** of daily telemetry data with 99.9% delivery success.
* **Quality Assurance:** Integrated **dbt-tests** and **Great Expectations** into the CI/CD pipeline, reducing downstream data incidents by **40%**.
* **Modernization:** Led the migration from an on-premise Hadoop cluster to a **Snowflake** cloud warehouse, improving query performance for the BI team by **5x**.

### **Data Engineer (Software Focused)** | [Previous Company]
*June 2019 – Dec 2021*

* **Automation:** Developed a custom Python framework for API data ingestion, replacing manual processes and saving the engineering team **80+ man-hours per month**.
* **Modeling:** Designed and implemented a **Star Schema** architecture in Redshift, streamlining reporting for Finance and Marketing stakeholders.
* **Observability:** Built a real-time monitoring dashboard using Prometheus/Grafana to track pipeline latency and row-count drift.

---

## 🏗 Featured Project: End-to-End Medallion Lakehouse

**Objective:** To provide the Marketing team with sub-5-minute latency for customer behavior analysis.



* **Bronze (Raw):** Event-driven ingestion using **AWS Kinesis** and Lambda to land raw JSON in S3.
* **Silver (Cleaned):** Spark jobs handle deduplication, schema enforcement, and PII masking.
* **Gold (Curated):** **dbt** models transform data into business-ready dimensions and facts.
* **Infrastructure:** Deployed entirely via **Terraform** to ensure environment parity between Dev and Prod.

> [**View System Design & Repo on GitHub →**](https://github.com/yourusername/project)

---

## 📜 Certifications & Education

* **AWS Certified Data Engineer – Associate** (2024)
* **dbt Certified Developer** (2023)
* **B.S. in Computer Science** | [University Name] | 2019

---

## ✍️ Technical Writing & Insights
* *Optimizing Spark Joins: How to Handle Data Skew in Production*
* *Why Your Data Warehouse Needs a Semantic Layer*
* *The Shift from ETL to ELT: A Practical Guide for Software Engineers*

---

### **Let's Connect**
I am always interested in discussing **distributed systems, data mesh, or cloud cost-optimization**. 

[**Email Me**](mailto:your.email@example.com) / [**LinkedIn**](https://linkedin.com/in/yourprofile) / [**Download Resume (PDF)**](/assets/resume.pdf)