System.register("lib/system-csp-production.src", [], function($__export) {
  "use strict";
  var __moduleName = "lib/system-csp-production.src";
  return {
    setters: [],
    execute: function() {
      (function() {
        function bootstrap() {
          (function(__global) {
            var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
            var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
            var isWindows = typeof process != 'undefined' && !!process.platform.match(/^win/);
            if (!__global.console)
              __global.console = {assert: function() {}};
            var indexOf = Array.prototype.indexOf || function(item) {
              for (var i = 0,
                  thisLen = this.length; i < thisLen; i++) {
                if (this[i] === item) {
                  return i;
                }
              }
              return -1;
            };
            var defineProperty;
            (function() {
              try {
                if (!!Object.defineProperty({}, 'a', {}))
                  defineProperty = Object.defineProperty;
              } catch (e) {
                defineProperty = function(obj, prop, opt) {
                  try {
                    obj[prop] = opt.value || opt.get.call(obj);
                  } catch (e) {}
                };
              }
            })();
            function addToError(err, msg) {
              var newErr;
              if (err instanceof Error) {
                var newErr = new Error(err.message, err.fileName, err.lineNumber);
                if (isBrowser) {
                  newErr.message = err.message + '\n\t' + msg;
                  newErr.stack = err.stack;
                } else {
                  newErr.message = err.message;
                  newErr.stack = err.stack + '\n\t' + msg;
                }
              } else {
                newErr = err + '\n\t' + msg;
              }
              return newErr;
            }
            function __eval(source, debugName, context) {
              try {
                new Function(source).call(context);
              } catch (e) {
                throw addToError(e, 'Evaluating ' + debugName);
              }
            }
            var baseURI;
            if (typeof document != 'undefined' && document.getElementsByTagName) {
              baseURI = document.baseURI;
              if (!baseURI) {
                var bases = document.getElementsByTagName('base');
                baseURI = bases[0] && bases[0].href || window.location.href;
              }
              baseURI = baseURI.split('#')[0].split('?')[0];
              baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
            } else if (typeof process != 'undefined' && process.cwd) {
              baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
              if (isWindows)
                baseURI = baseURI.replace(/\\/g, '/');
            } else if (typeof location != 'undefined') {
              baseURI = __global.location.href;
            } else {
              throw new TypeError('No environment baseURI');
            }
            var URL = __global.URLPolyfill || __global.URL;
            function Module() {}
            defineProperty(Module.prototype, 'toString', {value: function() {
                return 'Module';
              }});
            function Loader(options) {
              this._loader = {
                loaderObj: this,
                loads: [],
                modules: {},
                importPromises: {},
                moduleRecords: {}
              };
              defineProperty(this, 'global', {get: function() {
                  return __global;
                }});
            }
            (function() {
              function createLoaderLoad(object) {
                return {
                  modules: {},
                  loads: [],
                  loaderObj: object
                };
              }
              function createLoad(name) {
                return {
                  status: 'loading',
                  name: name,
                  linkSets: [],
                  dependencies: [],
                  metadata: {}
                };
              }
              function loadModule(loader, name, options) {
                return new Promise(asyncStartLoadPartwayThrough({
                  step: options.address ? 'fetch' : 'locate',
                  loader: loader,
                  moduleName: name,
                  moduleMetadata: options && options.metadata || {},
                  moduleSource: options.source,
                  moduleAddress: options.address
                }));
              }
              function requestLoad(loader, request, refererName, refererAddress) {
                return new Promise(function(resolve, reject) {
                  resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
                }).then(function(name) {
                  var load;
                  if (loader.modules[name]) {
                    load = createLoad(name);
                    load.status = 'linked';
                    load.module = loader.modules[name];
                    return load;
                  }
                  for (var i = 0,
                      l = loader.loads.length; i < l; i++) {
                    load = loader.loads[i];
                    if (load.name != name)
                      continue;
                    console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded');
                    return load;
                  }
                  load = createLoad(name);
                  loader.loads.push(load);
                  proceedToLocate(loader, load);
                  return load;
                });
              }
              function proceedToLocate(loader, load) {
                proceedToFetch(loader, load, Promise.resolve().then(function() {
                  return loader.loaderObj.locate({
                    name: load.name,
                    metadata: load.metadata
                  });
                }));
              }
              function proceedToFetch(loader, load, p) {
                proceedToTranslate(loader, load, p.then(function(address) {
                  if (load.status != 'loading')
                    return;
                  load.address = address;
                  return loader.loaderObj.fetch({
                    name: load.name,
                    metadata: load.metadata,
                    address: address
                  });
                }));
              }
              var anonCnt = 0;
              function proceedToTranslate(loader, load, p) {
                p.then(function(source) {
                  if (load.status != 'loading')
                    return;
                  return Promise.resolve(loader.loaderObj.translate({
                    name: load.name,
                    metadata: load.metadata,
                    address: load.address,
                    source: source
                  })).then(function(source) {
                    load.source = source;
                    return loader.loaderObj.instantiate({
                      name: load.name,
                      metadata: load.metadata,
                      address: load.address,
                      source: source
                    });
                  }).then(function(instantiateResult) {
                    if (instantiateResult === undefined) {
                      load.address = load.address || '<Anonymous Module ' + ++anonCnt + '>';
                      load.isDeclarative = true;
                      return transpile.call(loader.loaderObj, load).then(function(transpiled) {
                        var curSystem = __global.System;
                        var curRegister = curSystem.register;
                        curSystem.register = function(name, deps, declare) {
                          if (typeof name != 'string') {
                            declare = deps;
                            deps = name;
                          }
                          load.declare = declare;
                          load.depsList = deps;
                        };
                        __eval(transpiled, load.address, {});
                        curSystem.register = curRegister;
                      });
                    } else if ((typeof instantiateResult === 'undefined' ? 'undefined' : $traceurRuntime.typeof(instantiateResult)) == 'object') {
                      load.depsList = instantiateResult.deps || [];
                      load.execute = instantiateResult.execute;
                      load.isDeclarative = false;
                    } else
                      throw TypeError('Invalid instantiate return value');
                  }).then(function() {
                    load.dependencies = [];
                    var depsList = load.depsList;
                    var loadPromises = [];
                    for (var i = 0,
                        l = depsList.length; i < l; i++)
                      (function(request, index) {
                        loadPromises.push(requestLoad(loader, request, load.name, load.address).then(function(depLoad) {
                          load.dependencies[index] = {
                            key: request,
                            value: depLoad.name
                          };
                          if (depLoad.status != 'linked') {
                            var linkSets = load.linkSets.concat([]);
                            for (var i = 0,
                                l = linkSets.length; i < l; i++)
                              addLoadToLinkSet(linkSets[i], depLoad);
                          }
                        }));
                      })(depsList[i], i);
                    return Promise.all(loadPromises);
                  }).then(function() {
                    console.assert(load.status == 'loading', 'is loading');
                    load.status = 'loaded';
                    var linkSets = load.linkSets.concat([]);
                    for (var i = 0,
                        l = linkSets.length; i < l; i++)
                      updateLinkSetOnLoad(linkSets[i], load);
                  });
                })['catch'](function(exc) {
                  load.status = 'failed';
                  load.exception = exc;
                  var linkSets = load.linkSets.concat([]);
                  for (var i = 0,
                      l = linkSets.length; i < l; i++) {
                    linkSetFailed(linkSets[i], load, exc);
                  }
                  console.assert(load.linkSets.length == 0, 'linkSets not removed');
                });
              }
              function asyncStartLoadPartwayThrough(stepState) {
                return function(resolve, reject) {
                  var loader = stepState.loader;
                  var name = stepState.moduleName;
                  var step = stepState.step;
                  if (loader.modules[name])
                    throw new TypeError('"' + name + '" already exists in the module table');
                  var existingLoad;
                  for (var i = 0,
                      l = loader.loads.length; i < l; i++) {
                    if (loader.loads[i].name == name) {
                      existingLoad = loader.loads[i];
                      if (step == 'translate' && !existingLoad.source) {
                        existingLoad.address = stepState.moduleAddress;
                        proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
                      }
                      if (existingLoad.linkSets.length)
                        return existingLoad.linkSets[0].done.then(function() {
                          resolve(existingLoad);
                        });
                    }
                  }
                  var load = existingLoad || createLoad(name);
                  load.metadata = stepState.moduleMetadata;
                  var linkSet = createLinkSet(loader, load);
                  loader.loads.push(load);
                  resolve(linkSet.done);
                  if (step == 'locate')
                    proceedToLocate(loader, load);
                  else if (step == 'fetch')
                    proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));
                  else {
                    console.assert(step == 'translate', 'translate step');
                    load.address = stepState.moduleAddress;
                    proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
                  }
                };
              }
              function createLinkSet(loader, startingLoad) {
                var linkSet = {
                  loader: loader,
                  loads: [],
                  startingLoad: startingLoad,
                  loadingCount: 0
                };
                linkSet.done = new Promise(function(resolve, reject) {
                  linkSet.resolve = resolve;
                  linkSet.reject = reject;
                });
                addLoadToLinkSet(linkSet, startingLoad);
                return linkSet;
              }
              function addLoadToLinkSet(linkSet, load) {
                if (load.status == 'failed')
                  return;
                console.assert(load.status == 'loading' || load.status == 'loaded', 'loading or loaded on link set');
                for (var i = 0,
                    l = linkSet.loads.length; i < l; i++)
                  if (linkSet.loads[i] == load)
                    return;
                linkSet.loads.push(load);
                load.linkSets.push(linkSet);
                if (load.status != 'loaded') {
                  linkSet.loadingCount++;
                }
                var loader = linkSet.loader;
                for (var i = 0,
                    l = load.dependencies.length; i < l; i++) {
                  if (!load.dependencies[i])
                    continue;
                  var name = load.dependencies[i].value;
                  if (loader.modules[name])
                    continue;
                  for (var j = 0,
                      d = loader.loads.length; j < d; j++) {
                    if (loader.loads[j].name != name)
                      continue;
                    addLoadToLinkSet(linkSet, loader.loads[j]);
                    break;
                  }
                }
              }
              function doLink(linkSet) {
                var error = false;
                try {
                  link(linkSet, function(load, exc) {
                    linkSetFailed(linkSet, load, exc);
                    error = true;
                  });
                } catch (e) {
                  linkSetFailed(linkSet, null, e);
                  error = true;
                }
                return error;
              }
              function updateLinkSetOnLoad(linkSet, load) {
                console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');
                linkSet.loadingCount--;
                if (linkSet.loadingCount > 0)
                  return;
                var startingLoad = linkSet.startingLoad;
                if (linkSet.loader.loaderObj.execute === false) {
                  var loads = [].concat(linkSet.loads);
                  for (var i = 0,
                      l = loads.length; i < l; i++) {
                    var load = loads[i];
                    load.module = !load.isDeclarative ? {module: _newModule({})} : {
                      name: load.name,
                      module: _newModule({}),
                      evaluated: true
                    };
                    load.status = 'linked';
                    finishLoad(linkSet.loader, load);
                  }
                  return linkSet.resolve(startingLoad);
                }
                var abrupt = doLink(linkSet);
                if (abrupt)
                  return;
                console.assert(linkSet.loads.length == 0, 'loads cleared');
                linkSet.resolve(startingLoad);
              }
              function linkSetFailed(linkSet, load, exc) {
                var loader = linkSet.loader;
                var requests;
                checkError: if (load) {
                  if (linkSet.loads[0].name == load.name) {
                    exc = addToError(exc, 'Error loading ' + load.name);
                  } else {
                    for (var i = 0; i < linkSet.loads.length; i++) {
                      var pLoad = linkSet.loads[i];
                      for (var j = 0; j < pLoad.dependencies.length; j++) {
                        var dep = pLoad.dependencies[j];
                        if (dep.value == load.name) {
                          exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
                          break checkError;
                        }
                      }
                    }
                    exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
                  }
                } else {
                  exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
                }
                var loads = linkSet.loads.concat([]);
                for (var i = 0,
                    l = loads.length; i < l; i++) {
                  var load = loads[i];
                  loader.loaderObj.failed = loader.loaderObj.failed || [];
                  if (indexOf.call(loader.loaderObj.failed, load) == -1)
                    loader.loaderObj.failed.push(load);
                  var linkIndex = indexOf.call(load.linkSets, linkSet);
                  console.assert(linkIndex != -1, 'link not present');
                  load.linkSets.splice(linkIndex, 1);
                  if (load.linkSets.length == 0) {
                    var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
                    if (globalLoadsIndex != -1)
                      linkSet.loader.loads.splice(globalLoadsIndex, 1);
                  }
                }
                linkSet.reject(exc);
              }
              function finishLoad(loader, load) {
                if (loader.loaderObj.trace) {
                  if (!loader.loaderObj.loads)
                    loader.loaderObj.loads = {};
                  var depMap = {};
                  load.dependencies.forEach(function(dep) {
                    depMap[dep.key] = dep.value;
                  });
                  loader.loaderObj.loads[load.name] = {
                    name: load.name,
                    deps: load.dependencies.map(function(dep) {
                      return dep.key;
                    }),
                    depMap: depMap,
                    address: load.address,
                    metadata: load.metadata,
                    source: load.source,
                    kind: load.isDeclarative ? 'declarative' : 'dynamic'
                  };
                }
                if (load.name) {
                  console.assert(!loader.modules[load.name], 'load not in module table');
                  loader.modules[load.name] = load.module;
                }
                var loadIndex = indexOf.call(loader.loads, load);
                if (loadIndex != -1)
                  loader.loads.splice(loadIndex, 1);
                for (var i = 0,
                    l = load.linkSets.length; i < l; i++) {
                  loadIndex = indexOf.call(load.linkSets[i].loads, load);
                  if (loadIndex != -1)
                    load.linkSets[i].loads.splice(loadIndex, 1);
                }
                load.linkSets.splice(0, load.linkSets.length);
              }
              function doDynamicExecute(linkSet, load, linkError) {
                try {
                  var module = load.execute();
                } catch (e) {
                  linkError(load, e);
                  return;
                }
                if (!module || !(module instanceof Module))
                  linkError(load, new TypeError('Execution must define a Module instance'));
                else
                  return module;
              }
              function createImportPromise(loader, name, promise) {
                var importPromises = loader._loader.importPromises;
                return importPromises[name] = promise.then(function(m) {
                  importPromises[name] = undefined;
                  return m;
                }, function(e) {
                  importPromises[name] = undefined;
                  throw e;
                });
              }
              Loader.prototype = {
                constructor: Loader,
                define: function(name, source, options) {
                  if (this._loader.importPromises[name])
                    throw new TypeError('Module is already loading.');
                  return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
                    step: 'translate',
                    loader: this._loader,
                    moduleName: name,
                    moduleMetadata: options && options.metadata || {},
                    moduleSource: source,
                    moduleAddress: options && options.address
                  })));
                },
                'delete': function(name) {
                  var loader = this._loader;
                  delete loader.importPromises[name];
                  delete loader.moduleRecords[name];
                  return loader.modules[name] ? delete loader.modules[name] : false;
                },
                get: function(key) {
                  if (!this._loader.modules[key])
                    return;
                  doEnsureEvaluated(this._loader.modules[key], [], this);
                  return this._loader.modules[key].module;
                },
                has: function(name) {
                  return !!this._loader.modules[name];
                },
                'import': function(name, parentName, parentAddress) {
                  if ((typeof parentName === 'undefined' ? 'undefined' : $traceurRuntime.typeof(parentName)) == 'object')
                    parentName = parentName.name;
                  var loaderObj = this;
                  return Promise.resolve(loaderObj.normalize(name, parentName)).then(function(name) {
                    var loader = loaderObj._loader;
                    if (loader.modules[name]) {
                      doEnsureEvaluated(loader.modules[name], [], loader._loader);
                      return loader.modules[name].module;
                    }
                    return loader.importPromises[name] || createImportPromise(loaderObj, name, loadModule(loader, name, {}).then(function(load) {
                      delete loader.importPromises[name];
                      return evaluateLoadedModule(loader, load);
                    }));
                  });
                },
                load: function(name, options) {
                  var loader = this._loader;
                  if (loader.modules[name]) {
                    doEnsureEvaluated(loader.modules[name], [], loader);
                    return Promise.resolve(loader.modules[name].module);
                  }
                  return loader.importPromises[name] || createImportPromise(this, name, loadModule(loader, name, {}).then(function(load) {
                    delete loader.importPromises[name];
                    return evaluateLoadedModule(loader, load);
                  }));
                },
                module: function(source, options) {
                  var load = createLoad();
                  load.address = options && options.address;
                  var linkSet = createLinkSet(this._loader, load);
                  var sourcePromise = Promise.resolve(source);
                  var loader = this._loader;
                  var p = linkSet.done.then(function() {
                    return evaluateLoadedModule(loader, load);
                  });
                  proceedToTranslate(loader, load, sourcePromise);
                  return p;
                },
                newModule: function(obj) {
                  if ((typeof obj === 'undefined' ? 'undefined' : $traceurRuntime.typeof(obj)) != 'object')
                    throw new TypeError('Expected object');
                  var m = new Module();
                  var pNames;
                  if (Object.getOwnPropertyNames && obj != null) {
                    pNames = Object.getOwnPropertyNames(obj);
                  } else {
                    pNames = [];
                    for (var key in obj)
                      pNames.push(key);
                  }
                  for (var i = 0; i < pNames.length; i++)
                    (function(key) {
                      defineProperty(m, key, {
                        configurable: false,
                        enumerable: true,
                        get: function() {
                          return obj[key];
                        }
                      });
                    })(pNames[i]);
                  if (Object.preventExtensions)
                    Object.preventExtensions(m);
                  return m;
                },
                set: function(name, module) {
                  if (!(module instanceof Module))
                    throw new TypeError('Loader.set(' + name + ', module) must be a module');
                  this._loader.modules[name] = {module: module};
                },
                normalize: function(name, referrerName, referrerAddress) {
                  return name;
                },
                locate: function(load) {
                  return load.name;
                },
                fetch: function(load) {},
                translate: function(load) {
                  return load.source;
                },
                instantiate: function(load) {}
              };
              var _newModule = Loader.prototype.newModule;
              function link(linkSet, linkError) {
                var loader = linkSet.loader;
                if (!linkSet.loads.length)
                  return;
                var loads = linkSet.loads.concat([]);
                for (var i = 0; i < loads.length; i++) {
                  var load = loads[i];
                  var module = doDynamicExecute(linkSet, load, linkError);
                  if (!module)
                    return;
                  load.module = {
                    name: load.name,
                    module: module
                  };
                  load.status = 'linked';
                  finishLoad(loader, load);
                }
              }
              function evaluateLoadedModule(loader, load) {
                console.assert(load.status == 'linked', 'is linked ' + load.name);
                return load.module.module;
              }
              function doEnsureEvaluated() {}
              function transpile() {
                throw new TypeError('ES6 transpilation is only provided in the dev module loader build.');
              }
            })();
            var System;
            function SystemLoader() {
              Loader.call(this);
              this.paths = {};
            }
            function applyPaths(paths, name) {
              var pathMatch = '',
                  wildcard,
                  maxSlashCount = 0;
              for (var p in paths) {
                var pathParts = p.split('*');
                if (pathParts.length > 2)
                  throw new TypeError('Only one wildcard in a path is permitted');
                if (pathParts.length == 1) {
                  if (name == p) {
                    pathMatch = p;
                    break;
                  }
                } else {
                  var slashCount = p.split('/').length;
                  if (slashCount >= maxSlashCount && name.substr(0, pathParts[0].length) == pathParts[0] && name.substr(name.length - pathParts[1].length) == pathParts[1]) {
                    maxSlashCount = slashCount;
                    pathMatch = p;
                    wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
                  }
                }
              }
              var outPath = paths[pathMatch] || name;
              if (typeof wildcard == 'string')
                outPath = outPath.replace('*', wildcard);
              return outPath;
            }
            function LoaderProto() {}
            LoaderProto.prototype = Loader.prototype;
            SystemLoader.prototype = new LoaderProto();
            function SystemJSLoader() {
              SystemLoader.call(this);
              systemJSConstructor.call(this);
            }
            function SystemProto() {}
            ;
            SystemProto.prototype = SystemLoader.prototype;
            SystemJSLoader.prototype = new SystemProto();
            var systemJSConstructor;
            function hook(name, hook) {
              SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name]);
            }
            function hookConstructor(hook) {
              systemJSConstructor = hook(systemJSConstructor || function() {});
            }
            function dedupe(deps) {
              var newDeps = [];
              for (var i = 0,
                  l = deps.length; i < l; i++)
                if (indexOf.call(newDeps, deps[i]) == -1)
                  newDeps.push(deps[i]);
              return newDeps;
            }
            function group(deps) {
              var names = [];
              var indices = [];
              for (var i = 0,
                  l = deps.length; i < l; i++) {
                var index = indexOf.call(names, deps[i]);
                if (index === -1) {
                  names.push(deps[i]);
                  indices.push([i]);
                } else {
                  indices[index].push(i);
                }
              }
              return {
                names: names,
                indices: indices
              };
            }
            var getOwnPropertyDescriptor = true;
            try {
              Object.getOwnPropertyDescriptor({a: 0}, 'a');
            } catch (e) {
              getOwnPropertyDescriptor = false;
            }
            function getESModule(exports) {
              var esModule = {};
              if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) == 'object' || typeof exports == 'function') {
                if (getOwnPropertyDescriptor) {
                  var d;
                  for (var p in exports)
                    if (d = Object.getOwnPropertyDescriptor(exports, p))
                      defineProperty(esModule, p, d);
                } else {
                  var hasOwnProperty = exports && exports.hasOwnProperty;
                  for (var p in exports) {
                    if (!hasOwnProperty || exports.hasOwnProperty(p))
                      esModule[p] = exports[p];
                  }
                }
              }
              esModule['default'] = exports;
              defineProperty(esModule, '__useDefault', {value: true});
              return esModule;
            }
            function extend(a, b, prepend) {
              for (var p in b) {
                if (!prepend || !(p in a))
                  a[p] = b[p];
              }
              return a;
            }
            function extendMeta(a, b, prepend) {
              for (var p in b) {
                var val = b[p];
                if (!(p in a))
                  a[p] = val;
                else if (val instanceof Array && a[p] instanceof Array)
                  a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
                else if ((typeof val === 'undefined' ? 'undefined' : $traceurRuntime.typeof(val)) == 'object' && $traceurRuntime.typeof(a[p]) == 'object')
                  a[p] = extend(extend({}, a[p]), val, prepend);
                else if (!prepend)
                  a[p] = val;
              }
            }
            var absURLRegEx = /^[^\/]+:\/\//;
            function readMemberExpression(p, value) {
              var pParts = p.split('.');
              while (pParts.length)
                value = value[pParts.shift()];
              return value;
            }
            var baseURLCache = {};
            function getBaseURLObj() {
              if (baseURLCache[this.baseURL])
                return baseURLCache[this.baseURL];
              if (this.baseURL[this.baseURL.length - 1] != '/')
                this.baseURL += '/';
              var baseURL = new URL(this.baseURL, baseURI);
              this.baseURL = baseURL.href;
              return (baseURLCache[this.baseURL] = baseURL);
            }
            var baseURIObj = new URL(baseURI);
            (function() {
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.baseURL = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
                  this.set('@empty', this.newModule({}));
                };
              });
              hook('normalize', function() {
                return function(name, parentName) {
                  if (name[0] == '.' || name[0] == '/')
                    return new URL(name, parentName || baseURIObj).href;
                  return name;
                };
              });
              hook('import', function(systemImport) {
                return function(name, parentName, parentAddress) {
                  return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
                    return module.__useDefault ? module['default'] : module;
                  });
                };
              });
              var packageProperties = ['main', 'format', 'defaultExtension', 'meta', 'map', 'basePath'];
              SystemJSLoader.prototype.config = function(cfg) {
                if (cfg.baseURL) {
                  var checkHasConfig = function(obj) {
                    for (var p in obj)
                      return true;
                  };
                  var hasConfig = false;
                  if (checkHasConfig(this.packages) || checkHasConfig(this.meta) || checkHasConfig(this.depCache) || checkHasConfig(this.bundles))
                    throw new TypeError('baseURL should only be configured once and must be configured first.');
                  this.baseURL = cfg.baseURL;
                  getBaseURLObj.call(this);
                }
                if (cfg.defaultJSExtensions)
                  this.defaultJSExtensions = cfg.defaultJSExtensions;
                if (cfg.pluginFirst)
                  this.pluginFirst = cfg.pluginFirst;
                if (cfg.paths) {
                  for (var p in cfg.paths)
                    this.paths[p] = cfg.paths[p];
                }
                if (cfg.map) {
                  for (var p in cfg.map) {
                    var v = cfg.map[p];
                    if (typeof v !== 'string') {
                      var normalized = this.normalizeSync(p);
                      if (this.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js')
                        normalized = normalized.substr(0, normalized.length - 3);
                      var pkgMatch = '';
                      for (var pkg in this.packages) {
                        if (normalized.substr(0, pkg.length) == pkg && (!normalized[pkg.length] || normalized[pkg.length] == '/') && pkgMatch.split('/').length < pkg.split('/').length)
                          pkgMatch = pkg;
                      }
                      if (pkgMatch && this.packages[pkgMatch].main)
                        normalized = normalized.substr(0, normalized.length - this.packages[pkgMatch].main.length - 1);
                      var pkg = this.packages[normalized] = this.packages[normalized] || {};
                      pkg.map = v;
                    } else {
                      this.map[p] = v;
                    }
                  }
                }
                if (cfg.packagePaths) {
                  for (var i = 0; i < cfg.packagePaths.length; i++) {
                    var path = cfg.packagePaths[i];
                    var normalized = this.normalizeSync(path);
                    if (this.defaultJSExtensions && path.substr(path.length - 3, 3) != '.js')
                      normalized = normalized.substr(0, normalized.length - 3);
                    cfg.packagePaths[i] = normalized;
                  }
                }
                if (cfg.packages) {
                  for (var p in cfg.packages) {
                    if (p.match(/^([^\/]+:)?\/\/$/))
                      throw new TypeError('"' + p + '" is not a valid package name.');
                    var prop = this.normalizeSync(p + (p[p.length - 1] != '/' ? '/' : ''));
                    prop = prop.substr(0, prop.length - 1);
                    if (this.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js')
                      prop = prop.substr(0, prop.length - 3);
                    this.packages[prop] = this.packages[prop] || {};
                    for (var q in cfg.packages[p])
                      if (indexOf.call(packageProperties, q) == -1 && typeof console != 'undefined' && console.warn)
                        console.warn('"' + q + '" is not a valid package configuration option in package ' + p);
                    extendMeta(this.packages[prop], cfg.packages[p]);
                  }
                }
                if (cfg.bundles) {
                  for (var p in cfg.bundles) {
                    var bundle = [];
                    for (var i = 0; i < cfg.bundles[p].length; i++)
                      bundle.push(this.normalizeSync(cfg.bundles[p][i]));
                    this.bundles[p] = bundle;
                  }
                }
                for (var c in cfg) {
                  var v = cfg[c];
                  var normalizeProp = false,
                      normalizeValArray = false;
                  if (c == 'baseURL' || c == 'map' || c == 'packages' || c == 'bundles' || c == 'paths')
                    continue;
                  if ((typeof v === 'undefined' ? 'undefined' : $traceurRuntime.typeof(v)) != 'object' || v instanceof Array) {
                    this[c] = v;
                  } else {
                    this[c] = this[c] || {};
                    if (c == 'meta' || c == 'depCache')
                      normalizeProp = true;
                    for (var p in v) {
                      if (c == 'meta' && p[0] == '*')
                        this[c][p] = v[p];
                      else if (normalizeProp)
                        this[c][this.normalizeSync(p)] = v[p];
                      else
                        this[c][p] = v[p];
                    }
                  }
                }
              };
            })();
            (function() {
              if (typeof document != 'undefined')
                var head = document.getElementsByTagName('head')[0];
              var curSystem;
              SystemJSLoader.prototype.onScriptLoad = function() {
                __global.System = curSystem;
              };
              function webWorkerImport(loader, load) {
                return new Promise(function(resolve, reject) {
                  if (load.metadata.integrity)
                    reject(new Error('Subresource integrity checking is not supported in web workers.'));
                  try {
                    importScripts(load.address);
                  } catch (e) {
                    reject(e);
                  }
                  loader.onScriptLoad(load);
                  if (!load.metadata.registered)
                    reject(load.address + ' did not call System.register or AMD define');
                  resolve('');
                });
              }
              hook('fetch', function(fetch) {
                return function(load) {
                  var loader = this;
                  if (!load.metadata.scriptLoad || (!isBrowser && !isWorker))
                    return fetch.call(this, load);
                  if (isWorker)
                    return webWorkerImport(loader, load);
                  return new Promise(function(resolve, reject) {
                    var s = document.createElement('script');
                    s.async = true;
                    function complete(evt) {
                      if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
                        return;
                      cleanup();
                      loader.onScriptLoad(load);
                      if (!load.metadata.registered)
                        reject(load.address + ' did not call System.register or AMD define');
                      resolve('');
                    }
                    function error(evt) {
                      cleanup();
                      reject(new Error('Unable to load script ' + load.address));
                    }
                    if (s.attachEvent) {
                      s.attachEvent('onreadystatechange', complete);
                    } else {
                      s.addEventListener('load', complete, false);
                      s.addEventListener('error', error, false);
                    }
                    curSystem = __global.System;
                    __global.System = loader;
                    s.src = load.address;
                    if (load.metadata.integrity)
                      s.setAttribute('integrity', load.metadata.integrity);
                    head.appendChild(s);
                    function cleanup() {
                      if (s.detachEvent)
                        s.detachEvent('onreadystatechange', complete);
                      else {
                        s.removeEventListener('load', complete, false);
                        s.removeEventListener('error', error, false);
                      }
                      head.removeChild(s);
                    }
                  });
                };
              });
            })();
            hook('fetch', function(fetch) {
              return function(load) {
                load.metadata.scriptLoad = true;
                if (this.has('@@amd-helpers'))
                  this.get('@@amd-helpers').createDefine(this);
                return fetch.call(this, load);
              };
            });
            hook('onScriptLoad', function(onScriptLoad) {
              return function(load) {
                onScriptLoad.call(this, load);
                if (this.has('@@amd-helpers')) {
                  var lastModule = this.get('@@amd-helpers').lastModule;
                  if (lastModule.anonDefine || lastModule.isBundle) {
                    load.metadata.format = 'defined';
                    load.metadata.registered = true;
                    lastModule.isBundle = false;
                  }
                  if (lastModule.anonDefine) {
                    load.metadata.deps = load.metadata.deps ? load.metadata.deps.concat(lastModule.anonDefine.deps) : lastModule.anonDefine.deps;
                    load.metadata.execute = lastModule.anonDefine.execute;
                    lastModule.anonDefine = null;
                  }
                }
              };
            });
            (function() {
              var anonRegister;
              var calledRegister = false;
              function doRegister(loader, name, register) {
                calledRegister = true;
                if (name) {
                  name = (loader.normalizeSync || loader.normalize).call(loader, name);
                  register.name = name;
                  if (!(name in loader.defined))
                    loader.defined[name] = register;
                } else {
                  if (anonRegister)
                    throw new TypeError('Invalid anonymous System.register module load. If loading a single module, ensure anonymous System.register is loaded via System.import. If loading a bundle, ensure all the System.register calls are named.');
                  anonRegister = register;
                }
              }
              SystemJSLoader.prototype.register = function(name, deps, declare) {
                if (typeof name != 'string') {
                  declare = deps;
                  deps = name;
                  name = null;
                }
                if (typeof declare == 'boolean')
                  return this.registerDynamic.apply(this, arguments);
                doRegister(this, name, {
                  declarative: true,
                  deps: deps,
                  declare: declare
                });
              };
              SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
                if (typeof name != 'string') {
                  execute = declare;
                  declare = deps;
                  deps = name;
                  name = null;
                }
                doRegister(this, name, {
                  declarative: false,
                  deps: deps,
                  execute: execute,
                  executingRequire: declare
                });
              };
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.defined = {};
                  this._loader.moduleRecords = {};
                };
              });
              hook('onScriptLoad', function(onScriptLoad) {
                return function(load) {
                  onScriptLoad.call(this, load);
                  if (calledRegister) {
                    if (anonRegister)
                      load.metadata.entry = anonRegister;
                    load.metadata.format = load.metadata.format || 'defined';
                    load.metadata.registered = true;
                    calledRegister = false;
                    anonRegister = null;
                  }
                };
              });
              function buildGroups(entry, loader, groups) {
                groups[entry.groupIndex] = groups[entry.groupIndex] || [];
                if (indexOf.call(groups[entry.groupIndex], entry) != -1)
                  return;
                groups[entry.groupIndex].push(entry);
                for (var i = 0,
                    l = entry.normalizedDeps.length; i < l; i++) {
                  var depName = entry.normalizedDeps[i];
                  var depEntry = loader.defined[depName];
                  if (!depEntry || depEntry.evaluated)
                    continue;
                  var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);
                  if (depEntry.groupIndex === undefined || depEntry.groupIndex < depGroupIndex) {
                    if (depEntry.groupIndex !== undefined) {
                      groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);
                      if (groups[depEntry.groupIndex].length == 0)
                        throw new TypeError("Mixed dependency cycle detected");
                    }
                    depEntry.groupIndex = depGroupIndex;
                  }
                  buildGroups(depEntry, loader, groups);
                }
              }
              function link(name, loader) {
                var startEntry = loader.defined[name];
                if (startEntry.module)
                  return;
                startEntry.groupIndex = 0;
                var groups = [];
                buildGroups(startEntry, loader, groups);
                var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
                for (var i = groups.length - 1; i >= 0; i--) {
                  var group = groups[i];
                  for (var j = 0; j < group.length; j++) {
                    var entry = group[j];
                    if (curGroupDeclarative)
                      linkDeclarativeModule(entry, loader);
                    else
                      linkDynamicModule(entry, loader);
                  }
                  curGroupDeclarative = !curGroupDeclarative;
                }
              }
              function Module() {}
              defineProperty(Module, 'toString', {value: function() {
                  return 'Module';
                }});
              function getOrCreateModuleRecord(name, moduleRecords) {
                return moduleRecords[name] || (moduleRecords[name] = {
                  name: name,
                  dependencies: [],
                  exports: new Module(),
                  importers: []
                });
              }
              function linkDeclarativeModule(entry, loader) {
                if (entry.module)
                  return;
                var moduleRecords = loader._loader.moduleRecords;
                var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
                var exports = entry.module.exports;
                var declaration = entry.declare.call(__global, function(name, value) {
                  module.locked = true;
                  if ((typeof name === 'undefined' ? 'undefined' : $traceurRuntime.typeof(name)) == 'object') {
                    for (var p in name)
                      exports[p] = name[p];
                  } else {
                    exports[name] = value;
                  }
                  for (var i = 0,
                      l = module.importers.length; i < l; i++) {
                    var importerModule = module.importers[i];
                    if (!importerModule.locked) {
                      var importerIndex = indexOf.call(importerModule.dependencies, module);
                      importerModule.setters[importerIndex](exports);
                    }
                  }
                  module.locked = false;
                  return value;
                });
                module.setters = declaration.setters;
                module.execute = declaration.execute;
                if (!module.setters || !module.execute) {
                  throw new TypeError('Invalid System.register form for ' + entry.name);
                }
                for (var i = 0,
                    l = entry.normalizedDeps.length; i < l; i++) {
                  var depName = entry.normalizedDeps[i];
                  var depEntry = loader.defined[depName];
                  var depModule = moduleRecords[depName];
                  var depExports = void 0;
                  if (depModule) {
                    depExports = depModule.exports;
                  } else if (depEntry && !depEntry.declarative) {
                    depExports = depEntry.esModule;
                  } else if (!depEntry) {
                    depExports = loader.get(depName);
                  } else {
                    linkDeclarativeModule(depEntry, loader);
                    depModule = depEntry.module;
                    depExports = depModule.exports;
                  }
                  if (depModule && depModule.importers) {
                    depModule.importers.push(module);
                    module.dependencies.push(depModule);
                  } else {
                    module.dependencies.push(null);
                  }
                  var originalIndices = entry.originalIndices[i];
                  for (var j = 0,
                      len = originalIndices.length; j < len; ++j) {
                    var index = originalIndices[j];
                    if (module.setters[index]) {
                      module.setters[index](depExports);
                    }
                  }
                }
              }
              function getModule(name, loader) {
                var exports;
                var entry = loader.defined[name];
                if (!entry) {
                  exports = loader.get(name);
                  if (!exports)
                    throw new Error('Unable to load dependency ' + name + '.');
                } else {
                  if (entry.declarative)
                    ensureEvaluated(name, [], loader);
                  else if (!entry.evaluated)
                    linkDynamicModule(entry, loader);
                  exports = entry.module.exports;
                }
                if ((!entry || entry.declarative) && exports && exports.__useDefault)
                  return exports['default'];
                return exports;
              }
              function linkDynamicModule(entry, loader) {
                if (entry.module)
                  return;
                var exports = {};
                var module = entry.module = {
                  exports: exports,
                  id: entry.name
                };
                if (!entry.executingRequire) {
                  for (var i = 0,
                      l = entry.normalizedDeps.length; i < l; i++) {
                    var depName = entry.normalizedDeps[i];
                    var depEntry = loader.defined[depName];
                    if (depEntry)
                      linkDynamicModule(depEntry, loader);
                  }
                }
                entry.evaluated = true;
                var output = entry.execute.call(__global, function(name) {
                  for (var i = 0,
                      l = entry.deps.length; i < l; i++) {
                    if (entry.deps[i] != name)
                      continue;
                    return getModule(entry.normalizedDeps[i], loader);
                  }
                  throw new TypeError('Module ' + name + ' not declared as a dependency.');
                }, exports, module);
                if (output)
                  module.exports = output;
                exports = module.exports;
                if (exports && exports.__esModule)
                  entry.esModule = exports;
                else if (entry.esmExports)
                  entry.esModule = getESModule(exports);
                else
                  entry.esModule = {'default': exports};
              }
              function ensureEvaluated(moduleName, seen, loader) {
                var entry = loader.defined[moduleName];
                if (!entry || entry.evaluated || !entry.declarative)
                  return;
                seen.push(moduleName);
                for (var i = 0,
                    l = entry.normalizedDeps.length; i < l; i++) {
                  var depName = entry.normalizedDeps[i];
                  if (indexOf.call(seen, depName) == -1) {
                    if (!loader.defined[depName])
                      loader.get(depName);
                    else
                      ensureEvaluated(depName, seen, loader);
                  }
                }
                if (entry.evaluated)
                  return;
                entry.evaluated = true;
                entry.module.execute.call(__global);
              }
              hook('delete', function(del) {
                return function(name) {
                  delete this._loader.moduleRecords[name];
                  delete this.defined[name];
                  return del.call(this, name);
                };
              });
              var registerRegEx = /^\s*(\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*System\.register(Dynamic)?\s*\(/;
              hook('fetch', function(fetch) {
                return function(load) {
                  if (this.defined[load.name]) {
                    load.metadata.format = 'defined';
                    return '';
                  }
                  anonRegister = null;
                  calledRegister = false;
                  if (load.metadata.format == 'register')
                    load.metadata.scriptLoad = true;
                  load.metadata.deps = load.metadata.deps || [];
                  return fetch.call(this, load);
                };
              });
              hook('translate', function(translate) {
                return function(load) {
                  return Promise.resolve(translate.call(this, load)).then(function(source) {
                    if (typeof load.metadata.deps === 'string')
                      load.metadata.deps = load.metadata.deps.split(',');
                    load.metadata.deps = load.metadata.deps || [];
                    if (load.metadata.format == 'register' || load.metadata.bundle || !load.metadata.format && load.source.match(registerRegEx))
                      load.metadata.format = 'register';
                    return source;
                  });
                };
              });
              hook('instantiate', function(instantiate) {
                return function(load) {
                  var loader = this;
                  var entry;
                  if (loader.defined[load.name]) {
                    entry = loader.defined[load.name];
                    entry.deps = entry.deps.concat(load.metadata.deps);
                  } else if (load.metadata.entry)
                    entry = load.metadata.entry;
                  else if (load.metadata.execute) {
                    entry = {
                      declarative: false,
                      deps: load.metadata.deps || [],
                      execute: load.metadata.execute,
                      executingRequire: load.metadata.executingRequire
                    };
                  } else if (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6') {
                    anonRegister = null;
                    calledRegister = false;
                    if (typeof __exec != 'undefined')
                      __exec.call(loader, load);
                    if (!calledRegister && !load.metadata.registered)
                      throw new TypeError(load.name + ' detected as System.register but didn\'t execute.');
                    if (anonRegister)
                      entry = anonRegister;
                    else
                      load.metadata.bundle = true;
                    if (!entry && loader.defined[load.name])
                      entry = loader.defined[load.name];
                    anonRegister = null;
                    calledRegister = false;
                  }
                  if (!entry)
                    entry = {
                      declarative: false,
                      deps: load.metadata.deps,
                      execute: function() {
                        return loader.newModule({});
                      }
                    };
                  loader.defined[load.name] = entry;
                  var grouped = group(entry.deps);
                  entry.deps = grouped.names;
                  entry.originalIndices = grouped.indices;
                  entry.name = load.name;
                  entry.esmExports = load.metadata.esmExports !== false;
                  var normalizePromises = [];
                  for (var i = 0,
                      l = entry.deps.length; i < l; i++)
                    normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));
                  return Promise.all(normalizePromises).then(function(normalizedDeps) {
                    entry.normalizedDeps = normalizedDeps;
                    return {
                      deps: entry.deps,
                      execute: function() {
                        link(load.name, loader);
                        ensureEvaluated(load.name, [], loader);
                        loader.defined[load.name] = undefined;
                        return loader.newModule(entry.declarative ? entry.module.exports : entry.esModule);
                      }
                    };
                  });
                };
              });
            })();
            hookConstructor(function(constructor) {
              return function() {
                var loader = this;
                constructor.call(loader);
                var hasOwnProperty = Object.prototype.hasOwnProperty;
                var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'external', 'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB'];
                var globalSnapshot;
                function forEachGlobal(callback) {
                  if (Object.keys)
                    Object.keys(__global).forEach(callback);
                  else
                    for (var g in __global) {
                      if (!hasOwnProperty.call(__global, g))
                        continue;
                      callback(g);
                    }
                }
                function forEachGlobalValue(callback) {
                  forEachGlobal(function(globalName) {
                    if (indexOf.call(ignoredGlobalProps, globalName) != -1)
                      return;
                    try {
                      var value = __global[globalName];
                    } catch (e) {
                      ignoredGlobalProps.push(globalName);
                    }
                    callback(globalName, value);
                  });
                }
                loader.set('@@global-helpers', loader.newModule({prepareGlobal: function(moduleName, exportName, globals) {
                    var curDefine = __global.define;
                    __global.define = undefined;
                    __global.exports = undefined;
                    if (__global.module && __global.module.exports)
                      __global.module = undefined;
                    var oldGlobals;
                    if (globals) {
                      oldGlobals = {};
                      for (var g in globals) {
                        oldGlobals[g] = globals[g];
                        __global[g] = globals[g];
                      }
                    }
                    if (!exportName) {
                      globalSnapshot = {};
                      forEachGlobalValue(function(name, value) {
                        globalSnapshot[name] = value;
                      });
                    }
                    return function() {
                      var globalValue;
                      if (exportName) {
                        globalValue = readMemberExpression(exportName, __global);
                      } else {
                        var singleGlobal;
                        var multipleExports;
                        var exports = {};
                        forEachGlobalValue(function(name, value) {
                          if (globalSnapshot[name] === value)
                            return;
                          if (typeof value == 'undefined')
                            return;
                          exports[name] = value;
                          if (typeof singleGlobal != 'undefined') {
                            if (!multipleExports && singleGlobal !== value)
                              multipleExports = true;
                          } else {
                            singleGlobal = value;
                          }
                        });
                        globalValue = multipleExports ? exports : singleGlobal;
                      }
                      if (oldGlobals) {
                        for (var g in oldGlobals)
                          __global[g] = oldGlobals[g];
                      }
                      __global.define = curDefine;
                      return globalValue;
                    };
                  }}));
              };
            });
            hookConstructor(function(constructor) {
              return function() {
                var loader = this;
                constructor.call(this);
                var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
                var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
                var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
                var fnBracketRegEx = /\(([^\)]*)\)/;
                var wsRegEx = /^\s+|\s+$/g;
                var requireRegExs = {};
                function getCJSDeps(source, requireIndex) {
                  source = source.replace(commentRegEx, '');
                  var params = source.match(fnBracketRegEx);
                  var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');
                  var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));
                  requireRegEx.lastIndex = 0;
                  var deps = [];
                  var match;
                  while (match = requireRegEx.exec(source))
                    deps.push(match[2] || match[3]);
                  return deps;
                }
                function require(names, callback, errback, referer) {
                  if ((typeof names === 'undefined' ? 'undefined' : $traceurRuntime.typeof(names)) == 'object' && !(names instanceof Array))
                    return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));
                  if (typeof names == 'string' && typeof callback == 'function')
                    names = [names];
                  if (names instanceof Array) {
                    var dynamicRequires = [];
                    for (var i = 0; i < names.length; i++)
                      dynamicRequires.push(loader['import'](names[i], referer));
                    Promise.all(dynamicRequires).then(function(modules) {
                      if (callback)
                        callback.apply(null, modules);
                    }, errback);
                  } else if (typeof names == 'string') {
                    var module = loader.get(loader.normalizeSync(names, referer));
                    if (!module)
                      throw new Error('Module not already loaded loading "' + names + '" from "' + referer + '".');
                    return module.__useDefault ? module['default'] : module;
                  } else
                    throw new TypeError('Invalid require');
                }
                function define(name, deps, factory) {
                  if (typeof name != 'string') {
                    factory = deps;
                    deps = name;
                    name = null;
                  }
                  if (!(deps instanceof Array)) {
                    factory = deps;
                    deps = ['require', 'exports', 'module'].splice(0, factory.length);
                  }
                  if (typeof factory != 'function')
                    factory = (function(factory) {
                      return function() {
                        return factory;
                      };
                    })(factory);
                  if (deps[deps.length - 1] === undefined)
                    deps.pop();
                  var requireIndex,
                      exportsIndex,
                      moduleIndex;
                  if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
                    deps.splice(requireIndex, 1);
                    if (!name)
                      deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
                  }
                  if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
                    deps.splice(exportsIndex, 1);
                  if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
                    deps.splice(moduleIndex, 1);
                  var define = {
                    name: name,
                    deps: deps,
                    execute: function(req, exports, module) {
                      var depValues = [];
                      for (var i = 0; i < deps.length; i++)
                        depValues.push(req(deps[i]));
                      module.uri = module.id;
                      module.config = function() {};
                      if (moduleIndex != -1)
                        depValues.splice(moduleIndex, 0, module);
                      if (exportsIndex != -1)
                        depValues.splice(exportsIndex, 0, exports);
                      if (requireIndex != -1) {
                        var contextualRequire = function(names, callback, errback) {
                          if (typeof names == 'string' && typeof callback != 'function')
                            return req(names);
                          return require.call(loader, names, callback, errback, module.id);
                        };
                        contextualRequire.toUrl = function(name) {
                          var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
                          var url = loader.normalizeSync(name, module.id);
                          if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
                            url = url.substr(0, url.length - 3);
                          return url;
                        };
                        depValues.splice(requireIndex, 0, contextualRequire);
                      }
                      var curRequire = __global.require;
                      __global.require = require;
                      var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);
                      __global.require = curRequire;
                      if (typeof output == 'undefined' && module)
                        output = module.exports;
                      if (typeof output != 'undefined')
                        return output;
                    }
                  };
                  if (!name) {
                    if (lastModule.anonDefine)
                      throw new TypeError('Multiple defines for anonymous module');
                    lastModule.anonDefine = define;
                  } else {
                    if (!lastModule.anonDefine && !lastModule.isBundle) {
                      lastModule.anonDefine = define;
                    } else {
                      if (lastModule.anonDefine && lastModule.anonDefine.name)
                        loader.registerDynamic(lastModule.anonDefine.name, lastModule.anonDefine.deps, false, lastModule.anonDefine.execute);
                      lastModule.anonDefine = null;
                    }
                    lastModule.isBundle = true;
                    loader.registerDynamic(name, define.deps, false, define.execute);
                  }
                }
                define.amd = {};
                function createDefine(loader) {
                  lastModule.anonDefine = null;
                  lastModule.isBundle = false;
                  var oldModule = __global.module;
                  var oldExports = __global.exports;
                  var oldDefine = __global.define;
                  __global.module = undefined;
                  __global.exports = undefined;
                  __global.define = define;
                  return function() {
                    __global.define = oldDefine;
                    __global.module = oldModule;
                    __global.exports = oldExports;
                  };
                }
                var lastModule = {
                  isBundle: false,
                  anonDefine: null
                };
                loader.set('@@amd-helpers', loader.newModule({
                  createDefine: createDefine,
                  require: require,
                  define: define,
                  lastModule: lastModule
                }));
                loader.amdDefine = define;
                loader.amdRequire = require;
              };
            });
            hookConstructor(function(constructor) {
              return function() {
                constructor.call(this);
                this.map = {};
              };
            });
            hook('normalize', function(normalize) {
              return function(name, parentName, parentAddress) {
                if (name.substr(0, 1) != '.' && name.substr(0, 1) != '/' && !name.match(absURLRegEx)) {
                  var bestMatch,
                      bestMatchLength = 0;
                  for (var p in this.map) {
                    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
                      var curMatchLength = p.split('/').length;
                      if (curMatchLength <= bestMatchLength)
                        continue;
                      bestMatch = p;
                      bestMatchLength = curMatchLength;
                    }
                  }
                  if (bestMatch)
                    name = this.map[bestMatch] + name.substr(bestMatch.length);
                }
                return normalize.call(this, name, parentName, parentAddress);
              };
            });
            hook('normalize', function(normalize) {
              return function(name, parentName) {
                var normalized = normalize.call(this, name, parentName);
                if (this.has(normalized))
                  return normalized;
                if (isBrowser)
                  normalized = normalized.replace(/#/g, '%23');
                if (normalized.match(absURLRegEx)) {
                  if (this.defaultJSExtensions && normalized.substr(normalized.length - 3, 3) != '.js')
                    normalized += '.js';
                  return normalized;
                }
                normalized = applyPaths(this.paths, normalized) || normalized;
                if (this.defaultJSExtensions && normalized.substr(normalized.length - 3, 3) != '.js')
                  normalized += '.js';
                if (normalized[0] == '.' || normalized[0] == '/')
                  return new URL(normalized, baseURIObj).href;
                else
                  return new URL(normalized, getBaseURLObj.call(this)).href;
              };
            });
            (function() {
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.packages = {};
                  this.packagePaths = {};
                };
              });
              function getPackage(name) {
                var curPkg,
                    curPkgLen = 0,
                    pkgLen;
                for (var p in this.packages) {
                  if (name.substr(0, p.length) === p && (name.length === p.length || name[p.length] === '/')) {
                    pkgLen = p.split('/').length;
                    if (pkgLen > curPkgLen) {
                      curPkg = p;
                      curPkgLen = pkgLen;
                    }
                  }
                }
                return curPkg;
              }
              function applyMap(map, name) {
                var bestMatch,
                    bestMatchLength = 0;
                for (var p in map) {
                  if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
                    var curMatchLength = p.split('/').length;
                    if (curMatchLength <= bestMatchLength)
                      continue;
                    bestMatch = p;
                    bestMatchLength = curMatchLength;
                  }
                }
                return bestMatch;
              }
              function envMap(loader, pkgName, pkgMap, name) {
                var map = applyMap(pkgMap, name);
                var mapped = pkgMap[map];
                if (mapped) {
                  if ((typeof mapped === 'undefined' ? 'undefined' : $traceurRuntime.typeof(mapped)) == 'object') {
                    return loader['import'](pkgMap['@env'] || '@system-env', pkgName).then(function(env) {
                      for (var e in mapped) {
                        var negate = e[0] == '~';
                        var value = readMemberExpression(negate ? e.substr(1) : e, env);
                        if (!negate && value || negate && !value)
                          return mapped[e] + name.substr(map.length);
                      }
                    });
                  } else {
                    return mapped + name.substr(map.length);
                  }
                }
              }
              function getBasePath(pkg) {
                var basePath = pkg.basePath && pkg.basePath != '.' ? pkg.basePath : '';
                if (basePath) {
                  if (basePath.substr(0, 2) == './')
                    basePath = basePath.substr(2);
                  if (basePath[basePath.length - 1] != '/')
                    basePath += '/';
                }
                return basePath;
              }
              function applyPackageConfig(normalized, pkgName, sync, defaultJSExtension) {
                var loader = this;
                var pkg = loader.packages[pkgName];
                var basePath = getBasePath(pkg);
                if (pkgName === normalized && pkg.main)
                  normalized += '/' + (pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main);
                if (normalized.length == pkgName.length + 1 && normalized[pkgName.length] == '/')
                  return normalized + (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js' ? '.js' : '');
                var defaultExtension = '';
                if (!pkg.meta || !(pkg.meta[normalized.substr(pkgName.length + 1)] || pkg.meta['./' + normalized.substr(pkgName.length + 1)])) {
                  if ('defaultExtension' in pkg && pkgName !== normalized && normalized[normalized.length - 1] != '/') {
                    if (pkg.defaultExtension !== false && (normalized.split('/').pop().lastIndexOf('.') == -1))
                      defaultExtension = '.' + pkg.defaultExtension;
                  } else if (defaultJSExtension) {
                    defaultExtension = '.js';
                  }
                }
                if (normalized.length == pkgName.length)
                  return normalized + defaultExtension;
                if (sync || !pkg.map)
                  return pkgName + '/' + basePath + normalized.substr(pkgName.length + 1) + defaultExtension;
                var subPath = '.' + normalized.substr(pkgName.length);
                return Promise.resolve(envMap(loader, pkgName, pkg.map, subPath)).then(function(mapped) {
                  if (mapped)
                    return mapped;
                  if (defaultExtension)
                    return envMap(loader, pkgName, pkg.map, subPath + defaultExtension);
                }).then(function(mapped) {
                  if (mapped) {
                    if (mapped == '.')
                      return loader.normalizeSync(pkgName);
                    else if (mapped.substr(0, 2) == './')
                      return pkgName + '/' + basePath + mapped.substr(2);
                    else
                      return loader.normalize.call(loader, mapped);
                  } else
                    return pkgName + '/' + basePath + normalized.substr(pkgName.length + 1) + defaultExtension;
                });
              }
              var packagePathsRegExps = {};
              var pkgConfigPromises = {};
              function createPackageNormalize(normalize, sync) {
                return function(name, parentName) {
                  if (parentName) {
                    var parentPackage = getPackage.call(this, parentName) || this.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' && getPackage.call(this, parentName.substr(0, parentName.length - 3));
                  }
                  if (parentPackage && name[0] !== '.') {
                    var parentMap = this.packages[parentPackage].map;
                    if (parentMap) {
                      var map = applyMap(parentMap, name);
                      if (map) {
                        name = parentMap[map] + name.substr(map.length);
                        if (name[0] === '.')
                          parentName = parentPackage + '/';
                      }
                    }
                  }
                  var defaultJSExtension = this.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
                  var normalized = normalize.call(this, name, parentName);
                  if (normalized.substr(normalized.length - 3, 3) != '.js')
                    defaultJSExtension = false;
                  if (defaultJSExtension)
                    normalized = normalized.substr(0, normalized.length - 3);
                  var pkgName = getPackage.call(this, normalized);
                  var loader = this;
                  if (!sync) {
                    var pkgPath;
                    for (var i = 0; i < this.packagePaths.length; i++) {
                      var match = normalized.match(packagePathsRegExps[this.packagePaths[i]] || (packagePathsRegExps[this.packagePaths[i]] = new RegExp('^(' + this.packagePaths[i].replace(/\*/g, '[^\\/]+') + ')(\/|$)')));
                      if (match) {
                        pkgPath = match[1];
                        break;
                      }
                    }
                    if (pkgPath && (!pkgName || pkgName != pkgPath || loader.packages[pkgName].loadConfig !== false)) {
                      return (pkgConfigPromises[pkgPath] || (pkgConfigPromises[pkgPath] = loader['fetch']({
                        name: pkgPath + '.json',
                        address: pkgPath + '.json',
                        metadata: {}
                      }).then(function(source) {
                        try {
                          return JSON.parse(source);
                        } catch (e) {
                          throw new Error('Invalid JSON in package configuration file ' + pkgPath);
                        }
                      }).then(function(cfg) {
                        if (pkgName && pkgName == pkgPath)
                          extendMeta(cfg, loader.packages[pkgPath]);
                        loader.packages[pkgPath] = cfg;
                      }))).then(function() {
                        return applyPackageConfig.call(loader, normalized, pkgPath, sync, defaultJSExtension);
                      });
                    }
                  }
                  if (pkgName)
                    return applyPackageConfig.call(loader, normalized, pkgName, sync, defaultJSExtension);
                  if (defaultJSExtension)
                    normalized += '.js';
                  return normalized;
                };
              }
              SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.normalize;
              hook('normalizeSync', function(normalize) {
                return createPackageNormalize(normalize, true);
              });
              hook('normalize', function(normalize) {
                return createPackageNormalize(normalize, false);
              });
              hook('locate', function(locate) {
                return function(load) {
                  var loader = this;
                  return Promise.resolve(locate.call(this, load)).then(function(address) {
                    var pkgName = getPackage.call(loader, load.name);
                    if (pkgName) {
                      var pkg = loader.packages[pkgName];
                      var basePath = getBasePath(pkg);
                      if (pkg.format)
                        load.metadata.format = load.metadata.format || pkg.format;
                      if (pkg.loader)
                        load.metadata.loader = load.metadata.loader || pkg.loader;
                      if (pkg.meta) {
                        var meta = {};
                        var bestDepth = 0;
                        var wildcardIndex;
                        for (var module in pkg.meta) {
                          var dotRel = module.substr(0, 2) == './' ? './' : '';
                          if (dotRel)
                            module = module.substr(2);
                          wildcardIndex = module.indexOf('*');
                          if (wildcardIndex === -1)
                            continue;
                          if (basePath + module.substr(0, wildcardIndex) === load.name.substr(pkgName.length + 1, wildcardIndex + basePath.length) && module.substr(wildcardIndex + 1) === load.name.substr(load.name.length - module.length + wildcardIndex + 1)) {
                            var depth = module.split('/').length;
                            if (depth > bestDepth)
                              bestDetph = depth;
                            extendMeta(meta, pkg.meta[dotRel + module], bestDepth != depth);
                          }
                        }
                        var metaName = load.name.substr(pkgName.length + basePath.length + 1);
                        var exactMeta = pkg.meta[metaName] || pkg.meta['./' + metaName];
                        if (exactMeta && load.name.substr(pkgName.length + 1, basePath.length) == basePath)
                          extendMeta(meta, exactMeta);
                        if (meta.alias && meta.alias.substr(0, 2) == './')
                          meta.alias = pkgName + meta.alias.substr(1);
                        if (meta.loader && meta.loader.substr(0, 2) == './')
                          meta.loader = pkgName + meta.loader.substr(1);
                        extendMeta(load.metadata, meta);
                      }
                    }
                    return address;
                  });
                };
              });
            })();
            (function() {
              function normalizePlugin(normalize, name, parentName, sync) {
                var loader = this;
                if (parentName) {
                  var parentPluginIndex;
                  if (loader.pluginFirst) {
                    if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
                      parentName = parentName.substr(parentPluginIndex + 1);
                  } else {
                    if ((parentPluginIndex = parentName.indexOf('!')) != -1)
                      parentName = parentName.substr(0, parentPluginIndex);
                  }
                }
                var pluginIndex = name.lastIndexOf('!');
                if (pluginIndex != -1) {
                  var normalizePluginParts = function(argumentName, pluginName) {
                    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
                      argumentName = argumentName.substr(0, argumentName.length - 3);
                    if (loader.pluginFirst) {
                      return pluginName + '!' + argumentName;
                    } else {
                      return argumentName + '!' + pluginName;
                    }
                  };
                  var argumentName;
                  var pluginName;
                  if (loader.pluginFirst) {
                    argumentName = name.substr(pluginIndex + 1);
                    pluginName = name.substr(0, pluginIndex);
                  } else {
                    argumentName = name.substr(0, pluginIndex);
                    pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
                  }
                  var defaultExtension = loader.defaultJSExtensions && argumentName.substr(argumentName.length - 3, 3) != '.js';
                  if (sync) {
                    argumentName = loader.normalizeSync(argumentName, parentName);
                    pluginName = loader.normalizeSync(pluginName, parentName);
                    return normalizePluginParts(argumentName, pluginName);
                  } else {
                    return Promise.all([loader.normalize(argumentName, parentName), loader.normalize(pluginName, parentName)]).then(function(normalized) {
                      return normalizePluginParts(normalized[0], normalized[1]);
                    });
                  }
                } else {
                  return normalize.call(loader, name, parentName);
                }
              }
              hook('normalize', function(normalize) {
                return function(name, parentName) {
                  return normalizePlugin.call(this, normalize, name, parentName, false);
                };
              });
              hook('normalizeSync', function(normalizeSync) {
                return function(name, parentName) {
                  return normalizePlugin.call(this, normalizeSync, name, parentName, true);
                };
              });
              hook('locate', function(locate) {
                return function(load) {
                  var loader = this;
                  var name = load.name;
                  var pluginSyntaxIndex;
                  if (loader.pluginFirst) {
                    if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
                      load.metadata.loader = name.substr(0, pluginSyntaxIndex);
                      load.name = name.substr(pluginSyntaxIndex + 1);
                    }
                  } else {
                    if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
                      load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
                      load.name = name.substr(0, pluginSyntaxIndex);
                    }
                  }
                  return locate.call(loader, load).then(function(address) {
                    var plugin = load.metadata.loader;
                    if (!plugin)
                      return address;
                    if (loader.defined && loader.defined[name])
                      return address;
                    var pluginLoader = loader.pluginLoader || loader;
                    return pluginLoader['import'](plugin).then(function(loaderModule) {
                      load.metadata.loaderModule = loaderModule;
                      load.address = address;
                      if (loaderModule.locate)
                        return loaderModule.locate.call(loader, load);
                      return address;
                    });
                  });
                };
              });
              hook('fetch', function(fetch) {
                return function(load) {
                  var loader = this;
                  if (load.metadata.loaderModule && load.metadata.loaderModule.fetch) {
                    load.metadata.scriptLoad = false;
                    return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
                      return fetch.call(loader, load);
                    });
                  } else {
                    return fetch.call(loader, load);
                  }
                };
              });
              hook('translate', function(translate) {
                return function(load) {
                  var loader = this;
                  if (load.metadata.loaderModule && load.metadata.loaderModule.translate)
                    return Promise.resolve(load.metadata.loaderModule.translate.call(loader, load)).then(function(result) {
                      if (typeof result == 'string')
                        load.source = result;
                      return translate.call(loader, load);
                    });
                  else
                    return translate.call(loader, load);
                };
              });
              hook('instantiate', function(instantiate) {
                return function(load) {
                  var loader = this;
                  var sourceMap = load.metadata.sourceMap;
                  if (sourceMap && (typeof sourceMap === 'undefined' ? 'undefined' : $traceurRuntime.typeof(sourceMap)) == 'object') {
                    var originalName = load.name.split('!')[0];
                    sourceMap.file = originalName + '!transpiled';
                    if (!sourceMap.sources || sourceMap.sources.length == 1)
                      sourceMap.sources = [originalName];
                    load.metadata.sourceMap = JSON.stringify(sourceMap);
                  }
                  if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate)
                    return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load)).then(function(result) {
                      load.metadata.format = 'defined';
                      load.metadata.execute = function() {
                        return result;
                      };
                      return instantiate.call(loader, load);
                    });
                  else
                    return instantiate.call(loader, load);
                };
              });
            })();
            (function() {
              hook('fetch', function(fetch) {
                return function(load) {
                  var alias = load.metadata.alias;
                  var aliasDeps = load.metadata.deps || [];
                  if (alias) {
                    load.metadata.format = 'defined';
                    this.defined[load.name] = {
                      declarative: true,
                      deps: aliasDeps.concat([alias]),
                      declare: function(_export) {
                        return {
                          setters: [function(module) {
                            for (var p in module)
                              _export(p, module[p]);
                          }],
                          execute: function() {}
                        };
                      }
                    };
                    return '';
                  }
                  return fetch.call(this, load);
                };
              });
            })();
            (function() {
              hookConstructor(function(constructor) {
                return function() {
                  this.meta = {};
                  constructor.call(this);
                };
              });
              hook('locate', function(locate) {
                return function(load) {
                  var meta = this.meta;
                  var name = load.name;
                  var bestDepth = 0;
                  var wildcardIndex;
                  for (var module in meta) {
                    wildcardIndex = module.indexOf('*');
                    if (wildcardIndex === -1)
                      continue;
                    if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex) && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
                      var depth = module.split('/').length;
                      if (depth > bestDepth)
                        bestDetph = depth;
                      extendMeta(load.metadata, meta[module], bestDepth != depth);
                    }
                  }
                  if (meta[name])
                    extendMeta(load.metadata, meta[name]);
                  return locate.call(this, load);
                };
              });
              var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
              var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;
              function setMetaProperty(target, p, value) {
                var pParts = p.split('.');
                var curPart;
                while (pParts.length > 1) {
                  curPart = pParts.shift();
                  target = target[curPart] = target[curPart] || {};
                }
                curPart = pParts.shift();
                if (!(curPart in target))
                  target[curPart] = value;
              }
              hook('translate', function(translate) {
                return function(load) {
                  var meta = load.source.match(metaRegEx);
                  if (meta) {
                    var metaParts = meta[0].match(metaPartRegEx);
                    for (var i = 0; i < metaParts.length; i++) {
                      var curPart = metaParts[i];
                      var len = curPart.length;
                      var firstChar = curPart.substr(0, 1);
                      if (curPart.substr(len - 1, 1) == ';')
                        len--;
                      if (firstChar != '"' && firstChar != "'")
                        continue;
                      var metaString = curPart.substr(1, curPart.length - 3);
                      var metaName = metaString.substr(0, metaString.indexOf(' '));
                      if (metaName) {
                        var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);
                        if (metaName.substr(metaName.length - 2, 2) == '[]') {
                          metaName = metaName.substr(0, metaName.length - 2);
                          load.metadata[metaName] = load.metadata[metaName] || [];
                        }
                        if (load.metadata[metaName] instanceof Array)
                          load.metadata[metaName].push(metaValue);
                        else
                          setMetaProperty(load.metadata, metaName, metaValue);
                      } else {
                        load.metadata[metaString] = true;
                      }
                    }
                  }
                  return translate.call(this, load);
                };
              });
            })();
            (function() {
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.bundles = {};
                  this.loadedBundles_ = {};
                };
              });
              function loadFromBundle(loader, bundle) {
                return Promise.resolve(loader.normalize(bundle)).then(function(normalized) {
                  loader.loadedBundles_[normalized] = true;
                  loader.bundles[normalized] = loader.bundles[normalized] || loader.bundles[bundle];
                  return loader.load(normalized);
                }).then(function() {
                  return '';
                });
              }
              hook('locate', function(locate) {
                return function(load) {
                  if (load.name in this.loadedBundles_ || load.name in this.bundles)
                    load.metadata.bundle = true;
                  return locate.call(this, load);
                };
              });
              hook('fetch', function(fetch) {
                return function(load) {
                  var loader = this;
                  if (loader.trace || loader.builder)
                    return fetch.call(loader, load);
                  if (load.name in loader.defined)
                    return '';
                  for (var b in loader.loadedBundles_) {
                    if (indexOf.call(loader.bundles[b], load.name) != -1)
                      return loadFromBundle(loader, b);
                  }
                  for (var b in loader.bundles) {
                    if (indexOf.call(loader.bundles[b], load.name) != -1)
                      return loadFromBundle(loader, b);
                  }
                  return fetch.call(loader, load);
                };
              });
            })();
            (function() {
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.depCache = {};
                };
              });
              hook('locate', function(locate) {
                return function(load) {
                  var loader = this;
                  var deps = loader.depCache[load.name];
                  if (deps)
                    for (var i = 0; i < deps.length; i++)
                      loader['import'](deps[i]);
                  return locate.call(loader, load);
                };
              });
            })();
            (function() {
              var conditionalRegEx = /#\{[^\}]+\}|#\?.+$/;
              hookConstructor(function(constructor) {
                return function() {
                  constructor.call(this);
                  this.set('@system-env', this.newModule({
                    browser: isBrowser,
                    node: !!this._nodeRequire
                  }));
                };
              });
              hook('normalize', function(normalize) {
                return function(name, parentName, parentAddress) {
                  var loader = this;
                  var conditionalMatch = name.match(conditionalRegEx);
                  if (conditionalMatch) {
                    var substitution = conditionalMatch[0][1] != '?';
                    var conditionModule = substitution ? conditionalMatch[0].substr(2, conditionalMatch[0].length - 3) : conditionalMatch[0].substr(2);
                    if (conditionModule[0] == '.' || conditionModule.indexOf('/') != -1)
                      throw new TypeError('Invalid condition ' + conditionalMatch[0] + '\n\tCondition modules cannot contain . or / in the name.');
                    var conditionExport;
                    var conditionExportIndex = conditionModule.indexOf('.');
                    if (conditionExportIndex != -1) {
                      conditionExport = conditionModule.substr(conditionExportIndex + 1);
                      conditionModule = conditionModule.substr(0, conditionExportIndex);
                    }
                    var booleanNegation = !substitution && conditionModule[0] == '~';
                    if (booleanNegation)
                      conditionModule = conditionModule.substr(1);
                    var pluginLoader = loader.pluginLoader || loader;
                    return pluginLoader['import'](conditionModule, parentName, parentAddress).then(function(m) {
                      if (conditionExport === undefined) {
                        if (typeof m == 'string')
                          return m;
                        else
                          return m['default'];
                      }
                      return readMemberExpression(conditionExport, m);
                    }).then(function(conditionValue) {
                      if (substitution) {
                        if (typeof conditionValue !== 'string')
                          throw new TypeError('The condition value for ' + conditionModule + ' doesn\'t resolve to a string.');
                        name = name.replace(conditionalRegEx, conditionValue);
                      } else {
                        if (typeof conditionValue !== 'boolean')
                          throw new TypeError('The condition value for ' + conditionModule + ' isn\'t resolving to a boolean.');
                        if (booleanNegation)
                          conditionValue = !conditionValue;
                        if (!conditionValue)
                          name = '@empty';
                        else
                          name = name.replace(conditionalRegEx, '');
                      }
                      return normalize.call(loader, name, parentName, parentAddress);
                    });
                  }
                  return Promise.resolve(normalize.call(loader, name, parentName, parentAddress));
                };
              });
            })();
            System = new SystemJSLoader();
            System.constructor = SystemJSLoader;
            if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === 'object')
              module.exports = Loader;
            __global.Reflect = __global.Reflect || {};
            __global.Reflect.Loader = __global.Reflect.Loader || Loader;
            __global.Reflect.global = __global.Reflect.global || __global;
            __global.LoaderPolyfill = Loader;
            if (!System) {
              System = new SystemLoader();
              System.constructor = SystemLoader;
            }
            if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === 'object')
              module.exports = System;
            __global.System = System;
          })(typeof self != 'undefined' ? self : global);
        }
        try {
          var hasURL = typeof URLPolyfill != 'undefined' || new URL('test:///').protocol == 'test:';
        } catch (e) {}
        if (typeof Promise === 'undefined' || !hasURL) {
          if (typeof document !== 'undefined') {
            var scripts = document.getElementsByTagName('script');
            $__curScript = scripts[scripts.length - 1];
            var curPath = $__curScript.src;
            var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
            window.systemJSBootstrap = bootstrap;
            document.write('<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>');
          } else if (typeof importScripts !== 'undefined') {
            var basePath = '';
            try {
              throw new Error('_');
            } catch (e) {
              e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
                basePath = url.replace(/\/[^\/]*$/, '/');
              });
            }
            importScripts(basePath + 'system-polyfills.js');
            bootstrap();
          } else {
            bootstrap();
          }
        } else {
          bootstrap();
        }
      })();
    }
  };
});
