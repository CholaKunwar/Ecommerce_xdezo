import { useContext, useEffect, useState } from 'react';
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
		<div className="min-h-screen px-4 sm:px-6 lg:px-24 py-12 text-[#5e3b23]">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="pt-6"
			>
				<div className="flex flex-col lg:flex-row gap-12">
					{/* Left - Images */}
					<div className="flex-1 flex flex-col lg:flex-row-reverse gap-4">
						<div className="w-full lg:w-[80%]">
							<img className="w-full h-auto rounded-xl shadow-md" src={image} alt="Product" />
						</div>
						<div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto px-1">
							{productData.image.map((item, index) => (
								<motion.img
									key={index}
									src={item}
									onClick={() => setImage(item)}
									className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${image === item ? 'border-[#5e3b23]' : 'border-transparent'
										}`}
									whileHover={{ scale: 1.1 }}
								/>
							))}
						</div>
					</div>

					{/* Right - Product Details */}
					<div className="flex-1">
						<h1 className="text-3xl sm:text-4xl font-bold mb-3">{productData.name}</h1>

						<div className="flex items-center gap-1 mb-4">
							{[...Array(4)].map((_, i) => (
								<FaStar key={i} className="text-amber-500" />
							))}
							<FaStarHalfAlt className="text-amber-500" />
							<span className="ml-2 text-base text-gray-600">122 Reviews</span>
						</div>

						<p className="text-3xl font-semibold mb-4">{currency}{productData.price}</p>

						<p className="text-base text-gray-700 mb-6">{productData.description}</p>

						{/* Size selector */}
						<div className="mb-8">
							<p className="text-lg font-medium mb-2">Select Size:</p>
							<div className="flex flex-wrap gap-3">
								{productData.sizes.map((item, index) => (
									<button
										key={index}
										onClick={() => setSize(item)}
										className={`px-4 py-2 rounded-lg border transition-all duration-200 ${size === item
												? 'bg-[#5e3b23] text-white border-[#5e3b23]'
												: 'bg-[#efe3d1] border-[#d1c5b0] hover:bg-[#e0d5c2]'
											}`}
									>
										{item}
									</button>
								))}
							</div>
						</div>

						<button
							onClick={() => addToCart(productData._id, size)}
							className="w-full sm:w-auto bg-[#5e3b23] hover:bg-[#4a2f1d] text-white font-medium py-3 px-8 rounded-xl transition-transform hover:scale-105 duration-300"
						>
							Add to Cart
						</button>

						<hr className="my-10 border-[#d6c6b8]" />

						<ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
							<li>100% Original product.</li>
							<li>Cash on delivery available.</li>
							<li>Easy return and exchange policy within 7 days.</li>
						</ul>
					</div>
				</div>

				{/* Description Section */}
				<div className="mt-20 border-t border-[#d6c6b8] pt-8">
					<h2 className="text-xl font-semibold mb-4">Product Description</h2>
					<div className="text-base text-gray-700 space-y-3">
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, numquam!</p>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, eligendi.</p>
					</div>
				</div>

				{/* Related Products */}
				<RelatedProducts category={productData.category} subCategory={productData.subCategory} />
			</motion.div>
		</div>
	) : (
		<div className="min-h-screen flex items-center justify-center bg-[#f3eee7]">
			<p className="text-[#5e3b23] text-xl">Loading product...</p>
		</div>
	);
};

export default Product;
