import  { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import ProductItems from './ProductItems';

const BestSeller = () => {
	const { products } = useContext(ShopContext);
	const [bestSellerProducts, setBestSellerProducts] = useState([]);

	useEffect(() => {
		setBestSellerProducts(products.slice(11, 16));
	}, [products]);

	return (
		<div className='pb-12 px-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center py-12 px-4 sm:px-8 animate-fade-in">
				<h1 className="text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
					<span className="bg-gradient-to-r from-[#96785e] via-[#bfa68a] to-[#96785e] bg-clip-text text-transparent">
						Best
					</span>{" "}
					Sellers
				</h1>
				<p className="mt-6 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 mx-auto text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
					Discover our top-selling products, loved by our customers for their quality and style.
				</p>
			</div>

			{/* Rendering Products */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-8'>
				{bestSellerProducts.map((item, index) => (
					<ProductItems key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
				))}
			</div>
		</div>
	);
};

export default BestSeller;
