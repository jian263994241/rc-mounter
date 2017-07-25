'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var assign = Object.assign || _object2.default;

function validateDOMElem(props, propName, componentName) {
  var prop = props[propName];
  if (prop != undefined && prop instanceof Element === false) {
    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
  }
}

var Mounter = function (_PureComponent) {
  _inherits(Mounter, _PureComponent);

  function Mounter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mounter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mounter.__proto__ || Object.getPrototypeOf(Mounter)).call.apply(_ref, [this].concat(args))), _this), _this.container = document.createElement('div'), _this.getContainer = function () {
      return _this.container;
    }, _this.destroy = function () {
      _this.container.remove();
    }, _this.mounted = function (_ref2) {
      var children = _ref2.children,
          rest = _objectWithoutProperties(_ref2, ['children']);

      ReactDOM.render(_react2.default.createElement(
        'div',
        rest,
        children
      ), _this.container);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mounter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          root = _props.root,
          other = _objectWithoutProperties(_props, ['root']);

      root.appendChild(this.container);
      this.mounted(other);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var root = nextProps.root,
          other = _objectWithoutProperties(nextProps, ['root']);

      this.mounted(other);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Mounter;
}(_react.PureComponent);

Mounter.uiName = 'Mounter';
Mounter.propTypes = {
  root: validateDOMElem
};
Mounter.defaultProps = {
  root: document.body
};
exports.default = Mounter;


Mounter.mount = function (component, props) {
  var container = document.createElement('div');
  var rendered = (0, _reactDom.render)((0, _react.cloneElement)(component, props), container);
  return {
    getComponent: function getComponent() {
      return rendered;
    },
    updateProps: function updateProps(props, callback) {
      rendered = (0, _reactDom.render)((0, _react.cloneElement)(component, assign({}, rendered.props, props)), container, callback);
    }
  };
};
