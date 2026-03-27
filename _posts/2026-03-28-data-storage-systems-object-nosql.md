---
title: "Data Storage Systems for Data Engineers: Object Storage and NoSQL Databases"
collection: posts
description: "Explore the fundamentals of object storage systems like Amazon S3 and NoSQL databases like DynamoDB, essential tools for modern data engineering workflows."
date: "2026-03-28 10:00:00"
permalink: "/posts/2026/03/data-storage-systems-object-nosql/"
tags:
  - Data Engineering
  - AWS
  - Object Storage
  - S3
  - DynamoDB
  - NoSQL
  - CRUD Operations
  - Boto3
---

<br>

As a data engineer, you'll encounter files as one of the most common source systems in your daily work. These files might come from various places - file systems like Google Drive, object storage systems like Amazon S3, or even as email attachments. While files can originate from many different sources, object storage is arguably the most important mechanism for file storage and retrieval in data engineering work.

## Understanding Object Storage

Object Storage treats data as individual objects and stores them in a flat structure that doesn't adhere to traditional file system hierarchies. This means that while you might be accustomed to storing files in folders and subfolders on your local computer, Object Storage has no hierarchy.

### The Flat Structure Concept

This flat structure can be confusing at first. If you go into Amazon S3, you'll see a "Create Folder" button, and you can create folders and subfolders to organize your files in what looks like a hierarchical file system. However, this is just a user interface feature to keep things looking organized in a familiar way.

The actual storage mechanism is flat, meaning that even though it might look like you have folders and subfolders in the UI, all files are actually stored at the top level. This design allows for quick and straightforward access to all objects without the overhead of folder structures.

### Key Components of Object Storage

**Objects can be anything from:**
- CSV, JSON, text files
- Video, image, or audio files
- Machine-readable binary data

This versatility makes Object Storage the perfect repository for semi-structured and unstructured data, which is useful for applications like serving data for training machine learning models.

**Each object in Object Storage has:**
1. **Universal Unique Identifier (UUID)** - A key required for accessing and managing the object
2. **Metadata** - Additional information like creation date, file type, or owner

### Object Immutability and Versioning

It's worth noting that after the initial write, objects become technically immutable. They don't support random write or append operations. In this sense, a file in Object Storage is not like a table in a relational database that you can update or append to.

To change data stored in an object, you must rewrite the full object and have the UUID point to this new object. However, Object Storage supports versioning, which allows you to keep multiple versions of an object instead of overwriting the old one.

## Why Use Object Storage?

Object Storage offers several compelling advantages:

- **Flexibility**: Store files of various data formats without specific file system structure
- **Scalability**: Easily scale out to provide virtually limitless storage space
- **Durability**: Data is typically replicated across multiple availability zones
- **Cost-Effectiveness**: Often cheaper than other storage options, especially for infrequently accessed data

For example, Amazon S3 offers 11 nines of data durability, meaning it can withstand concurrent device or data center failures.

## NoSQL Databases: DynamoDB Deep Dive

While Object Storage excels at storing files, NoSQL databases like DynamoDB provide powerful capabilities for structured data operations. DynamoDB is a key-value database that stores sets of key-value items in tables.

### DynamoDB Fundamentals

Each row in a DynamoDB table contains the attributes of one item and is uniquely identified by the item's key. The key represents something like a person's ID, and the value consists of attributes that describe the item.

**Primary Keys in DynamoDB:**
- **Simple Primary Key**: Single attribute (like PersonID)
- **Composite Primary Key**: Two attributes (Partition Key + Sort Key)

The partition key determines which physical partition the item will be stored in, while the sort key sorts items within the same partition.

### Schemaless Design

Unlike traditional relational databases, DynamoDB tables are schemaless. This means you don't need to define attributes beforehand - each item can have its own distinct attributes. This flexibility is particularly useful for applications with evolving data requirements.

## Working with DynamoDB: CRUD Operations

In practice, you'll interact with DynamoDB using AWS SDKs like Boto3 for Python. Here are the key operations you'll perform:

### Create Operations
- `createTable()` - Define table structure and primary keys
- `putItem()` - Add single items
- `batchWriteItem()` - Add multiple items efficiently

### Read Operations
- `getItem()` - Retrieve single items by key
- `query()` - Retrieve items based on key conditions
- `scan()` - Retrieve all items (use sparingly for performance)

### Update Operations
- `updateItem()` - Modify existing items

### Delete Operations
- `deleteItem()` - Remove items by key

## Practical Example: DynamoDB Lab Structure

When working with DynamoDB in a lab environment, you'll typically work with JSON data files that define table structures and sample data. For example:

- **Product Catalog**: Items with product IDs as primary keys
- **Forum Data**: Forum information with forum names as keys
- **Thread Data**: Forum threads with composite keys (forum name + subject)
- **Reply Data**: Thread replies with composite keys (ID + timestamp)

Each JSON file contains "PutRequest" elements that define the data type descriptors (like "N" for number, "S" for string) and values for each attribute.

## Integration Throughout the Data Lifecycle

Both Object Storage and NoSQL databases play crucial roles throughout the entire data engineering lifecycle:

- **Data Ingestion**: Object Storage as landing zones for raw files
- **Data Processing**: DynamoDB for operational data and quick lookups
- **Data Storage**: Object Storage for data lakes and archives
- **Data Serving**: Both systems for different access patterns

## Choosing the Right Storage System

**Use Object Storage when:**
- Storing large files or unstructured data
- Building data lakes or lake houses
- Need cost-effective, highly durable storage
- Files don't require frequent updates

**Use DynamoDB when:**
- Need fast key-value lookups
- Data structure evolves frequently
- Require high availability and scalability
- Building applications with variable schemas

## Getting Hands-On

The best way to understand these systems is through practice. You'll typically:

1. **Create S3 buckets** and upload/download objects
2. **Work with object versioning** in S3
3. **Create DynamoDB tables** with different key structures
4. **Perform CRUD operations** using Boto3
5. **Query and scan** data efficiently

## Next Steps

As you progress in your data engineering journey, you'll see how these storage systems integrate with other components like data processing frameworks, analytics tools, and machine learning pipelines. Understanding when to use each system and how they complement each other is key to designing effective data architectures.

Ready to dive deeper? The next video will explore streaming data sources and how they fit into your data engineering toolkit.