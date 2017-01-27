import React, { Component } from 'react';
import './App.css';
import FlatButton from 'material-ui/FlatButton';


const LoginPanel = (props) => {
  return (
      <div className="login-panel">
        <input className="login-panel-input" value={props.context.login} placeholder="Логин"/>
        <input className="login-panel-input" value={props.context.password} placeholder="Пароль" type="password"/>
        <FlatButton backgroundColor="yellow" type="submit" label="войти" />
      </div>
  )

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: ''
    }
  }
  render() {
    const name = "Автоматизированная информационная Система Планирования и Контроля Исполнения государственного задания ФГБУ \"НИИ ЦПК имени Ю.А.Гагарина\"";
    const enter=() => {};
    const self = this;
    return (
      <div className="login-view">
        <div className="login-block">
        <h1>{name}</h1>
        <LoginPanel enter={enter} context={self} />
        </div>
      </div>
    );
  }
}

export default App;
