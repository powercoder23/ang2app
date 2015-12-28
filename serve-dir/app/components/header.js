System.register("app/components/header", ["angular2/angular2"], function($__export) {
  "use strict";
  var __moduleName = "app/components/header";
  var Component,
      View,
      PVHeader;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentMetadata;
      View = $__m.ViewMetadata;
    }],
    execute: function() {
      PVHeader = function() {
        function PVHeader() {}
        return ($traceurRuntime.createClass)(PVHeader, {sayHello: function() {
            console.log("hello there!");
          }}, {});
      }();
      $__export("PVHeader", PVHeader);
      Object.defineProperty(PVHeader, "annotations", {get: function() {
          return [new Component({selector: 'pv-header'}), new View({templateUrl: 'app/components/header.html'})];
        }});
    }
  };
});
