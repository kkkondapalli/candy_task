# Candy api store

## Install node modules
```shell
npm i
```

### Environment setup
```shell
cp .env.example .env
```
### Start dev server

```shell
npm run start:dev
```

## Check existing apis
> We have support for swagger api and this is enabled in all env except production

You can visit the `http://localhost:<port>/api` to check all the existing api docs

## Authentication check

> We have passport implemented but not used in all places
> If needs to be added we can add the `LoginGuard` which locks the users from accesing the details without login first

> /auth/login to login
> /auth/profile to get the logged in user details

## Order placing and race conditions

### Placing order
> We have order placement and inventory management

> While placing order we are doing safe checks to make sure that we have enough inventory to place the order

> In case of less inventory we throw exception ( user friendly ) message will be thrown to customer

### Updating order

> During update an order we check if it's eligible for update or not
> What we mean eligible is, If the order is complete, rejected or cancelled we don't want to update them


> If the order is only in updating we can update the status or other details.

> If we Cancel or Reject the order we safely add the quantity back to inventory


# Modules

### Reports
```
GET: /reports - gets reports for given month ( without date query param defaults to current month)
```

### Customers
```
GET: /customers - get all customers list
GET: /customers/:id - get single customer list
POST: /customers - add new customer
PUT: /customers/:id - update the exisiting customer
DELETE: /customers/:id - delete customer ( soft delete )
```

### Stores
```
GET: /stores - get all stores list
GET: /stores/:id - get single store list
POST: /stores - add new store
PUT: /stores/:id - update the exisiting store
DELETE: /stores/:id - delete store ( soft delete )
```

### Inventory
```
GET: /inventory - get all inventory list
GET: /inventory/:id - get single inventory list
POST: /inventory - add new inventory
PUT: /inventory/:id - update the exisiting store
DELETE: /inventory/:id - delete inventory ( soft delete )
```


### Orders
```
GET: /orders - get all orders list
GET: /orders/:id - get single order list
POST: /orders - add new orders
PUT: /orders/:id - update the exisiting store
DELETE: /orders/:id - delete order ( soft delete )
```

### Users
> these are the tables we use for login into the application
> We have small role system ( not implement but can be expanded)

> We have 3 types of user roles `admin`, `store_manager` and `customer` ( default )

> Only `users` endpoint has the provision to add/update the role

> Though the customers module uses same Service, its locked to use only `customer` role
```
GET: /users - get all users list
GET: /users/:id - get single user list
POST: /users - add new users
PUT: /users/:id - update the exisiting store
DELETE: /users/:id - delete user ( soft delete )
```

### With Docker setup
```
Steps on DOCKER.md
```

### Postman collection
candy-store.postman_collection.json

### Swagger URL
http://localhost:3000/api
