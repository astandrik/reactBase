import React from "react";
import Container from "../Container";
import "../styles/TaskInfo.css";
import calendar from "../../Icons/calendar.svg";
import { Field, reduxForm,change } from 'redux-form';
import {connect} from 'react-redux';
import DPicker from "../formComponents/DatePicker";
import {debounce} from "../../helperFunctions";
import TaskCommentsTabContainer from "../../containers/Task/TaskCommentsTabContainer";
import {WorkCodeField, FinancesField,NameField, Panel, HoursField} from "../formComponents/ReusableComponents";
import Icon from "../../Icons/Icon";
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';



const codeBlockStyle = {
  minHeight: "76px"
}

const headerBlockStyle = {
  minHeight: "56px"
}

const ImagePanel = ({acceptTrud, returnToTask, status, declineTrud,rights, deleteTrud}) => (
  <div style={{display: 'flex', justifyContent: "flex-end"}}>
    <div style={{marginRight:"15px", display: "flex", flexDirection:"row"}}>
      <div data-tip="Вернуться">
        <Icon name="cursor" className={`clickable-image comment`} onClick={returnToTask}/>
      </div>
      <ReactTooltip place="top" type="dark" effect="float"/>
      <div data-tip={rights.accept ? "Подтвердить" : "Нет прав на подтверждение"} className={`${(status !== "Новая") ? "noDisplay" : ''} `}>
        <div className={(rights.accept ? "" : "disabled")}>
          <Icon name="acceptTrud" className={`clickable-image comment `  + (rights.accept ? "" : "disabled")} onClick={acceptTrud}/>
        </div>
      </div>
      <ReactTooltip place="top" type="dark" effect="float"/>
      <div data-tip={rights.accept ? "Отклонить" : "Нет прав на отклонение"}>
        <div className={(rights.accept ? "" : "disabled")}>
          <Icon name="decline" className={`clickable-image comment `  + (rights.accept ? "" : "disabled")} onClick={declineTrud}/>
        </div>
      </div>
      <ReactTooltip place="top" type="dark" effect="float"/>
    </div>
    <div style={{width:"1px", borderRight: "1px solid black"}}></div>
    <div style={{marginLeft:"15px"}} data-tip={rights.delete ? "Удалить" : "Нет прав на удаление"}>
      <Icon onClick={deleteTrud} className={`clickable-image ellipsis ${(rights.delete ? "" : "disabled")}`} name="rubbish-bin"  />
    </div>
    <ReactTooltip   place="top" type="dark" effect="float"/>
  </div>
);


const  LaborInfoComponent =  class newLaborInfo extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     open: false,
     executorsFieldActive: false,
    author_val: props.author_val
    };
    this.handleDebounce = debounce(this.handleEdit, 400);
  }
  handleEdit(e) {
    setTimeout(() => {this.refs.sbmt.click()});
  }
  handleSelectChange(val) {
    const user = val;
    this.props.changeFieldValue('author_val', val)
    this.setState({
      author_val: user
    })
    this.handleDebounce();
  }
  getUsers(query) {
    if (!query) {
      return Promise.resolve({ options: [] });
    }

    return fetch(`/data/searchusers?query=${query}`,
      {
        method: "GET",
        credentials: 'include'
      })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return { options: json.data.users.map(x => ({value: x.id, label: x.name})) };
    });
  }
  render () {
    const props=this.props;
    const labor = props.labor;
    const {handleSubmit} = props;
    if(!labor.description) {
      return <div/>;
    } else {
      return (
        <form onSubmit={handleSubmit} className={labor.rights.update ? "" : "no-update"} style={{display:"flex", flexDirection:"column", height: "100%"}}>
          <Container vertical={true}>
            <div className="infoHeader" flex="1">
              <Container style={{justifyContent: "space-between"}}>
                <div ref="executorsSelect" className="infoHeaderBlock" style={{display: 'flex', justifyContent: "flex-begin"}}>
                  <div>
                    <img className="user" src={calendar} alt="logo" />
                    <Field name="startDate" newOnChange={this.handleDebounce.bind(this)}   component={DPicker}/>
                  </div>
                </div>
                <div>
                  <ImagePanel rights={labor.rights}
                  declineTrud={this.props.declineTrud.bind(this, labor)}
                  acceptTrud={this.props.acceptTrud.bind(this, labor)} returnToTask={props.returnToTask.bind(this, labor)}
                  deleteTrud={this.props.deleteTrud.bind(this, labor)}
                  status={labor.status} />
                </div>
              </Container>
            </div>
            <Container vertical={true} flex="11" height="auto" containerStyle={{overflowY: "auto", overflowX: 'hidden', paddingTop: "25px"}}>
                <h2 flex="1" containerStyle={headerBlockStyle} style={{margin:"5px", marginBottom: "20px"}}>
                  <Field name="comment"  handleChange={this.handleDebounce.bind(this)}   component={NameField} />
                </h2>
                <Container flex="3" containerStyle={codeBlockStyle}>
                  <Panel label="Количество часов">
                    <Field name="hours" handleChange={this.handleDebounce.bind(this)}  component={HoursField} />
                  </Panel>
                  <Panel label="Код работ">
                    <WorkCodeField codes={this.props.codes} debouncedUpdate={this.handleDebounce.bind(this)}/>
                  </Panel>
                </Container>
                <Panel label="Исполнитель">
                  <Select.Async multi={false} value={this.state.author_val}
                  onChange={this.handleSelectChange.bind(this)}
                  searchPromptText="Введите имя пользователя"
                    placeholder="Список выбранных сотрудников"
                    backspaceRemoves={false}
                    ignoreCase={false}
                  loadOptions={this.getUsers} />
                </Panel>
                <div>
                  <TaskCommentsTabContainer sendComment={props.sendComment.bind(this, labor)} task={labor}/>
                </div>
            </Container>
          </Container>
          <input type="submit"  ref="sbmt" style={{display:"none"}}/>
        </form>
        )
      }
    }
}

let laborForm = reduxForm({
  form: "laborInfoDialogForm",
  enableReinitialize: true
})(LaborInfoComponent);

laborForm = connect(
  state => {
    return ({
    initialValues: Object.assign(state.laborView,{author_val : {value: state.laborView.author.id, label: state.laborView.author.name}}),
    author_val : {value: state.laborView.author.id, label: state.laborView.author.name}
  })},
  function(dispatch) {
    return {
        // This will be passed as a property to the presentational component
        changeFieldValue: function(field, value) {
            dispatch(change('laborInfoDialogForm', field, value))
        }
    }
  }
)(laborForm);

export default laborForm;