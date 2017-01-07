import React from "react";
import {ToolbarContainer, SpinnerContainer,LeftNavContainer,GlobalHeaderContainer}  from "./containers/Containers";
import Container from "./components/Container";


const RouterCreator = function(name, to, hashtag) {
  return {name, to, hashtag};
}

const sidenavRoutes = [
  {name: "Все задачи", to:"/tasks/list"//, children:[RouterCreator("Нераспределенные задачи", null, "free"),RouterCreator("Мои задачи", null, "my"),RouterCreator("Задачи подчиненных", null, "subordinate")]
  },
  RouterCreator("Мои отчеты", '/reports'),
  RouterCreator("Мои трудозатраты", '/work')
];
var containerStyles = {
  display: "flex",
  width: "100%",
  height: "calc(100% - 56px)",
  justifyContent: "center"
}


class Layout extends React.Component {
  render() {
    let headerStyle = {
      background: "white",
      borderBottom:"1px solid black",
      maxHeight: "66.91px"
    };
    if(!this.props.needHeader) {
      headerStyle.display = "none";
    }
    return (
    <div>
      <ToolbarContainer/>
        <div style={containerStyles}>
          <SpinnerContainer/>
          <LeftNavContainer children={sidenavRoutes}/>
          <Container vertical="true" style={{background:"#DDDDDD"}}>
              <GlobalHeaderContainer containerStyle={headerStyle} flex="1"/>
              <div containerStyle={{overflow:"auto"}} style={{height: "calc(100% - 20px)"}}>
                {this.props.children}
              </div>
          </Container>
      </div>
    </div>
    )
  }
}
import { connect } from 'react-redux';
import {reset} from 'redux-form';

const mapStateToProps = (state,ownProps) => {
  return {
    needHeader: state.currentTitle,
    children: ownProps.children
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default Visible;