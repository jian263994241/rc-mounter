import React, {Component, cloneElement} from 'react'
import {render, unmountComponentAtNode, createPortal, unstable_renderSubtreeIntoContainer} from 'react-dom'
import PropTypes from 'prop-types'

export default class Mounter extends Component {

  static uiName = 'Mounter';

  static propTypes = {
    prefixCls: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'rc',
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
    const {prefixCls, ...rest} = this.props;
    return <div {...rest}></div>;
  }

  removeContainer = () => {
    const container = document.querySelector(`#${this.props.prefixCls}-container`);
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
