var Express = require('express');
var App = Express();
var BodyParser = require('body-parser');

App.set('views', __dirname);
App.set('view engine', 'ejs');

var NYTimes = require('./lucy/nyt-custom-api.js');

App.set('port', (process.env.PORT || 3000));
App.use(BodyParser.json());
App.use(BodyParser.urlencoded({
  extended: true
}));

App.get('/', function(req, res, next) {
  if (!NYTimes.initialized()) {
    res.redirect('/initialize.html');
  } else {
    next();
  }
});

App.post('/setSecrets', function(req, res) {
  if (!NYTimes.initialized()) {
    NYTimes.initialize(req.body, function() {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

App.get('/', function(req, res) {
  res.redirect('/articles-about-obama-main.html');
});

App.post('/articlesAboutObama_articleSearch', function(req, res) {
  NYTimes.articlesAboutObama_articleSearch(req.body.q, function(err, result) {
    if (err) {
      console.log('Error:' + JSON.stringify(err));
      res.status(401);
      return res.end();
    }
    res.send(JSON.stringify(result));
  });
})

App.use(Express.static(__dirname + '/static'));

App.listen(App.get('port'), function() {
  console.log("Node App is running at localhost:" + App.get('port'));
});
