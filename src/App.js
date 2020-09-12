import React, { Component } from 'react';
import Welcome from './demo/Welcome';
import ObjsDemo from './demo/ObjsDemo';

export default class App extends Component {
  constructor() {
    super();
    this.state = { demo: Welcome };
  }
  render() {
    let DemoTarget = this.state.demo;
    return (
      <>
        <div>
          <button
            onClick={() => {
              this.setState({ demo: Welcome });
            }}>
            首页
          </button>
          <button
            onClick={() => {
              this.setState({ demo: ObjsDemo });
            }}>
            演示Objs
          </button>
        </div>
        <div>
          <DemoTarget />
        </div>
      </>
    );
  }
}
