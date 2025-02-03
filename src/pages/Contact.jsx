import React from 'react';

const Contact = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
			<div className='text-center'>
				<h1 className='text-gray-700 text-4xl font-bold'>CONTACT <span className='text-black'>US</span></h1>
				<p className='text-gray-500 mt-2 text-lg'>We'd love to hear from you!</p>
			</div>

			<div className='my-10 flex flex-col md:flex-row gap-10 items-center'>
				<img
					src="https://st2.depositphotos.com/7865540/10697/i/450/depositphotos_106976166-stock-photo-laptop-with-contact-us-text.jpg"
					className='w-full md:max-w-[500px] h-[450px] rounded-lg shadow-lg hover:scale-105 transition-transform duration-300'
					alt="Contact Us"
				/>

				<div className='flex flex-col justify-center items-start gap-6 bg-white p-8 shadow-md rounded-lg w-full md:w-2/4'>
					<h2 className='font-semibold text-2xl text-gray-700'>Our Store</h2>
					<p className='text-gray-600 text-lg'>455282 Lorem, ipsum.<br /> Suite 8995, Pokhara, Nepal</p>
					<p className='text-gray-600 text-lg'>
						TEL: <span className='font-semibold'>+977 061-2562525</span><br />
						Email: <span className='font-semibold'>roshaniKunwar4008@gmail.com</span>
					</p>
					<h2 className='font-semibold text-2xl text-gray-700'>Careers at Forever</h2>
					<p className='text-gray-600 text-lg'>Learn more about us and our job openings.</p>
					<button className='border border-black px-8 py-3 text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-500'>
						Explore Jobs
					</button>
				</div>
			</div>
		</div>
	);
};

export default Contact;