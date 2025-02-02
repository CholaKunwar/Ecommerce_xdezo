import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { FaChevronDown } from 'react-icons/fa';
import ProductItems from '../Components/ProductItems';

const Collection = () => {
	const { products, search, showSearch } = useContext(ShopContext);
	const [showFilter, setShowFilter] = useState([]);
	const [filterProducts, setFilterProducts] = useState([]);
	const [category, setCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [sortType, setSortType] = useState('relevant');

	const toggleCategory = (e) => {
		if (category.includes(e.target.value)) {
			setCategory(prev => prev.filter(item => item != e.target.value));
		} else {
			setCategory(prev => [...prev, e.target.value]);
		}
	}

	const toggleSubCategory = (e) => {
		if (subCategory.includes(e.target.value)) {
			setSubCategory(prev => prev.filter(item => item != e.target.value));
		} else {
			setSubCategory(prev => [...prev, e.target.value]);
		}
	}

	const applyFilter = () => {
		let productsCopy = products.slice(); //copy of product array

		if (showSearch && search) {
			productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
		}
		if (category.length > 0) {
			productsCopy = productsCopy.filter(item => category.includes(item.category));
		}
		if (subCategory.length > 0) {
			productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
		}
		setFilterProducts(productsCopy);
	}

	const handleFilterProducts = () => {
		let filterCopy = filterProducts.slice();

		switch (sortType) {
			case 'low-high':
				setFilterProducts((filterCopy.sort((a, b) => (a.price - b.price))))
				break;
			
			case 'high-low':
				setFilterProducts(filterCopy.sort((a, b) => (b.price - a.price)));

			default:
				applyFilter();
				break;	
		}
	}
  
	useEffect(() => {
		handleFilterProducts();
	}, [sortType])
	
	useEffect(() => {
		applyFilter();
	},[category, subCategory, search, showSearch])

	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
		<div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
			{/* filter options */}
			<div className='min-w-60'>
				<p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={()=> setShowFilter(!showFilter)}>FILTERS
					<FaChevronDown className={`h-5 w-5 text-gray-400 sm:hidden ${showFilter ? 'rotate-180' : ''}`} /></p>
				
				{/* category filter */}
				<div className={` border border-gray-300 pl-5 py-3 mt-8 ${showFilter ? '' : 'hidden'} sm:block`}>
					<p className='mb-3 text-sm font-medium'>CATEGORIES</p>
					<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
						<p className="flex gap-2">
							<input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} />Men
						</p>
						<p className='flex gap-2'><input type="checkbox" value={'Women'} onChange={toggleCategory} />Women</p>
						<p className='flex gap-2'>
							<input type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids</p>
					</div>
				</div>

				{/* SubCategory Filter */}
				<div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
				<p className='mb-3 text-sm font-medium'>TYPE</p>
				<div className="flex flex-col gap-2 text-sm font-light text-gray-700">
					<p className="flex gap-2">
							<input type="checkbox" className='w-3' value={'Topwear'} onClick={toggleSubCategory} />Topwear</p>
						
						<p className='flex gap-2'>
							<input type="checkbox" className='w-3' value={'Bottomwear'} onClick={toggleSubCategory} />Bottomwear
						</p>

						<p className='flex gap-2'>
							<input className='w-3' type="checkbox" value={'Winterwear'} onClick={toggleSubCategory} />Winterwear
						</p>
				</div>
				</div>
			</div>

			{/* Right Side */}
			<div className='flex-1'>
				<div className="flex justify-between text-base sm:text-2xl mb-4 pb-4">
					<h1 className='text-gray-400 text-3xl font-semibold'>All <span className='text-gray-800 ps-2'> COLLECTIONS_</span></h1>

					{/* Product Sort */}
					<select className='border-2 border-gray-300 text-sm px-2' onChange={(event) => setSortType(event.target.value)}>
						<option value="relevant">Sort by: Relevant</option>
						<option value='low-high'>Sort by: Low to High</option>
						<option value='high-low'>Sort by: High to Low</option>
					</select>
				</div>

				{/* Map Products */}
				<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
					{
						filterProducts.map((items, index) => (
							<ProductItems key={index} name={items.name} id={items._id} price={items.price} image={items.image} />
						))
					}
				</div>
			</div>
		</div>
		</div>
	)
}

export default Collection