var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var reader = require('./reader')
reader = new reader('targets_fake.json')
const LOCALHOST = "localhost"
const OK = 200
const BAD_REQUEST = 400
const FORBIDDEN = 403
const NOT_FOUND = 404
const SERVER_ERROR = 500

app.use(bodyParser.json())

/**
 * To display information about the different endpoints
 */
app.get('/help', function (req, res) {
    if (checkOrigin(req)) {
        res.send(help())
    } else {
        res.sendStatus(FORBIDDEN)
    }
})

/**
 * To read the whole file
 */
app.get('/', function (req, res) {
    if (checkOrigin(req)) {
        sendResult(reader.read(), res)
    } else {
        res.sendStatus(FORBIDDEN)
    }
})

/**
 * To add a new target to the file
 * Require the data from the body
 * to be on the format
 * 
 * {
 *  target: "<IP>"
 * }
 */
app.post('/', function (req, res) {
    if (checkOrigin(req)) {
        if (req.body.target) {
            sendResult(reader.create(req.body.target), res)
        } else {
            res.sendStatus(BAD_REQUEST)
        }
    } else {
        res.sendStatus(FORBIDDEN)
    }
})

/**
 * To update an existing target
 * 
 * Require the data from the body
 * to be on the format
 * 
 * {
 *  old: "<IP>",
 *  new: "<IP>"
 * }
 */
app.put('/', function (req, res) {
    if (checkOrigin(req)) {
        if (req.body.old && req.body.new) {
            sendResult(reader.update(req.body.old, req.body.new), res)
        } else {
            res.sendStatus(BAD_REQUEST)
        }
    } else {
        res.sendStatus(FORBIDDEN)
    }
})

/**
 * To delete an existing target
 * 
 * Require the data from the body
 * to be on the format
 * 
 * {
 *  target: "<IP>"
 * }
 */
app.delete('/', function (req, res) {
    if (checkOrigin(req)) {
        if (req.body.target) {
            sendResult(reader.delete(req.body.target), res)
        } else {
            res.sendStatus(BAD_REQUEST)
        }
    } else {
        res.sendStatus(FORBIDDEN)
    }
})


/**
 * Parse the results obtained from the reader
 * @param {Number} res 
 * @param {Response} response
 */
function sendResult(result, response) {
    if (typeof result == "object") {
        if (result[0] == 0) {
            response.status(OK)
        } else if (result[0] == -1) {
            response.status(BAD_REQUEST)
        } else if (result[0] == -2) {
            response.status(SERVER_ERROR)
        } else if (result[0] == -3) {
            response.status(NOT_FOUND)
        }
        response.send(result[1])
    } else {
        if (result == 0) {
            response.sendStatus(OK)
        } else if (result == -2) {
            response.sendStatus(SERVER_ERROR)
        }
    }
}

/**
 * Checks the format of the host URI which needs to
 * be a localhost call.
 * @param {Request} req 
 */
function checkOrigin(req) {
    return req.get("host").split(":")[0] === LOCALHOST
}


/**
 * Displays a help menu containing information about each method.
 */
function help(){
    var help = "*** HELP ***\n\n"
    // Ford read endpoint
    help += "- READ: retrieves the data from the file. GET method that requires nor parameters neither body.\n\n"
    // For create endpoint
    help += "- CREATE: retrieves the data from the file. POST method that requires a body in JSON format {\"target\": \"IP\"}. Returns 400 if the element to be added already exists. \n\n"
    // For update endpoint
    help += "- UPDATE: changes an element in the file by a new one. PUT method that requires a body in JSON format {\"old\": \"IP\", \"new\": \"IP\"}. Returns 404 if the element to be updated didn't exist \n\n"
    // For delete endpoint
    help += "- DELETE: removes an element from the file. DELETE method that requires a body in JSON format {\"target\": \"IP\"}. Returns 404 if the element to be deleted didn't exist \n\n"
    return help;
}

app.listen(3000)