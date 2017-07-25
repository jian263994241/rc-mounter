import React, {PureComponent, cloneElement} from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types'

function validateDOMElem (props, propName, componentName){
  const prop = props[propName];
  if (prop != undefined && prop instanceof Element === false) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
}

export default class Mounter extends PureComponent {

  static uiName = 'Mounter';

  static propTypes = {
    root: validateDOMElem
  };

  static defaultProps = {
    root: document.body
  }

  container = document.createElement('div');

  getContainer = ()=>{
    return this.container;
  };

  destroy = ()=>{
    this.container.remove();
  };

  mounted = ({children, ...rest})=>{
    ReactDOM.render(<div {...rest}>{children}</div>, this.container);
  }

  componentDidMount(){
    const {
      root,
      ...other
    } = this.props;
    root.appendChild(this.container);
    this.mounted(other);
  }

  componentWillReceiveProps(nextProps) {
    const {
      root,
      ...other
    } = nextProps;
    this.mounted(other);
  }

  render() {
    return null;
  }

}


Mounter.mount = function (component, props){
  const container = document.createElement('div');
  let rendered = render(cloneElement(component, props), container);
  return {
    getComponent: function(){
      return rendered;
    },
    updateProps: function(props, callback){
      rendered = render(cloneElement(component, Object.assign({}, rendered.props, props)), container, callback);
    }
  };
};
