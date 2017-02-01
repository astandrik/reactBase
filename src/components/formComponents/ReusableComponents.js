import React from 'react';
import SelectInput from "./SelectInput";
import { Field } from 'redux-form';

export const WorkCodeField = ({codes,debouncedUpdate}) => (
  <Field
      name="code"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Код работ"
              options={codes}
          />
      }/>
);

export const FinancesField = ({finances,debouncedUpdate}) => (
  <Field
      name="finance"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Статья финансирования"
              options={finances}
          />
      }/>
);

export const DepartmentParentField = ({departments,debouncedUpdate}) => (
  <Field
      name="parent"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Родительский узел"
              options={departments}
          />
      }/>
);


export const DepartmentField = ({departments,debouncedUpdate}) => (
  <Field
      name="department"
      newOnChange={debouncedUpdate}
      component={prp =>
          <SelectInput
              {...prp}
              placeholder="Отделение штатной структуры"
              options={departments}
          />
      }/>
);

export const ExecutorsSelectField = ({executors, deactivateExecutorsField,debouncedUpdate}) => (
  <Field
  name="executors"
  newOnBlur={deactivateExecutorsField}
  newOnChange={debouncedUpdate}
  component={prp =>
      <SelectInput
          multi={true}
          {...prp}
          placeholder="Исполнители"
          options={executors}
          autofocus={true}
      />
  }/>
);

export const NameField = ({input}) => {
    return (<input {...input}   className="fieldValue taskHeader" placeholder="Название задачи"/>);
  }

  export const StandardField = ({input, placeholder}) => {
      return (<input {...input} placeholder= {placeholder ? placeholder : ""}   className="fieldValue standard-field"/>);
    }
export const DescriptionField = ({input, placeholder}) => {
    return (<textarea  {...input}   style={{margin:"10px", minHeight:"100px", minWidth:"90%"}}/>);
}

export const HoursField = ({input}) => {
    return (<input {...input}   className="formInput" placeholder="Количество часов"/>);
  }

export const Panel = ({children , label, disabled}) => {
  return (
  <div className={(disabled ? "noEvents " : "") + " taskPanel"}>
    <span className="panelLabel"> {label} </span>
    {children}
  </div>
  )
}


