import React from 'react';
import "./styles/SideBar.css";
import { Link } from 'react-router';
import {ListItem} from 'material-ui/List';
import {debounce} from "../helperFunctions";

function createChildren(items, marginLeft) {
  let children = [];
  items.forEach((item, i) => {
    if(item.children) {
      const container = <Link className={"list-element list-element-"+marginLeft} to={!item.fake ? item.to : null} key={item.name}/>;
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
      const container = <Link className={"list-element list-element-"+marginLeft}  to={!item.fake ? item.to : null} key={item.name}/>;
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
    <input className="search-side-input" onChange={props.changeSearchQuery}  placeholder="Поиск..."/>
  )
}

const SideBar = class Side extends React.Component {
  constructor(props) {
      super(props);
      this.menuItems = createChildren(props.menuItems,0);
      this.setSearchQuery = debounce(this.setSearchQuery, 500);
      this.state = {
        query: ""
      };
  }
  changeSearchQuery(event) {
    this.setState({
      query: event.target.value
    });
    this.setSearchQuery();
  }
  setSearchQuery() {
      this.props.changeSearchQuery(this.state.query, this.props.location);
  }
  render() {
    let children = this.menuItems;
    return(
      <div className={`side-bar ${this.props.showNav ? '' : 'deactivated'}`}>
        <Search changeSearchQuery={this.changeSearchQuery.bind(this)}/>
        <div className="side-list">
          {children}
        </div>
      </div>
    )
  }
}

export default SideBar;