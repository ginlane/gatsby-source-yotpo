'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _gatsbyNodeHelpers = require('gatsby-node-helpers');

var _gatsbyNodeHelpers2 = _interopRequireDefault(_gatsbyNodeHelpers);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeHelpers = (0, _gatsbyNodeHelpers2.default)({ typePrefix: 'Yotpo' });
var createNodeFactory = nodeHelpers.createNodeFactory,
    generateNodeId = nodeHelpers.generateNodeId;
var sourceNodes = exports.sourceNodes = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(_ref2, pluginOptions) {
    var createNode = _ref2.boundActionCreators.createNode;

    var _ref3, reviews, bottomlines;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!pluginOptions.appKey) {
              console.log('\nMake sure options has appKey');
              process.exit(1);
            }

            if (!pluginOptions.appSecret) {
              console.log('\nMake sure options has appSecret');
              process.exit(1);
            }

            _context5.next = 4;
            return (0, _fetch2.default)({
              appKey: pluginOptions.appKey,
              appSecret: pluginOptions.appSecret,
              meta: pluginOptions.meta || false
            });

          case 4:
            _ref3 = _context5.sent;
            reviews = _ref3.reviews;
            bottomlines = _ref3.bottomlines;
            _context5.next = 9;
            return _promise2.default.all(reviews.map(function () {
              var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(review) {
                var type, Node, data, node;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        type = review.sku === 'yotpo_site_reviews' ? 'SiteReview' : 'ProductReview';
                        Node = createNodeFactory(type, function () {
                          var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(node) {
                            return _regenerator2.default.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    node.dataString = (0, _stringify2.default)(node.data);

                                    return _context.abrupt('return', node);

                                  case 2:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            }, _callee, undefined);
                          }));

                          return function (_x4) {
                            return _ref5.apply(this, arguments);
                          };
                        }());
                        data = {
                          id: review.id,
                          title: review.title,
                          content: review.content,
                          score: review.score,
                          productIdentifier: review.sku.toLowerCase(),
                          sentiment: review.sentiment,
                          votesUp: review.votes_up,
                          votesDown: review.votes_down,
                          name: review.name,
                          email: review.email,
                          reviewerType: review.reviewer_type,
                          createdAt: review.created_at,
                          updatedAt: review.updated_at,
                          meta: review.meta
                        };
                        _context2.next = 5;
                        return Node(data);

                      case 5:
                        node = _context2.sent;

                        createNode(node);

                      case 7:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x3) {
                return _ref4.apply(this, arguments);
              };
            }()), bottomlines.map(function () {
              var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(bottomline) {
                var type, Node, data, node;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        type = bottomline.domain_key === 'yotpo_site_reviews' ? 'SiteBottomline' : 'ProductBottomline';
                        Node = createNodeFactory(type, function () {
                          var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(node) {
                            return _regenerator2.default.wrap(function _callee3$(_context3) {
                              while (1) {
                                switch (_context3.prev = _context3.next) {
                                  case 0:
                                    node.dataString = (0, _stringify2.default)(node.data);

                                    return _context3.abrupt('return', node);

                                  case 2:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            }, _callee3, undefined);
                          }));

                          return function (_x6) {
                            return _ref7.apply(this, arguments);
                          };
                        }());
                        data = {
                          id: bottomline.domain_key,
                          score: bottomline.product_score,
                          totalReviews: bottomline.total_reviews,
                          productIdentifier: bottomline.domain_key.toLowerCase()
                        };
                        _context4.next = 5;
                        return Node(data);

                      case 5:
                        node = _context4.sent;

                        createNode(node);

                      case 7:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x5) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 9:
            return _context5.abrupt('return');

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function sourceNodes(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();