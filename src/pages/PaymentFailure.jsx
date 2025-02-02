import React from 'react'
import { Link } from 'react-router';
import { MdCancel } from "react-icons/md";

const PaymentFailure = () => {
	// const bgImg = {
	// 	backgroundImage: 'url(https://e7.pngegg.com/pngimages/733/83/png-clipart-failure-miscellaneous-television.png)',
	// 	height: '50vh', // Full viewport height
	// 	width: '50vw', // Full viewport width
	// 	backgroundSize: 'contain', // Ensure the image fills the container
	// 	backgroundPosition: 'center', // Center the image
	// 	backgroundRepeat: 'no-repeat', // Prevent tiling
	// };

	return (
		<div className='container h-screen w-[100vw] flex flex-col justify-center items-center'>
			{/* <div style={bgImg}></div> */}
			<MdCancel className='text-red-700 w-[50vw] h-[50vh]' />
			<p className='text-red-700 text-2xl mt-5 font-bold tracking-wider'>Payment Failure</p>
			<Link to={'/cart'}>
				<button className='bg-red-700 py-2 px-24 rounded-md text-2xl mt-4 text-white shadow-lg font-semibold'>Done</button>
			</Link>
		</div>

	);
};

export default PaymentFailure