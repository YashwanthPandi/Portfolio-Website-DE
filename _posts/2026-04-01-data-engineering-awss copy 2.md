---
title: 'Batch vs Stream in AWS'
description: 'I’ve been deep-diving into how data is generated, stored, and the mechanical differences between various source architectures.'
collection: posts
permalink: "/posts/2026/04/Weekly-Progress-1/"
date: '2026-04-03 21:38:00'
tags:
- data engineering
- aws
- cloud infrastructure
- vpc
- systems design
---
## Batch and Streaming Tools
 We used AWS Glue ETL as a batch ingestion tool to extract data from a relational database. You also learned about AWS Kinesis Data Streams and how it could be used as a streaming ingestion tool. Let’s explore other ingestion tools and compare batch and streaming use cases.

## Batch Ingestion Tools
### Popular AWS Tools:

### AWS Glue ETL:
 this service enables you to ingest data from various sources (such as Amazon RDS, Amazon S3, Amazon Redshift, Amazon DynamoDB, and others), transforming it and then loading it into a destination. It performs an ETL job using Apache Spark (distributed processing engine) to distribute the transformation workloads across computing nodes. AWS Glue provides a serverless environment where you can create code-based solutions for both data ingestion and transformation. To learn more about the AWS Glue environment, see 
### AWS Glue Components and AWS Glue ETL guidance

### Amazon EMR: 
Amazon EMR is a managed cluster platform that provides a simple way to run big data frameworks such as 
Apache Hadoop and Apache Spark
* These tools are useful for ingesting vast amounts of data from a database (petabyte-scale), transforming them at scale, and loading them into AWS data stores and databases. Amazon EMR can run in a serverless mode or in a provisioned mode where you specify the computing resources that are needed for your workload. To learn more about the details of Amazon EMR, you can read the 
AWS documentation
. 

## What is the difference between AWS Glue ETL and Amazon EMR? 
 Both services can be used to perform big data processing using the Apache Spark engine, but they differ in terms of the amount of management and configuration that you need to perform, as well as cost. AWS Glue requires less configuration and is typically more convenient. On the other hand, Amazon EMR provides more control over the computing and memory resources but requires more configuration knowledge. You will learn more about the distributed framework in the upcoming courses of this specialization.

## AWS DMS: 
AWS Glue ETL and Amazon EMR are both tools that enable you to perform transformations at scale while ingesting data. If you don’t need to perform transformations while ingesting data, you can consider using AWS DMS (Data Migration Service). This service allows you to sync data from an existing database (on-premises or hosted on the AWS cloud) to another data store that exists within your data pipeline (such as Amazon S3 or a data warehouse). You can also use this service to migrate data from one database engine to a different database engine. It is available in serverless or provisioned modes. To learn more about this service, check out 
the overview page of this service. 

##  Other AWS ingesting services: 

### AWS Snow family
: if your company wants to migrate its legacy on-premise system to the cloud, you might need to transfer massive amounts of data, sometimes 100 TB or more. It would be very slow and costly to migrate this data over the internet, so you might want to consider a transfer appliance instead. At the time of creation for these courses, AWS offers transfer appliances called Snowball and Snowcone that help you move data in and out of the AWS cloud.

### AWS Transfer family
: This is a service that enables you to transfer files into and out of Amazon S3 using common file transfer protocols such as SFTP and FTP protocols.

##  Other non-AWS ingestion tools: 

There are other ingestion tools provided by other vendors or open-source projects that allow you to set a target and source (could be from different cloud providers) and ingest data in various ways. These tools are known as connectors because they allow you to connect a particular source to a target system. Examples of such tools include: 

``` Airbyte, 
    Matillion and 
    Fivetran
```

## Streaming Ingestion Tools
In course 1, you read about two streaming platforms: Amazon Kinesis Data Streams and Amazon Managed Streaming for Apache Kafka (MSK). To quickly refresh your memory about those services, you can check the overview service page of each (Kinesis and MSK). Later this week, we’ll get into more detail about these streaming platforms.


### Key Considerations for Batch vs Streaming Ingestion
Use cases: Ask your stakeholders: "if you get data in real time, what actions can you perform that would be an improvement to getting the data periodically in batches?"

#### Machine learning: 
batch is an excellent approach for many common use cases, such as model training. Consider if stakeholders can benefit from continuous training and online prediction.

#### Dashboards/Reporting: 
What are the benefits of having a real-time dashboard over one that is updated daily or weekly? Consider how stakeholders will act on real-time data.

#### Latency: 
Do you need millisecond real-time data ingestion? Or would a micro-batch approach work, accumulating and ingesting data, say, every minute?

#### Cost: 
A streaming ingestion approach is typically not as straightforward as batch ingestion, and it can carry extra costs and complexities.

## Will your streaming-first approach cost more in terms of time, money, maintenance, downtime, and opportunity cost than simply doing batch?

If you're using a streaming platform: does your team have the capability to manage it? Do you have the skills to fix errors propagating in an event system?

### Existing/Available system:

Destination system: If you ingest data in real time, can downstream storage systems handle the rate of data flow?

#### Source system:
 Are you getting data from a live production instance? If so, what’s the impact of your ingestion process on this source system?  Streaming systems are the best fit for many data source types. For instance, in IoT applications, each sensor writes events or measurements to streaming systems as they happen. While you can connect to the streaming source to directly write data into a database, you might find that it is a better fit to use a streaming ingestion platform such as Amazon Kinesis or Apache Kafka.

#### Reliability/Availability:
 Are your streaming pipeline and system reliable and redundant if infrastructure fails? Streaming services require high availability of compute resources. On the other hand, batch services don't need high availability. 


## Note: 
There are other use cases where you might need to perform both types of ingestions (same computations done on batch and streaming). For that, you can use ingestion frameworks, such as the lambda architecture discussed in the previous course,  to handle both batch and streaming ingestion patterns.


