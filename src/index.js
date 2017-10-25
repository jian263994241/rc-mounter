import React, {Component, isValidElement, cloneElement, createElement} from 'react'
import {render, unmountComponentAtNode, createPortal, unstable_renderSubtreeIntoContainer} from 'react-dom'
import PropTypes from 'prop-types'

export default class Mounter extends Component {

  static uiName = 'Mounter';

  static propTypes = {
    prefixCls: PropTypes.string,
    visible: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element , PropTypes.string])
  };

  static defaultProps = {
    prefixCls: 'rc',
    visible: true,
    component: 'div'
  };

  getContainer = ()=>{
    const prefixCls = this.props.prefixCls;
    let container = document.querySelector(`#${prefixCls}-container`);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', `${prefixCls}-container`);
      document.body.appendChild(container);
    }
    return container;
  };

  getComponent = ()=>{
    const props = this.props;
    const {prefixCls, visible, component, ...rest} = this.props;

    if(isValidElement(component)){
      return cloneElement(component, {...rest, visible})
    }

    return createElement(component, rest);
  }

  removeContainer = () => {
    const container = document.querySelector(`#${this.props.prefixCls}-container`);
    if(!container) return ;
    if(!createPortal){ unmountComponentAtNode(container); }
    container.parentNode.removeChild(container);
  };

  renderComponent(){
    if(!createPortal && this.props.visible){
      unstable_renderSubtreeIntoContainer(this, this.getComponent(), this.getContainer());
    }
  }

  componentDidMount(){
    this.renderComponent();
  }

  componentDidUpdate(){
    this.renderComponent();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!(this.props.visible || nextProps.visible);
  }

  componentWillUnmount(){
    this.removeContainer();
  }

  render() {

    if(createPortal){
      return createPortal(this.getComponent(), this.getContainer());
    }

    return null;
  }

}
