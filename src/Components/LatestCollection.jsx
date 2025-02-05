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
		<div className='pt-12 pb-18 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center py-8">
				<h1 className='text-4xl font-bold text-gray-700 uppercase tracking-wide'>
					<span className='text-gray-500'>LATEST</span> Collections
				</h1>
				<p className='w-3/4 m-auto text-sm sm:text-base md:text-lg text-gray-600 mt-4'>
					Discover the latest trends and must-have styles in our newest collection.
				</p>
			</div>

			{/* Rendering Products */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8'>
				{latestProducts.map((item, index) => (
					<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
				))}
			</div>
		</div>
	);
}

export default LatestCollection