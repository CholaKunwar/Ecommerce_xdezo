// import React from 'react'
import Hero from '../Components/Hero'
import LatestCollection from '../Components/LatestCollection'
// import Collection from './Collection'
import BestSeller from '../Components/BestSeller'
// import SearchBar from '../Components/SearchBar'

const Home = () => {
	return (
		<div>
			<Hero />
				<LatestCollection />
				<BestSeller />
		</div>
	)
}

export default Home