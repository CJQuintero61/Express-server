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
6. remove the volume with `docker compose down --volumes` when done
   1. Warning, destroying the volume will require you to re-init the db to create the tasks table

To test data persistence:

1. after building the container and initiallizing the db, close the Node server `Ctrl + C`
2. restart server `npm run dev`
3. read all data previously stored `http://localhost:3000/api/resources/`
