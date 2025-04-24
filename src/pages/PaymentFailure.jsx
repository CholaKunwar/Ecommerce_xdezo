// import React from 'react';
import { Link } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

const PaymentFailure = () => {
	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12">
			<div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center animate-fade-in">
				<MdCancel className="text-red-600 text-7xl md:text-9xl animate-bounce mx-auto" />

				<h2 className="text-2xl md:text-3xl font-bold text-[#5e3b23] mt-6">
					Payment Failed!
				</h2>

				<p className="text-gray-600 text-lg md:text-xl mt-3">
					Unfortunately, your payment could not be processed.
				</p>

				<Link to="/cart">
					<button className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl font-medium py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg">
						Go to Cart
					</button>
				</Link>
			</div>
		</div>
	);
};

export default PaymentFailure;
