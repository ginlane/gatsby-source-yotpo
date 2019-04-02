'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allBottomlines = exports.allReviews = exports.allReviewsWithMeta = exports.metaData = exports.getAccessToken = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewOption = function reviewOption(appKey, accessToken, page, pageSize) {
  return {
    method: 'GET',
    url: 'https://api.yotpo.com/v1/apps/' + appKey + '/reviews',
    qs: {
      utoken: accessToken,
      page: page,
      count: pageSize
    },
    json: true
  };
};

var getAccessToken = exports.getAccessToken = function getAccessToken(_ref) {
  var appKey = _ref.appKey,
      appSecret = _ref.appSecret,
      page = _ref.page,
      pageSize = _ref.pageSize;

  var options = {
    method: 'POST',
    url: 'https://api.yotpo.com/oauth/token',
    json: {
      client_id: appKey,
      client_secret: appSecret,
      grant_type: 'client_credentials'
    }
  };

  return new _promise2.default(function (resolve, reject) {
    (0, _request2.default)(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body.access_token);
    });
  });
};

var metaData = exports.metaData = function metaData(_ref2) {
  var appKey = _ref2.appKey,
      accessToken = _ref2.accessToken,
      reviewId = _ref2.reviewId;

  var options = {
    method: 'GET',
    url: 'https://api.yotpo.com/v1/apps/' + appKey + '/reviews/' + reviewId + '/metadata',
    qs: {
      utoken: accessToken
    },
    json: true
  };

  return new _promise2.default(function (resolve, reject) {
    (0, _request2.default)(options, function (error, response, body) {
      if (error) reject(error);
      resolve(body.response);
    });
  });
};

var getAllReviewsWithMeta = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
    var appKey = _ref4.appKey,
        accessToken = _ref4.accessToken,
        page = _ref4.page,
        pageSize = _ref4.pageSize;
    var reviews, mergedReviews;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return allReviews({ appKey: appKey, accessToken: accessToken, page: page, pageSize: pageSize });

          case 2:
            reviews = _context2.sent;
            _context2.next = 5;
            return _promise2.default.all(reviews.map(function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(review) {
                var reviewId, reviewMeta;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        reviewId = review.id;
                        _context.next = 3;
                        return metaData({ appKey: appKey, accessToken: accessToken, reviewId: reviewId });

                      case 3:
                        reviewMeta = _context.sent;
                        return _context.abrupt('return', (0, _extends3.default)({}, review, { meta: reviewMeta.payload }));

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref5.apply(this, arguments);
              };
            }()));

          case 5:
            mergedReviews = _context2.sent;
            return _context2.abrupt('return', mergedReviews);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getAllReviewsWithMeta(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var allReviewsWithMeta = exports.allReviewsWithMeta = function allReviewsWithMeta(_ref6) {
  var appKey = _ref6.appKey,
      accessToken = _ref6.accessToken,
      page = _ref6.page,
      pageSize = _ref6.pageSize;

  return new _promise2.default(function (resolve, reject) {
    var reviewsWithMeta = getAllReviewsWithMeta({ appKey: appKey, accessToken: accessToken, page: page, pageSize: pageSize });
    resolve(reviewsWithMeta);
  });
};

var allReviews = exports.allReviews = function allReviews(_ref7) {
  var appKey = _ref7.appKey,
      accessToken = _ref7.accessToken,
      page = _ref7.page,
      pageSize = _ref7.pageSize;
  return new _promise2.default(function (resolve, reject) {
    (0, _request2.default)(reviewOption(appKey, accessToken, page, pageSize), function (error, response, body) {
      if (error) reject(error);
      resolve(body.reviews);
    });
  });
};

var allBottomlines = exports.allBottomlines = function allBottomlines(_ref8) {
  var appKey = _ref8.appKey,
      page = _ref8.page,
      pageSize = _ref8.pageSize;

  var options = {
    method: 'GET',
    url: 'https://api.yotpo.com/v1/apps/' + appKey + '/bottom_lines',
    qs: {
      page: page,
      count: pageSize
    },
    json: true
  };

  return new _promise2.default(function (resolve, reject) {
    (0, _request2.default)(options, function (error, response, body) {
      if (error) reject(error);

      resolve(body.response.bottomlines);
    });
  });
};