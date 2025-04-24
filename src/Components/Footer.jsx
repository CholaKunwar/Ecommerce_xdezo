import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className="bg-gradient-to-r from-[#96785e] via-[#6f4e46] to-[#9c7a6d] text-white pt-16 pb-10 mt-24 shadow-inner">
			<div className="max-w-7xl mx-auto px-6 lg:px-20">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
					{/* Column 1 */}
					<div>
						<h2 className="mb-4 text-xl font-bold tracking-wide">About Us</h2>
						<ul className="space-y-3 text-sm">
							<li><Link to="/about" className="hover:underline hover:text-amber-100 transition-all">About</Link></li>
						</ul>
					</div>

					{/* Column 2 */}
					<div>
						<h2 className="mb-4 text-xl font-bold tracking-wide">Info</h2>
						<ul className="space-y-3 text-sm">
							<li><Link to="/faq" className="hover:underline hover:text-amber-100 transition-all">FAQ</Link></li>
						</ul>
					</div>

					{/* Column 3 */}
					<div>
						<h2 className="mb-4 text-xl font-bold tracking-wide">Our Store</h2>
						<ul className="space-y-3 text-sm">
							<li><Link to="/find-a-store" className="hover:underline hover:text-amber-100 transition-all">Find a Store</Link></li>
						</ul>
					</div>

					{/* Column 4 */}
					<div>
						<h2 className="mb-4 text-xl font-bold tracking-wide">Policies</h2>
						<ul className="space-y-3 text-sm">
							<li><Link to="/privacy" className="hover:underline hover:text-amber-100 transition-all">Privacy Policy</Link></li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className="mt-12 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
					<span className="text-sm opacity-80">© 2023 Chola. All Rights Reserved.</span>

					<div className="flex gap-4">
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Facebook"
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
						>
							<FaFacebookF className="text-white" />
						</a>
						<a
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Twitter"
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
						>
							<FaTwitter className="text-white" />
						</a>
						<a
							href="https://github.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
							className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md"
						>
							<FaGithub className="text-white" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
