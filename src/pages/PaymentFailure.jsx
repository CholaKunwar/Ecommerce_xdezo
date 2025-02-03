import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import path
import { MdCancel } from 'react-icons/md';

const PaymentFailure = () => {
	return (
		<div className="container h-[70vh] w-full flex flex-col justify-center items-center -mb-24">
			<div className="flex flex-col items-center p-8">
				<MdCancel className="text-red-600 text-9xl animate-bounce" />
				<p className="text-red-600 text-3xl font-bold mt-6 tracking-wide">Payment Failed!</p>
				<p className="text-gray-600 text-xl mt-2">Unfortunately, your payment could not be processed.</p>
				<Link to="/cart">
					<button className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-16 mt-6 rounded-lg shadow-lg text-xl hover:scale-105 transition-transform duration-300">
						Go to Cart
					</button>
				</Link>
			</div>
		</div>
	);
};

export default PaymentFailure;
