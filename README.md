# hola Backend Project

## Description

This is a voluntary project developed to track attendance for the Douglas College Fitness Centre customers.

## Installation

Note that is important to create an ```.env``` file at the root level with the following environment variables
that are used in ```db.js```

```
MONGODB_URI=mongodb url
DEFAULT_USER_EMAIL=email
DEFAULT_USER_PASSWORD=password
```


```bash
npm install express mongoose dotenv fast-csv express-fileupload
npm start
```

## Endpoints

### Create a new customer
POST ```/api/customers```

### Get a specific customer
GET ```/api/customers/:id```

### Update a customer's policy
PUT ```/api/customers/:id/policy```

### Update a customer
PUT ```/api/customers/:id```

### Delete a customer
DELETE ```/api/customers/:id```

### Bulk delete customers
POST ```/api/customers/delete```

### Delete all customers
DELETE ```/api/customers```

### Register attendance
POST ```/api/attendance```

### Bulk import customers from CSV
POST ```/api/import```

### Create system's users
POST ```/api/users```

### Login
POST ```/api/users/login```