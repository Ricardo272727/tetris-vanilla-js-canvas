// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"tetris.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.body.style.padding = '0px';
document.body.style.margin = '0px'; // Los objetos se dibujaran en unas coordenadas especificas,
// tendran un metodo draw(x,y, degs)
//  este metodo va a renderizar a partir de unas coordenadas
//  x,y sera la coordenada de la esquina superior izquierda
//  de la figura
// 
// La clase de manejo necesita verificar en que coordenadas 
// puede una figura renderizarse 

var Square = /*#__PURE__*/function () {
  function Square(color, step, ctx) {
    _classCallCheck(this, Square);

    this.id = Math.random() + '-sq';
    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.width = this.height = 15;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  _createClass(Square, [{
    key: "draw",
    value: function draw(x, y) {
      this.x = x;
      this.y = y;
      this.ctx.save();
      this.ctx.fillStyle = this.color;
      this.ctx.translate(x, y);
      this.ctx.fillRect(0, 0, 15, 15);
      this.ctx.restore();
    }
  }, {
    key: "drawLastPos",
    value: function drawLastPos() {
      this.draw(this.x, this.y);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.draw(this.x, this.y + this.step);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.draw(this.x - this.step, this.y);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.draw(this.x + this.step, this.y);
    }
  }]);

  return Square;
}(); // clase L TODO: actualizar width and height con las rotaciones


var L = /*#__PURE__*/function () {
  function L(color, step, ctx) {
    _classCallCheck(this, L);

    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  _createClass(L, [{
    key: "draw",
    value: function draw(x, y) {
      var degs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.x = x;
      this.y = y;
      var ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(degs);
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, 15, 30);
      ctx.fillRect(15, 15, 45, 15);
      ctx.restore();
    }
  }, {
    key: "drawLastPos",
    value: function drawLastPos() {
      this.draw(this.x, this.y);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.draw(this.x - this.step, this.y);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.draw(this.x + this.step, this.y);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.draw(this.x, this.y + this.step);
    }
  }]);

  return L;
}(); // clase I


var I = /*#__PURE__*/function () {
  function I(color, step, ctx) {
    _classCallCheck(this, I);

    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.width = 45;
    this.height = 15;
    this.degs = 0;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  _createClass(I, [{
    key: "draw",
    value: function draw(x, y) {
      this.x = x;
      this.y = y;
      var ctx = this.ctx;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.degs);
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, 45, 15);
      ctx.restore();
    }
  }, {
    key: "drawLastPos",
    value: function drawLastPos() {
      this.draw(this.x, this.y);
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.draw(this.x - this.step, this.y);
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.draw(this.x + this.step, this.y);
    }
  }, {
    key: "moveDown",
    value: function moveDown() {
      this.draw(this.x, this.y + this.step);
    }
  }, {
    key: "rotate",
    value: function rotate() {
      console.log('rotating');

      if (this.degs + toRadians(90) === toRadians(360)) {
        this.degs = 0;
      } else {
        this.degs += toRadians(90);
      }
    }
  }]);

  return I;
}();

function init() {
  var tetris = document.getElementById('tetris');
  var ctx = tetris.getContext('2d');
  tetris.style.width = '80vw';
  tetris.style.height = '80vh';
  tetris.style.backgroundColor = '#ccc';
  var draw = createDrawFunc(tetris, ctx);
  draw();
}

function getRandomPosition(width) {
  return parseInt(Math.random() * 1000 % width + 1);
}

function isInInterval(x, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      start = _ref2[0],
      end = _ref2[1];

  return start <= x && x <= end;
}

function pointIsInRegion(x, y, x1, y1, width, height) {
  return isInInterval(x, [x1, x1 + width]) && isInInterval(y, [y1, y1 + height]);
}

function canMoveRight(shape, shapesDrawed) {
  for (var i = 0; i < shapesDrawed.length; i++) {
    if (pointIsInRegion(shape.x + shape.step + shape.width, shape.y, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height) || pointIsInRegion(shape.x + shape.step + shape.width, shape.y + shape.height, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height)) {
      return false;
    }
  }

  return true;
}

function canMoveLeft(shape, shapesDrawed) {
  for (var i = 0; i < shapesDrawed.length; i++) {
    if (pointIsInRegion(shape.x - shape.step, shape.y, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height) || pointIsInRegion(shape.x - shape.step, shape.y + shape.height, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height)) {
      return false;
    }
  }

  return true;
}

function canMoveDown(shape, shapesDrawed) {
  for (var i = 0; i < shapesDrawed.length; i++) {
    if (pointIsInRegion(shape.x, shape.y + shape.step + shape.height, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height) || pointIsInRegion(shape.x + shape.width, shape.y + shape.step + shape.height, shapesDrawed[i].x, shapesDrawed[i].y, shapesDrawed[i].width, shapesDrawed[i].height)) {
      return false;
    }
  }

  return true;
}

function getColor() {
  var colors = ['#1013FC', '#1999FB', '#E85418', '#ECC80A', '#1BF944', '#E7108E'];
  var index = Math.floor(Math.random() * 100) % colors.length;
  return colors[index];
}

var shapes = ['L', 'I', 'S'];
var indexNewShape = -1;

function getNewShape() {
  if (indexNewShape + 1 < shapes.length) indexNewShape++;else indexNewShape = 0;
  console.log(shapes[indexNewShape]);
  return shapes[indexNewShape];
}

function createDrawFunc(canvas, ctx) {
  var step = 5;
  var speed = 200;
  var s = new Square(getColor(), step, ctx);
  var randomPos = getRandomPosition(canvas.width);
  s.draw(randomPos, 0);
  var objects = [];
  objects.push(s);
  var currentObj = objects[0];
  document.addEventListener('keydown', function (ev) {
    ev.preventDefault();

    switch (ev.key) {
      case "ArrowLeft":
        if (currentObj.x > 0 && canMoveLeft(currentObj, objects)) currentObj.moveLeft();
        break;

      case "ArrowRight":
        if (currentObj.x + currentObj.width < canvas.width && canMoveRight(currentObj, objects)) currentObj.moveRight();
        break;

      case "ArrowDown":
        if (currentObj.y + currentObj.height < canvas.height && canMoveDown(currentObj, objects)) currentObj.moveDown();
        break;

      case " ":
        if (currentObj.rotate) currentObj.rotate();
        break;

      default:
        console.log(ev.key);
    }
  });

  var draw = function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentObj.y + currentObj.height < canvas.height && canMoveDown(currentObj, objects)) {
      currentObj.moveDown();
    } else {
      // create new object
      var newShape;

      switch (getNewShape()) {
        case 'S':
          newShape = new Square(getColor(), step, ctx);
          break;

        case 'I':
          newShape = new I(getColor(), step, ctx);
          break;

        case 'L': //newShape = new L(getColor(), step, ctx);

        default:
          newShape = new Square(getColor(), step, ctx);
      }

      objects.push(newShape);
      currentObj = objects[objects.length - 1];
      var pos = getRandomPosition(canvas.width);
      currentObj.draw(pos, 0);
    }

    for (var i = 0; i < objects.length; i++) {
      objects[i].drawLastPos();
    }

    setTimeout(draw, speed);
  };

  return draw;
}

function toRadians(degs) {
  return degs * Math.PI / 180;
}

init();
},{}],"../.nvm/versions/node/v12.18.3/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44257" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../.nvm/versions/node/v12.18.3/lib/node_modules/parcel/src/builtins/hmr-runtime.js","tetris.js"], null)
//# sourceMappingURL=/tetris.0d14a11f.js.map