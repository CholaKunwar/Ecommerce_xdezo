import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProductItems from '../Components/ProductItems';

const Collection = () => {
	const { products, search } = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState('relevant');
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 10;

	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory(prev => prev.filter(item => item !== e.target.value));
		} else {
			setCategory(prev => [...prev, e.target.value]);
		}
	};

	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory(prev => prev.filter(item => item !== e.target.value));
		} else {
			setSubCategory(prev => [...prev, e.target.value]);
		}
	};

	useEffect(() => {
		let filtered = [...products];

		if (search) {
			filtered = filtered.filter(item =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}

		if (category.length > 0) {
			filtered = filtered.filter(item => category.includes(item.category));
		}

		if (subCategory.length > 0) {
			filtered = filtered.filter(item => subCategory.includes(item.subCategory));
		}

		switch (sortType) {
			case 'low-high':
				filtered.sort((a, b) => a.price - b.price);
				break;
			case 'high-low':
				filtered.sort((a, b) => b.price - a.price);
				break;
			default:
				break;
		}

		setFilterProducts(filtered);
		setCurrentPage(1); // Reset to first page when filter changes
	}, [products, category, subCategory, search, sortType]);

	// Pagination logic
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filterProducts.slice(indexOfFirstProduct, indexOfLastProduct);
	const totalPages = Math.ceil(filterProducts.length / productsPerPage);

	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10'>
				{/* Filters */}
				<div className='min-w-60'>
					<p
						className='my-2 text-xl font-semibold text-gray-800 flex items-center cursor-pointer gap-2 hover:text-indigo-600'
						onClick={() => setShowFilter(!showFilter)}
					>
						FILTERS
						<FaChevronDown
							className={`h-5 w-5 text-gray-400 sm:hidden ${showFilter ? 'rotate-180' : ''}`}
						/>
					</p>

					{/* Category Filter */}
					<div className={`border border-gray-300 pl-5 py-3 mt-8 ${showFilter ? '' : 'hidden'} sm:block bg-[#f9f9f9] rounded-lg shadow-lg`}>
						<p className='mb-3 text-lg font-semibold text-gray-800'>CATEGORIES</p>
						<div className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
							{['Men', 'Women', 'Kids'].map(cat => (
								<p className='flex gap-2' key={cat}>
									<input type='checkbox' value={cat} onChange={toggleCategory} />
									<span className='hover:text-indigo-600 cursor-pointer'>{cat}</span>
								</p>
							))}
						</div>
					</div>

					{/* SubCategory Filter */}
					<div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block bg-[#f9f9f9] rounded-lg shadow-lg`}>
						<p className='mb-3 text-lg font-semibold text-gray-800'>TYPE</p>
						<div className='flex flex-col gap-2 text-sm font-medium text-gray-700'>
							{['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
								<p className='flex gap-2' key={sub}>
									<input type='checkbox' value={sub} onChange={toggleSubCategory} />
									<span className='hover:text-indigo-600 cursor-pointer'>{sub}</span>
								</p>
							))}
						</div>
					</div>
				</div>

				{/* Products Section */}
				<div className='flex-1'>
					<div className='flex justify-between text-base sm:text-2xl mb-4 pb-4'>
						<h1 className='text-gray-400 xs:text-lg md:text-3xl font-semibold'>
							All <span className='text-gray-800 ps-2'>COLLECTIONS</span>
						</h1>
						<select
							className='border-2 border-gray-300 text-sm px-4 py-2 rounded-md shadow-sm hover:border-indigo-600'
							onChange={(event) => setSortType(event.target.value)}
							value={sortType}
						>
							<option value='relevant'>Sort by: Relevant</option>
							<option value='low-high'>Sort by: Low to High</option>
							<option value='high-low'>Sort by: High to Low</option>
						</select>
					</div>

					{/* Product Grid */}
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
						{currentProducts.map((items, index) => (
							<ProductItems
								key={index}
								name={items.name}
								id={items._id}
								price={items.price}
								image={items.image}
							/>
						))}
					</div>

					{/* Pagination Controls */}
					{totalPages > 1 && (
						<div className='flex justify-center items-center gap-6 mt-10'>
							<button
								disabled={currentPage === 1}
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								className={`p-3 rounded-full text-white ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#5e3b23] hover:bg-[#4a332d]'}`}
							>
								<FaArrowLeft />
							</button>
							<span className='text-sm font-semibold text-gray-700'>
								Page {currentPage} of {totalPages}
							</span>
							<button
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
								className={`p-3 rounded-full text-white ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#5e3b23] hover:bg-[#4a332d]'}`}
							>
								<FaArrowRight />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Collection;
