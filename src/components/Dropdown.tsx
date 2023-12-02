import React, { useState } from 'react';
import { Field, useField } from 'formik';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

interface DropdownProps {
    label: string;
    name: string;
    options: { value: string; label: string; }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, name, options }: DropdownProps) => {
    const [field, meta, helpers] = useField(name);
    const [isFirstClick, setIsFirstClick] = useState(true);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        helpers.setValue(event.target.value).catch((err) => console.log(err));
        helpers.setTouched(true).catch((err) => console.log(err));
        setIsFirstClick(false);
    };

    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <Field
                as="select"
                id={name}
                name={name}
                onChange={handleSelectChange}
                className={`appearance-none rounded relative block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : meta.touched && !meta.error ? 'border-green-500' : 'border-gray-400'} placeholder-gray-300 placeholder:text-xs placeholder:text-gray-500 text-primaryBlack focus:outline-none focus:ring-primaryGold focus:border-primaryBlack focus:z-10 sm:text-sm`}
            >
                {isFirstClick && <option value="">Select an agent</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>
            {meta.touched && (meta.error ? (
                <AiOutlineCloseCircle className="absolute right-3 top-11 transform -translate-y-1/2 text-red-500" onClick={() => helpers.setValue('')} />
            ) : (
                field.value && <AiOutlineCheckCircle className="absolute right-3 top-11 transform -translate-y-1/2 text-green-500" />
            ))}
        </div>
    );
};

export default Dropdown;
