import React, {Component, isValidElement, cloneElement, createElement} from 'react'
import {render, unmountComponentAtNode, createPortal, unstable_renderSubtreeIntoContainer} from 'react-dom'
import PropTypes from 'prop-types'

export default class Mounter extends Component {

  static uiName = 'Mounter';

  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.element , PropTypes.string])
  };

  static defaultProps = {
    component: 'div'
  };

  container = null;

  getContainer = ()=>{
    if(this.container) return this.container;
    let container = document.createElement('div');
    this.container = container;
    document.body.appendChild(container);
    return container;
  };

  getComponent = ()=>{
    const props = this.props;
    const {prefixCls, component, ...rest} = this.props;

    if(isValidElement(component)){
      return cloneElement(component, {...rest})
    }

    return createElement(component, rest);
  }

  removeContainer = () => {
    const container = this.container;
    if(!container) return ;
    if(!createPortal){ unmountComponentAtNode(container); }
    container.parentNode.removeChild(container);
  };

  renderComponent(){
    if(!createPortal){
      unstable_renderSubtreeIntoContainer(this, this.getComponent(), this.getContainer());
    }
  }

  componentDidMount(){
    this.renderComponent();
  }

  componentDidUpdate(){
    this.renderComponent();
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
