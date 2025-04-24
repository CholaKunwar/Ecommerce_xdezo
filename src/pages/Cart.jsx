import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext.jsx';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CartTotal from '../Components/CartTotal.jsx';
import { useUser } from '@clerk/clerk-react';

const Cart = () => {
	const { user } = useUser();
	const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
	const [cartData, setCartData] = useState([]);

	useEffect(() => {
		const tempData = [];
		for (const items in cartItems) {
			for (const item in cartItems[items]) {
				if (cartItems[items][item] > 0) {
					tempData.push({
						_id: items,
						size: item,
						quantity: cartItems[items][item],
					});
				}
			}
		}
		setCartData(tempData);
	}, [cartItems]);

	const isCartEmpty = cartData.length === 0;

	return user ? (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#f9f9f9] min-h-screen'>
			<div className='border-b border-[#c5b5a0] pt-14'>
				<h1 className='text-3xl sm:text-4xl text-center font-bold text-[#96785e] mb-6'>
					Your <span className='text-black'>Cart</span>
				</h1>

				{/* Cart Items */}
				<div>
					{cartData.map((item, index) => {
						const productData = products.find((product) => product._id === item._id);
						return (
							<div
								key={index}
								className='py-6 px-4 border-t border-b border-[#d2c4b5] rounded-lg bg-white shadow-md my-4 transition hover:shadow-lg grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
							>
								<div className='flex items-start gap-6'>
									<img
										src={productData.image[0]}
										className='w-16 sm:w-20 rounded-lg shadow-sm'
										alt={productData.name}
									/>
									<div>
										<p className='text-sm sm:text-lg font-semibold text-gray-800'>
											{productData.name}
										</p>
										<div className='flex items-center mt-2'>
											<p className='text-base font-medium text-[#96785e]'>
												{currency}
												{productData.price}
											</p>
											<p className='px-3 py-1 border border-gray-300 bg-[#f0eae4] mx-3 rounded-md text-sm font-medium'>
												{item.size}
											</p>
										</div>
									</div>
								</div>
								<input
									onChange={(e) =>
										e.target.value === '' || e.target.value === '0'
											? null
											: updateQuantity(item._id, item.size, Number(e.target.value))
									}
									className='border border-[#cdbba5] rounded-md max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center focus:ring-2 focus:ring-[#96785e] transition-all duration-200'
									type='number'
									min={1}
									defaultValue={item.quantity}
								/>
								<RiDeleteBin7Fill
									onClick={() => {
										updateQuantity(item._id, item.size, 0);
									}}
									className='w-5 h-5 text-gray-500 cursor-pointer hover:text-red-600 transition duration-200'
								/>
							</div>
						);
					})}
				</div>

				{/* Checkout Section */}
				<div className='flex justify-end my-10'>
					<div className='w-full sm:w-[450px]'>
						<CartTotal />
						<div className='w-full text-end'>
							<button
								onClick={() => navigate('/place-order')}
								className={`bg-[#96785e] text-white text-sm font-semibold my-8 px-8 py-3 rounded-md hover:bg-[#7e644a] hover:scale-105 transform transition-all duration-200 ${isCartEmpty ? 'opacity-50 cursor-not-allowed' : ''
									}`}
								disabled={isCartEmpty}
							>
								PROCEED TO CHECKOUT
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className='text-center text-gray-600 mt-20'>Please log in to view your cart.</div>
	);
};

export default Cart;
