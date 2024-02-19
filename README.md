
# Backend Coding Challenge (Roxiler Systems)





# env
PORT=3000

NODE_ENV=development

DATABASE_LOCAL=mongodb://localhost:27017/task


## Run Locally

Clone the project

```bash
https://github.com/rvasande/Roxiler-Task.git
```

Go to the project directory

```bash
  cd Roxiler-Task 
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## API Reference

#### 1) Seed data into database
```http
  GET /api/v1/products/seedData
```

#### 2) Get all products
```http
  GET /api/v1/products
```

#### 3) Get statistics of selected month
```http
  GET /api/v1/products/stats/:month
```

#### 4) Get category of selected month
```http
  GET /api/v1/products/category/:month
```
#### 5) Get statistics of selected month
```http
  GET /api/v1/products/barChart/:month
```

#### 6) Get statistics of selected month
```http
  GET /api/v1/products/combinedRes/:month
```


