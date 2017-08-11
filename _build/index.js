'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateDOMElem(props, propName, componentName) {
  var prop = props[propName];
  if (prop != undefined && prop instanceof Element === false) {
    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
  }
}

var Mounter = (_temp2 = _class = function (_PureComponent) {
  (0, _inherits3.default)(Mounter, _PureComponent);

  function Mounter() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Mounter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Mounter.__proto__ || (0, _getPrototypeOf2.default)(Mounter)).call.apply(_ref, [this].concat(args))), _this), _this.container = document.createElement('div'), _this.getContainer = function () {
      return _this.container;
    }, _this.destroy = function () {
      (0, _reactDom.unmountComponentAtNode)(_this.container);
      _this.container.remove();
    }, _this.mounted = function (_ref2) {
      var children = _ref2.children,
          rest = (0, _objectWithoutProperties3.default)(_ref2, ['children']);

      (0, _reactDom.render)(_react2.default.createElement(
        'div',
        rest,
        children
      ), _this.container);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Mounter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          root = _props.root,
          other = (0, _objectWithoutProperties3.default)(_props, ['root']);

      root.appendChild(this.container);
      this.mounted(other);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroy();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var root = nextProps.root,
          other = (0, _objectWithoutProperties3.default)(nextProps, ['root']);

      this.mounted(other);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Mounter;
}(_react.PureComponent), _class.uiName = 'Mounter', _class.propTypes = {
  root: validateDOMElem
}, _class.defaultProps = {
  root: document.body
}, _temp2);
exports.default = Mounter;


Mounter.mount = function (component, props) {
  var container = document.createElement('div');
  var rendered = (0, _reactDom.render)((0, _react.cloneElement)(component, props), container);
  return {
    getComponent: function getComponent() {
      return rendered;
    },
    updateProps: function updateProps(props, callback) {
      rendered = (0, _reactDom.render)((0, _react.cloneElement)(component, (0, _extends3.default)({}, rendered.props, props)), container, callback);
    }
  };
};