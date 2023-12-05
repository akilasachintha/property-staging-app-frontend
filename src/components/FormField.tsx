import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface FormFieldProps {
    label: string;
    name: string;
    type: string;
    disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ label, name, type, disabled = false }: FormFieldProps) => {
    const [field, meta, helpers] = useField(name);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value).catch((err) => console.log(err));
        helpers.setTouched(true).catch((err) => console.log(err));
    };

    return (
        <div className="relative">
            <label htmlFor={name} className="sr-only">
                {label}
            </label>
            <Field
                id={name}
                name={name}
                type={type}
                autoComplete={name}
                onChange={handleInputChange}
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : meta.touched && !meta.error ? 'border-green-500' : 'border-gray-300'} placeholder-gray-400 text-primaryBlack focus:outline-none focus:ring-primaryGold focus:border-primaryBlack focus:z-10 sm:text-sm`}
                placeholder={label}
                disabled={disabled}
            />
            {meta.touched && (meta.error ? (
                <AiOutlineCloseCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" onClick={() => helpers.setValue('')} />
            ) : (
                field.value && <AiOutlineCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            ))}
        </div>
    );
};

export default FormField;
