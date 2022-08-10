# Apollo Server
Backend Server

## Backend Structure
* `src`: This directory holds the source files for the GraphQL server.
  * `schema.graphql` contains the application schema. This will schema defines the GraphQL operations that can be sent
from the frontend
  * `reslovers` contains the resolver function for the operation defined in this TODO application schema. Example Create,
update and delete tasks.
  * `index.ts` is the entry point for the GraphQL server.
* `prisma`: This directory holds all the files related to Prisma setup. Prisma Client is used to access the database in
the GraphQL resolvers.
  * 'schema.prisma' defines the data model for this project.  It uses the Prisma schema Language to define the shape of the 
databases tables and the relations between them.
  * `dev.db` is a SQLite Database that is used to store and retrieve data locally.

## Environment Setup
Install server dependencies run:<br>
* `npm install` 

Create the first Prisma migration
* `prisma migrate dev --name init`<br>

Now the Prisma schema is now in sync with the database schema and a migration history has been initialized
```
migrations/
└─ 20220727073050_init/
  └─ migration.sql
```
