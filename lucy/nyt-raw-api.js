/*jshint -W069 */
/**
 * Move your app forward with the Uber API
 * @class API
 * @param {string} domain - The project domain
 */
module.exports.API = function(domain) {
    'use strict';

    var request = require('request');
    var Q = require('q');

    /**
     * Returns a list of tweets that match the query

     * @method
     * @name API#articleSearch
     * @param {{string}} q - query to search
     * @param {{integer}} page - Page, starting with 0
     * @param {{string}} begin_date - Begin date
     * @param {{string}} apiKey - Api Key
     * @param {{string}} end_date - End date
     * @param {{string}} sort - Sort order
     * 
     */
    this.articleSearch = function(parameters) {
        if (parameters === undefined) {
            parameters = {};
        }
        var deferred = Q.defer();

        var path = '/svc/search/v2/articlesearch.json';

        var body;
        var queryParameters = {};
        var headers = {};
        var form = {};

        if (parameters['q'] !== undefined) {
            queryParameters['q'] = parameters['q'];
        }

        if (parameters['q'] === undefined) {
            deferred.reject(new Error('Missing required  parameter: q'));
            return deferred.promise;
        }

        if (parameters['page'] !== undefined) {
            queryParameters['page'] = parameters['page'];
        }

        if (parameters['begin_date'] !== undefined) {
            queryParameters['begin_date'] = parameters['begin_date'];
        }

        if (parameters['apiKey'] !== undefined) {
            queryParameters['api-key'] = parameters['apiKey'];
        }

        if (parameters['end_date'] !== undefined) {
            queryParameters['end_date'] = parameters['end_date'];
        }

        if (parameters['sort'] !== undefined) {
            queryParameters['sort'] = parameters['sort'];
        }

        if (parameters.$queryParameters) {
            Object.keys(parameters.$queryParameters)
                .forEach(function(parameterName) {
                    var parameter = parameters.$queryParameters[parameterName];
                    queryParameters[parameterName] = parameter;
                });
        }

        request({
            method: 'GET',
            uri: domain + path,
            qs: queryParameters,
            headers: headers,
            body: body,
            form: form,
            rejectUnauthorized: false
        }, function(error, response, body) {
            if (error) {
                deferred.reject(error);
            } else {
                if (/^application\/(.*\\+)?json/.test(response.headers['content-type'])) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {

                    }
                }
                if (response.statusCode >= 200 && response.statusCode <= 299) {
                    deferred.resolve({
                        response: response,
                        body: body
                    });
                } else {
                    deferred.reject({
                        response: response,
                        body: body
                    });
                }
            }
        });

        return deferred.promise;
    };
};