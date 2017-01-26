import React from 'react';
import "./styles/SideBar.css";
import { Link } from 'react-router';
import {ListItem} from 'material-ui/List';

function createChildren(items, marginLeft) {
  let children = [];
  items.forEach((item, i) => {
    if(item.children) {
      const container = <Link className={"list-element list-element-"+marginLeft} to={item.to+(item.hashtag ?"/" +item.hashtag : "")} key={item.name}/>;
      children[i] = (
      <ListItem
             containerElement={container}
             primaryText={item.name}
             initiallyOpen={true}
             nestedItems={createChildren(item.children, marginLeft+10)}
             key={item.name}
      />
      );
    } else {
      const container = <Link className={"list-element list-element-"+marginLeft}  to={item.to+(item.hashtag ? "/" + item.hashtag : "")} key={item.name}/>;
      children[i] = (
            <ListItem containerElement={container}
              primaryText={item.name}
              key={item.name}/>
      )
    }
  });
  return children;
}

const Search = (props) => {
  return (
    <input disabled className="search-side-input" placeholder="Поиск..."/>
  )
}

const SideBar = class Side extends React.Component {
  constructor(props) {
      super(props);
      this.menuItems = createChildren(props.menuItems,0);
  }
  render() {
    let children = this.menuItems;
    return(
      <div className={`side-bar ${this.props.showNav ? '' : 'deactivated'}`}>
        <Search/>
        <div className="side-list">
          {children}
        </div>
      </div>
    )
  }
}

export default SideBar;