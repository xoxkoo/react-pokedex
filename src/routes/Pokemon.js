import { Link, useLocation } from 'react-router-dom';
import '../css/pokemon.scss'

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";
import Loader from '../components/Loader'

const queryClient = new QueryClient();

export default function PokemonPage() {
	const { state } = useLocation();

	return <QueryClientProvider client={queryClient}>
				<Link to={'/' + state.backLink.replace('http://localhost:3000/react-pokedex#/', '')} className='page-link'>back</Link>
				<Pokemon id={state.id} />
			</QueryClientProvider>
}

function Pokemon({id}) {
	const { isLoading, error, data, isFetching } = useQuery({
		queryKey: ["pokemon"],
		queryFn: () =>
			axios
				.get(`https://pokeapi.co/api/v2/pokemon/` + id)
				.then((res) => res.data)

	});

	if (isLoading) return <Loader/>;
	if (isFetching) return <Loader/>;
	if (error) return "An error has occurred: " + error.message;

	const pokemon = new PokemonClass(data)
	return <>
		<div className='detail '>
			<h1>{pokemon.name}</h1>
			<div className='types'>
				{
					pokemon.types.map(type => <span key={type}>{type}</span>)
				}
			</div>
			<div className='row'>
				<img src={pokemon.image} alt={pokemon.name}></img>
				<div className='stats-container'>

					<div className='stat container'>
						<div>
							<span className='stat-name'><strong>Height</strong></span>
							<span>{pokemon.height} m</span>
						</div>
					</div>
					<div className='stat container'>
						<div>
							<span className='stat-name'><strong>Weight</strong></span>
							<span>{pokemon.weight} kg</span>
						</div>

					</div>
					{
						pokemon.stats.map((stat) => {
							return <div className='stat' key={stat[0]}>
								<div>
									<span className='stat-name'> <strong>{stat[0]}</strong> </span>
									<span>{stat[1]}</span>
								</div>
								<progress max="100" value={stat[1]}></progress>
							</div>
						})
					}
				</div>
			</div>

		</div>

	</>

}

class PokemonClass {
	constructor(data) {
		this.name = data.name
		this.types = data.types.map((type) => type.type.name)
		this.image = data.sprites.other.dream_world.front_default
		this.exp = data.base_experience
		this.stats = data.stats.map((stat) => {
			return [ stat.stat.name, stat.base_stat]
		})
		this.height = this.format(data.height)
		this.weight = this.format(data.weight)
	}

	format(value) {
		return (value / 10 )
	}
}