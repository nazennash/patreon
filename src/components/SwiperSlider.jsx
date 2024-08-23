import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { apiConfig } from '../apiConfig';

const SwiperSlider = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await apiConfig.get('/products/category/');
            setCategories(response.data.results || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="mx-auto px-5">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 3000 }}
                loop
                modules={[Navigation, Pagination, Autoplay]}
                className="relative"
            >
                {categories.length > 0 ? (
                    categories.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="h-96 md:h-96 w-full sm:mt-10">
                                {item.images && item.images.length > 0 && (
                                    <img
                                        src={item.images[0].image}
                                        alt={item.name}
                                        className="object-contain md:object-cover w-full h-full rounded-none md:rounded-xl"
                                    />
                                )}
                                <div className="absolute inset-0 flex sm:items-start sm:justify-start justify-center items-end">
                                    <h3 className="
                                    md:text-white  md:text-xl md:mt-10 md:font-bold -mb-3 md:mb-5 md:bg-gray-800 bg-opacity-50 p-3 md:p-2 md:opacity-80 rounded-none md:rounded-xl
                                    text-black text-2xl font-bold
                                    ">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <div className="bg-transparent w-full h-80 md:h-96 flex items-center justify-center text-white text-xl md:text-3xl font-bold">
                            No slides available
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
