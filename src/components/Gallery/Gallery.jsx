import { useSelector } from 'react-redux'

export const Gallery = () => {
  const { items } = useSelector((state) => state.pokemons)
  console.log(items)
  return (
    <>
      <ul>
        {items.map((pokemon) => {
          return (
            
            <li key={pokemon.name}>
              <p>{pokemon.name}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
