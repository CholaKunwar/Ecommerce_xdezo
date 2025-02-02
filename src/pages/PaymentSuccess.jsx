import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom'; // Corrected import

const PaymentSuccess = () => {
	const [search] = useSearchParams();
	const dataQuery = search.get('data');
	const [data, setData] = useState(null); // Initialize data as null

	useEffect(() => {
		if (dataQuery) {
			try {
				// Decode the Base64 string
				const resData = atob(dataQuery);
				// Parse the JSON string into an object
				const resObject = JSON.parse(resData);
				console.log(resObject);
				setData(resObject);
			} catch (error) {
				console.error('Error decoding or parsing data:', error);
				setData(null); // Set data to null in case of error
			}
		} else {
			console.log('No data found in the URL');
			setData(null); // Set data to null if no data is found
		}
	}, [dataQuery]); // Run effect when dataQuery changes

	const bgImg = {
		backgroundImage: 'url(https://icons.veryicon.com/png/o/miscellaneous/8atour/success-35.png)',
		height: '45vh', // Full viewport height
		width: '45vw', // Full viewport width
		backgroundSize: 'contain', // Ensure the image fills the container
		backgroundPosition: 'center', // Center the image
		backgroundRepeat: 'no-repeat', // Prevent tiling
	};

	return (
		<div className='container h-[50vh] mt-20 w-[100vw] flex flex-col justify-center items-center'>
			<div style={bgImg}></div>
			{data ? (
				<p className='text-lime-600 text-2xl font-semibold mt-4'>Rs. {data.total_amount}.00</p>
			) : (
				<p className='text-lime-600 text-2xl font-semibold mt-4'>Payment Successful!</p>
			)}
			<Link to={'/'}>
				<button className='bg-lime-600 py-2 px-24 text-2xl mt-4 text-white shadow-lg font-semibold'>Done</button>
			</Link>
		</div>
	);
};

export default PaymentSuccess;