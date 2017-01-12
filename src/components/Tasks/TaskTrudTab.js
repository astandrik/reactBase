import React from "react";
import Container from "../Container";
import "../styles/TaskTrudTab.css";
import openTrud from "../../Icons/fast-forward.svg";
import acceptTrud from "../../Icons/acceptTrud.svg";
import moment from "moment";
import helpers from "./taskHelpers";
import 'moment/locale/ru';


const generateLaborsBlock = function(laborGroup,props) {
  let labors = [<div key={laborGroup[0].startDate} className="timeDateCommentLabel">------{moment(laborGroup[0].startDate).format("LL").toString()}------</div>];
  for(var i = 1; i <= laborGroup.length; i++) {
    let labor = laborGroup[i-1];
    let comments = helpers.generateComments(labor.comments);
    labors[i] =  (
      <Container vertical="true" className={`laborBlock ${(labor.status == "Новая") ? "highlighted" : ''}`} key={labor.id}>
        <Container style={{margin: "5px"}} width="auto" flex="8">
          <div flex="8">
            <Container style={{justifyContent: "space-between"}}>
                <div style={{flex:"3"}}>{labor.author.name}</div>
                <div style={{flex:"2", fontWeight:"bold"}}>{labor.value} часов</div>
                <div style={{flex:"2", fontWeight:"bold"}}>{labor.code.value}</div>
            </Container>
            <span className="commentButton" onClick={props.openComments.bind(this,labor.id)}>Показать комментарии({labor.comments.length})</span>
            <div className={"trudCommentsBlock " + (labor.commentsOpened ? "opened" : "closed")}>
              {comments}
            </div>
          </div>
          <div flex="1" className={`${(labor.status !== "Новая") ? "noDisplay" : ''}`}>
            <img className="clickable-image openTrud" src={acceptTrud} onClick={props.acceptTrud.bind(this, labor)} alt="logo" />
          </div>
          <div flex="1">
            <img className="clickable-image openTrud" src={openTrud} alt="logo" />
          </div>
        </Container>
      </Container>
    )
  }
  return labors;
}

export default (props) => {
  let labors = [];
  for(var i = 0; i < Object.keys(props.groups).length; i++) {
    labors[i] = generateLaborsBlock(props.groups[Object.keys(props.groups)[i]],props);
  }
  labors = [].concat.apply([], labors);
  if(labors.length > 0) {
    return (
      <div>
        {labors}
      </div>
    )
  } else {
    return <div/>;
  }
}