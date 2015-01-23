app.controller('articlesAboutObamaController', function($scope) {
  $scope.inputs =
      {"q":"Obama"}
  $scope.showInputs = false;
  $scope.showTheInputs = function() {
    console.log('sti');
    $scope.showInputs = true;
    $scope.$apply();
  }
  $scope.inputs.page = 0;
  $scope.articleSearch = function(cb) {
    $.ajax({
      url: 'articlesAboutObama_articleSearch',
      type: 'post',
      contentType: "application/json; charset=utf-8",      
      data: JSON.stringify($scope.inputs)
    })
    .done(function(data) {
      $scope.result = JSON.parse(data);
      $scope.$apply();
      if (cb) cb($scope.result);
    })
    .fail(function(err) {
       console.log('Error loading data:' + JSON.stringify(err));
    })
  }
  
  $scope.getPages = function() {
    var page = $scope.inputs.page;
    var pages = [1, 2, 3, 4, 5];
    if (page < 3) {
      return [1, 2, 3, 4, 5];
    } else {
      return pages.map(function(d) { return d + page - 2 });
    }
  }
})

