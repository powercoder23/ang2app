System.register("lib/system", [], function($__export) {
  "use strict";
  var __moduleName = "lib/system";
  return {
    setters: [],
    execute: function() {
      !function() {
        function e() {
          !function(e) {
            function t(e, t) {
              var n;
              if (e instanceof Error) {
                var n = new Error(e.message, e.fileName, e.lineNumber);
                y ? (n.message = e.message + "\n	" + t, n.stack = e.stack) : (n.message = e.message, n.stack = e.stack + "\n	" + t);
              } else
                n = e + "\n	" + t;
              return n;
            }
            function n(e, n, a) {
              try {
                new Function(e).call(a);
              } catch (r) {
                throw t(r, "Evaluating " + n);
              }
            }
            function a() {}
            function r(t) {
              this._loader = {
                loaderObj: this,
                loads: [],
                modules: {},
                importPromises: {},
                moduleRecords: {}
              }, w(this, "global", {get: function() {
                  return e;
                }});
            }
            function o() {
              r.call(this), this.paths = {};
            }
            function s(e, t) {
              var n,
                  a = "",
                  r = 0;
              for (var o in e) {
                var s = o.split("*");
                if (s.length > 2)
                  throw new TypeError("Only one wildcard in a path is permitted");
                if (1 == s.length) {
                  if (t == o) {
                    a = o;
                    break;
                  }
                } else {
                  var i = o.split("/").length;
                  i >= r && t.substr(0, s[0].length) == s[0] && t.substr(t.length - s[1].length) == s[1] && (r = i, a = o, n = t.substr(s[0].length, t.length - s[1].length - s[0].length));
                }
              }
              var l = e[a] || t;
              return "string" == typeof n && (l = l.replace("*", n)), l;
            }
            function i() {}
            function l() {
              o.call(this), O.call(this);
            }
            function u() {}
            function d(e, t) {
              l.prototype[e] = t(l.prototype[e]);
            }
            function c(e) {
              O = e(O || function() {});
            }
            function f(e) {
              for (var t = [],
                  n = [],
                  a = 0,
                  r = e.length; r > a; a++) {
                var o = S.call(t, e[a]);
                -1 === o ? (t.push(e[a]), n.push([a])) : n[o].push(a);
              }
              return {
                names: t,
                indices: n
              };
            }
            function m(e) {
              var t = {};
              if ("object" == (typeof e === 'undefined' ? 'undefined' : $traceurRuntime.typeof(e)) || "function" == typeof e)
                if (L) {
                  var n;
                  for (var a in e)
                    (n = Object.getOwnPropertyDescriptor(e, a)) && w(t, a, n);
                } else {
                  var r = e && e.hasOwnProperty;
                  for (var a in e)
                    (!r || e.hasOwnProperty(a)) && (t[a] = e[a]);
                }
              return t["default"] = e, w(t, "__useDefault", {value: !0}), t;
            }
            function p(e, t, n) {
              for (var a in t)
                n && a in e || (e[a] = t[a]);
              return e;
            }
            function h(e, t, n) {
              for (var a in t) {
                var r = t[a];
                a in e ? r instanceof Array && e[a] instanceof Array ? e[a] = [].concat(n ? r : e[a]).concat(n ? e[a] : r) : "object" == (typeof r === 'undefined' ? 'undefined' : $traceurRuntime.typeof(r)) && "object" == $traceurRuntime.typeof(e[a]) ? e[a] = p(p({}, e[a]), r, n) : n || (e[a] = r) : e[a] = r;
              }
            }
            function g(e, t) {
              for (var n = e.split("."); n.length; )
                t = t[n.shift()];
              return t;
            }
            function v() {
              if (F[this.baseURL])
                return F[this.baseURL];
              "/" != this.baseURL[this.baseURL.length - 1] && (this.baseURL += "/");
              var e = new k(this.baseURL, E);
              return this.baseURL = e.href, F[this.baseURL] = e;
            }
            var b = "undefined" == typeof window && "undefined" != typeof self && "undefined" != typeof importScripts,
                y = "undefined" != typeof window && "undefined" != typeof document,
                x = "undefined" != typeof process && !!process.platform.match(/^win/);
            e.console || (e.console = {assert: function() {}});
            var w,
                S = Array.prototype.indexOf || function(e) {
                  for (var t = 0,
                      n = this.length; n > t; t++)
                    if (this[t] === e)
                      return t;
                  return -1;
                };
            !function() {
              try {
                Object.defineProperty({}, "a", {}) && (w = Object.defineProperty);
              } catch (e) {
                w = function(e, t, n) {
                  try {
                    e[t] = n.value || n.get.call(e);
                  } catch (a) {}
                };
              }
            }();
            var E;
            if ("undefined" != typeof document && document.getElementsByTagName) {
              if (E = document.baseURI, !E) {
                var _ = document.getElementsByTagName("base");
                E = _[0] && _[0].href || window.location.href;
              }
              E = E.split("#")[0].split("?")[0], E = E.substr(0, E.lastIndexOf("/") + 1);
            } else if ("undefined" != typeof process && process.cwd)
              E = "file://" + (x ? "/" : "") + process.cwd() + "/", x && (E = E.replace(/\\/g, "/"));
            else {
              if ("undefined" == typeof location)
                throw new TypeError("No environment baseURI");
              E = e.location.href;
            }
            var k = e.URLPolyfill || e.URL;
            w(a.prototype, "toString", {value: function() {
                return "Module";
              }}), function() {
              function o(e) {
                return {
                  status: "loading",
                  name: e,
                  linkSets: [],
                  dependencies: [],
                  metadata: {}
                };
              }
              function s(e, t, n) {
                return new Promise(c({
                  step: n.address ? "fetch" : "locate",
                  loader: e,
                  moduleName: t,
                  moduleMetadata: n && n.metadata || {},
                  moduleSource: n.source,
                  moduleAddress: n.address
                }));
              }
              function i(e, t, n, a) {
                return new Promise(function(r, o) {
                  r(e.loaderObj.normalize(t, n, a));
                }).then(function(t) {
                  var n;
                  if (e.modules[t])
                    return n = o(t), n.status = "linked", n.module = e.modules[t], n;
                  for (var a = 0,
                      r = e.loads.length; r > a; a++)
                    if (n = e.loads[a], n.name == t)
                      return n;
                  return n = o(t), e.loads.push(n), l(e, n), n;
                });
              }
              function l(e, t) {
                u(e, t, Promise.resolve().then(function() {
                  return e.loaderObj.locate({
                    name: t.name,
                    metadata: t.metadata
                  });
                }));
              }
              function u(e, t, n) {
                d(e, t, n.then(function(n) {
                  return "loading" == t.status ? (t.address = n, e.loaderObj.fetch({
                    name: t.name,
                    metadata: t.metadata,
                    address: n
                  })) : void 0;
                }));
              }
              function d(t, a, r) {
                r.then(function(r) {
                  return "loading" == a.status ? Promise.resolve(t.loaderObj.translate({
                    name: a.name,
                    metadata: a.metadata,
                    address: a.address,
                    source: r
                  })).then(function(e) {
                    return a.source = e, t.loaderObj.instantiate({
                      name: a.name,
                      metadata: a.metadata,
                      address: a.address,
                      source: e
                    });
                  }).then(function(r) {
                    if (void 0 === r)
                      return a.address = a.address || "<Anonymous Module " + ++j + ">", a.isDeclarative = !0, k.call(t.loaderObj, a).then(function(t) {
                        var r = e.System,
                            o = r.register;
                        r.register = function(e, t, n) {
                          "string" != typeof e && (n = t, t = e), a.declare = n, a.depsList = t;
                        }, n(t, a.address, {}), r.register = o;
                      });
                    if ("object" != (typeof r === 'undefined' ? 'undefined' : $traceurRuntime.typeof(r)))
                      throw TypeError("Invalid instantiate return value");
                    a.depsList = r.deps || [], a.execute = r.execute, a.isDeclarative = !1;
                  }).then(function() {
                    a.dependencies = [];
                    for (var e = a.depsList,
                        n = [],
                        r = 0,
                        o = e.length; o > r; r++)
                      (function(e, r) {
                        n.push(i(t, e, a.name, a.address).then(function(t) {
                          if (a.dependencies[r] = {
                            key: e,
                            value: t.name
                          }, "linked" != t.status)
                            for (var n = a.linkSets.concat([]),
                                o = 0,
                                s = n.length; s > o; o++)
                              m(n[o], t);
                        }));
                      })(e[r], r);
                    return Promise.all(n);
                  }).then(function() {
                    a.status = "loaded";
                    for (var e = a.linkSets.concat([]),
                        t = 0,
                        n = e.length; n > t; t++)
                      h(e[t], a);
                  }) : void 0;
                })["catch"](function(e) {
                  a.status = "failed", a.exception = e;
                  for (var t = a.linkSets.concat([]),
                      n = 0,
                      r = t.length; r > n; n++)
                    g(t[n], a, e);
                });
              }
              function c(e) {
                return function(t, n) {
                  var a = e.loader,
                      r = e.moduleName,
                      s = e.step;
                  if (a.modules[r])
                    throw new TypeError('"' + r + '" already exists in the module table');
                  for (var i = void 0,
                      c = 0,
                      m = a.loads.length; m > c; c++)
                    if (a.loads[c].name == r && (i = a.loads[c], "translate" != s || i.source || (i.address = e.moduleAddress, d(a, i, Promise.resolve(e.moduleSource))), i.linkSets.length))
                      return i.linkSets[0].done.then(function() {
                        t(i);
                      });
                  var p = i || o(r);
                  p.metadata = e.moduleMetadata;
                  var h = f(a, p);
                  a.loads.push(p), t(h.done), "locate" == s ? l(a, p) : "fetch" == s ? u(a, p, Promise.resolve(e.moduleAddress)) : (p.address = e.moduleAddress, d(a, p, Promise.resolve(e.moduleSource)));
                };
              }
              function f(e, t) {
                var n = {
                  loader: e,
                  loads: [],
                  startingLoad: t,
                  loadingCount: 0
                };
                return n.done = new Promise(function(e, t) {
                  n.resolve = e, n.reject = t;
                }), m(n, t), n;
              }
              function m(e, t) {
                if ("failed" != t.status) {
                  for (var n = 0,
                      a = e.loads.length; a > n; n++)
                    if (e.loads[n] == t)
                      return;
                  e.loads.push(t), t.linkSets.push(e), "loaded" != t.status && e.loadingCount++;
                  for (var r = e.loader,
                      n = 0,
                      a = t.dependencies.length; a > n; n++)
                    if (t.dependencies[n]) {
                      var o = t.dependencies[n].value;
                      if (!r.modules[o])
                        for (var s = 0,
                            i = r.loads.length; i > s; s++)
                          if (r.loads[s].name == o) {
                            m(e, r.loads[s]);
                            break;
                          }
                    }
                }
              }
              function p(e) {
                var t = !1;
                try {
                  x(e, function(n, a) {
                    g(e, n, a), t = !0;
                  });
                } catch (n) {
                  g(e, null, n), t = !0;
                }
                return t;
              }
              function h(e, t) {
                if (e.loadingCount--, !(e.loadingCount > 0)) {
                  var n = e.startingLoad;
                  if (e.loader.loaderObj.execute === !1) {
                    for (var a = [].concat(e.loads),
                        r = 0,
                        o = a.length; o > r; r++) {
                      var t = a[r];
                      t.module = t.isDeclarative ? {
                        name: t.name,
                        module: M({}),
                        evaluated: !0
                      } : {module: M({})}, t.status = "linked", v(e.loader, t);
                    }
                    return e.resolve(n);
                  }
                  var s = p(e);
                  s || e.resolve(n);
                }
              }
              function g(e, n, a) {
                var r = e.loader;
                e: if (n)
                  if (e.loads[0].name == n.name)
                    a = t(a, "Error loading " + n.name);
                  else {
                    for (var o = 0; o < e.loads.length; o++)
                      for (var s = e.loads[o],
                          i = 0; i < s.dependencies.length; i++) {
                        var l = s.dependencies[i];
                        if (l.value == n.name) {
                          a = t(a, "Error loading " + n.name + ' as "' + l.key + '" from ' + s.name);
                          break e;
                        }
                      }
                    a = t(a, "Error loading " + n.name + " from " + e.loads[0].name);
                  }
                else
                  a = t(a, "Error linking " + e.loads[0].name);
                for (var u = e.loads.concat([]),
                    o = 0,
                    d = u.length; d > o; o++) {
                  var n = u[o];
                  r.loaderObj.failed = r.loaderObj.failed || [], -1 == S.call(r.loaderObj.failed, n) && r.loaderObj.failed.push(n);
                  var c = S.call(n.linkSets, e);
                  if (n.linkSets.splice(c, 1), 0 == n.linkSets.length) {
                    var f = S.call(e.loader.loads, n);
                    -1 != f && e.loader.loads.splice(f, 1);
                  }
                }
                e.reject(a);
              }
              function v(e, t) {
                if (e.loaderObj.trace) {
                  e.loaderObj.loads || (e.loaderObj.loads = {});
                  var n = {};
                  t.dependencies.forEach(function(e) {
                    n[e.key] = e.value;
                  }), e.loaderObj.loads[t.name] = {
                    name: t.name,
                    deps: t.dependencies.map(function(e) {
                      return e.key;
                    }),
                    depMap: n,
                    address: t.address,
                    metadata: t.metadata,
                    source: t.source,
                    kind: t.isDeclarative ? "declarative" : "dynamic"
                  };
                }
                t.name && (e.modules[t.name] = t.module);
                var a = S.call(e.loads, t);
                -1 != a && e.loads.splice(a, 1);
                for (var r = 0,
                    o = t.linkSets.length; o > r; r++)
                  a = S.call(t.linkSets[r].loads, t), -1 != a && t.linkSets[r].loads.splice(a, 1);
                t.linkSets.splice(0, t.linkSets.length);
              }
              function b(e, t, n) {
                try {
                  var r = t.execute();
                } catch (o) {
                  return void n(t, o);
                }
                return r && r instanceof a ? r : void n(t, new TypeError("Execution must define a Module instance"));
              }
              function y(e, t, n) {
                var a = e._loader.importPromises;
                return a[t] = n.then(function(e) {
                  return a[t] = void 0, e;
                }, function(e) {
                  throw a[t] = void 0, e;
                });
              }
              function x(e, t) {
                var n = e.loader;
                if (e.loads.length)
                  for (var a = e.loads.concat([]),
                      r = 0; r < a.length; r++) {
                    var o = a[r],
                        s = b(e, o, t);
                    if (!s)
                      return;
                    o.module = {
                      name: o.name,
                      module: s
                    }, o.status = "linked", v(n, o);
                  }
              }
              function E(e, t) {
                return t.module.module;
              }
              function _() {}
              function k() {
                throw new TypeError("ES6 transpilation is only provided in the dev module loader build.");
              }
              var j = 0;
              r.prototype = {
                constructor: r,
                define: function(e, t, n) {
                  if (this._loader.importPromises[e])
                    throw new TypeError("Module is already loading.");
                  return y(this, e, new Promise(c({
                    step: "translate",
                    loader: this._loader,
                    moduleName: e,
                    moduleMetadata: n && n.metadata || {},
                    moduleSource: t,
                    moduleAddress: n && n.address
                  })));
                },
                "delete": function(e) {
                  var t = this._loader;
                  return delete t.importPromises[e], delete t.moduleRecords[e], t.modules[e] ? delete t.modules[e] : !1;
                },
                get: function(e) {
                  return this._loader.modules[e] ? (_(this._loader.modules[e], [], this), this._loader.modules[e].module) : void 0;
                },
                has: function(e) {
                  return !!this._loader.modules[e];
                },
                "import": function(e, t, n) {
                  "object" == (typeof t === 'undefined' ? 'undefined' : $traceurRuntime.typeof(t)) && (t = t.name);
                  var a = this;
                  return Promise.resolve(a.normalize(e, t)).then(function(e) {
                    var t = a._loader;
                    return t.modules[e] ? (_(t.modules[e], [], t._loader), t.modules[e].module) : t.importPromises[e] || y(a, e, s(t, e, {}).then(function(n) {
                      return delete t.importPromises[e], E(t, n);
                    }));
                  });
                },
                load: function(e, t) {
                  var n = this._loader;
                  return n.modules[e] ? (_(n.modules[e], [], n), Promise.resolve(n.modules[e].module)) : n.importPromises[e] || y(this, e, s(n, e, {}).then(function(t) {
                    return delete n.importPromises[e], E(n, t);
                  }));
                },
                module: function(e, t) {
                  var n = o();
                  n.address = t && t.address;
                  var a = f(this._loader, n),
                      r = Promise.resolve(e),
                      s = this._loader,
                      i = a.done.then(function() {
                        return E(s, n);
                      });
                  return d(s, n, r), i;
                },
                newModule: function(e) {
                  if ("object" != (typeof e === 'undefined' ? 'undefined' : $traceurRuntime.typeof(e)))
                    throw new TypeError("Expected object");
                  var t,
                      n = new a;
                  if (Object.getOwnPropertyNames && null != e)
                    t = Object.getOwnPropertyNames(e);
                  else {
                    t = [];
                    for (var r in e)
                      t.push(r);
                  }
                  for (var o = 0; o < t.length; o++)
                    (function(t) {
                      w(n, t, {
                        configurable: !1,
                        enumerable: !0,
                        get: function() {
                          return e[t];
                        }
                      });
                    })(t[o]);
                  return Object.preventExtensions && Object.preventExtensions(n), n;
                },
                set: function(e, t) {
                  if (!(t instanceof a))
                    throw new TypeError("Loader.set(" + e + ", module) must be a module");
                  this._loader.modules[e] = {module: t};
                },
                normalize: function(e, t, n) {
                  return e;
                },
                locate: function(e) {
                  return e.name;
                },
                fetch: function(e) {},
                translate: function(e) {
                  return e.source;
                },
                instantiate: function(e) {}
              };
              var M = r.prototype.newModule;
            }();
            var j;
            i.prototype = r.prototype, o.prototype = new i;
            var M;
            if ("undefined" != typeof XMLHttpRequest)
              M = function(e, t, n) {
                function a() {
                  t(o.responseText);
                }
                function r() {
                  n(new Error("XHR error" + (o.status ? " (" + o.status + (o.statusText ? " " + o.statusText : "") + ")" : "") + " loading " + e));
                }
                var o = new XMLHttpRequest,
                    s = !0,
                    i = !1;
                if (!("withCredentials" in o)) {
                  var l = /^(\w+:)?\/\/([^\/]+)/.exec(e);
                  l && (s = l[2] === window.location.host, l[1] && (s &= l[1] === window.location.protocol));
                }
                s || "undefined" == typeof XDomainRequest || (o = new XDomainRequest, o.onload = a, o.onerror = r, o.ontimeout = r, o.onprogress = function() {}, o.timeout = 0, i = !0), o.onreadystatechange = function() {
                  4 === o.readyState && (200 === o.status || 0 == o.status && o.responseText ? a() : r());
                }, o.open("GET", e, !0), o.setRequestHeader && o.setRequestHeader("Accept", "application/x-es-module */*"), i && setTimeout(function() {
                  o.send();
                }, 0), o.send(null);
              };
            else {
              if ("undefined" == typeof require)
                throw new TypeError("No environment fetch API available.");
              var R;
              M = function(e, t, n) {
                if ("file:///" != e.substr(0, 8))
                  throw new Error('Unable to fetch "' + e + '". Only file URLs of the form file:/// allowed running in Node.');
                return R = R || require("fs"), e = x ? e.replace(/\//g, "\\").substr(8) : e.substr(7), R.readFile(e, function(e, a) {
                  if (e)
                    return n(e);
                  var r = a + "";
                  "\ufeff" === r[0] && (r = r.substr(1)), t(r);
                });
              };
            }
            o.prototype.fetch = function(e) {
              return new Promise(function(t, n) {
                M(e.address, t, n);
              });
            };
            var D,
                P = function() {
                  function t(t) {
                    var a = this;
                    return Promise.resolve(e["typescript" == a.transpiler ? "ts" : a.transpiler] || (a.pluginLoader || a)["import"](a.transpiler)).then(function(e) {
                      e.__useDefault && (e = e["default"]);
                      var r;
                      return r = e.Compiler ? n : e.createLanguageService ? s : o, "(function(__moduleName){" + r.call(a, t, e) + '\n})("' + t.name + '");\n//# sourceURL=' + t.address + "!transpiled";
                    });
                  }
                  function n(e, t) {
                    var n = this.traceurOptions || {};
                    n.modules = "instantiate", n.script = !1, void 0 === n.sourceMaps && (n.sourceMaps = "inline"), n.filename = e.address, n.inputSourceMap = e.metadata.sourceMap, n.moduleName = !1;
                    var r = new t.Compiler(n);
                    return a(e.source, r, n.filename);
                  }
                  function a(e, t, n) {
                    try {
                      return t.compile(e, n);
                    } catch (a) {
                      throw a[0];
                    }
                  }
                  function o(e, t) {
                    var n = this.babelOptions || {};
                    return n.modules = "system", void 0 === n.sourceMap && (n.sourceMap = "inline"), n.inputSourceMap = e.metadata.sourceMap, n.filename = e.address, n.code = !0, n.ast = !1, t.transform(e.source, n).code;
                  }
                  function s(e, t) {
                    var n = this.typescriptOptions || {};
                    return n.target = n.target || t.ScriptTarget.ES5, void 0 === n.sourceMap && (n.sourceMap = !0), n.sourceMap && (n.inlineSourceMap = !0), n.module = t.ModuleKind.System, t.transpile(e.source, n, e.address);
                  }
                  return r.prototype.transpiler = "traceur", t;
                }();
            !function() {
              function n(t) {
                o = e.System, e.System = t;
              }
              function a() {
                e.System = o;
              }
              function r(e) {
                var t = e.source.lastIndexOf("\n");
                return e.source + ("\n//# sourceURL=" != e.source.substr(t, 15) ? "\n//# sourceURL=" + e.address + (e.metadata.sourceMap ? "!transpiled" : "") : "") + (e.metadata.sourceMap && s && "\n//# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(e.metadata.sourceMap))) || "");
              }
              var o,
                  s = "undefined" != typeof btoa;
              if (b || y && window.chrome && window.chrome.extension)
                D = function(o) {
                  if (o.metadata.integrity)
                    throw new Error("Subresource integrity checking is not supported in Web Workers or Chrome Extensions.");
                  try {
                    n(this), new Function(r(o)).call(e), a();
                  } catch (s) {
                    throw t(s, "Evaluating " + o.address);
                  }
                };
              else if ("undefined" != typeof document) {
                var i,
                    l = document.getElementsByTagName("script");
                $__curScript = l[l.length - 1], D = function(e) {
                  i || (i = document.head || document.body || document.documentElement);
                  var o = document.createElement("script");
                  o.text = r(e);
                  var s,
                      l = window.onerror;
                  if (window.onerror = function(n) {
                    s = t(n, "Evaluating " + e.address);
                  }, n(this), e.metadata.integrity && o.setAttribute("integrity", e.metadata.integrity), e.metadata.nonce && o.setAttribute("nonce", e.metadata.nonce), i.appendChild(o), i.removeChild(o), a(), window.onerror = l, s)
                    throw s;
                };
              } else {
                var u = "vm",
                    d = require(u);
                D = function(e) {
                  if (e.metadata.integrity)
                    throw new Error("Subresource integrity checking is unavailable in Node.");
                  try {
                    n(this), d.runInThisContext(r(e)), a();
                  } catch (o) {
                    throw t(o.toString(), "Evaluating " + e.address);
                  }
                };
              }
            }(), u.prototype = o.prototype, l.prototype = new u;
            var O,
                L = !0;
            try {
              Object.getOwnPropertyDescriptor({a: 0}, "a");
            } catch (T) {
              L = !1;
            }
            var z = /^[^\/]+:\/\//,
                F = {},
                I = new k(E);
            !function() {
              c(function(e) {
                return function() {
                  e.call(this), this.baseURL = E.substr(0, E.lastIndexOf("/") + 1), this.set("@empty", this.newModule({}));
                };
              }), d("normalize", function() {
                return function(e, t) {
                  return "." == e[0] || "/" == e[0] ? new k(e, t || I).href : e;
                };
              }), d("import", function(e) {
                return function(t, n, a) {
                  return e.call(this, t, n, a).then(function(e) {
                    return e.__useDefault ? e["default"] : e;
                  });
                };
              });
              var e = ["main", "format", "defaultExtension", "meta", "map", "basePath"];
              l.prototype.config = function(t) {
                function n(e) {
                  for (var t in e)
                    return !0;
                }
                if (t.baseURL) {
                  if (n(this.packages) || n(this.meta) || n(this.depCache) || n(this.bundles))
                    throw new TypeError("baseURL should only be configured once and must be configured first.");
                  this.baseURL = t.baseURL, v.call(this);
                }
                if (t.defaultJSExtensions && (this.defaultJSExtensions = t.defaultJSExtensions), t.pluginFirst && (this.pluginFirst = t.pluginFirst), t.paths)
                  for (var a in t.paths)
                    this.paths[a] = t.paths[a];
                if (t.map)
                  for (var a in t.map) {
                    var r = t.map[a];
                    if ("string" != typeof r) {
                      var o = this.normalizeSync(a);
                      this.defaultJSExtensions && ".js" != a.substr(a.length - 3, 3) && (o = o.substr(0, o.length - 3));
                      var s = "";
                      for (var i in this.packages)
                        o.substr(0, i.length) == i && (!o[i.length] || "/" == o[i.length]) && s.split("/").length < i.split("/").length && (s = i);
                      s && this.packages[s].main && (o = o.substr(0, o.length - this.packages[s].main.length - 1));
                      var i = this.packages[o] = this.packages[o] || {};
                      i.map = r;
                    } else
                      this.map[a] = r;
                  }
                if (t.packagePaths)
                  for (var l = 0; l < t.packagePaths.length; l++) {
                    var u = t.packagePaths[l],
                        o = this.normalizeSync(u);
                    this.defaultJSExtensions && ".js" != u.substr(u.length - 3, 3) && (o = o.substr(0, o.length - 3)), t.packagePaths[l] = o;
                  }
                if (t.packages)
                  for (var a in t.packages) {
                    if (a.match(/^([^\/]+:)?\/\/$/))
                      throw new TypeError('"' + a + '" is not a valid package name.');
                    var d = this.normalizeSync(a + ("/" != a[a.length - 1] ? "/" : ""));
                    d = d.substr(0, d.length - 1), this.defaultJSExtensions && ".js" != a.substr(a.length - 3, 3) && (d = d.substr(0, d.length - 3)), this.packages[d] = this.packages[d] || {};
                    for (var c in t.packages[a])
                      -1 == S.call(e, c) && "undefined" != typeof console && console.warn;
                    h(this.packages[d], t.packages[a]);
                  }
                if (t.bundles)
                  for (var a in t.bundles) {
                    for (var f = [],
                        l = 0; l < t.bundles[a].length; l++)
                      f.push(this.normalizeSync(t.bundles[a][l]));
                    this.bundles[a] = f;
                  }
                for (var m in t) {
                  var r = t[m],
                      p = !1;
                  if ("baseURL" != m && "map" != m && "packages" != m && "bundles" != m && "paths" != m)
                    if ("object" != (typeof r === 'undefined' ? 'undefined' : $traceurRuntime.typeof(r)) || r instanceof Array)
                      this[m] = r;
                    else {
                      this[m] = this[m] || {}, ("meta" == m || "depCache" == m) && (p = !0);
                      for (var a in r)
                        "meta" == m && "*" == a[0] ? this[m][a] = r[a] : p ? this[m][this.normalizeSync(a)] = r[a] : this[m][a] = r[a];
                    }
                }
              };
            }(), function() {
              function t(e, t) {
                return new Promise(function(n, a) {
                  t.metadata.integrity && a(new Error("Subresource integrity checking is not supported in web workers."));
                  try {
                    importScripts(t.address);
                  } catch (r) {
                    a(r);
                  }
                  e.onScriptLoad(t), t.metadata.registered || a(t.address + " did not call System.register or AMD define"), n("");
                });
              }
              if ("undefined" != typeof document)
                var n = document.getElementsByTagName("head")[0];
              var a;
              l.prototype.onScriptLoad = function() {
                e.System = a;
              }, d("fetch", function(r) {
                return function(o) {
                  var s = this;
                  return o.metadata.scriptLoad && (y || b) ? b ? t(s, o) : new Promise(function(t, r) {
                    function i(e) {
                      d.readyState && "loaded" != d.readyState && "complete" != d.readyState || (u(), s.onScriptLoad(o), o.metadata.registered || r(o.address + " did not call System.register or AMD define"), t(""));
                    }
                    function l(e) {
                      u(), r(new Error("Unable to load script " + o.address));
                    }
                    function u() {
                      d.detachEvent ? d.detachEvent("onreadystatechange", i) : (d.removeEventListener("load", i, !1), d.removeEventListener("error", l, !1)), n.removeChild(d);
                    }
                    var d = document.createElement("script");
                    d.async = !0, d.attachEvent ? d.attachEvent("onreadystatechange", i) : (d.addEventListener("load", i, !1), d.addEventListener("error", l, !1)), a = e.System, e.System = s, d.src = o.address, o.metadata.integrity && d.setAttribute("integrity", o.metadata.integrity), n.appendChild(d);
                  }) : r.call(this, o);
                };
              });
            }(), function() {
              function t(e, t, n) {
                if (g = !0, t)
                  t = (e.normalizeSync || e.normalize).call(e, t), n.name = t, t in e.defined || (e.defined[t] = n);
                else {
                  if (h)
                    throw new TypeError("Invalid anonymous System.register module load. If loading a single module, ensure anonymous System.register is loaded via System.import. If loading a bundle, ensure all the System.register calls are named.");
                  h = n;
                }
              }
              function n(e, t, a) {
                if (a[e.groupIndex] = a[e.groupIndex] || [], -1 == S.call(a[e.groupIndex], e)) {
                  a[e.groupIndex].push(e);
                  for (var r = 0,
                      o = e.normalizedDeps.length; o > r; r++) {
                    var s = e.normalizedDeps[r],
                        i = t.defined[s];
                    if (i && !i.evaluated) {
                      var l = e.groupIndex + (i.declarative != e.declarative);
                      if (void 0 === i.groupIndex || i.groupIndex < l) {
                        if (void 0 !== i.groupIndex && (a[i.groupIndex].splice(S.call(a[i.groupIndex], i), 1), 0 == a[i.groupIndex].length))
                          throw new TypeError("Mixed dependency cycle detected");
                        i.groupIndex = l;
                      }
                      n(i, t, a);
                    }
                  }
                }
              }
              function a(e, t) {
                var a = t.defined[e];
                if (!a.module) {
                  a.groupIndex = 0;
                  var r = [];
                  n(a, t, r);
                  for (var o = !!a.declarative == r.length % 2,
                      i = r.length - 1; i >= 0; i--) {
                    for (var l = r[i],
                        d = 0; d < l.length; d++) {
                      var c = l[d];
                      o ? s(c, t) : u(c, t);
                    }
                    o = !o;
                  }
                }
              }
              function r() {}
              function o(e, t) {
                return t[e] || (t[e] = {
                  name: e,
                  dependencies: [],
                  exports: new r,
                  importers: []
                });
              }
              function s(t, n) {
                if (!t.module) {
                  var a = n._loader.moduleRecords,
                      r = t.module = o(t.name, a),
                      i = t.module.exports,
                      l = t.declare.call(e, function(e, t) {
                        if (r.locked = !0, "object" == (typeof e === 'undefined' ? 'undefined' : $traceurRuntime.typeof(e)))
                          for (var n in e)
                            i[n] = e[n];
                        else
                          i[e] = t;
                        for (var a = 0,
                            o = r.importers.length; o > a; a++) {
                          var s = r.importers[a];
                          if (!s.locked) {
                            var l = S.call(s.dependencies, r);
                            s.setters[l](i);
                          }
                        }
                        return r.locked = !1, t;
                      });
                  if (r.setters = l.setters, r.execute = l.execute, !r.setters || !r.execute)
                    throw new TypeError("Invalid System.register form for " + t.name);
                  for (var u = 0,
                      d = t.normalizedDeps.length; d > u; u++) {
                    var c = void 0,
                        f = t.normalizedDeps[u],
                        m = n.defined[f],
                        p = a[f];
                    p ? c = p.exports : m && !m.declarative ? c = m.esModule : m ? (s(m, n), p = m.module, c = p.exports) : c = n.get(f), p && p.importers ? (p.importers.push(r), r.dependencies.push(p)) : r.dependencies.push(null);
                    for (var h = t.originalIndices[u],
                        g = 0,
                        v = h.length; v > g; ++g) {
                      var b = h[g];
                      r.setters[b] && r.setters[b](c);
                    }
                  }
                }
              }
              function i(e, t) {
                var n,
                    a = t.defined[e];
                if (a)
                  a.declarative ? p(e, [], t) : a.evaluated || u(a, t), n = a.module.exports;
                else if (n = t.get(e), !n)
                  throw new Error("Unable to load dependency " + e + ".");
                return (!a || a.declarative) && n && n.__useDefault ? n["default"] : n;
              }
              function u(t, n) {
                if (!t.module) {
                  var a = {},
                      r = t.module = {
                        exports: a,
                        id: t.name
                      };
                  if (!t.executingRequire)
                    for (var o = 0,
                        s = t.normalizedDeps.length; s > o; o++) {
                      var l = t.normalizedDeps[o],
                          d = n.defined[l];
                      d && u(d, n);
                    }
                  t.evaluated = !0;
                  var c = t.execute.call(e, function(e) {
                    for (var a = 0,
                        r = t.deps.length; r > a; a++)
                      if (t.deps[a] == e)
                        return i(t.normalizedDeps[a], n);
                    throw new TypeError("Module " + e + " not declared as a dependency.");
                  }, a, r);
                  c && (r.exports = c), a = r.exports, a && a.__esModule ? t.esModule = a : t.esmExports ? t.esModule = m(a) : t.esModule = {"default": a};
                }
              }
              function p(t, n, a) {
                var r = a.defined[t];
                if (r && !r.evaluated && r.declarative) {
                  n.push(t);
                  for (var o = 0,
                      s = r.normalizedDeps.length; s > o; o++) {
                    var i = r.normalizedDeps[o];
                    -1 == S.call(n, i) && (a.defined[i] ? p(i, n, a) : a.get(i));
                  }
                  r.evaluated || (r.evaluated = !0, r.module.execute.call(e));
                }
              }
              var h,
                  g = !1;
              l.prototype.register = function(e, n, a) {
                return "string" != typeof e && (a = n, n = e, e = null), "boolean" == typeof a ? this.registerDynamic.apply(this, arguments) : void t(this, e, {
                  declarative: !0,
                  deps: n,
                  declare: a
                });
              }, l.prototype.registerDynamic = function(e, n, a, r) {
                "string" != typeof e && (r = a, a = n, n = e, e = null), t(this, e, {
                  declarative: !1,
                  deps: n,
                  execute: r,
                  executingRequire: a
                });
              }, c(function(e) {
                return function() {
                  e.call(this), this.defined = {}, this._loader.moduleRecords = {};
                };
              }), d("onScriptLoad", function(e) {
                return function(t) {
                  e.call(this, t), g && (h && (t.metadata.entry = h), t.metadata.format = t.metadata.format || "defined", t.metadata.registered = !0, g = !1, h = null);
                };
              }), w(r, "toString", {value: function() {
                  return "Module";
                }}), d("delete", function(e) {
                return function(t) {
                  return delete this._loader.moduleRecords[t], delete this.defined[t], e.call(this, t);
                };
              });
              var v = /^\s*(\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*System\.register(Dynamic)?\s*\(/;
              d("fetch", function(e) {
                return function(t) {
                  return this.defined[t.name] ? (t.metadata.format = "defined", "") : (h = null, g = !1, "register" == t.metadata.format && (t.metadata.scriptLoad = !0), t.metadata.deps = t.metadata.deps || [], e.call(this, t));
                };
              }), d("translate", function(e) {
                return function(t) {
                  return Promise.resolve(e.call(this, t)).then(function(e) {
                    return "string" == typeof t.metadata.deps && (t.metadata.deps = t.metadata.deps.split(",")), t.metadata.deps = t.metadata.deps || [], ("register" == t.metadata.format || t.metadata.bundle || !t.metadata.format && t.source.match(v)) && (t.metadata.format = "register"), e;
                  });
                };
              }), d("instantiate", function(e) {
                return function(e) {
                  var t,
                      n = this;
                  if (n.defined[e.name])
                    t = n.defined[e.name], t.deps = t.deps.concat(e.metadata.deps);
                  else if (e.metadata.entry)
                    t = e.metadata.entry;
                  else if (e.metadata.execute)
                    t = {
                      declarative: !1,
                      deps: e.metadata.deps || [],
                      execute: e.metadata.execute,
                      executingRequire: e.metadata.executingRequire
                    };
                  else if ("register" == e.metadata.format || "esm" == e.metadata.format || "es6" == e.metadata.format) {
                    if (h = null, g = !1, "undefined" != typeof D && D.call(n, e), !g && !e.metadata.registered)
                      throw new TypeError(e.name + " detected as System.register but didn't execute.");
                    h ? t = h : e.metadata.bundle = !0, !t && n.defined[e.name] && (t = n.defined[e.name]), h = null, g = !1;
                  }
                  t || (t = {
                    declarative: !1,
                    deps: e.metadata.deps,
                    execute: function() {
                      return n.newModule({});
                    }
                  }), n.defined[e.name] = t;
                  var r = f(t.deps);
                  t.deps = r.names, t.originalIndices = r.indices, t.name = e.name, t.esmExports = e.metadata.esmExports !== !1;
                  for (var o = [],
                      s = 0,
                      i = t.deps.length; i > s; s++)
                    o.push(Promise.resolve(n.normalize(t.deps[s], e.name)));
                  return Promise.all(o).then(function(r) {
                    return t.normalizedDeps = r, {
                      deps: t.deps,
                      execute: function() {
                        return a(e.name, n), p(e.name, [], n), n.defined[e.name] = void 0, n.newModule(t.declarative ? t.module.exports : t.esModule);
                      }
                    };
                  });
                };
              });
            }(), function() {
              var t = /(^\s*|[}\);\n]\s*)(import\s+(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s+from\s+['"]|\{)|export\s+\*\s+from\s+["']|export\s+(\{|default|function|class|var|const|let|async\s+function))/,
                  n = /\$traceurRuntime\s*\./,
                  a = /babelHelpers\s*\./;
              d("translate", function(r) {
                return function(o) {
                  var s = this;
                  return r.call(s, o).then(function(r) {
                    if ("esm" == o.metadata.format || "es6" == o.metadata.format || !o.metadata.format && r.match(t))
                      return o.metadata.format = "esm", s._loadedTranspiler = s._loadedTranspiler || !1, s.pluginLoader && (s.pluginLoader._loadedTranspiler = s._loadedTranspiler || !1), s.builder && (o.metadata.originalSource = o.source), P.call(s, o).then(function(e) {
                        return o.metadata.sourceMap = void 0, e;
                      });
                    if (s._loadedTranspiler === !1 && o.name == s.normalizeSync(s.transpiler) && (r.length > 100 && (o.metadata.format = o.metadata.format || "global", "traceur" === s.transpiler && (o.metadata.exports = "traceur"), "typescript" === s.transpiler && (o.metadata.exports = "ts")), s._loadedTranspiler = !0), s._loadedTranspilerRuntime === !1 && (o.name == s.normalizeSync("traceur-runtime") || o.name == s.normalizeSync("babel/external-helpers*")) && (r.length > 100 && (o.metadata.format = o.metadata.format || "global"), s._loadedTranspilerRuntime = !0), "register" == o.metadata.format && s._loadedTranspilerRuntime !== !0) {
                      if (!e.$traceurRuntime && o.source.match(n))
                        return s._loadedTranspilerRuntime = s._loadedTranspilerRuntime || !1, s["import"]("traceur-runtime").then(function() {
                          return r;
                        });
                      if (!e.babelHelpers && o.source.match(a))
                        return s._loadedTranspilerRuntime = s._loadedTranspilerRuntime || !1, s["import"]("babel/external-helpers").then(function() {
                          return r;
                        });
                    }
                    return r;
                  });
                };
              });
            }();
            var A = "undefined" != typeof self ? "self" : "global";
            d("onScriptLoad", function(t) {
              return function(n) {
                if ("global" == n.metadata.format) {
                  n.metadata.registered = !0;
                  var a = g(n.metadata.exports, e);
                  n.metadata.execute = function() {
                    return a;
                  };
                }
                return t.call(this, n);
              };
            }), d("fetch", function(e) {
              return function(t) {
                return t.metadata.exports && (t.metadata.format = "global"), "global" != t.metadata.format || !t.metadata.exports || t.metadata.globals || t.metadata.deps && 0 != t.metadata.deps.length || (t.metadata.scriptLoad = !0), e.call(this, t);
              };
            }), d("instantiate", function(e) {
              return function(t) {
                var n = this;
                if (t.metadata.format || (t.metadata.format = "global"), t.metadata.globals && t.metadata.globals instanceof Array) {
                  for (var a = {},
                      r = 0; r < t.metadata.globals.length; r++)
                    a[t.metadata.globals[r]] = t.metadata.globals[r];
                  t.metadata.globals = a;
                }
                if ("global" == t.metadata.format && !t.metadata.registered) {
                  for (var o in t.metadata.globals)
                    t.metadata.deps.push(t.metadata.globals[o]);
                  t.metadata.execute = function(e, a, r) {
                    var o;
                    if (t.metadata.globals) {
                      o = {};
                      for (var s in t.metadata.globals)
                        o[s] = e(t.metadata.globals[s]);
                    }
                    var i = t.metadata.exports;
                    i && (t.source += "\n" + A + '["' + i + '"] = ' + i + ";");
                    var l = n.get("@@global-helpers").prepareGlobal(r.id, i, o);
                    return D.call(n, t), l();
                  };
                }
                return e.call(this, t);
              };
            }), c(function(t) {
              return function() {
                function n(t) {
                  if (Object.keys)
                    Object.keys(e).forEach(t);
                  else
                    for (var n in e)
                      s.call(e, n) && t(n);
                }
                function a(t) {
                  n(function(n) {
                    if (-1 == S.call(i, n)) {
                      try {
                        var a = e[n];
                      } catch (r) {
                        i.push(n);
                      }
                      t(n, a);
                    }
                  });
                }
                var r = this;
                t.call(r);
                var o,
                    s = Object.prototype.hasOwnProperty,
                    i = ["_g", "sessionStorage", "localStorage", "clipboardData", "frames", "external", "mozAnimationStartTime", "webkitStorageInfo", "webkitIndexedDB"];
                r.set("@@global-helpers", r.newModule({prepareGlobal: function(t, n, r) {
                    var s = e.define;
                    e.define = void 0, e.exports = void 0, e.module && e.module.exports && (e.module = void 0);
                    var i;
                    if (r) {
                      i = {};
                      for (var l in r)
                        i[l] = r[l], e[l] = r[l];
                    }
                    return n || (o = {}, a(function(e, t) {
                      o[e] = t;
                    })), function() {
                      var t;
                      if (n)
                        t = g(n, e);
                      else {
                        var r,
                            l,
                            u = {};
                        a(function(e, t) {
                          o[e] !== t && "undefined" != typeof t && (u[e] = t, "undefined" != typeof r ? l || r === t || (l = !0) : r = t);
                        }), t = l ? u : r;
                      }
                      if (i)
                        for (var d in i)
                          e[d] = i[d];
                      return e.define = s, t;
                    };
                  }}));
              };
            }), function() {
              function t(e) {
                a.lastIndex = r.lastIndex = 0;
                var t,
                    n = [],
                    o = [];
                if (e.length / e.split("\n").length < 200)
                  for (; t = r.exec(e); )
                    o.push([t.index, t.index + t[0].length]);
                for (; t = a.exec(e); ) {
                  for (var s = !1,
                      i = 0; i < o.length; i++)
                    o[i][0] < t.index && o[i][1] > t.index + t[0].length && (s = !0);
                  s || n.push(t[1].substr(1, t[1].length - 2));
                }
                return n;
              }
              var n = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.]|module\.)exports\s*(\[['"]|\.)|(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])module\.exports\s*[=,]/,
                  a = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,
                  r = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm;
              if ("undefined" != typeof window && "undefined" != typeof document && window.location)
                var o = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
              c(function(e) {
                return function() {
                  e.call(this), "undefined" != typeof require && require.resolve && "undefined" != typeof process && (this._nodeRequire = require);
                };
              }), d("normalize", function(e) {
                return function(t, n) {
                  if ("@node/" == t.substr(0, 6)) {
                    if (!this._nodeRequire)
                      throw new TypeError("Can only load node core modules in Node.");
                    this.set(t, this.newModule(m(this._nodeRequire(t.substr(6)))));
                  }
                  return e.call(this, t, n);
                };
              }), d("instantiate", function(r) {
                return function(s) {
                  var i = this;
                  if (s.metadata.format || (n.lastIndex = 0, a.lastIndex = 0, (a.exec(s.source) || n.exec(s.source)) && (s.metadata.format = "cjs")), "cjs" == s.metadata.format) {
                    var l = s.metadata.deps || [];
                    s.metadata.deps = l.concat(t(s.source));
                    for (var u in s.metadata.globals)
                      s.metadata.deps.push(s.metadata.globals[u]);
                    s.metadata.executingRequire = !0, s.metadata.execute = function(t, n, a) {
                      for (var r = 0; r < l.length; r++)
                        t(l[r]);
                      var u = s.address || "",
                          d = u.split("/");
                      d.pop(), d = d.join("/"), o && u.substr(0, o.length) === o ? (u = u.substr(o.length), d = d.substr(o.length)) : "file:///" == u.substr(0, 8) && (u = u.substr(7), d = d.substr(7), x && (u = u.substr(1), d = d.substr(1)));
                      var c = e.define;
                      e.define = void 0, e.__cjsWrapper = {
                        exports: n,
                        args: [t, n, a, u, d, e, e]
                      };
                      var f = "";
                      if (s.metadata.globals)
                        for (var m in s.metadata.globals)
                          f += "var " + m + ' = require("' + s.metadata.globals[m] + '");';
                      s.source = "(function(require, exports, module, __filename, __dirname, global, GLOBAL) {" + f + s.source + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);", D.call(i, s), e.__cjsWrapper = void 0, e.define = c;
                    };
                  }
                  return r.call(i, s);
                };
              });
            }(), c(function(t) {
              return function() {
                function n(e, t) {
                  e = e.replace(i, "");
                  var n = e.match(d),
                      a = (n[1].split(",")[t] || "require").replace(c, ""),
                      r = f[a] || (f[a] = new RegExp(l + a + u, "g"));
                  r.lastIndex = 0;
                  for (var o = void 0,
                      s = []; o = r.exec(e); )
                    s.push(o[2] || o[3]);
                  return s;
                }
                function a(e, t, n, r) {
                  if ("object" == (typeof e === 'undefined' ? 'undefined' : $traceurRuntime.typeof(e)) && !(e instanceof Array))
                    return a.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));
                  if ("string" == typeof e && "function" == typeof t && (e = [e]), !(e instanceof Array)) {
                    if ("string" == typeof e) {
                      var o = s.get(s.normalizeSync(e, r));
                      if (!o)
                        throw new Error('Module not already loaded loading "' + e + '" from "' + r + '".');
                      return o.__useDefault ? o["default"] : o;
                    }
                    throw new TypeError("Invalid require");
                  }
                  for (var i = [],
                      l = 0; l < e.length; l++)
                    i.push(s["import"](e[l], r));
                  Promise.all(i).then(function(e) {
                    t && t.apply(null, e);
                  }, n);
                }
                function r(t, r, o) {
                  "string" != typeof t && (o = r, r = t, t = null), r instanceof Array || (o = r, r = ["require", "exports", "module"].splice(0, o.length)), "function" != typeof o && (o = function(e) {
                    return function() {
                      return e;
                    };
                  }(o)), void 0 === r[r.length - 1] && r.pop();
                  var i,
                      l,
                      u;
                  -1 != (i = S.call(r, "require")) && (r.splice(i, 1), t || (r = r.concat(n(o.toString(), i)))), -1 != (l = S.call(r, "exports")) && r.splice(l, 1), -1 != (u = S.call(r, "module")) && r.splice(u, 1);
                  var d = {
                    name: t,
                    deps: r,
                    execute: function(t, n, d) {
                      function c(e, n, r) {
                        return "string" == typeof e && "function" != typeof n ? t(e) : a.call(s, e, n, r, d.id);
                      }
                      for (var f = [],
                          m = 0; m < r.length; m++)
                        f.push(t(r[m]));
                      d.uri = d.id, d.config = function() {}, -1 != u && f.splice(u, 0, d), -1 != l && f.splice(l, 0, n), -1 != i && (c.toUrl = function(e) {
                        var t = s.defaultJSExtensions && ".js" != e.substr(e.length - 3, 3),
                            n = s.normalizeSync(e, d.id);
                        return t && ".js" == n.substr(n.length - 3, 3) && (n = n.substr(0, n.length - 3)), n;
                      }, f.splice(i, 0, c));
                      var p = e.require;
                      e.require = a;
                      var h = o.apply(-1 == l ? e : n, f);
                      return e.require = p, "undefined" == typeof h && d && (h = d.exports), "undefined" != typeof h ? h : void 0;
                    }
                  };
                  if (t)
                    m.anonDefine || m.isBundle ? (m.anonDefine && m.anonDefine.name && s.registerDynamic(m.anonDefine.name, m.anonDefine.deps, !1, m.anonDefine.execute), m.anonDefine = null) : m.anonDefine = d, m.isBundle = !0, s.registerDynamic(t, d.deps, !1, d.execute);
                  else {
                    if (m.anonDefine)
                      throw new TypeError("Multiple defines for anonymous module");
                    m.anonDefine = d;
                  }
                }
                function o(t) {
                  m.anonDefine = null, m.isBundle = !1;
                  var n = e.module,
                      a = e.exports,
                      o = e.define;
                  return e.module = void 0, e.exports = void 0, e.define = r, function() {
                    e.define = o, e.module = n, e.exports = a;
                  };
                }
                var s = this;
                t.call(this);
                var i = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
                    l = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",
                    u = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",
                    d = /\(([^\)]*)\)/,
                    c = /^\s+|\s+$/g,
                    f = {};
                r.amd = {};
                var m = {
                  isBundle: !1,
                  anonDefine: null
                };
                s.set("@@amd-helpers", s.newModule({
                  createDefine: o,
                  require: a,
                  define: r,
                  lastModule: m
                })), s.amdDefine = r, s.amdRequire = a;
              };
            }), function() {
              var e = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;
              d("onScriptLoad", function(e) {
                return function(t) {
                  e.call(this, t);
                  var n = this.get("@@amd-helpers").lastModule;
                  (n.anonDefine || n.isBundle) && (t.metadata.format = "defined", t.metadata.registered = !0, n.isBundle = !1), n.anonDefine && (t.metadata.deps = t.metadata.deps ? t.metadata.deps.concat(n.anonDefine.deps) : n.anonDefine.deps, t.metadata.execute = n.anonDefine.execute, n.anonDefine = null);
                };
              }), d("fetch", function(e) {
                return function(t) {
                  return "amd" === t.metadata.format && (t.metadata.scriptLoad = !0), t.metadata.scriptLoad && this.get("@@amd-helpers").createDefine(this), e.call(this, t);
                };
              }), d("instantiate", function(t) {
                return function(n) {
                  var a = this;
                  if ("amd" == n.metadata.format || !n.metadata.format && n.source.match(e)) {
                    if (n.metadata.format = "amd", a.builder || a.execute === !1)
                      n.metadata.execute = function() {
                        return n.metadata.builderExecute.apply(this, arguments);
                      };
                    else {
                      var r = this.get("@@amd-helpers").createDefine(a);
                      D.call(a, n), r(a);
                      var o = this.get("@@amd-helpers").lastModule;
                      if (!o.anonDefine && !o.isBundle)
                        throw new TypeError("AMD module " + n.name + " did not define");
                      o.anonDefine && (n.metadata.deps = n.metadata.deps ? n.metadata.deps.concat(o.anonDefine.deps) : o.anonDefine.deps, n.metadata.execute = o.anonDefine.execute), o.isBundle = !1, o.anonDefine = null;
                    }
                    return t.call(a, n);
                  }
                  return t.call(a, n);
                };
              });
            }(), c(function(e) {
              return function() {
                e.call(this), this.map = {};
              };
            }), d("normalize", function(e) {
              return function(t, n, a) {
                if ("." != t.substr(0, 1) && "/" != t.substr(0, 1) && !t.match(z)) {
                  var r,
                      o = 0;
                  for (var s in this.map)
                    if (t.substr(0, s.length) == s && (t.length == s.length || "/" == t[s.length])) {
                      var i = s.split("/").length;
                      if (o >= i)
                        continue;
                      r = s, o = i;
                    }
                  r && (t = this.map[r] + t.substr(r.length));
                }
                return e.call(this, t, n, a);
              };
            }), d("normalize", function(e) {
              return function(t, n) {
                var a = e.call(this, t, n);
                return this.has(a) ? a : (y && (a = a.replace(/#/g, "%23")), a.match(z) ? (this.defaultJSExtensions && ".js" != a.substr(a.length - 3, 3) && (a += ".js"), a) : (a = s(this.paths, a) || a, this.defaultJSExtensions && ".js" != a.substr(a.length - 3, 3) && (a += ".js"), "." == a[0] || "/" == a[0] ? new k(a, I).href : new k(a, v.call(this)).href));
              };
            }), function() {
              function e(e) {
                var t,
                    n,
                    a = 0;
                for (var r in this.packages)
                  e.substr(0, r.length) !== r || e.length !== r.length && "/" !== e[r.length] || (n = r.split("/").length, n > a && (t = r, a = n));
                return t;
              }
              function t(e, t) {
                var n,
                    a = 0;
                for (var r in e)
                  if (t.substr(0, r.length) == r && (t.length == r.length || "/" == t[r.length])) {
                    var o = r.split("/").length;
                    if (a >= o)
                      continue;
                    n = r, a = o;
                  }
                return n;
              }
              function n(e, n, a, r) {
                var o = t(a, r),
                    s = a[o];
                return s ? "object" == (typeof s === 'undefined' ? 'undefined' : $traceurRuntime.typeof(s)) ? e["import"](a["@env"] || "@system-env", n).then(function(e) {
                  for (var t in s) {
                    var n = "~" == t[0],
                        a = g(n ? t.substr(1) : t, e);
                    if (!n && a || n && !a)
                      return s[t] + r.substr(o.length);
                  }
                }) : s + r.substr(o.length) : void 0;
              }
              function a(e) {
                var t = e.basePath && "." != e.basePath ? e.basePath : "";
                return t && ("./" == t.substr(0, 2) && (t = t.substr(2)), "/" != t[t.length - 1] && (t += "/")), t;
              }
              function r(e, t, r, o) {
                var s = this,
                    i = s.packages[t],
                    l = a(i);
                if (t === e && i.main && (e += "/" + ("./" == i.main.substr(0, 2) ? i.main.substr(2) : i.main)), e.length == t.length + 1 && "/" == e[t.length])
                  return e + (o && ".js" != e.substr(e.length - 3, 3) ? ".js" : "");
                var u = "";
                if (i.meta && (i.meta[e.substr(t.length + 1)] || i.meta["./" + e.substr(t.length + 1)]) || ("defaultExtension" in i && t !== e && "/" != e[e.length - 1] ? i.defaultExtension !== !1 && -1 == e.split("/").pop().lastIndexOf(".") && (u = "." + i.defaultExtension) : o && (u = ".js")), e.length == t.length)
                  return e + u;
                if (r || !i.map)
                  return t + "/" + l + e.substr(t.length + 1) + u;
                var d = "." + e.substr(t.length);
                return Promise.resolve(n(s, t, i.map, d)).then(function(e) {
                  return e ? e : u ? n(s, t, i.map, d + u) : void 0;
                }).then(function(n) {
                  return n ? "." == n ? s.normalizeSync(t) : "./" == n.substr(0, 2) ? t + "/" + l + n.substr(2) : s.normalize.call(s, n) : t + "/" + l + e.substr(t.length + 1) + u;
                });
              }
              function o(n, a) {
                return function(o, l) {
                  if (l)
                    var u = e.call(this, l) || this.defaultJSExtensions && ".js" == l.substr(l.length - 3, 3) && e.call(this, l.substr(0, l.length - 3));
                  if (u && "." !== o[0]) {
                    var d = this.packages[u].map;
                    if (d) {
                      var c = t(d, o);
                      c && (o = d[c] + o.substr(c.length), "." === o[0] && (l = u + "/"));
                    }
                  }
                  var f = this.defaultJSExtensions && ".js" != o.substr(o.length - 3, 3),
                      m = n.call(this, o, l);
                  ".js" != m.substr(m.length - 3, 3) && (f = !1), f && (m = m.substr(0, m.length - 3));
                  var p = e.call(this, m),
                      g = this;
                  if (!a) {
                    for (var v = void 0,
                        b = 0; b < this.packagePaths.length; b++) {
                      var y = m.match(s[this.packagePaths[b]] || (s[this.packagePaths[b]] = new RegExp("^(" + this.packagePaths[b].replace(/\*/g, "[^\\/]+") + ")(/|$)")));
                      if (y) {
                        v = y[1];
                        break;
                      }
                    }
                    if (v && (!p || p != v || g.packages[p].loadConfig !== !1))
                      return (i[v] || (i[v] = g.fetch({
                        name: v + ".json",
                        address: v + ".json",
                        metadata: {}
                      }).then(function(e) {
                        try {
                          return JSON.parse(e);
                        } catch (t) {
                          throw new Error("Invalid JSON in package configuration file " + v);
                        }
                      }).then(function(e) {
                        p && p == v && h(e, g.packages[v]), g.packages[v] = e;
                      }))).then(function() {
                        return r.call(g, m, v, a, f);
                      });
                  }
                  return p ? r.call(g, m, p, a, f) : (f && (m += ".js"), m);
                };
              }
              c(function(e) {
                return function() {
                  e.call(this), this.packages = {}, this.packagePaths = {};
                };
              });
              var s = {},
                  i = {};
              l.prototype.normalizeSync = l.prototype.normalize, d("normalizeSync", function(e) {
                return o(e, !0);
              }), d("normalize", function(e) {
                return o(e, !1);
              }), d("locate", function(t) {
                return function(n) {
                  var r = this;
                  return Promise.resolve(t.call(this, n)).then(function(t) {
                    var o = e.call(r, n.name);
                    if (o) {
                      var s = r.packages[o],
                          i = a(s);
                      if (s.format && (n.metadata.format = n.metadata.format || s.format), s.loader && (n.metadata.loader = n.metadata.loader || s.loader), s.meta) {
                        var l,
                            u = {},
                            d = 0;
                        for (var c in s.meta) {
                          var f = "./" == c.substr(0, 2) ? "./" : "";
                          if (f && (c = c.substr(2)), l = c.indexOf("*"), -1 !== l && i + c.substr(0, l) === n.name.substr(o.length + 1, l + i.length) && c.substr(l + 1) === n.name.substr(n.name.length - c.length + l + 1)) {
                            var m = c.split("/").length;
                            m > d && (bestDetph = m), h(u, s.meta[f + c], d != m);
                          }
                        }
                        var p = n.name.substr(o.length + i.length + 1),
                            g = s.meta[p] || s.meta["./" + p];
                        g && n.name.substr(o.length + 1, i.length) == i && h(u, g), u.alias && "./" == u.alias.substr(0, 2) && (u.alias = o + u.alias.substr(1)), u.loader && "./" == u.loader.substr(0, 2) && (u.loader = o + u.loader.substr(1)), h(n.metadata, u);
                      }
                    }
                    return t;
                  });
                };
              });
            }(), function() {
              function e(e, t, n, a) {
                function r(e, t) {
                  return d && ".js" == e.substr(e.length - 3, 3) && (e = e.substr(0, e.length - 3)), o.pluginFirst ? t + "!" + e : e + "!" + t;
                }
                var o = this;
                if (n) {
                  var s;
                  o.pluginFirst ? -1 != (s = n.lastIndexOf("!")) && (n = n.substr(s + 1)) : -1 != (s = n.indexOf("!")) && (n = n.substr(0, s));
                }
                var i = t.lastIndexOf("!");
                if (-1 != i) {
                  var l,
                      u;
                  o.pluginFirst ? (l = t.substr(i + 1), u = t.substr(0, i)) : (l = t.substr(0, i), u = t.substr(i + 1) || l.substr(l.lastIndexOf(".") + 1));
                  var d = o.defaultJSExtensions && ".js" != l.substr(l.length - 3, 3);
                  return a ? (l = o.normalizeSync(l, n), u = o.normalizeSync(u, n), r(l, u)) : Promise.all([o.normalize(l, n), o.normalize(u, n)]).then(function(e) {
                    return r(e[0], e[1]);
                  });
                }
                return e.call(o, t, n);
              }
              d("normalize", function(t) {
                return function(n, a) {
                  return e.call(this, t, n, a, !1);
                };
              }), d("normalizeSync", function(t) {
                return function(n, a) {
                  return e.call(this, t, n, a, !0);
                };
              }), d("locate", function(e) {
                return function(t) {
                  var n,
                      a = this,
                      r = t.name;
                  return a.pluginFirst ? -1 != (n = r.indexOf("!")) && (t.metadata.loader = r.substr(0, n), t.name = r.substr(n + 1)) : -1 != (n = r.lastIndexOf("!")) && (t.metadata.loader = r.substr(n + 1), t.name = r.substr(0, n)), e.call(a, t).then(function(e) {
                    var n = t.metadata.loader;
                    if (!n)
                      return e;
                    if (a.defined && a.defined[r])
                      return e;
                    var o = a.pluginLoader || a;
                    return o["import"](n).then(function(n) {
                      return t.metadata.loaderModule = n, t.address = e, n.locate ? n.locate.call(a, t) : e;
                    });
                  });
                };
              }), d("fetch", function(e) {
                return function(t) {
                  var n = this;
                  return t.metadata.loaderModule && t.metadata.loaderModule.fetch ? (t.metadata.scriptLoad = !1, t.metadata.loaderModule.fetch.call(n, t, function(t) {
                    return e.call(n, t);
                  })) : e.call(n, t);
                };
              }), d("translate", function(e) {
                return function(t) {
                  var n = this;
                  return t.metadata.loaderModule && t.metadata.loaderModule.translate ? Promise.resolve(t.metadata.loaderModule.translate.call(n, t)).then(function(a) {
                    return "string" == typeof a && (t.source = a), e.call(n, t);
                  }) : e.call(n, t);
                };
              }), d("instantiate", function(e) {
                return function(t) {
                  var n = this,
                      a = t.metadata.sourceMap;
                  if (a && "object" == (typeof a === 'undefined' ? 'undefined' : $traceurRuntime.typeof(a))) {
                    var r = t.name.split("!")[0];
                    a.file = r + "!transpiled", a.sources && 1 != a.sources.length || (a.sources = [r]), t.metadata.sourceMap = JSON.stringify(a);
                  }
                  return t.metadata.loaderModule && t.metadata.loaderModule.instantiate ? Promise.resolve(t.metadata.loaderModule.instantiate.call(n, t)).then(function(a) {
                    return t.metadata.format = "defined", t.metadata.execute = function() {
                      return a;
                    }, e.call(n, t);
                  }) : e.call(n, t);
                };
              });
            }(), function() {
              d("fetch", function(e) {
                return function(t) {
                  var n = t.metadata.alias,
                      a = t.metadata.deps || [];
                  return n ? (t.metadata.format = "defined", this.defined[t.name] = {
                    declarative: !0,
                    deps: a.concat([n]),
                    declare: function(e) {
                      return {
                        setters: [function(t) {
                          for (var n in t)
                            e(n, t[n]);
                        }],
                        execute: function() {}
                      };
                    }
                  }, "") : e.call(this, t);
                };
              });
            }(), function() {
              function e(e, t, n) {
                for (var a = void 0,
                    r = t.split("."); r.length > 1; )
                  a = r.shift(), e = e[a] = e[a] || {};
                a = r.shift(), a in e || (e[a] = n);
              }
              c(function(e) {
                return function() {
                  this.meta = {}, e.call(this);
                };
              }), d("locate", function(e) {
                return function(t) {
                  var n,
                      a = this.meta,
                      r = t.name,
                      o = 0;
                  for (var s in a)
                    if (n = s.indexOf("*"), -1 !== n && s.substr(0, n) === r.substr(0, n) && s.substr(n + 1) === r.substr(r.length - s.length + n + 1)) {
                      var i = s.split("/").length;
                      i > o && (bestDetph = i), h(t.metadata, a[s], o != i);
                    }
                  return a[r] && h(t.metadata, a[r]), e.call(this, t);
                };
              });
              var t = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,
                  n = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;
              d("translate", function(a) {
                return function(r) {
                  var o = r.source.match(t);
                  if (o)
                    for (var s = o[0].match(n),
                        i = 0; i < s.length; i++) {
                      var l = s[i],
                          u = l.length,
                          d = l.substr(0, 1);
                      if (";" == l.substr(u - 1, 1) && u--, '"' == d || "'" == d) {
                        var c = l.substr(1, l.length - 3),
                            f = c.substr(0, c.indexOf(" "));
                        if (f) {
                          var m = c.substr(f.length + 1, c.length - f.length - 1);
                          "[]" == f.substr(f.length - 2, 2) && (f = f.substr(0, f.length - 2), r.metadata[f] = r.metadata[f] || []), r.metadata[f] instanceof Array ? r.metadata[f].push(m) : e(r.metadata, f, m);
                        } else
                          r.metadata[c] = !0;
                      }
                    }
                  return a.call(this, r);
                };
              });
            }(), function() {
              function e(e, t) {
                return Promise.resolve(e.normalize(t)).then(function(n) {
                  return e.loadedBundles_[n] = !0, e.bundles[n] = e.bundles[n] || e.bundles[t], e.load(n);
                }).then(function() {
                  return "";
                });
              }
              c(function(e) {
                return function() {
                  e.call(this), this.bundles = {}, this.loadedBundles_ = {};
                };
              }), d("locate", function(e) {
                return function(t) {
                  return (t.name in this.loadedBundles_ || t.name in this.bundles) && (t.metadata.bundle = !0), e.call(this, t);
                };
              }), d("fetch", function(t) {
                return function(n) {
                  var a = this;
                  if (a.trace || a.builder)
                    return t.call(a, n);
                  if (n.name in a.defined)
                    return "";
                  for (var r in a.loadedBundles_)
                    if (-1 != S.call(a.bundles[r], n.name))
                      return e(a, r);
                  for (var r in a.bundles)
                    if (-1 != S.call(a.bundles[r], n.name))
                      return e(a, r);
                  return t.call(a, n);
                };
              });
            }(), function() {
              c(function(e) {
                return function() {
                  e.call(this), this.depCache = {};
                };
              }), d("locate", function(e) {
                return function(t) {
                  var n = this,
                      a = n.depCache[t.name];
                  if (a)
                    for (var r = 0; r < a.length; r++)
                      n["import"](a[r]);
                  return e.call(n, t);
                };
              });
            }(), function() {
              var e = /#\{[^\}]+\}|#\?.+$/;
              c(function(e) {
                return function() {
                  e.call(this), this.set("@system-env", this.newModule({
                    browser: y,
                    node: !!this._nodeRequire
                  }));
                };
              }), d("normalize", function(t) {
                return function(n, a, r) {
                  var o = this,
                      s = n.match(e);
                  if (s) {
                    var i = "?" != s[0][1],
                        l = i ? s[0].substr(2, s[0].length - 3) : s[0].substr(2);
                    if ("." == l[0] || -1 != l.indexOf("/"))
                      throw new TypeError("Invalid condition " + s[0] + "\n	Condition modules cannot contain . or / in the name.");
                    var u,
                        d = l.indexOf(".");
                    -1 != d && (u = l.substr(d + 1), l = l.substr(0, d));
                    var c = !i && "~" == l[0];
                    c && (l = l.substr(1));
                    var f = o.pluginLoader || o;
                    return f["import"](l, a, r).then(function(e) {
                      return void 0 === u ? "string" == typeof e ? e : e["default"] : g(u, e);
                    }).then(function(s) {
                      if (i) {
                        if ("string" != typeof s)
                          throw new TypeError("The condition value for " + l + " doesn't resolve to a string.");
                        n = n.replace(e, s);
                      } else {
                        if ("boolean" != typeof s)
                          throw new TypeError("The condition value for " + l + " isn't resolving to a boolean.");
                        c && (s = !s), n = s ? n.replace(e, "") : "@empty";
                      }
                      return t.call(o, n, a, r);
                    });
                  }
                  return Promise.resolve(t.call(o, n, a, r));
                };
              });
            }(), j = new l, j.constructor = l, "object" == (typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) && (module.exports = r), e.Reflect = e.Reflect || {}, e.Reflect.Loader = e.Reflect.Loader || r, e.Reflect.global = e.Reflect.global || e, e.LoaderPolyfill = r, j || (j = new o, j.constructor = o), "object" == (typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) && (module.exports = j), e.System = j;
          }("undefined" != typeof self ? self : global);
        }
        try {
          var t = "undefined" != typeof URLPolyfill || "test:" == new URL("test:///").protocol;
        } catch (n) {}
        if ("undefined" != typeof Promise && t)
          e();
        else if ("undefined" != typeof document) {
          var a = document.getElementsByTagName("script");
          $__curScript = a[a.length - 1];
          var r = $__curScript.src,
              o = r.substr(0, r.lastIndexOf("/") + 1);
          window.systemJSBootstrap = e, document.write('<script type="text/javascript" src="' + o + 'system-polyfills.js"></script>');
        } else if ("undefined" != typeof importScripts) {
          var o = "";
          try {
            throw new Error("_");
          } catch (n) {
            n.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(e, t) {
              o = t.replace(/\/[^\/]*$/, "/");
            });
          }
          importScripts(o + "system-polyfills.js"), e();
        } else
          e();
      }();
    }
  };
});
