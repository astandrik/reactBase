import React from 'react';
import Select from 'react-select';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

export default class SelectInput extends React.Component {
    onChange(event) {
        if (this.props.input.onChange) {
          if(event.value) {
            this.props.input.onChange(event.value);
          } else {
            this.props.input.onChange(event);
          } // <-- To be aligned with how redux-form publishes its CHANGE action payload. The event received is an object with 2 keys: "value" and "label"
        }
    }

    render() {
        return ( <
            Select {...this.props
            }
            value = {
                this.props.input.value || ''
            }
            onBlur = {
                () => this.props.input.onBlur(this.props.input.value)
            }
            onChange = {
                this.onChange.bind(this)
            }
            options = {
                this.props.options
            } // <-- Receive options from the form
            />
        );
    }
}
