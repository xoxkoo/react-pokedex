import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom"
import axios from "axios";


const queryClient = new QueryClient();

export default function PokemonCard({data}) {

	return <QueryClientProvider client={queryClient}>
				<Pokemon pokemon={data} />
			</QueryClientProvider>
}

function Pokemon({pokemon}) {
	const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [pokemon.name],
    queryFn: () =>
      axios
        .get(pokemon.url)
        .then((res) => res.data),
  });

  if (isLoading) return "";
  if (isFetching) return "";

  if (error) return "An error has occurred: " + error.message;

//   console.log(window.location.href);

  return (
	<Link to={'/pokemon'} state={{id: data.id, backLink: window.location.href}}>
		<div className="card">

			<img src={data.sprites.other.dream_world.front_default} alt={data.name}/>

			<div className="body">
				<h2 className="title">{data.name}</h2>
				<ul className="information">
					<li><strong><i className='bx bxs-heart'></i> {data.stats[0].stat.name}:</strong> {data.stats[0].base_stat} </li>
					<li><strong><i className='bx bx-dumbbell'></i> {data.stats[1].stat.name}:</strong> {data.stats[1].base_stat} </li>
					<li><strong><i className='bx bxs-shield' ></i> {data.stats[2].stat.name}:</strong> {data.stats[2].base_stat} </li>
				</ul>

			</div>
		</div>
	</Link>
  )


}

