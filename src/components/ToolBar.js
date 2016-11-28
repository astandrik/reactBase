import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <FlatButton label="Главная"  />
          <FlatButton label="Неглавная"  />
          <FlatButton label="Побочная"  />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}