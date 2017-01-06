import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default ({
    input,
    label,
    meta: {
        touched,
        error
    }
}) => {
    const selected = input.value ? moment(input.value) : null;
    return ( <
        DatePicker className = "datePicker"
        selected = {
            selected
        }
        onChange = {
            input.onChange
        }
        />
    );
}
