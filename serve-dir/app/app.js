System.register("app/app", ["angular2/angular2"], function($__export) {
  "use strict";
  var __moduleName = "app/app";
  var Component,
      View,
      bootstrap,
      App;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
      bootstrap = $__m.bootstrap;
    }],
    execute: function() {
      App = function() {
        function App() {}
        return ($traceurRuntime.createClass)(App, {constructer: function() {}}, {});
      }();
      Object.defineProperty(App, "annotations", {get: function() {
          return [new Component({selector: 'app'}), new View({template: '<div>Hello Angular2</div>'})];
        }});
      bootstrap(App);
    }
  };
});
