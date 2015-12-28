System.register("app/components/search/search", ["angular2/angular2"], function($__export) {
  "use strict";
  var __moduleName = "app/components/search/search";
  var Component,
      View,
      Search;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentMetadata;
      View = $__m.ViewMetadata;
    }],
    execute: function() {
      Search = function() {
        function Search(args) {}
        return ($traceurRuntime.createClass)(Search, {}, {});
      }();
      $__export("Search", Search);
      Object.defineProperty(Search, "annotations", {get: function() {
          return [new Component({selector: 'search'}), new View({template: '<h1>This is Search</h1>'})];
        }});
    }
  };
});
