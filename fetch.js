'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var pagedGet = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(method, options) {
    var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var pageSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 100;
    var aggregatedResponse = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var reviews;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return method((0, _extends3.default)({}, options, {
              page: page,
              pageSize: pageSize
            }));

          case 2:
            reviews = _context2.sent;


            if (!aggregatedResponse) {
              aggregatedResponse = reviews;
            } else {
              aggregatedResponse = aggregatedResponse.concat(reviews);
            }

            if (!(reviews.length > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', pagedGet(method, options, page + 1, pageSize, aggregatedResponse));

          case 6:
            return _context2.abrupt('return', aggregatedResponse);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function pagedGet(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _yotpo = require('./yotpo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
    var appKey = _ref2.appKey,
        appSecret = _ref2.appSecret,
        meta = _ref2.meta;
    var accessToken, reviewQuery, reviews, bottomlines;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.time('Fetch Yotpo reviews');
            console.log('Starting to fetch reviews from Yotpo');

            _context.next = 4;
            return (0, _yotpo.getAccessToken)({
              appKey: appKey,
              appSecret: appSecret
            });

          case 4:
            accessToken = _context.sent;
            reviewQuery = meta ? _yotpo.allReviewsWithMeta : _yotpo.allReviews;
            _context.next = 8;
            return pagedGet(reviewQuery, {
              appKey: appKey,
              accessToken: accessToken
            });

          case 8:
            reviews = _context.sent;
            _context.next = 11;
            return pagedGet(_yotpo.allBottomlines, {
              appKey: appKey,
              accessToken: accessToken
            });

          case 11:
            bottomlines = _context.sent;


            console.timeEnd('Fetch Yotpo reviews');

            return _context.abrupt('return', {
              reviews: reviews,
              bottomlines: bottomlines
            });

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();