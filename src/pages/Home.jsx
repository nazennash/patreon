import React from 'react'
import { Products } from './Products'

export const Home = () => {
    return (
        <>
            <div className='mx-auto container'>
                {/* <input
                    type="text"
                    placeholder="Search products..."
                    className="flex items-center mx-auto border border-black p-2 mb-4 w-10/12 rounded-b-xl"
                /> */}
                <Products />
            </div>
        </>
    )
}
