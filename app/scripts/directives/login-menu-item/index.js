'use strict';

var template = require('./template.html');
var ngModule = require('../../module');

ngModule.directive('loginMenuItem', [
  'LoginService',
  function(LoginService) {
    return {
      restrict: 'E',
      replace: true,
      template: template,
      link: function(scope, element, attrs) {
        scope.login = LoginService;

        scope.toggleLoginMenu = function() {
          scope.isLoginMenuShown = !scope.isLoginMenuShown;
        };
      }
    };
  }
]);
