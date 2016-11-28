import React, { Component } from 'react';
import './App.css';
import HelloSign from "../components/HelloSign";
import {CounterContainer, PostContainer} from "../containers/Containers";


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {text: 'hui'};
  }
  render() {
    return (
      <PostContainer/>
    );
  }
}

export default App;
