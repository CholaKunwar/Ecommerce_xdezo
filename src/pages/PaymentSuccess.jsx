import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const PaymentSuccess = () => {
	const [search] = useSearchParams();
	const dataQuery = search.get('data');
	const [data, setData] = useState(null);
	const cartClearedRef = useRef(false); // ✅ useRef instead of useState
	const { clearCart } = useContext(ShopContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cartClearedRef.current) {
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
			clearCart();
			cartClearedRef.current = true; // ✅ mark as cleared
		}
	}, [dataQuery, clearCart]);

	return (
		<div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12">
			<div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-xl w-full text-center animate-fade-in">
				<div
					className="mx-auto h-28 w-28 md:h-40 md:w-40 bg-no-repeat bg-center bg-contain"
					style={{ backgroundImage: 'url(https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png)' }}
				></div>

				<h2 className="text-2xl md:text-3xl font-bold text-[#5e3b23] mt-6">
					Payment {data ? 'Details' : 'Successful'}!
				</h2>

				<p className="text-lg md:text-xl text-green-700 font-semibold mt-4">
					{data ? `Amount Paid: Rs. ${data.total_amount}` : 'Your payment was successfully processed!'}
				</p>

				<button
					onClick={() => navigate('/order2')}
					className="mt-8 w-full bg-[#5e3b23] hover:bg-[#4b2f1e] text-white text-lg md:text-xl font-medium py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg"
				>
					Go to Order Page
				</button>
			</div>
		</div>
	);
};

export default PaymentSuccess;
