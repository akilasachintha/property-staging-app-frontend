import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface ImagesInterface {
    images: string[];
}

function Carousel({ images}: ImagesInterface) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        const newIndex = currentImageIndex + 1;
        setCurrentImageIndex(newIndex >= images.length ? 0 : newIndex);
    };

    const prevImage = () => {
        const newIndex = currentImageIndex - 1;
        setCurrentImageIndex(newIndex < 0 ? images.length - 1 : newIndex);
    };

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="relative h-[25rem]">
            <div className={`absolute top-0 left-0 w-full h-full bg-gray-200 rounded`}></div>
            {images.length > 0 &&
                <img src={images[currentImageIndex]} alt="carousel" className={`rounded h-full w-full object-cover absolute top-0`} />
            }
            {images.length > 1 && (
                <>
                    <button onClick={prevImage} className="absolute top-1/2 left-0 ml-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowLeft />
                    </button>
                    <button onClick={nextImage} className="absolute top-1/2 right-0 mr-3 bg-primaryGold text-primaryBlack py-1 px-3 rounded-full">
                        <FaArrowRight />
                    </button>
                </>
            )}
            <div className="absolute bottom-0 left-0 w-full flex justify-center space-x-2 p-2 bg-gray-950 bg-opacity-50">
                {images.map((image, index) => (
                    <img key={index} src={image} alt="thumbnail" className={`h-12 rounded cursor-pointer ${currentImageIndex === index ? 'border-2 border-primaryGold' : ''}`} onClick={() => selectImage(index)} />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
