# Full Stack App

Stop screwing around with lots of code and frameworks!

## Requirements

- Code Editor
- Docker
- Browser

## Run

```bash
    # Start
    docker compose up

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
