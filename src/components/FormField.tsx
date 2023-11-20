import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type }: FormFieldProps) => (
    <div>
        <label htmlFor={name} className="sr-only">
            {label}
        </label>
        <Field
            id={name}
            name={name}
            type={type}
            autoComplete={name}
            className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder={label}
        />
        <ErrorMessage name={name}>
            {(msg) => <div className="text-red-500 text-xs mb-2">{msg}</div>}
        </ErrorMessage>
    </div>
);

export default FormField;
