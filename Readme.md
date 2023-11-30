# A Simple Full Stack App

Stop screwing around with large frameworks!

## Whats Included

Total files: 11 (including the favicon)

Total lines of code: 259

Contents:

- database (Postgres)
- api (Node.js)
- ui (Vanilla HTML, CSS, JavaScript)
- pgAdmin

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

App will load at: http://localhost/

## pgAdmin

pgAdmin panel is included at http://localhost:8001/

To register the database:

1. Selecting from the top menu: Object > Register > Server
2. Enter the database name under the General tab: full-stack
3. Select the Connection tab
4. Enter the Host name/address: db
5. Enter the username: postgres
6. Enter the password: password
7. Click Save
