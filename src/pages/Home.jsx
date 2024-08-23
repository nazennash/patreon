import React from 'react'
import { Products } from './Products'
import SwiperSlider from '../components/SwiperSlider'
import { NewArrivals } from './NewArrivals'
import { Category } from './Category'
import { Footer } from '../components/Footer'

export const Home = () => {
    return (
        <>
            <div className='mx-auto container'>
                <SwiperSlider />
                <NewArrivals />
                <Products />
                <Category />
                <Footer />
            </div>
        </>
    )
}
