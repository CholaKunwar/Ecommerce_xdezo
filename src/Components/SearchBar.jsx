import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
	const { search, setSearch, showSearch } = useContext(ShopContext);
	const [visible, setVisible] = useState(true); // set true for global
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		setVisible(true); // make always visible or change based on route if needed
	}, [location]);

	const handleSearch = (e) => {
		const value = e.target.value;
		setSearch(value);

		// Redirect to collection page if not already there
		if (!location.pathname.includes('/collection')) {
			navigate('/collection');
		}
	};

	return visible && showSearch && (
		<div className="flex items-center justify-center p-3 mt-5">
			<div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-lg w-full max-w-2xl bg-[#f9f9f9] transition-all duration-300 ease-in-out hover:shadow-2xl">
				{/* Search Input */}
				<input
					value={search}
					onChange={handleSearch}
					type="text"
					placeholder="Search for products, brands, and more..."
					className="px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 rounded-l-full transition-all duration-200 ease-in-out"
					autoFocus
				/>
				{/* Search Button */}
				<button
					className="px-7 py-4 bg-gradient-to-r from-[#d9b18f] via-[#896B60]  to-[#4a332d] text-white rounded-r-full hover:scale-105 transition-all duration-200 ease-in-out"
					onClick={() => {
						if (!location.pathname.includes('/collection')) {
							navigate('/collection');
						}
					}}
				>
					<FaSearch className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
