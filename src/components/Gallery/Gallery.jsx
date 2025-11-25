import { useSelector } from 'react-redux'
import { editId } from '../../utils/editId'
import {
  Card,
  CardId,
  CardImage,
  GalleryList,
  Name,
  Thumb,
  TypeEl,
  TypesList,
} from './Gallery.styled'
import { firstElUpperCase } from '../../utils/firstElUpperCase'
import { typeIcons } from '../../utils/typeIcons'

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
              <Name>{firstElUpperCase(pokemon.name)}</Name>
              <CardId>{editId(pokemon.id)}</CardId>
              <TypesList>
                {pokemon.types.map((type) => {
                  const Icon = typeIcons[type]
                  return (
                    <li key={type}>
                      
                      <TypeEl className={`type-${type}`}>
                        <Icon />
                        {firstElUpperCase(type)}
                      </TypeEl>
                    </li>
                  )
                })}
              </TypesList>
            </Card>
          )
        })}
      </GalleryList>
    </>
  )
}
