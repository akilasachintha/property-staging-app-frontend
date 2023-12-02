import React, {ChangeEvent, FC, useRef, useState} from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {useEnquiryContext} from "../context/EnquiryContext";
import {useLoadingContext} from "../context/LoadingContext";
import {useToastContext} from "../context/ToastContext";

interface Image {
    id: string;
    imageName: string;
    imageUri: string;
    createdUserId: string;
    createdDate: string;
    updatedUserId: string;
    updatedDate: string;
    isDeleted: boolean;
    deletedUserId: string;
    deletedDate: string;
}

interface MultipleImageUploadProps {
    onDrop: (files: File[]) => void;
    errors?: string | undefined;
    touched?: boolean | undefined;
    borderColor?: string;
}

const MultipleImageUpload: FC<MultipleImageUploadProps> = ({ onDrop, errors, touched, borderColor }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const {isEditEnquiry, selectedEnquiryApi} = useEnquiryContext();
    const {isLoading, showLoading} = useLoadingContext();
    const {showMessage} = useToastContext();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).slice(0, 5);
            setSelectedImages((prevImages) => [...prevImages, ...filesArray.slice(0, 5 - prevImages.length)]);
            onDrop(filesArray);
        }

        if(selectedImages && selectedImages.length >= 5){
            showMessage && showMessage("You can upload maximum 5 images", "error");
            selectedImages.splice(5, selectedImages.length);
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

    const selectedImagesComponents = selectedImages.map((image, index: number) => (
        <div key={index} className="relative">
            <img src={URL.createObjectURL(image)} alt="" className="w-16 h-16 mx-2 rounded object-cover"/>
            <AiOutlineDelete className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(index);
            }}/>
        </div>
    ));

    const selectedEnquiryApiComponents = selectedEnquiryApi && selectedEnquiryApi.propertyImages && selectedEnquiryApi.propertyImages.length > 0 && selectedEnquiryApi?.propertyImages.map((image: Image, index: number) => (
        <div key={index} className="relative">
            <img src={image.imageUri} alt="" className="w-16 h-16 mx-2 rounded object-cover"/>
            <AiOutlineDelete className="absolute top-2 right-2 cursor-pointer text-red-500" onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(index);
            }}/>
        </div>
    ));

    if (isLoading) {
        showLoading();
        return null;
    }

    return (
        <div style={{borderColor: borderColor}}
             className={`border ${getBorderColor()} 'p-12'} rounded`}
             onClick={handleClick}>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" ref={inputRef} />
            <div className="text-center">
                <p className="text-gray-400 py-2">Drag 'n' drop some files here, or click to select files</p>
                {touched && errors && <p className="text-red-500">{errors}</p>}
                <div className="flex flex-wrap justify-start my-1">
                    {selectedImagesComponents.map((selectedImagesComponent, index) => (
                        <div key={index}>
                            {selectedImagesComponent}
                        </div>
                    ))}
                    {isEditEnquiry && selectedEnquiryApiComponents}
                </div>
            </div>
        </div>
    );
};

export default MultipleImageUpload;
