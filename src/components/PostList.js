import React from "react";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

export default (props) => {
  let elements = [];
  for(var i = 0; i < props.posts.length; i++) {
    const post = props.posts[i];
    elements.push(<ListItem key={post.number} primaryText={post.comment} secondaryText={post.author}/>);
  }
  return (
    <List>
      {elements}
    </List>
  )
}