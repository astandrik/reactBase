import React from "react";
import Container from "../Container";
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {connect} from 'react-redux';
import {debounce} from "../../helperFunctions";
import Icon from "../../Icons/Icon";
import {DescriptionField, Panel, NameField, DepartmentParentField} from "../formComponents/ReusableComponents";


const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const descriptionBlockStyle = {
  minHeight: "200px"
}

const  DepartmentInfoComponent =  class DepartmentInfo extends React.Component {
  constructor(props) {
   super(props);
    this.handleDebounce = debounce(this.handleEdit, 400);
  }
  handleEdit(e) {
    setTimeout(() => {this.refs.sbmt.click()});
  }
  render () {
    const props=this.props;
    const department = props.department;
    const {handleSubmit} = props;
    if(!department.name) {
      return <div/>;
    } else {
      return (
        <form onSubmit={handleSubmit} onChange={this.handleDebounce.bind(this)} style={{display:"flex", flexDirection:"column", height: "100%"}}>
          <Container vertical={true}>
            <div className="infoHeader" flex="1">
              <div style={{marginLeft:"15px"}}>
                <Icon onClick={this.props.deleteDepartment.bind(this, department)} className={`clickable-image ellipsis`} name="rubbish-bin"  />
              </div>
            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <h2 flex="1" containerStyle={headerBlockStyle} style={{margin:"5px", marginBottom: "20px"}}>
                  <Field name="name" placeholder="Название отдела"  component={NameField} />
                </h2>
                <div className="taskPanel" flex="4" containerStyle={descriptionBlockStyle}>
                  <span className="panelLabel"> Описание </span>
                    <span  className="panelText fullWidth">
                      <Field className="fieldValue" name="description" placeholder="Описание" component={DescriptionField}/>
                    </span>
                </div>
                <Panel label="Родительский узел">
                  <DepartmentParentField departments={props.departments} debouncedUpdate={this.handleEdit.bind(this)}/>
                </Panel>
            </Container>
          </Container>
          <input type="submit"  ref="sbmt" style={{display:"none"}}/>
        </form>
        )
      }
    }
}

let taskForm = reduxForm({
  form: "departmentInfoDialogForm",
  enableReinitialize: true
})(DepartmentInfoComponent);

const selector = formValueSelector('departmentInfoDialogForm');
taskForm = connect(
  state => {
    return ({
    initialValues: state.Admin.department
  })}
)(taskForm);

export default taskForm;