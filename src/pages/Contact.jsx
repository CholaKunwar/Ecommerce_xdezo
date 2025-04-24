import { Link } from "react-router-dom";

const Contact = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-14 ]'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-gray-800'>
					CONTACT <span className='text-[#ff6b6b]'>US</span>
				</h1>
				<p className='text-gray-500 mt-3 text-lg'>We’d love to hear from you!</p>
			</div>

			<div className='my-12 flex flex-col md:flex-row gap-12 items-center'>
				<img
					src="https://st2.depositphotos.com/7865540/10697/i/450/depositphotos_106976166-stock-photo-laptop-with-contact-us-text.jpg"
					className='w-full md:max-w-[500px] h-[450px] rounded-xl shadow-xl hover:scale-105 transition-transform duration-300'
					alt="Contact Us"
				/>

				<div className='flex flex-col justify-center items-start gap-6 bg-gradient-to-br from-[#f1f1f1] to-[#f9f9f9] p-8 shadow-lg rounded-2xl w-full md:w-2/4 border border-gray-200'>
					<h2 className='font-semibold text-2xl text-[#333]'>📍 Our Store</h2>
					<p className='text-gray-700 text-[17px] leading-7'>
						455282 Lorem, Ipsum. <br />
						Suite 8995, Pokhara, Nepal
					</p>

					<p className='text-gray-700 text-[17px] leading-7'>
						📞 TEL: <span className='font-semibold text-black'>+977 061-2562525</span><br />
						✉️ Email: <span className='font-semibold text-black'>roshaniKunwar4008@gmail.com</span>
					</p>

					<h2 className='font-semibold text-2xl text-[#333]'>💼 Careers at Forever</h2>
					<p className='text-gray-700 text-[17px]'>Explore opportunities and grow with us!</p>

					<Link to={'/find-a-store'}>
						<button className='border border-black px-8 py-3 text-lg font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-300 shadow-md'>
							Contact Us
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Contact;
