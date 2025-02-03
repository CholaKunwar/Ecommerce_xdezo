import React from 'react'

const About = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-10'>
			<div className="text-center pt-8">
				<h1 className='text-gray-500 text-4xl font-bold'>ABOUT <span className='text-black'>US_</span></h1>
			</div>
			<div className='my-10 flex flex-col md:flex-row items-center gap-16'>
				<img src="https://d3hjf51r9j54j7.cloudfront.net/wp-content/uploads/sites/3/2022/08/online-clothes-shopping-wardrobe-phone.jpg"
					alt="Shopping Image" className='w-full h-[350px] md:max-w-[500px] rounded-lg shadow-lg' />
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 text-lg">
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam sequi odio porro ex ipsa dolor cumque, laudantium ipsam sint alias eveniet hic nesciunt nobis dignissimos.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem deserunt aperiam? Cumque sapiente amet quas non quae, eveniet tenetur.</p>
					<b className='text-gray-800 text-2xl'>Our Mission</b>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ipsam repudiandae tempore ad eligendi omnis earum delectus vitae nemo. Aut.</p>
				</div>
			</div>

			<div className="text-center text-2xl py-6">
				<h1 className='text-gray-500 font-semibold'>WHY <span className='text-black'> CHOOSE US?</span></h1>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
				<div className="border border-gray-300 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
					<b className='text-xl text-gray-800'>Quality Assurance</b>
					<p className='text-gray-600 mt-4'>We provide the highest quality products with rigorous testing and attention to detail.</p>
				</div>

				<div className="border border-gray-300 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
					<b className='text-xl text-gray-800'>Convenience</b>
					<p className='text-gray-600 mt-4'>Shop anytime, anywhere with our seamless and user-friendly platform.</p>
				</div>

				<div className="border border-gray-300 bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all">
					<b className='text-xl text-gray-800'>Exceptional Customer Service</b>
					<p className='text-gray-600 mt-4'>Our dedicated support team is here to assist you every step of the way.</p>
				</div>
			</div>
		</div>
	)
}

export default About;