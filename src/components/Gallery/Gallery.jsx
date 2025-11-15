import { useSelector } from 'react-redux'
import { editId } from '../../utils/editId'
import { Card, CardImage, GalleryList, Thumb } from './Gallery.styled'

export const Gallery = () => {
  const { items } = useSelector((state) => state.pokemons)

  return (
    <>
      <GalleryList>
        {items.map((pokemon) => {
          return (
            <Card className={`type-${pokemon.types[0]}`} key={pokemon.name}>
              <Thumb>
                <CardImage src={pokemon.sprite} alt={pokemon.name} />
              </Thumb>
              <p>{pokemon.name}</p>
              <p>{editId(pokemon.id)}</p>
              <ul>
                {pokemon.types.map((type) => (
                  <li key={type}>
                    <span>{type}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </GalleryList>
    </>
  )
}
