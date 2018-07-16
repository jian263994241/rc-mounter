import React, {Component, isValidElement, cloneElement, createElement, Fragment} from 'react'
import {render, unmountComponentAtNode, createPortal, unstable_renderSubtreeIntoContainer} from 'react-dom';
import querySelectorAll from 'dom-helpers/query/querySelectorAll';
import $style from 'dom-helpers/style';

export default class Mounter extends Component {

  constructor(props){
  	super(props)
    this.container = null;
  }

  getContainer(){
    if(this.container) return this.container;
    const container = document.createElement('div');
    const {className, style, target} = this.props;
    className && (container.className = className);
    style && $style(container, style);
    querySelectorAll(document, target)[0].appendChild(container);
    this.container = container;
    return this.container;
  };

  getComponent(){
    const {component, className, style, target, ...rest} = this.props;

    if(isValidElement(component)){
      return cloneElement(component, {...rest})
    }

    return createElement(component, rest);
  }

  removeContainer() {
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

  componentWillReceiveProps(nextProps){
    const {className, style} = this.props;
    const container = this.getContainer();
    className && (container.className = className);
    style && $style(container, style);
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

Mounter.defaultProps = {
  component: Fragment || 'div',
  target: 'body'
};
