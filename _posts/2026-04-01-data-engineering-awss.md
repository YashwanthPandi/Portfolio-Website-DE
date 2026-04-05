---
title: 'Weekly Progress - Data Engineering'
description: 'I’ve been deep-diving into how data is generated, stored, and the mechanical differences between various source architectures.'
collection: posts
permalink: "/posts/2026/04/Weekly-Progress-1/"
date: '2026-04-03 23:11:00'
tags:
- data engineering
- aws
- cloud infrastructure
- vpc
- systems design
---

##  Weekly Summary: The "Ground Truth" of Data Engineering

This week, I shifted my focus to the very beginning of the **Data Engineering Lifecycle**: Source Systems. You can't build a reliable pipeline if you don't understand where the data starts. 

I’ve been deep-diving into how data is generated, stored, and the mechanical differences between various source architectures.

###  Key Learning Milestones

#### 1. Categorizing Data Types
Understanding the "shape" of data determines the ingestion strategy:
* **Structured:** Tabular data (RDBMS) with strict schemas.
* **Semi-Structured:** JSON/XML formats. Flexible but requires careful parsing.
* **Unstructured:** The "wild west" of data—images, audio, and PDFs.

#### 2. Relational (SQL) vs. Non-Relational (NoSQL)
* **ACID Compliance:** I revisited why **Atomicity, Consistency, Isolation, and Durability** are the bedrock of OLTP systems (like banking). 
* **NoSQL Flexibility:** Explored Key-Value and Document stores. I learned that while NoSQL scales horizontally with ease, it can become a "management nightmare" if you don't handle schema changes properly downstream.
* **Eventual Consistency:** A trade-off where speed is prioritized over immediate data synchronization across all nodes.

#### 3. Modern Storage & Streaming
* **Object Storage (Amazon S3):** Mastered the concept of "flat" storage. Using UUIDs and metadata instead of a traditional file hierarchy makes S3 the ideal "landing zone" for data lakes.
* **The Power of Logs:** Realized that a **Log** is more than just a debug tool; it's an append-only sequence of events that forms the foundation of real-time streaming.

---

###  Technical Implementation: AWS & Python
I spent a significant portion of the week in the terminal working with the **Boto3 SDK**:
* **DynamoDB CRUD:** Practiced creating tables, putting items, and querying data programmatically.
* **Composite Keys:** Implemented Partition Keys and Sort Keys to optimize data retrieval.
* **Schema-less Design:** Experimented with adding distinct attributes to different items within the same DynamoDB table.


---

