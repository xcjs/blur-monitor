/*jslint node: true */
/*jslint esversion: 6 */

'use strict';

var pam = require('authenticate-pam');
var NodeCache = require( "node-cache" );
var randomstring = require('randomstring');

var tokenCache = new NodeCache({
    stdTTL: 60 * 60 * 24,
    checkperiod: 120
});

module.exports = {
    authenticate: authenticate,
    getTokenValue: getTokenValue,
    setToken: setToken
};

function authenticate(username, password) {
    var promise = new Promise(function(resolve, reject) {
        pam.authenticate(username, password, function(err) {
            if(!err) {
                resolve(setToken(username));
            }
            else {
                reject(err);
            }
        });
    });

    return promise;
}

function getTokenValue(token) {
    var promise = new Promise(function(resolve, reject) {
        tokenCache.get(token, function(err, value) {
            if(!err && !!value) {
                resolve(value);
            } else {
                reject(err);
            }
        });
    });

    return promise;
}

function setToken(username) {
    var promise = new Promise(function(resolve, reject) {
        var token = randomstring.generate(24);

        tokenCache.set(token, { username: username }, function(err) {
            if(!err) {
                resolve(token);
            } else {
                reject(err);
            }
        });
    });

    return promise;
}
