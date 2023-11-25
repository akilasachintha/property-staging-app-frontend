import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import * as Yup from 'yup';
Yup.object({
    clientName: Yup.string().required('Required'),
    clientEmail: Yup.string().email('Invalid email address').required('Required'),
    clientPhone: Yup.string().required('Required'),
    propertyAddress: Yup.string().required('Required'),
    specialNotes: Yup.string().required('Required'),
    agentDetails: Yup.string().required('Required'),
});
interface MultipleImageUploadProps {
    onDrop: (files: File[]) => void;
    errors?: string | undefined;
    touched?: boolean | undefined;
    borderColor?: string;
}

const MultipleImageUpload: FC<MultipleImageUploadProps> = ({ onDrop, errors, touched, borderColor }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 5);
            setSelectedImages((prevImages) => [...prevImages, ...filesArray.slice(0, 5 - prevImages.length)]);
            onDrop(filesArray);
        }
    };

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const getBorderColor = () => {
        if (selectedImages.length === 0) return 'border-gray-400';
        return 'border-green-500';
    };

    return (
        <div style={{borderColor: borderColor}} className={`border border-dashed ${getBorderColor()} ${selectedImages && selectedImages.length <= 0 && 'p-16'} rounded`} onClick={handleClick}>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" ref={inputRef} />
            <div className="text-center">
                <p className="text-gray-400 text-md">Drag 'n' drop some files here, or click to select files</p>
                {touched && errors && <p className="text-red-500">{errors}</p>}
                <div className="flex flex-wrap justify-center mt-2">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="relative m-2">
                            <img src={URL.createObjectURL(image)} alt="" className="w-24 h-20 rounded object-cover" />
                            <AiOutlineDelete className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={(e) => { e.stopPropagation(); handleRemoveImage(index); }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MultipleImageUpload;
