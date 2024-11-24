# 🛒 Multivendor Microservice Application - Product Service

This repository is part of a **Multivendor Microservice Application** designed for seamless and scalable e-commerce operations. This specific service, **Product Service**, is implemented using **AWS Lambda** and **AWS CDK (Cloud Development Kit)**, showcasing an Infrastructure as Code (IaC) approach for efficient cloud resource management.

## 🚀 Architecture Overview

![Screenshot 2024-11-23 182922](https://github.com/user-attachments/assets/65965cf1-601a-4ceb-961b-8f6d14617d91)
*Replace "path-to-architecture-image.png" with the actual image file path in your repository.*

### Key Components:
1. **AWS CDK**: 
   - Used to define the infrastructure and Lambda functions as code.
   - Enables reusability and consistency across deployments.

2. **Lambda Functions**:
   - Serve as the core microservices for handling product and category-related operations.
   - Highly scalable, event-driven functions with minimal cold start times.

3. **CloudFormation**:
   - Facilitates seamless provisioning and management of stacks, ensuring all resources are consistently deployed across the AWS environment.

4. **API Gateway**:
   - Exposes RESTful APIs for interacting with the Product and Category Services.
   - Acts as the entry point for managing product and category-related endpoints.

5. **ESBuild**:
   - Efficiently bundles and optimizes Lambda functions for production.

### Benefits:
- **Scalability**: Designed for high traffic with serverless technologies.
- **Resilience**: Ensures minimal downtime with distributed and fault-tolerant architecture.
- **Cost-Efficiency**: Leverages AWS's pay-as-you-go model with Lambda.

---

## 🌟 Features

- **Add Products**: Create new product entries with detailed metadata.
- **Update Products**: Edit existing product information dynamically.
- **Delete Products**: Remove products with ease.
- **Search Products**: Fetch product details efficiently via RESTful APIs.
- **Manage Categories**: 
  - Add, update, delete, and fetch categories for products.
  - Associate products with categories to improve organization.

---


## 🛠️ Getting Started

### Prerequisites:
- **AWS CLI** configured with access to your AWS account.
- **Node.js** installed (LTS version recommended).
- **AWS CDK Toolkit** installed globally:
  ```bash
  
  npm install -g aws-cdk


  ## 📡 API Endpoints

### Product Endpoints
| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| GET    | `/products`               | Fetch all products          |
| POST   | `/products`               | Add a new product           |
| PUT    | `/products/{id}`          | Update an existing product  |
| DELETE | `/products/{id}`          | Delete a product            |

### Category Endpoints
| Method | Endpoint                  | Description                 |
|--------|---------------------------|-----------------------------|
| GET    | `/categories`             | Fetch all categories        |
| POST   | `/categories`             | Add a new category          |
| PUT    | `/categories/{id}`        | Update an existing category |
| DELETE | `/categories/{id}`        | Delete a category           |
