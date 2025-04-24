import clothStoreVideo from '../assets/clothStore.mp4';

const Hero = () => {
	return (
		<div className='px-4 mt-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-8 pb-4'>
			<div className='flex flex-col sm:flex-row border border-[#f1f1f1] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-[#fefcf9]'>

				{/* Hero Text Side */}
				<div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-6 lg:px-10">
					<div className='text-[#3f2e23] text-center sm:text-left'>
						<div className='flex items-center gap-2 justify-center sm:justify-start mb-2'>
							<p className='w-8 md:w-10 h-[2px] bg-[#96785e]'></p>
							<p className='font-medium text-sm md:text-base tracking-wide text-[#96785e]'>
								OUR BESTSELLERS
							</p>
						</div>
						<h1 className='prata-regular text-3xl sm:text-4xl lg:text-5xl leading-snug py-3 text-[#252525] animate-fadeIn'>
							Latest Arrivals
						</h1>
						<div className='flex items-center gap-2 justify-center sm:justify-start mt-4'>
							<button className='text-sm md:text-base font-semibold text-[#96785e]'>
								SHOP NOW
							</button>
							<p className='w-8 md:w-10 h-[2px] bg-[#96785e]'></p>
						</div>
					</div>
				</div>

				{/* Hero Video Side */}
				<div className="w-full sm:w-1/2 sm:h-[450px] max-h-[450px] overflow-hidden">
					<video
						className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-500"
						autoPlay
						muted
						loop
					>
						<source src={clothStoreVideo} type="video/mp4" />
						Your browser does not support this video tag.
					</video>
				</div>
			</div>
		</div>
	);
};

export default Hero;
