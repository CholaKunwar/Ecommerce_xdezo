import React,{ useContext, useEffect, useState, Suspense } from 'react'
import { ShopContext } from '../Context/ShopContext'

// Lazy load ProductItems to reduce initial load time
const ProductItems = React.lazy(() => import('./ProductItems'));

const LatestCollection = () => {
	const { products } = useContext(ShopContext);
	const [latestProducts, setLatestProducts] = useState([]);

	useEffect(() => {
		// Get the latest 5 products
		setLatestProducts(products.slice(0, 5));
	}, [products]);

	return (
		<div className='pt-12 pb-18 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center py-12 px-4 sm:px-8 animate-fade-in">
				<h1 className="text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
					<span className="bg-gradient-to-r from-[#96785e] via-[#bfa68a] to-[#96785e] bg-clip-text text-transparent">
						Latest
					</span>{" "}
					Collections
				</h1>
				<p className="mt-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
					Discover the latest trends and must-have styles in our newest collection.
				</p>
			</div>

			{/* Rendering Products with Lazy Loading */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8'>
				<Suspense fallback={<div>Loading...</div>}>
					{latestProducts.map((item, index) => (
						<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
					))}
				</Suspense>
			</div>
		</div>
	);
}

export default LatestCollection;
