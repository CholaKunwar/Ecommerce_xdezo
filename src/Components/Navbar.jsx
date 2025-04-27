import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';  // For RxDropdownMenu
import { ShoppingCart } from 'lucide-react';  // For FaCartPlus
import { User } from 'lucide-react';  // For CgProfile
import { Search } from 'lucide-react';  // For IoMdSearch
import Logo from '../assets/logo.png';
import { ShopContext } from '../Context/ShopContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const { setShowSearch, getCartCount } = useContext(ShopContext);
	const { openSignIn } = useClerk();
	const { user } = useUser();

	return (
		<>
			{/* Top Bar */}
			<div className='w-full py-2 bg-gradient-to-r from-[#d9b18f] via-[#896B60] to-[#4a332d]'></div>

			{/* Navbar */}
			<div className='flex items-center justify-between py-4 px-3 md:px-10 shadow-lg bg-[#fdfcfb] rounded-b-3xl border-b border-[#e0d5cd] backdrop-blur-lg'>
				{/* Logo */}
				<Link to='/'>
					<div className='flex items-center gap-2'>
						<img src={Logo} alt="Logo" className='h-8 w-8 md:w-14 md:h-12 object-cover rounded-xl transform hover:scale-110 transition-all' />
						<h1 className='text-2xl md:text-4xl font-bold text-gray-900'>Style<span className='text-[#896b60]'>Nest</span></h1>
					</div>
				</Link>

				{/* Nav Links */}
				<ul className='hidden lg:flex gap-10 text-[17px] font-medium text-[#4a332d] tracking-wide'>
					<NavLink to='/' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>HOME</NavLink>
					<NavLink to='/collection' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>COLLECTION</NavLink>
					<NavLink to='/about' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>ABOUT</NavLink>
					<NavLink to='/contact' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>CONTACT</NavLink>
					{user && <NavLink to='/order2' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>ORDER</NavLink>}
					<NavLink to='/find-a-store' className={({ isActive }) => `relative pb-1 transition-all hover:text-[#896b60] hover:underline underline-offset-8 uppercase ${isActive ? 'text-[#896b60] underline underline-offset-8' : ''}`}>Find our store</NavLink>
				</ul>

				{/* Icons */}
				<div className="flex items-center gap-6">
					<Search onClick={() => setShowSearch(prev => !prev)} className='w-7 h-7 cursor-pointer text-[#4a332d] hover:text-[#896b60] transition-transform hover:scale-110' />
					<div className="group relative">
						{user ? <UserButton /> :
							<button onClick={() => openSignIn()} className='p-2 cursor-pointer hover:bg-gray-200 rounded-full transition-all'>
								<User className='w-6 h-6 text-[#4a332d]' />
							</button>}
					</div>
					{user &&
						<Link to='/cart' className='relative'>
							<ShoppingCart className='w-7 h-7 text-[#4a332d] hover:text-[#896b60] transition-transform hover:scale-110' />
							<p className='absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-[#ff6b6b] text-white rounded-full text-xs animate-bounce shadow-md'>
								{getCartCount()}
							</p>
						</Link>
					}
					<Menu onClick={() => setVisible(true)} className='w-7 h-7 cursor-pointer lg:hidden text-[#4a332d] hover:text-[#896b60]' />
				</div>
			</div>

			{/* Sidebar menu for small screens */}
			<div className={`fixed top-0 right-0 h-full z-40 transition-all duration-500 ease-in-out ${visible ? 'w-full' : 'w-0'} overflow-hidden`}>
				<div className={`h-full w-3/4 max-w-sm bg-white/70 backdrop-blur-md shadow-2xl rounded-l-2xl transform ${visible ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 ease-in-out`}>
					<div className='flex flex-col pt-6 h-full'>
						<button
							onClick={() => setVisible(false)}
							className="flex items-center gap-4 px-4 pb-6 text-[#4a332d] hover:text-[#896b60] transition-transform hover:scale-105"
						>
							<Menu className='h-6 rotate-180' />
							<span className='text-lg font-semibold'>Close</span>
						</button>

						{[
							{ name: "HOME", to: "/" },
							{ name: "COLLECTION", to: "/collection" },
							{ name: "ABOUT", to: "/about" },
							{ name: "CONTACT", to: "/contact" },
							...(user ? [{ name: "ORDERS", to: "/order2" }] : []),
							{ name: "Find our store", to: "/find-a-store", className: "uppercase" }
						].map(({ name, to, className = "" }) => (
							<NavLink
								key={name}
								className={`py-4 pl-6 border-b border-gray-100 text-[#4a332d] hover:bg-gradient-to-r hover:from-[#f3eee7] hover:to-[#efe3d1] hover:text-[#5e3b23] text-lg font-medium ${className}`}
								to={to}
								onClick={() => setVisible(false)}
							>
								{name}
							</NavLink>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
