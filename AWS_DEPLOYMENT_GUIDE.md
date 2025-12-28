# AWS Deployment Guide - Uppal Kalan Street Food Guide

## Overview
This guide walks you through deploying the Uppal Kalan Street Food Guide to AWS using modern serverless architecture.

## Architecture Diagram

```
Internet → CloudFront → S3 (Frontend) 
    ↓
API Gateway → Lambda Functions (Backend) → DynamoDB (Data)
    ↓
Route 53 (Custom Domain)
```

## Prerequisites
- AWS Account with appropriate permissions
- AWS CLI configured
- Node.js 18+ installed
- Domain name (optional)

## Step 1: Frontend Deployment (S3 + CloudFront)

### 1.1 Build the Frontend
```bash
cd frontend
npm run build
```

### 1.2 Create S3 Bucket
```bash
aws s3 mb s3://uppal-food-guide-frontend --region us-east-1
```

### 1.3 Configure S3 for Static Website Hosting
```bash
aws s3 website s3://uppal-food-guide-frontend --index-document index.html --error-document error.html
```

### 1.4 Upload Build Files
```bash
aws s3 sync out/ s3://uppal-food-guide-frontend --delete
```

### 1.5 Create CloudFront Distribution
```json
{
  "CallerReference": "uppal-food-guide-2024",
  "Comment": "Uppal Food Guide Frontend",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-uppal-food-guide-frontend",
        "DomainName": "uppal-food-guide-frontend.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-uppal-food-guide-frontend",
    "ViewerProtocolPolicy": "redirect-to-https",
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

## Step 2: Backend Deployment (Lambda + API Gateway)

### 2.1 Convert Express Routes to Lambda Functions

Create `lambda/recommendations.js`:
```javascript
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const dynamodb = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  try {
    const { budget, time, cuisine } = JSON.parse(event.body);
    
    // Scan restaurants from DynamoDB
    const params = {
      TableName: "uppal-restaurants",
      FilterExpression: "priceRange.#min <= :budget AND priceRange.#max >= :minBudget",
      ExpressionAttributeNames: {
        "#min": "min",
        "#max": "max"
      },
      ExpressionAttributeValues: {
        ":budget": { N: budget.toString() },
        ":minBudget": { N: (budget * 0.7).toString() }
      }
    };
    
    const result = await dynamodb.send(new ScanCommand(params));
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        success: true,
        data: result.Items
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
```

### 2.2 Create Lambda Deployment Package
```bash
cd lambda
npm init -y
npm install @aws-sdk/client-dynamodb
zip -r recommendations.zip .
```

### 2.3 Deploy Lambda Function
```bash
aws lambda create-function \
  --function-name uppal-recommendations \
  --runtime nodejs18.x \
  --role arn:aws:iam::YOUR-ACCOUNT:role/lambda-execution-role \
  --handler recommendations.handler \
  --zip-file fileb://recommendations.zip
```

### 2.4 Create API Gateway
```bash
aws apigateway create-rest-api --name uppal-food-guide-api
```

## Step 3: Database Setup (DynamoDB)

### 3.1 Create DynamoDB Table
```bash
aws dynamodb create-table \
  --table-name uppal-restaurants \
  --attribute-definitions \
    AttributeName=id,AttributeType=S \
  --key-schema \
    AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

### 3.2 Import Restaurant Data
```javascript
// import-data.js
const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const restaurants = require("../data/restaurants.json");

const dynamodb = new DynamoDBClient({ region: "us-east-1" });

async function importData() {
  for (const restaurant of restaurants) {
    const params = {
      TableName: "uppal-restaurants",
      Item: {
        id: { S: restaurant.id },
        name: { S: restaurant.name },
        cuisine: { SS: restaurant.cuisine },
        priceRange: {
          M: {
            min: { N: restaurant.priceRange.min.toString() },
            max: { N: restaurant.priceRange.max.toString() }
          }
        },
        // Add other fields as needed
      }
    };
    
    await dynamodb.send(new PutItemCommand(params));
    console.log(`Imported: ${restaurant.name}`);
  }
}

importData();
```

## Step 4: Environment Configuration

### 4.1 Update Frontend API URLs
```javascript
// frontend/src/utils/api.ts
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-gateway-url.amazonaws.com/prod'
  : 'http://localhost:5001';
```

### 4.2 Set Lambda Environment Variables
```bash
aws lambda update-function-configuration \
  --function-name uppal-recommendations \
  --environment Variables="{DYNAMODB_TABLE=uppal-restaurants,REGION=us-east-1}"
```

## Step 5: Custom Domain (Optional)

### 5.1 Request SSL Certificate
```bash
aws acm request-certificate \
  --domain-name uppallocalguide.com \
  --validation-method DNS
```

### 5.2 Create Route 53 Hosted Zone
```bash
aws route53 create-hosted-zone \
  --name uppallocalguide.com \
  --caller-reference uppal-$(date +%s)
```

## Step 6: Monitoring and Logging

### 6.1 Enable CloudWatch Logs
```bash
aws logs create-log-group --log-group-name /aws/lambda/uppal-recommendations
```

### 6.2 Set up CloudWatch Alarms
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name uppal-high-error-rate \
  --alarm-description "High error rate for Uppal Food Guide" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

## Step 7: CI/CD Pipeline (Optional)

### 7.1 GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm install
    
    - name: Build frontend
      run: |
        cd frontend
        npm run build
    
    - name: Deploy to S3
      run: |
        aws s3 sync frontend/out/ s3://uppal-food-guide-frontend --delete
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    
    - name: Invalidate CloudFront
      run: |
        aws cloudfront create-invalidation --distribution-id YOUR-DISTRIBUTION-ID --paths "/*"
```

## Cost Estimation

### Monthly Costs (Estimated)
- **S3**: $1-5 (depending on traffic)
- **CloudFront**: $1-10 (first 1TB free)
- **Lambda**: $0-5 (first 1M requests free)
- **DynamoDB**: $1-5 (25GB free tier)
- **API Gateway**: $1-10 (first 1M requests free)

**Total Estimated Cost**: $5-35/month

## Security Best Practices

1. **IAM Roles**: Use least-privilege access
2. **API Rate Limiting**: Implement throttling
3. **CORS Configuration**: Restrict origins
4. **SSL/TLS**: Use HTTPS everywhere
5. **Input Validation**: Sanitize all inputs

## Troubleshooting

### Common Issues
1. **CORS Errors**: Check API Gateway CORS settings
2. **Lambda Timeouts**: Increase timeout limits
3. **DynamoDB Throttling**: Use exponential backoff
4. **CloudFront Caching**: Set appropriate cache headers

## Monitoring Dashboard

Create a CloudWatch dashboard to monitor:
- API response times
- Error rates
- DynamoDB read/write capacity
- Lambda invocation counts
- Frontend page views

## Backup Strategy

1. **DynamoDB**: Enable point-in-time recovery
2. **S3**: Enable versioning
3. **Lambda**: Store code in version control
4. **Regular exports**: Automated data backups

This deployment guide provides a production-ready setup for the Uppal Kalan Street Food Guide on AWS infrastructure.