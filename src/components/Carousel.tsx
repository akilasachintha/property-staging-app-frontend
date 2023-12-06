import React, {useState} from 'react';
import {FaArrowLeft, FaArrowRight, FaTimes} from 'react-icons/fa';

interface ImagesInterface {
    images: string[];
}

function Carousel({ images }: ImagesInterface) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nextImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        const newIndex = currentImageIndex + 1;
        setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);
    };

    const prevImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        const newIndex = currentImageIndex - 1;
        setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative h-[25rem]">
            <div className={`absolute top-0 left-0 w-full h-full bg-gray-200 rounded`}></div>
            {images.length > 0 &&
                <img src={images[currentImageIndex]} alt="carousel" className={`rounded h-full w-full object-cover absolute top-0 cursor-pointer`} onClick={openModal} />
            }
            {images.length > 1 && !isModalOpen && (
                <>
                    <button onClick={prevImage} className="absolute top-1/2 left-0 ml-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowLeft />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 right-0 mr-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowRight />
                    </button>
                </>
            )}
            <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 p-2 bg-gray-950 bg-opacity-50 overflow-x-scroll">
                {images.map((image, index) => (
                    <img key={index} src={image} alt="thumbnail" className={`h-12 w-20 rounded cursor-pointer ${currentImageIndex === index ? 'border-2 border-primaryGold' : ''}`} onClick={() => setCurrentImageIndex(index)} />
                ))}
            </div>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
                    <div className="relative h-5/6 w-10/12 rounded overflow-hidden">
                        <img src={images[currentImageIndex]} alt="modal" className="w-full h-full rounded" />
                    </div>
                    <button onClick={closeModal} className="absolute top-0 right-0 m-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaTimes />
                    </button>
                    <button onClick={prevImage} className="absolute top-1/2 left-0 ml-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowLeft />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 right-0 mr-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Carousel;
