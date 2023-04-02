import { useState, useEffect } from "react"

export default function FetchData(url) {
    const [pokemon, setPokemon] = useState(null)

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/eevee")
            .then(response => response.json())
            .then(setPokemon)
    }, [])

	 return <img src={pokemon?.sprites.front_default}></img>

	//  if (pokemon != null) {
	// 	return pokemon
	//  }

}
