var Client = require('././nyt-raw-api.js');
Client.API('http://api.nytimes.com');

var Secrets = null;
exports.initialize = function(secrets, callback) {
  if (Client.initialize) {
    Client.initialize(secrets, callback);
  } else {
    Secrets = secrets;
    callback();
  }
}
exports.initialized = function() {
  return Client.initialize ? Client.initialized() : Secrets !== null;
}

exports.articlesAboutObama_articleSearch = function(q, callback) {
  var params = {
    'q': q || "Obama",
  };
  for (var secret in Secrets) {
    params[secret] = Secrets[secret];
  }
  return Client.articleSearch(params)
  .then(function(result) {callback(null, JSON.parse(result.response.body))},
        function(err) {callback(err)});
}

