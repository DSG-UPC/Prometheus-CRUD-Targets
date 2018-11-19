# Prometheus CRUD app for targets
CRUD app developed on Node.js that will be used to edit the file targets.json. That file is important in Prometheus configuration because there it is where the targets to be scanned will be added dynamically.
By default, the server runs on port 3000.

## How to run
```
npm install && npm start
```

The API calls are restricted to localhost access.

There are five API endpoints (one for each CRUD operation and a fifth one to help). All requests but help point to the same endpoint ('/')

* GET request for reading the contents of the file.
* PUT request to update the contents of the file.
* POST request to add a new endpoint to the file.
* DELETE request to remove an endpoint from the file.
* GET request to retrieve help information about the previous endpoints. (Endpoint: '/help').