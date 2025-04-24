
const About = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-14'>
			<div className="text-center pt-6">
				<h1 className='text-4xl font-bold text-gray-600'>
					ABOUT <span className='text-[#ff6b6b]'>US_</span>
				</h1>
			</div>

			<div className='my-12 flex flex-col md:flex-row items-center gap-16'>
				<img
					src="https://d3hjf51r9j54j7.cloudfront.net/wp-content/uploads/sites/3/2022/08/online-clothes-shopping-wardrobe-phone.jpg"
					alt="Shopping"
					className='w-full h-[350px] md:max-w-[500px] rounded-xl shadow-xl object-cover'
				/>
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-[17px] text-gray-700 leading-7">
					<p>
						We are more than just an online store—we are a lifestyle brand that combines style, comfort, and convenience. Our mission is to help you shop smarter, faster, and better.
					</p>
					<p>
						From the latest fashion trends to timeless classics, our curated collection ensures quality with every purchase. Explore, express, and elevate your style with us.
					</p>
					<h2 className='text-2xl text-gray-800 font-semibold mt-4'>🎯 Our Mission</h2>
					<p>
						To redefine your shopping experience through innovation, quality, and exceptional service. We strive to build a community where fashion meets functionality.
					</p>
				</div>
			</div>

			<div className="text-center text-2xl py-6">
				<h2 className='text-gray-500 font-semibold'>
					WHY <span className='text-[#ff6b6b]'>CHOOSE US?</span>
				</h2>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
				<div className="border border-gray-200 bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
					<h3 className='text-xl font-semibold text-gray-800'>🛡 Quality Assurance</h3>
					<p className='text-gray-600 mt-3'>We deliver premium products with strict quality control and detail-focused craftsmanship.</p>
				</div>

				<div className="border border-gray-200 bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
					<h3 className='text-xl font-semibold text-gray-800'>⚡ Convenience</h3>
					<p className='text-gray-600 mt-3'>Shop anytime, anywhere with a seamless experience on any device.</p>
				</div>

				<div className="border border-gray-200 bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
					<h3 className='text-xl font-semibold text-gray-800'>💬 Exceptional Service</h3>
					<p className='text-gray-600 mt-3'>Our friendly support team is always ready to assist with any inquiry or concern.</p>
				</div>
			</div>
		</div>
	);
};

export default About;
