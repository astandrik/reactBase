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
  RouterCreator("Статистика", '/statistics'),
  {name: "Администрирование", to:"admin", fake:true, children: [
    RouterCreator("Коды работ", "/workCodes"),
    RouterCreator("Статьи расходов", "/finances"),
    RouterCreator("Штатная структура", "/structure"),
    RouterCreator("Список сотрудников", "/userList")
  ]},
  {name: "Выход", to: "logout"}
];
var containerStyles = {
  display: "flex",
  width: "100%",
  justifyContent: "center",
  flexDirection: "row"
}


class Layout extends React.Component {
  render() {
    let rendered = <div className="noDisplay"/>;
    if(this.props.pingedUser == "none") {
      return rendered
    }
    let maxHeight = this.props.tabs && this.props.tabs.length ?  "66.91px": "40.91px";
    let headerStyle = {
      background: "white",
      borderBottom:"1px solid black",
      maxHeight
    };
    if(!this.props.needHeader) {
      headerStyle.display = "none";
    }
    let toolBar = <div className="noDisplay"/>;
    let sideBar = <div className="noDisplay"/>;
    let containerStyle = Object.assign({},containerStyles,{height: "100%"});
    if(this.props.pingedUser !== null) {
      containerStyle = Object.assign({},containerStyles,{height: "calc(100% - 42px)"});
      rendered = (
      <div>
          <ToolbarContainer/>
          <div style={containerStyle}>
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
    } else {
      rendered = (
      <div>
          <div style={containerStyle}>
            <SpinnerContainer/>
            <Container vertical="true" style={{background:"#DDDDDD"}}>
                <div containerStyle={{overflow:"auto"}} style={{height: "100%"}}>
                  {this.props.children}
                </div>
            </Container>
        </div>
        <ValidationErrorsModalContainer containerStyle={{maxWidth: '0'}}/>
      </div>
      )
    }
    return rendered;
  }
}
import { connect } from 'react-redux';

const mapStateToProps = (state,ownProps) => {
  return {
    needHeader: state.currentTitle,
    children: ownProps.children,
    isErrorsModalOpen: state.isErrorsModalOpen,
    tabs: state.tabs,
    pingedUser: state.pingedUser
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