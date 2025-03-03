import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const PaymentSuccess = () => {
	const [search] = useSearchParams();
	const dataQuery = search.get('data');
	const [data, setData] = useState(null);
	const { clearCart} = useContext(ShopContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (dataQuery) {
			try {
				const resData = atob(dataQuery);
				const resObject = JSON.parse(resData);
				setData(resObject);
			} catch (error) {
				console.error('Error decoding or parsing data:', error);
				setData(null);
			}
		} else {
			setData(null);
		}
	}, [dataQuery]);

	const bgImg = {
		backgroundImage: 'url(https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png)',
		height: '200px',
		width: '200px',
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		animation: 'fadeIn 2s ease-in-out',
	};

	return (
		<div className="container h-[80vh] w-full lg:ms-24 flex flex-col justify-center items-center -mb-24">
			<div className="flex flex-col items-center p-8 rounded-xl">
				<div style={bgImg}></div>
				<h2 className="text-3xl font-bold text-blue-600 mt-6">Payment {data ? 'Details' : 'Successful'}!</h2>

				{data ? (
					<p className="text-xl text-green-600 font-semibold mt-4">Amount Paid: Rs. {data.total_amount}</p>
				) : (
					<p className="text-xl text-green-600 font-semibold mt-4">Your payment was successfully processed!</p>
				)}

				
				<button onClick={() => { clearCart(); navigate('/order'); }} className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white py-3 px-16 mt-6 rounded-lg shadow-lg text-xl hover:scale-105 transition-transform ease-in-out duration-300">
						Go to Order Page
					</button>
			</div>
		</div>
	);
};

export default PaymentSuccess;
