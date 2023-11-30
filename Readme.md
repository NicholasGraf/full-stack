# A Simple Full Stack App

Stop screwing around with large frameworks!

This is a full stack app using docker, Postgres, Node.js, and a vanilla UI.

## Whats Included

Total files: 11 (including the favicon)

Total lines of code: 259

Contents:

- database (Postgres)
- pgAdmin
- api (Node.js)
- ui (HTML, CSS, JavaScript)

## Requirements

- Code Editor
- Docker
- Browser

## Run

```bash
    # Start
    docker compose up --force-recreate --build

    # Destroy
    docker compose down --rmi all --volumes
```

App will load at: http://localhost:8000

API will load at: http://localhost:8001

## pgAdmin

pgAdmin panel is included at http://localhost:8002

Username: test@test.com

Password: password

To register the database:

1. Click on the "Servers" object in the Object Explorer on the left
2. Select from the top menu: Object > Register > Server
3. Enter the database name under the General tab: full-stack
4. Select the Connection tab
5. Enter the Host name/address: db
6. Enter the username: postgres
7. Enter the password: password
8. Click Save
