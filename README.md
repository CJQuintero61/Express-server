# Express-server
A short class project for node and express

## To Run

Requires

- pgAdmin
- Docker

1. install packages with `npm i`
2. build db container `docker compose up --build -d`
3. create tables and init data with `npm run init-db`
4. in pgAdmin, if you want to see the tables and data
   1. register a new server with whatever name you want such as `express-assignment`
   2. set the host address to `localhost`
   3. set the username and password to login to the db as `postgres`
   4. from the servers list, go to `express-assignment/databases/express-server-assignment/schemas/public/tables` to see the tables that exist in the db
   5. use the query tool to read table data if needed
5. run the development server `npm run dev`
6. go to `http://localhost:3000/` to verify the server is working
   1. `http://localhost:3000/api/resources/` to see all tasks currently in db
   2. `http://localhost:3000/api/resources/1` to see a specific task, simply replace '1' with any task id
7. remove the volume with `docker compose down --volumes`
