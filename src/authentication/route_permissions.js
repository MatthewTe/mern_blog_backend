/**
 * MiddleWare used to deal with user authentication
 * @module authentication/route_permissions
 * @requires config
 */

// Importing environment configuration:
const config = require("../config");

/**
 * Default Error Message JSON if permission fails
 * @const
 */
const noAccessError = {"Error": "You do not have permission to access this route. Please provide a Token"};
    
 /**
 * The function contains the logic that handels basic permissions for API
 * endpoints. It is designed to protect all POST, PUT and DELETE methods from
 * users that are not authenticated but allows any GET requests.
 * 
 * This permissions middleware is as bare bones as necessary as the only necessary
 * authentication and permission system for the blog application is logic that
 * protects all REST routes that modify data.
 * 
 * @param {e.Request} req - The HTTP request recieved from the endpoint.
 * @param {e.Response} res - the HTTP response sent to the client.
 * @param {e.next} next - The function telling the App to proceede to the next middleware. 
 */
function routePremissions (req, res, next) {

    // Assigning editing permission based on request methods:
    if (req.method == "GET") {
        next();
    }
    else {
        // Validating Token Existence and equality w/ environment params:
        if (req.body && req.body.token) {

            if (req.body.token == config.TOKEN) {
                next();      
            }
            else {
                res.json(noAccessError);
            }       
        }
        else {
            res.json(noAccessError);
        }
    }
};

module.exports = routePremissions;