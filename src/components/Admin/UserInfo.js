import React from "react";
import Container from "../Container";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {connect} from 'react-redux';
import {debounce} from "../../helperFunctions";
import Icon from "../../Icons/Icon";
import {StandardField, Panel, DepartmentField} from "../formComponents/ReusableComponents";
const  { DOM: { input, select, textarea } } = React


const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "200px"
}

const  UserInfoComponent =  class UserInfo extends React.Component {
  constructor(props) {
   super(props);
    this.handleDebounce = debounce(this.handleEdit, 400);
  }
  handleEdit(e) {
    setTimeout(() => {this.refs.sbmt.click()});
  }
  render () {
    const props=this.props;
    const user = props.user;
    const {handleSubmit} = props;
    if(!user.name) {
      return <div/>;
    } else {
      return (
        <form onSubmit={handleSubmit} onChange={this.handleDebounce.bind(this)} style={{display:"flex", flexDirection:"column", height: "100%"}}>
          <Container vertical={true}>
            <div className="infoHeader" flex="1">

            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <Panel label="ФИО">
                  <Field name="name" component={StandardField} placeholder="ФИО пользователя"/>
                </Panel>
                <Panel label="Логин в Active Directory">
                  <Field name="login" component={StandardField} placeholder="Логин в Active Directory"/>
                </Panel>
                <Panel label="Отделение штатной структуры">
                  <DepartmentField departments={props.departments} debouncedUpdate={this.handleEdit.bind(this)}/>
                </Panel>
                <Panel label="Должность">
                  <Field name="position" component={StandardField} placeholder="Должность"/>
                </Panel>
                <Panel label="Табельный номер">
                  <Field name="number" component={StandardField} placeholder="Табельный номер"/>
                </Panel>
                <Panel>
                  <label htmlFor="employed">Руководитель</label>
                  <div>
                    <Field name="is_chief" id="employed" component="input" type="checkbox" className="form-checkbox"/>
                  </div>
                </Panel>
                <Panel>
                  <label htmlFor="employed">Администратор</label>
                  <div>
                    <Field name="is_admin" id="employed" component="input" type="checkbox" className="form-checkbox"/>
                  </div>
                </Panel>
                <Panel>
                  <label htmlFor="employed">Заблокирован</label>
                  <div>
                    <Field name="is_banned" id="employed" component="input" type="checkbox" className="form-checkbox"/>
                  </div>
                </Panel>
            </Container>
          </Container>
            <Field name="role" id="employed" component="input" type="text" className="noDisplay"/>
          <input type="submit"  ref="sbmt" style={{display:"none"}}/>
        </form>
        )
      }
    }
}

let taskForm = reduxForm({
  form: "userInfoDialogForm",
  enableReinitialize: true
})(UserInfoComponent);

const selector = formValueSelector('userInfoDialogForm');
taskForm = connect(
  state => {
    return ({
    initialValues: state.Admin.userView
  })}
)(taskForm);

export default taskForm;