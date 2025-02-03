import React from 'react';

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-rose-400 via-rose-500 to-rose-300 text-white py-10 mt-24">
			<div className="max-w-7xl mx-auto px-6 lg:px-20">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
					<div>
						<h2 className="mb-3 text-lg font-semibold">About Us</h2>
						<ul className="space-y-2">
							<li><a href="#" className="hover:underline">About</a></li>
							<li><a href="#" className="hover:underline">Blog</a></li>
						</ul>
					</div>
					<div>
						<h2 className="mb-3 text-lg font-semibold">Info</h2>
						<ul className="space-y-2">
							<li><a href="#" className="hover:underline">FAQ</a></li>
						</ul>
					</div>
					<div>
						<h2 className="mb-3 text-lg font-semibold">Our Store</h2>
						<ul className="space-y-2">
							<li><a href="#" className="hover:underline">Find a Store</a></li>
						</ul>
					</div>
					<div>
						<h2 className="mb-3 text-lg font-semibold">Policies</h2>
						<ul className="space-y-2">
							<li><a href="#" className="hover:underline">Privacy Policy</a></li>
							<li><a href="#" className="hover:underline">Return & Exchange</a></li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between">
					<span className="text-sm">© 2023 Chola. All Rights Reserved.</span>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<a href="#" className="hover:text-gray-200"><i className="fab fa-facebook-f"></i></a>
						<a href="#" className="hover:text-gray-200"><i className="fab fa-twitter"></i></a>
						<a href="#" className="hover:text-gray-200"><i className="fab fa-github"></i></a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
