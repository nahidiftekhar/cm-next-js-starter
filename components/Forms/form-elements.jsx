import React from 'react';
import { useField, Field, ErrorMessage } from 'formik';

export const CustomTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={`text-input form-input ${
          meta.touched && meta.error ? 'has-error' : ''
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : (
        <div>&nbsp;</div>
      )}
    </>
  );
};

export const CustomTextArea = (props) => {
  const [field, meta] = useField(props);
  const { label, name, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} className={`text-input form-input ${
          meta.touched && meta.error ? 'has-error' : ''
        }`} />
      <ErrorMessage name={name} />
    </>
  );
};

export const CustomCheckbox = ({ value, label, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <label className="inline-flex">
        <input
          type="checkbox"
          className={`form-checkbox ${
            meta.touched && meta.error ? 'has-error' : ''
          }`}
          {...field}
          {...props}
          value={value}
          // name={name}
        />
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : (
        <div className="">&nbsp;</div>
      )}
    </>
  );
};

export const CustomSelect = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <Field
        className={`form-select ${
          meta.touched && meta.error ? 'has-error' : ''
        }`}
        component="select"
        {...field}
        {...props}>
        <option className="text-slate-300" value="">
          Select...
        </option>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </Field>
      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : (
        <div className="">&nbsp;</div>
      )}
    </>
  );
};

export const CustomFileInput = ({ props }) => {
  return (
    <input
      {...props}
      className="file:bg-blue-50 file:text-blue-500 hover:file:bg-blue-200 file:rounded-lg file:rounded-tr-none file:rounded-br-none file:px-4 file:py-2 file:mr-4 file:border-none hover:cursor-pointer border rounded-lg text-gray-400 w-full"
      type="file"
    />
  );
};
