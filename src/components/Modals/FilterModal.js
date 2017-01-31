import React from "react"
import Popover from 'material-ui/Popover';
import Container from "../Container";
import FlatButton from 'material-ui/FlatButton';
import "../styles/Modal.css";
import Checkbox from 'material-ui/Checkbox';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Select from 'react-select';


function copyFilters(obj) {
  let newTaskFilters = {};
  const filters = obj;
  newTaskFilters.types = filters.types.slice();
  newTaskFilters.subs = filters.sub_ids;
  newTaskFilters.allSubs = filters.all_subs;
  return newTaskFilters;
}

const filterModal = class filter extends React.Component {
  constructor(props) {
    super(props);
    const filters = props.currentTaskFilters;
    this.state = {
      currentTaskFilters: filters,
      defaultFilters: props.defaultFilters
    }
  }
  resetFilters() {
    this.setState({
      newTaskFilters: copyFilters(this.props.currentTaskFilters)
    });
  }
  toggleCheckedStatus(elem) {
    let newFilters = this.state.currentTaskFilters;
    if(!~newFilters.types.indexOf(elem.value)) {
      if(elem.value === "all") {
        newFilters.types=["all"];
      } else {
        const allIndex = newFilters.types.indexOf("all");
        if(~allIndex) {
          newFilters.types.splice(allIndex,1);
        }
        newFilters.types.push(elem.value);
      }
      this.setState({
        currentTaskFilters: newFilters
      });
    } else {
      newFilters.types.splice(newFilters.types.indexOf(elem.value),1);
      this.setState({
        currentTaskFilters: newFilters
      });
    }
  }
  radiogroupChanged(event, val) {
    if(val === "all_subs") {
      let newFilters = this.state.currentTaskFilters;
      newFilters.allSubs = 1;
      this.setState({
        currentTaskFilters: newFilters
      })
    } else {
      let newFilters = this.state.currentTaskFilters;
      newFilters.allSubs = 0;
      this.setState({
        currentTaskFilters: newFilters
      })
    }
  }
  handleSelectChange(vals) {
    let newFilters = this.state.currentTaskFilters;
    newFilters.subs = vals.map(x => x.value);
    this.setState({
        selectedUsers: vals,
        currentTaskFilters: newFilters
    })
  }
  applyFilters() {
    this.props.applyFilters(this.state.currentTaskFilters);
  }
  render() {
    const props = this.props;
    const checkBoxValues = props.filterValues;
    let checkBoxes = [];
    let currentTaskFilters = this.state.currentTaskFilters;
    for(var i = 0; i < checkBoxValues.length; i++) {
      let checked = false;
      if(currentTaskFilters.types) {
        if(~currentTaskFilters.types.indexOf(checkBoxValues[i].value)) {
          checked = true;
        }
      }
      checkBoxes[i] = (<Checkbox
      key={i}
      checked={checked}
      label={checkBoxValues[i].label}
      onCheck={this.toggleCheckedStatus.bind(this, checkBoxValues[i])}
      />);
    }
    let defaultValue="";
    if(currentTaskFilters.allSubs) {
      defaultValue = "all_subs";
    } else {
      defaultValue = "subs";
    }
    return (
      <Popover
      open={props.isModalOpen}
      onRequestClose={props.closeModal}
      anchorEl={props.anchorEl}
      style={{overlay: {zIndex: 7}}}
      className="filter-popover"
      >
      <Container vertical="true" style={{justifyContent: "spaceBetween"}} >
        <Container>
          <div className="filter-modal-container" flex="4">
            <span className="modal-header">Задачи</span>
            <div className="filter-checkboxes-container">
              { checkBoxes}
            </div>
          </div>
          <div className="filter-modal-container" flex="7">
            <span className="modal-header">Сотрудники</span>
            <RadioButtonGroup className="subs-choose-radio" name="user_type" valueSelected={defaultValue} onChange={this.radiogroupChanged.bind(this)}>
              <RadioButton
                value="all_subs"
                label="Все сотрудники"
              />
              <RadioButton
                value="subs"
                label="Непосредственные подчиненные"
              />
            </RadioButtonGroup>
            <Select
                multi={true}
                placeholder="Список выбранных сотрудников"
                value={currentTaskFilters.subs}
                onChange={this.handleSelectChange.bind(this)}
                options={
                    this.props.executors
                } // <-- Receive options from the form
                />
          </div>
        </Container>
        <div>
          <FlatButton style={{float:"right"}} className="addTrudButton" label="Сбросить" onClick={this.resetFilters.bind(this)} />
          <FlatButton style={{float:"left"}} className="addTrudButton" label="Применить" onClick={this.applyFilters.bind(this)} />
        </div>
      </Container>
      </Popover>
    )
  }
}

export default filterModal;