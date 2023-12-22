# hola Backend Project

## Description

This is a voluntary project developed to track attendance for the Douglas College Fitness Centre customers

## Installation


```bash
npm install express mongoose dotenv fast-csv express-fileupload
npm start

```

## Endpoints

# Create a new customer
POST ```/api/customers```

# Get a specific customer
GET ```/api/customers/:id```

# Update a customer's policy
PUT ```/api/customers/:id/policy```

# Update a customer
PUT ```/api/customers/:id```

# Delete a customer
DELETE ```/api/customers/:id```

# Bulk delete customers
POST ```/api/customers/delete```

# Delete all customers
DELETE ```/api/customers```