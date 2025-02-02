import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import ProductItems from './ProductItems';

const LatestCollection = () => {
	const { products } = useContext(ShopContext);
	const [latestProducts, setLatestProducts] = useState([]);

	useEffect(() => {
		setLatestProducts(products.slice(0, 5));
	}, []);

	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center py-8 text-3xl">
				<h1 className='text-3xl font-semibold text-gray-500 pt-5 pb-3'>__LATEST<span className='text-gray-700'> COLLECTIONS__</span> </h1>
				<p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, maxime tempore! Iure consequatur enim quam officiis maxime, eius neque rerum?</p>
			</div>

			{/* Rendering Products */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8'>
				{
					latestProducts.map((item, index) => (
						<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
					))
				}
			</div>
		</div>
	)
}

export default LatestCollection