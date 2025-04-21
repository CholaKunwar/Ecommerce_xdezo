import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RxDropdownMenu } from "react-icons/rx";
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import Logo from '../assets/logo.png';
import { ShopContext } from '../Context/ShopContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const { setShowSearch, getCartCount } = useContext(ShopContext);
	const { openSignIn } = useClerk();
	const { user } = useUser();
	// const { signOut } = useClerk();
	// const { isSignedIn } = useAuth();

	// useEffect(() => {
	// 	if (!isSignedIn) {
	// 		toast.success("Logged out successfully!");
	// 	}
	// }, [isSignedIn]);

	return (
		<>
			{/* Top Bar */}
			<div className='w-full py-2 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-300'></div>

			{/* Navbar */}
			<div className='flex items-center justify-between py-4 px-3 md:px-10 shadow-md bg-gray-50 rounded-b-xl'>
				{/* Logo */}
				<Link to='/'>
					<div className='flex items-center gap-2'>
						<img src={Logo} alt="Logo" className='h-8 w-8 md:w-14 md:h-12 object-cover rounded-xl transform hover:scale-110 transition-all' />
						<h1 className='text-2xl md:text-4xl font-bold text-gray-900'>Style<span className='text-rose-600'>Nest</span></h1>
					</div>
				</Link>

				{/* Nav Links */}
				<ul className='hidden lg:flex gap-8 text-lg font-medium text-gray-800'>
					<NavLink to='/' className={({ isActive }) => `transition-all hover:text-rose-600 ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>HOME</NavLink>
				
					<NavLink to='/collection' className={({ isActive }) => `transition-all hover:text-rose-600 ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>COLLECTION</NavLink>

					<NavLink to='/about' className={({ isActive }) => `transition-all hover:text-rose-600 ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>ABOUT</NavLink>

					<NavLink to='/contact' className={({ isActive }) => `transition-all hover:text-rose-600 ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>CONTACT</NavLink>

					{user &&
						<NavLink to='/order2' className={({ isActive }) => `transition-all hover:text-rose-600 ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>ORDER</NavLink>
					}
					<NavLink to='/find-a-store' className={({ isActive }) => `transition-all hover:text-rose-600 uppercase ${isActive ? 'text-rose-600 underline underline-offset-6' : ''}`}>Find our store</NavLink>
				</ul>

				{/* Icons */}
				<div className="flex items-center gap-6">
					<IoMdSearch onClick={() => setShowSearch(prev => !prev)} className='w-7 h-7 cursor-pointer hover:text-rose-600 transition-all' />
					<div className="group relative">
						{user ? <UserButton /> :
							<button onClick={() => openSignIn()} className='p-2 cursor-pointer hover:bg-gray-200 rounded-full transition-all'>
								<CgProfile className='w-6 h-6' />
							</button>}
					</div>
					{user &&
						<Link to='/cart' className='relative'>
							<FaCartPlus className='w-7 h-7 hover:text-rose-600 transition-all' />
							<p className='absolute right-[-5px] bottom-[-5px] w-5 text-center leading-5 bg-rose-500 text-white aspect-square rounded-full text-xs'>
								{getCartCount()}
							</p>
						</Link>
					}
					<RxDropdownMenu onClick={() => setVisible(true)} className='w-7 h-7 cursor-pointer lg:hidden hover:text-rose-600' />
				</div>
			</div>

			{/* Sidebar menu for small screens */}
			<div className={`fixed top-0 right-0 h-full z-20 bg-opacity-70 bg-black transition-all duration-300 ${visible ? 'w-full' : 'w-0'}`}>
				<div className='flex flex-col bg-white w-3/4 h-full shadow-lg'>
					<div onClick={() => setVisible(false)} className="flex items-center gap-4 p-4 cursor-pointer text-gray-600 hover:text-rose-600 transition-all">
						<RxDropdownMenu className='h-6 rotate-180' />
						<span className='text-lg font-medium'>Close</span>
					</div>
					<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg' to='/' onClick={() => { setVisible(false) }}>HOME</NavLink>
					<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg' to='/collection' onClick={() => { setVisible(false) }}>COLLECTION</NavLink>
					<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg' to='/about' onClick={() => { setVisible(false) }}>ABOUT</NavLink>
					<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg' to='/contact' onClick={() => { setVisible(false) }}>CONTACT</NavLink>
					{user &&
						<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg' to='/order2' onClick={() => { setVisible(false) }}>ORDERS</NavLink>
					}
					<NavLink className='py-4 pl-6 border-b border-gray-200 hover:bg-rose-50 text-lg uppercase' to='/find-a-store' onClick={() => { setVisible(false) }}>Find our store</NavLink>
				</div>
			</div>
		</>
	)
}

export default Navbar;
