import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import RcMounter from './src/index';


class Example extends Component {

  clickHandler = (e)=>{
    this.state.list.push(e.target.innerText);
    this.forceUpdate();
  }

  reset = (e)=>{
    this.state.list = [];
    this.forceUpdate();
  }

  state = {
    list: []
  }

  render() {

    const Span = (props)=>(
      <div className="elem" {...props}></div>
    )

    return (
      <div>
        <button onClick={this.clickHandler}>Click me.</button>
        <button onClick={this.reset}>reset</button>
      {
        this.state.list.length > 0 && (
          <RcMounter >
            <ul>
              {this.state.list.map((item, key)=>(
                <li key={key}>{item}</li>
              ))}
            </ul>
          </RcMounter>
        )
      }
      </div>
    );
  }
}


ReactDOM.render(<Example/>, document.querySelector('#root'))
