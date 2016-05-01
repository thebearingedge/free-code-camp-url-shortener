'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bases = require('bases');

var _validUrl = require('valid-url');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;
var hostname = process.env.NODE_ENV === 'production' ? 'https://intense-reaches-14844.herokuapp.com' : 'localhost:' + port;

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  return res.send('hello app');
});

app.get('/new/*', function (_ref, res) {
  var params = _ref.params;


  var url = params[0];

  if (!(0, _validUrl.isUri)(url)) {

    return res.status(400).json({ error: 'URL Invalid' });
  }

  return _db2.default.insert({ url: url }).into('urls').returning('id').then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1);

    var id = _ref3[0];


    var original_url = url;
    var shortened_url = hostname + '/' + (0, _bases.toBase26)(id);

    return res.json({ original_url: original_url, shortened_url: shortened_url });
  });
});

app.get('/*', function (_ref4, res) {
  var params = _ref4.params;


  var id = (0, _bases.fromBase26)(params[0]);

  return _db2.default.from('urls').where({ id: id }).first().then(function (result) {
    return result ? res.redirect(result.url) : res.status(404).send('Not Found');
  });
});

app.listen(port);