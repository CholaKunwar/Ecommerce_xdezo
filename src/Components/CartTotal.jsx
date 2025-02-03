import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';

const CartTotal = () => {
	const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

	return (
		<div className='pt-8 pb-4'>
			<div className='w-full'>
				<div className="text-2xl mb-4">
					<h1 className='text-gray-600 font-semibold'>
						CART <span className='text-black'>TOTALS</span>
					</h1>
				</div>

				<div className="flex flex-col gap-4 text-sm">
					{/* Subtotal */}
					<div className='flex justify-between items-center'>
						<p className='text-gray-700'>Subtotal</p>
						<p className='font-medium'>{currency} {getCartAmount()}.00</p>
					</div>
					<hr className='border-gray-300 my-2' />

					{/* Shipping Fee */}
					<div className="flex justify-between items-center">
						<p className='text-gray-700'>Shipping Fee</p>
						<p className='font-medium'>{currency} {delivery_fee}.00</p>
					</div>
					<hr className='border-gray-300 my-2' />

					{/* Total */}
					<div className='flex justify-between items-center'>
						<p className='text-gray-900 font-semibold'>Total</p>
						<p className='text-xl font-semibold text-black'>
							{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartTotal;
