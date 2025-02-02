import React from 'react'

const Contact = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className='text-center text-2xl pt-10'>
				<h1 className='text-gray-500 text-2xl'>CONTACT <span className='text-black'>US</span></h1>
			</div>
			<div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb:28'>
				<img src="https://st2.depositphotos.com/7865540/10697/i/450/depositphotos_106976166-stock-photo-laptop-with-contact-us-text.jpg" className='w-full md:max-w-[500px] h-[550px]' alt="" />

				<div className='flex flex-col justify-center items-start gap-6'>
					<p className='font-semibold text-xl text-gray-600'>Our Store</p>
					<p className='text-gray-500'>455282 Lorem, ipsum. <br /> Suite 8995, Pokhara, Nepal</p>
					<p className='text-gray-500'>TEL: +977 061-2562525 <br />Email: roshaniKunwar4008@gmail.com</p>
					<p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
					<p className='text-gray-500'>Learn more about us and our job openings.</p>
					<button className='border border-black px-8 py-4 text-md hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
				</div>
			</div>
		</div>
	)
}

export default Contact