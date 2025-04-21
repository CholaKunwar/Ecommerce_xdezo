// import React from 'react';
import clothStoreVideo from '../assets/clothStore.mp4'; // Import the video fil

const Hero = () => {
	return (
		<div className='px-4 mt-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-8 pb-4'>
			<div className='flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
				{/* Hero left side */}
				<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
					<div className='text-[#414141] text-center sm:text-left'>
						<div className='flex items-center gap-2 justify-center sm:justify-start'>
							<p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
							<p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
						</div>
						<h1 className='prata-regular text-3xl sm:text-4xl lg:text-5xl leading-relaxed py-3 animate-fadeIn'>
							Latest Arrivals
						</h1>
						<div className='flex items-center gap-2 justify-center sm:justify-start'>
							<p className='font-semibold text-sm md:text-base hover:text-[#000] transition-colors duration-300 cursor-pointer'>
								SHOP NOW
							</p>
							<p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
						</div>
					</div>
				</div>

				{/* Hero Right Side */}
				{/* <div className="w-full sm:w-1/2 xs:h-[450px] overflow-hidden">
					<img
						className="xs:w-[450px] xs:h-[450px] lg:w-full lg:h-full object-cover transform hover:scale-105 transition-transform duration-500"
						src='https://img.freepik.com/free-photo/excited-funny-woman-shopaholic-holding-hangers-with-summer-clothes-try-demonstrating-smartphone_273609-741.jpg'
						alt="Latest Arrivals"
					/>
				</div> */}
				<div className="w-full  sm:w-1/2 sm:h-[450px] overflow-hidden">
					<video
						className="xs:w-[450px] xs:h-[450px] lg:w-full lg:h-full object-cover transform hover:scale-105 transition-transform duration-500"
						autoPlay
						muted
						loop
					>
						<source src={clothStoreVideo} type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
		</div>
	);
};

export default Hero;