System.register("index", ["angular2/angular2", "yo-1"], function($__export) {
  "use strict";
  var __moduleName = "index";
  var Component,
      View,
      bootstrap,
      Yo1,
      Main;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      Yo1 = $__m.Yo1;
    }],
    execute: function() {
      Main = function() {
        function Main() {}
        return ($traceurRuntime.createClass)(Main, {}, {});
      }();
      Object.defineProperty(Main, "annotations", {get: function() {
          return [new Component({selector: 'main'}), new View({
            directives: [Yo1],
            template: "\n    <yo-1></yo-1>\n  "
          })];
        }});
      bootstrap(Main);
    }
  };
});
