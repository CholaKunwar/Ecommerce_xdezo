import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'

const CartTotal = () => {
	const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
	return (
		<div className=''>
			<div className='w-full'>
				<div className="text-2xl">
					<h1 className='text-gray-500'>CART <span className='text-black ps-2'>TOTALS</span></h1>
				</div>

				<div className="flex flex-col gap-2 mt-2 text-sm">
					<div className='flex justify-between'>
						<p>Subtotal</p>
						<p>{currency} {getCartAmount()}.00</p>
					</div>
					<hr className='text-gray-300'/>
					<div className="flex justify-between">
						<p>Shipping Fee</p>
						<p>{currency} {delivery_fee}.00</p>
					</div>
					<hr className='text-gray-300'/>
					<div className='flex justify-between'>
						<b>Total</b>
						<b>{currency} {getCartAmount()===0 ? 0: getCartAmount() + delivery_fee}.00</b>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartTotal