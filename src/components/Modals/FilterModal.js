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
  newTaskFilters.statuses = filters.statuses.slice();
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
  resetFilters(location) {
    const newFilters = copyFilters(this.props.defaultFilters);
    this.setState({
      currentTaskFilters: newFilters,
      selectedUsers: []
    });
    this.applyFilters(location, newFilters);
  }
  toggleCheckedStatus(elem) {
    let newFilters = this.state.currentTaskFilters;
    if(!~newFilters.statuses.indexOf(elem.value)) {
      if(elem.value === "0,1,2,3,4") {
        newFilters.statuses=[ "0,1,2,3,4"];
      } else {
        const allIndex = newFilters.statuses.indexOf("0,1,2,3,4");
        if(~allIndex) {
          newFilters.statuses.splice(allIndex,1);
        }
        newFilters.statuses.push(elem.value);
      }
      this.setState({
        currentTaskFilters: newFilters
      });
    } else {
      newFilters.statuses.splice(newFilters.statuses.indexOf(elem.value),1);
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
  applyFilters(currentLocation, filters) {
    if(filters.statuses) {
      this.props.applyFilters(filters, currentLocation);
    } else {
      this.props.applyFilters(copyFilters(this.state.currentTaskFilters), currentLocation);
    }
  }
  getUsers(query) {
    if (!query) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`/data/searchusers?query=${query}`,
      {
        method: "GET",
        credentials: 'include'
      })
		.then((response) => {
      return response.json();
    })
		.then((json) => {
			return { options: json.data.users.map(x => ({value: x.id, label: x.name})) };
		});
  }
  render() {
    const props = this.props;
    const checkBoxValues = props.filterValues;
    let checkBoxes = [];
    let currentTaskFilters = this.state.currentTaskFilters;
    for(var i = 0; i < checkBoxValues.length; i++) {
      let checked = false;
      if(currentTaskFilters.statuses) {
        if(~currentTaskFilters.statuses.indexOf(checkBoxValues[i].value)) {
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
    const subs_select = ( <div>
      { this.state.currentTaskFilters.allSubs ?
        <Select.Async multi={true} value={this.state.selectedUsers}
        onChange={this.handleSelectChange.bind(this)}
        searchPromptText="Введите имя пользователя"
          placeholder="Список выбранных сотрудников"
          backspaceRemoves={false}
          ignoreCase={false}
        loadOptions={this.getUsers} />
            :
            <Select
                multi={true}
                placeholder="Список выбранных сотрудников"
                value={currentTaskFilters.subs}
                onChange={this.handleSelectChange.bind(this)}
                options={
                    this.props.executors
                } // <-- Receive options from the form
                />
      } </div>
    )
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
            {subs_select}
          </div>
        </Container>
        <div>
          <FlatButton style={{float:"right"}} className="addTrudButton" label="Сбросить" onClick={this.resetFilters.bind(this, props.currentLocation)} />
          <FlatButton style={{float:"left"}} className="addTrudButton" label="Применить" onClick={this.applyFilters.bind(this, props.currentLocation)} />
        </div>
      </Container>
      </Popover>
    )
  }
}

export default filterModal;