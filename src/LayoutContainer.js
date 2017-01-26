import React from "react";
import {ToolbarContainer, SpinnerContainer,SideBarContainer,GlobalHeaderContainer}  from "./containers/Containers";
import Container from "./components/Container";
import {
    closeErrorsModal
} from "./redux/actions/layoutActions";
import ValidationErrorsModalContainer from "./containers/ModalContainers/ValidationErrorsModalContainer";


const RouterCreator = function(name, to, hashtag) {
  return {name, to, hashtag};
}

const sidenavRoutes = [
  {name: "Все задачи", to:"/tasks/all/table",
  children:[RouterCreator("Мои задачи", "/tasks/my/table"),
  RouterCreator("Нераспределенные задачи", "/tasks/nonDistributed/table")
  ,RouterCreator("Задачи подчиненных", "/tasks/subordinate/table")]
  },
  RouterCreator("Мои сотрудники", '/subordinates'),
  RouterCreator("Мои отчеты", '/reports'),
  RouterCreator("Статистика", '/statistics')
];
var containerStyles = {
  display: "flex",
  width: "100%",
  height: "calc(100% - 42px)",
  justifyContent: "center",
  flexDirection: "row"
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
          <SideBarContainer children={sidenavRoutes}/>
          <Container vertical="true" style={{background:"#DDDDDD"}}>
              <GlobalHeaderContainer containerStyle={headerStyle} flex="1"/>
              <div containerStyle={{overflow:"auto"}} style={{height: "100%"}}>
                {this.props.children}
              </div>
          </Container>
      </div>
      <ValidationErrorsModalContainer containerStyle={{maxWidth: '0'}}/>
    </div>
    )
  }
}
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    needHeader: state.currentTitle,
    children: ownProps.children,
    isErrorsModalOpen: state.isErrorsModalOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
        dispatch(closeErrorsModal({}));
    }
  }
}


const Visible = connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

export default Visible;