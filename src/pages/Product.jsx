import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import RelatedProducts from '../Components/RelatedProducts';
import { motion } from 'framer-motion';

const Product = () => {
	const { productId } = useParams();
	const { products, currency, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(null);
	const [image, setImage] = useState('');
	const [size, setSize] = useState('');

	useEffect(() => {
		const product = products.find(item => item._id === productId);
		if (product) {
			setProductData(product);
			setImage(product.image[0]);
		}
	}, [productId, products]);

	return productData ? (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="pt-10"
			>
				<div className="flex gap-12 flex-col sm:flex-row">
					<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
						<div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal">
							{productData.image.map((item, index) => (
								<motion.img
									src={item}
									onClick={() => setImage(item)}
									key={index}
									className='w-[24%] sm:w-full h-33 sm:mb-2 flex-shrink-0 cursor-pointer hover:opacity-80 transition'
									whileHover={{ scale: 1.1 }}
								/>
							))}
						</div>
						<div className="w-full sm:w-[80%]">
							<img className='w-full h-auto' src={image} alt="Product" />
						</div>
					</div>
					<div className="flex-1">
						<h1 className="font-bold text-3xl mt-2 text-gray-800">{productData.name}</h1>
						<div className='flex items-center gap-1 mt-2'>
							{[...Array(4)].map((_, i) => <FaStar key={i} className='w-4 h-4 text-amber-500' />)}
							<FaStarHalfAlt className='w-4 h-4 text-amber-500' />
							<p className='pl-2 text-gray-700'>{122} Reviews</p>
						</div>
						<p className='mt-5 text-4xl font-semibold text-gray-900'>{currency}{productData.price}</p>
						<p className='mt-5 text-gray-600 md:w-4/5'>{productData.description}</p>
						<div className='flex flex-col gap-4 my-8'>
							<p className="text-lg font-medium">Select Size</p>
							<div className="flex gap-2">
								{productData.sizes.map((item, index) => (
									<button
										onClick={() => setSize(item)}
										className={`border py-2 px-4 bg-gray-100 rounded-md transition hover:bg-gray-200 ${item === size ? 'border-orange-500' : ''}`}
										key={index}
									>{item}</button>
								))}
							</div>
						</div>
						<button className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition' onClick={() => addToCart(productData._id, size)}>ADD TO CART</button>
						<hr className='mt-8 sm:w-4/5 border-gray-300' />
						<div className="text-sm text-gray-600 mt-5 flex flex-col gap-1 tracking-wider">
							<ul className="list-disc pl-5">
								<li>100% Original product.</li>
								<li>Cash on delivery available.</li>
								<li>Easy return and exchange policy within 7 days.</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-20">
					<div className="flex border-b">
						<p className="border-gray-300 px-5 py-3 text-sm font-medium cursor-pointer hover:text-gray-800">Description</p>
					</div>
					<div className="flex flex-col gap-4 py-6 text-sm text-gray-600">
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, numquam!</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, eligendi.</p>
					</div>
				</div>
				<RelatedProducts category={productData.category} subCategory={productData.subCategory} />
			</motion.div>
		</div>
	) : <div className='opacity-0'></div>
}

export default Product;