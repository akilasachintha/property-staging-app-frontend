import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
}

const FormFieldBlack: React.FC<FormFieldProps> = ({ label, name, type }: FormFieldProps) => {
    const [field, meta, helpers] = useField(name);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value).catch((err) => console.log(err));
        helpers.setTouched(true).catch((err) => console.log(err));
    };

    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Field
                id={name}
                name={name}
                type={type}
                autoComplete={name}
                onChange={handleInputChange}
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : meta.touched && !meta.error ? 'border-green-500' : 'border-gray-400'} placeholder-gray-200 placeholder:text-xs placeholder:text-gray-500 text-primaryBlack focus:outline-none focus:ring-primaryGold focus:border-primaryBlack focus:z-10 sm:text-sm`}
                placeholder={label}
            />
            {meta.touched && (meta.error ? (
                <AiOutlineCloseCircle className="absolute right-3 top-11 transform -translate-y-1/2 text-red-500" onClick={() => helpers.setValue('')} />
            ) : (
                field.value && <AiOutlineCheckCircle className="absolute right-3 top-11 transform -translate-y-1/2 text-green-500" />
            ))}
        </div>
    );
};

export default FormFieldBlack;

