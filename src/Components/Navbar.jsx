import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { RxDropdownMenu } from "react-icons/rx";
import { FaCartPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import Logo from '../../public/logo.png';
import { ShopContext } from '../Context/ShopContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';


const Navbar = () => {
	const [visible, setVisible] = useState(false);
	const { showSearch, setShowSearch, getCartCount } = useContext(ShopContext);
	
	// clerk code: 
	const { openSignIn } = useClerk();
	const { user } = useUser();

	return (
		<>
			<div className='w-full py-3 bg-rose-200'></div>
			<div className='flex items-center justify-between py-3 font-medium px-14 shadow-md '>
				<Link to='/'>
					<div className='flex items-center'>
						<img src={Logo} alt="" className='w-12 h-10 object-cover rounded-2xl' />
						<h1 className='text-4xl font-semibold'>Ch<span className='text-lime-800'>ola</span></h1>
					</div>
				</Link>
				<ul className='hidden sm:flex gap-5 text-sm text-gray-800'>
					<NavLink to='/' className='flex flex-col items-center gap-1'>
						<p>HOME</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>

					<NavLink to='/collection' className='flex flex-col items-center gap-1'>
						<p>COLLECTION</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>

					<NavLink to='/about' className='flex flex-col items-center gap-1'>
						<p>ABOUT</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>

					<NavLink to='/contact' className='flex flex-col items-center gap-1'>
						<p>CONTACT</p>
						<hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
					</NavLink>
				</ul>

				<div className="flex items-center gap-6">
					<IoMdSearch onClick={() => setShowSearch(prev => !prev)} className='w-6 h-6 cursor-pointer' />
					{console.log(showSearch)}
					<div className="group relative">
						{/* <Link to={'/login'}><CgProfile className='w-6 h-6 cursor-pointer' alt="" /></Link>
						<div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'> */}
							
							{/* whenever we are signin we need to hide this btn and display user profile icon */}
							{user ? <UserButton /> :
							<button onClick={() => openSignIn()} className=' place-items-center cursor-pointer'><CgProfile className='w-6 h-6 place-items-center' /></button>
							}
							{/* <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600">
								<p className='cursor-pointer hover:text-black'>My profile</p>
								<p className='cursor-pointer hover:text-black'>Orders</p>
								<p className='cursor-pointer hover:text-black'>Logout</p>
							</div> */}
						{/* </div> */}
					</div>
					{user &&
						<Link to='/cart' className='relative'>
							<FaCartPlus className='w-5 min-w-5' />
							<p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
						</Link>}
					<RxDropdownMenu onClick={()=>setVisible(true)} className='w-5 cursor-pointer sm:hidden' />
				</div>

				{/* Sidebar menu for small screens */}
				<div className={`absolute top-0 right-0 h-screen z-10 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
					<div className='flex flex-col text-gray-600'>
						<div onClick={()=>{setVisible(false)}} className="flex items-center gap-4 p-3 cursor-pointer">
							<RxDropdownMenu className='h-4 rotate-180' />
						</div>
						<NavLink className='py-2 pl-6 border border-gray-200' to='/' onClick={() => { setVisible(false) }} >HOME</NavLink>
						<NavLink className='py-3 pl-6 border border-gray-100' to='/collection' onClick={() => { setVisible(false) }} >COLLECTION</NavLink>
						<NavLink className='py-3 pl-6 border border-gray-100' to='/about' onClick={() => { setVisible(false) }} >ABOUT</NavLink>
						<NavLink className='py-3 pl-6 border border-gray-200' to='/contact' onClick={() => { setVisible(false) }} >CONTACT</NavLink>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar