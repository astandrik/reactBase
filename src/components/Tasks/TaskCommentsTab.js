import React from "react";
import Container from "../Container";
import "../styles/TaskCommentsTab.css";
import helpers from "./taskHelpers";
import FlatButton from 'material-ui/FlatButton';

const tab = class TaskCommentsTab extends React.Component {
    stopPropagation (e){
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render () {
      const props = this.props;
      const {sendComment} = props;
      let comments = helpers.generateComments(props.comments);
      const prepareComment = () => {
        var self = this;
        sendComment(self.refs.commentField.value);
        self.refs.commentField.value = "";
      }
      if(props.task) {
      return (
          <Container vertical="true">
            <div>
              {comments}
            </div>
            <div style={{outline: "1px solid black"}} className={" comment-send-area " + (props.task.rights.comment ? "" : "disabled")}>
              <Container className="leaveCommentContainer">
                <span flex="1" style={{marginLeft:"20px"}}>{props.task.manager}</span>
                <textarea  flex="3" style={{margin:"10px", minHeight:"100px", minWidth:"90%"}} onChange={this.stopPropagation} ref="commentField" placeholder="Напишите комментарий"/>
              </Container>
              <FlatButton onClick={prepareComment} label="Отправить" />
            </div>
          </Container>
      )
    } else {
      return <div/>
    }
    }
}

export default tab;