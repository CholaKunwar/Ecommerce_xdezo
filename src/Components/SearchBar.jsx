import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
	const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
	const [visible, setVisible] = useState(false);
	const location = useLocation();
	// console.log(location.pathname);

	useEffect(() => {
		collectionSearch();
	}, [location]);

	const collectionSearch = () => {
		if (location.pathname.includes('collection')) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	}
	return showSearch && (
		<div className="flex items-center justify-center p-3 mt-5 ">
			<div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm w-full max-w-2xl bg-white">
				{/* Search Input */}
				<input value={search} onChange={(e)=>setSearch(e.target.value)}
					type="text"
					placeholder="Search for products, brands, and more..."
					className="px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
					autoFocus // Auto-focus on the input for better UX
				/>
				{/* Search Button */}
				<button
					className="px-6 py-[14px] bg-rose-200 text-white hover:bg-rose-300 transition-colors duration-200 flex items-center justify-center"
				>
					<FaSearch className="w-5 h-5" /> {/* Search icon */}
				</button>
			</div>
		</div>
	)
}

export default SearchBar