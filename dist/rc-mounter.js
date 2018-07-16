'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _querySelectorAll = require('dom-helpers/query/querySelectorAll');

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mounter = function (_Component) {
  _inherits(Mounter, _Component);

  function Mounter(props) {
    _classCallCheck(this, Mounter);

    var _this = _possibleConstructorReturn(this, (Mounter.__proto__ || Object.getPrototypeOf(Mounter)).call(this, props));

    _this.container = null;
    return _this;
  }

  _createClass(Mounter, [{
    key: 'getContainer',
    value: function getContainer() {
      if (this.container) return this.container;
      var container = document.createElement('div');
      var _props = this.props,
          className = _props.className,
          style = _props.style,
          target = _props.target;

      className && (container.className = className);
      style && (0, _style2.default)(container, style);
      (0, _querySelectorAll2.default)(document, target)[0].appendChild(container);
      this.container = container;
      return this.container;
    }
  }, {
    key: 'getComponent',
    value: function getComponent() {
      var _props2 = this.props,
          component = _props2.component,
          className = _props2.className,
          style = _props2.style,
          target = _props2.target,
          rest = _objectWithoutProperties(_props2, ['component', 'className', 'style', 'target']);

      if ((0, _react.isValidElement)(component)) {
        return (0, _react.cloneElement)(component, _extends({}, rest));
      }

      return (0, _react.createElement)(component, rest);
    }
  }, {
    key: 'removeContainer',
    value: function removeContainer() {
      var container = this.container;
      if (!container) return;
      if (!_reactDom.createPortal) {
        (0, _reactDom.unmountComponentAtNode)(container);
      }
      container.parentNode.removeChild(container);
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      if (!_reactDom.createPortal) {
        (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, this.getComponent(), this.getContainer());
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props3 = this.props,
          className = _props3.className,
          style = _props3.style;

      var container = this.getContainer();
      className && (container.className = className);
      style && (0, _style2.default)(container, style);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderComponent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderComponent();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeContainer();
    }
  }, {
    key: 'render',
    value: function render() {

      if (_reactDom.createPortal) {
        return (0, _reactDom.createPortal)(this.getComponent(), this.getContainer());
      }

      return null;
    }
  }]);

  return Mounter;
}(_react.Component);

exports.default = Mounter;


Mounter.defaultProps = {
  component: _react.Fragment || 'div',
  target: 'body'
};
