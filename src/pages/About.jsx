import React from 'react'

const About = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className="text-center pt-8">
				<h1 className='text-gray-500 text-4xl'>ABOUT <span className='text-black'>US_</span></h1>
			</div>
			<div className='my-10 flex flex-col  md:flex-row gap-16'>
				<img src="https://d3hjf51r9j54j7.cloudfront.net/wp-content/uploads/sites/3/2022/08/online-clothes-shopping-wardrobe-phone.jpg" alt="" className='w-full h-[450px] md:max-w-[500px]' />
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam sequi odio porro ex ipsa dolor cumque, laudantium ipsam sint alias eveniet hic nesciunt nobis dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem voluptatem deserunt aperiam? Cumque sapiente amet quas non quae, eveniet tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, repellendus.</p>
					<b className='text-gray-600  text-xl'>Our Mission</b>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ipsam repudiandae tempore ad eligendi omnis earum delectus vitae nemo. Aut. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, animi.</p>
				</div>
			</div>

			<div className="text-2xl py-4">
				<h1 className='text-gray-500'>WHY  <span className='text-black'> CHOOSE US? </span></h1>
				<div className="flex flex-col md:flex-row text-sm mb-10 mt-3 ">
					<div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
						<b>Quality Assurance</b>
						<p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur amet, fugiat nemo ut numquam quaerat alias earum aut accusamus, at, itaque accusantium molestias dicta totam!</p>
					</div>

					<div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
						<b>Convenience:</b>
						<p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur amet, fugiat nemo ut numquam quaerat alias earum aut accusamus, at, itaque accusantium molestias dicta totam!</p>
					</div>

					<div className="border border-gray-300 px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
						<b>Exceptional Custiomer Service:</b>
						<p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur amet, fugiat nemo ut numquam quaerat alias earum aut accusamus, at, itaque accusantium molestias dicta totam!</p>
					</div>
				</div>
		</div>
		</div>
	)
}

export default About