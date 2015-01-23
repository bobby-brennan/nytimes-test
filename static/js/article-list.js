// Reverse order, !found == -1
var SUBTYPE_PREFERENCE = [
  "xlarge",
  "large",
  "thumbnail",
  "wide",
]

app.controller("ArticleListController", ['$scope', '$window', function($scope, $window) {
  $scope.getBestImage = function(multimedia) {
    var ret = multimedia.filter(function(d) {
      return d.type === 'image';
    }).sort(function(d1, d2) {
     d1Score = SUBTYPE_PREFERENCE.length - SUBTYPE_PREFERENCE.indexOf(d1.subtype);
     d2Score = SUBTYPE_PREFERENCE.length - SUBTYPE_PREFERENCE.indexOf(d2.subtype);
     return d1Score - d2Score;
    }).map(function(d) {
      return d.url;
    })[0];
    return ret;
  }
}])
