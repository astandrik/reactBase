import React from "react";
import Container from "../Container";
import "../styles/TaskCommentsTab.css";
import helpers from "./taskHelpers";
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from 'redux-form'
import FlatButton from 'material-ui/FlatButton';

const tab = class TaskCommentsTab extends React.Component {
    render () {
      const props = this.props;
      const { handleSubmit, pristine, reset, submitting } = props;
      let comments = helpers.generateComments(props.comments);
      return (
          <Container vertical="true">
            <div>
              {comments}
            </div>
            <div style={{outline: "1px solid black"}}>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column"}}>
              <Container className="leaveCommentContainer">
                <span flex="1" style={{marginLeft:"20px"}}>{props.task.manager}</span>
                <Field flex="3" style={{margin:"10px", minHeight:"200px", minWidth:"90%"}}name="comment" component="textarea" placeholder="Напишите комментарий"/>
              </Container>
              <FlatButton type="submit" label="Отправить" />
            </form>
            </div>
          </Container>
      )
    }
}

export default reduxForm({
  form: "commentForm"
})(tab);