import React, {Component, isValidElement, cloneElement, createElement, Fragment} from 'react'
import {render, unmountComponentAtNode, createPortal, unstable_renderSubtreeIntoContainer} from 'react-dom';
import PropTypes from 'prop-types';
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
    this.container = container;

    className && (this.container.className = className);
    style && $style(this.container, style);
    querySelectorAll(document, target)[0].appendChild(this.container);

    return this.container;
  };

  getComponent(){
    const {className, style, target, children, ...rest} = this.props;
    // if(isValidElement(component)){
    //   return cloneElement(component, props);
    // }
    //
    // return createElement(component, props);
    //
    return children;
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
    const {className, style} = nextProps;
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
  target: 'body'
};

Mounter.propTypes = {
  target: PropTypes.string,
  children: PropTypes.element.isRequired
};
