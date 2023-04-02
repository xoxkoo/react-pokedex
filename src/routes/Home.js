import '../css/card.sass';
import React, { useState, useEffect } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import PokemonCard from '../components/PokemonCard';
// import { Navigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { useLocation, Link } from 'react-router-dom';

const queryClient = new QueryClient();

export default function Home() {
	let location = useLocation();
	const offset = getOffset(location.search)
	console.log(offset);


	return <>
		<QueryClientProvider client={queryClient}>
			<PokemonContainer offset={offset} />
		</QueryClientProvider>
	</>

}

function PokemonContainer({offset}) {
	const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["pokemons", offset],
    queryFn: () =>
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=21`)
			.then((res) => res.data)

  });

  if (isLoading) return <Loader/>;

  if (error) return "An error has occurred: " + error.message;
  console.log(data.results[0]);
	return <>
		<div className="card-container">
			{(
				data.results.map((pokemon) =>
					<PokemonCard key={pokemon.name} data={pokemon} />
				)
			)}
			<div>{isFetching ? <Loader/> : ""}</div>
		</div>
		<div className='row '>
			{/* <a href={'/?offset=' + createBackOffset()} className='page-link'>back</a> */}
			{
				(createBackOffset() < 0) ? <div></div> : <Link to={'?offset=' + createBackOffset(offset)} className='page-link'>back</Link>
			}
			<Link to={'?offset=' + createForwardOffset(offset)} className='page-link'>next</Link>
		</div>
	</>
}

function getOffset(location) {
	const params = new URLSearchParams(location);
	return params.get('offset')
}

function createForwardOffset(offset) {
	// const offset = getOffset()

	return (+offset || 0) + 21
}

function createBackOffset(offset) {
	// const offset = getOffset()

	return (+offset - 21 ) || 0
}