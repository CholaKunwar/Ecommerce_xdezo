import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItems from './ProductItems';

const BestSeller = () => {
	const { products } = useContext(ShopContext);
	const [bestSellerProducts, setBestSellerProducts] = useState([]);

	useEffect(() => {
		setBestSellerProducts(products.slice(11, 16));
},[])
	return (
		<div className='py-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center py-8 text-3xl">
				<h1 className='text-3xl font-semibold text-gray-500 pt-5 pb-3'>__BEST<span className='text-gray-700'> SELLERS__</span> </h1>
				<p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime tempore! Iure consequatur enim quam officiis maxime, eius neque rerum?</p>
			</div>

			{/* Rendering Products */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8'>
				{
					bestSellerProducts.map((item, index) => (
						<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
					))
				}
			</div>
		</div>
	)
}

export default BestSeller