import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {
	const { productId } = useParams();
	const { products, currency, addToCart } = useContext(ShopContext);
	const [productData, setProductData] = useState(false);
	const [image, setImage] = useState('');
	const [size, setSize] = useState('');

	const fetchProductData = async () => {
		products.map((item) => {
			if (item._id === productId) {
				setProductData(item);
				setImage(item.image[0]);
				return null;
			}
		})
	}

	useEffect(() => {
		fetchProductData();
	}, [productId])


	return productData ? (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] '>
			{/* <div className='bg-gray-50 min-h-screen'> */}
				<div className="pt-10 transparent-opacity ease-in duration-500 opacity-100">
					{/* Product Data */}
					<div className="flex gap-12 flex-col sm:flex-row">
						{/* product Images */}
						<div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
							<div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal">
								{
									productData.image.map((item, index) => (
										<img src={item} onClick={() => { setImage(item) }} key={index} alt="hello" className='w-[24%] sm:w-full h-33 sm:mb-2 flex-shrink-0 cursor-pointer' />
									))
								}
							</div>
							<div className="w-full sm-w-[80%]">
								<img className='w-full h-auto' src={image} alt="" />
							</div>
						</div>

						{/* Product Info */}
						<div className="flex-1">
							<h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
							<div className='flex items-center gap-1 mt-2'>
								<FaStar className='w-4 h-4 text-amber-500' />
								<FaStar className='w-4 h-4 text-amber-500' />
								<FaStar className='w-4 h-4 text-amber-500' />
								<FaStar className='w-4 h-4 text-amber-500' />
								<FaStarHalfAlt className='w-4 h-4 text-amber-500' />
								<p className='pl-2'>{122}</p>
							</div>
							<p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
							<p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
							<div className='flex flex-col gap-4 my-8'>
								<p>Select Size</p>
								<div className="flex gap-2">
									{productData.sizes.map((item, index) => (
										<button onClick={() => { setSize(item) }} className={`border border-gray-200 py-2 px-4 bg-gray-100 rounded-md ${item === size ? 'border-orange-400' : ''}`} key={index}>{item}</button>
									))}</div>
							</div>

							<button className='bg-black text-white px-8 py-3 text-sm hover:bg-gray-800' onClick={() => { addToCart(productData._id, size) }}>ADD TO CART</button>
							<hr className='mt-8 sm:w-4/5 border-gray-300' />
							<div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 tracking-wider">
								<ul className="list-disc">
									<li>100% Original product.</li>
									<li>Cash on delivery is avilable on this product.</li>
									<li>Easy return and exchange policy within 7 days.</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Description and review section */}
					<div className="mt-20">
						<div className="flex">
							<p className="border border-gray-300 px-5 py-3 text-sm">Description</p>
							<p className='border border-gray-300 px-5 py-3 text-sm'>Reviews (122)</p>
						</div>
						<div className="flex flex-col gap-4 border border-gray-300 py-6 text-sm text-gray-500">
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, numquam! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, repudiandae.</p>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, eligendi.</p>
						</div>
					</div>
				
					{/* Display related products */}
					<RelatedProducts category={productData.category} subCategory={productData.subCategory} />
				</div>
			{/* </div> */}
		</div>
	) : <div className='opacity-0'></div>
}

export default Product