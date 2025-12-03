import { useDispatch, useSelector } from 'react-redux'
import { editId } from '../../utils/editId'
import { getPokemonAPI } from '../../redux/operations'
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
import { useEffect, useRef } from 'react'
import { increaseOffset } from '../../redux/pokemonSlice'
import { Loader } from '../Loader/Loader'

export const Gallery = () => {
  const dispatch = useDispatch()
  const { items, isLoading, offset } = useSelector((state) => state.pokemons)
  const lastCardRef = useRef(null)

  useEffect(() => {
    const promise = dispatch(getPokemonAPI(offset))
    return () => {
      promise.abort()
    }
  }, [dispatch, offset])

  useEffect(() => {
    // if (!lastCardRef.current) return
    // if (items.length === 0) return
    const infiniteObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          infiniteObserver.unobserve(entry.target)
          dispatch(increaseOffset())
        }
      },
      { threshold: 1 }
    )

    if (lastCardRef.current) {
      infiniteObserver.observe(lastCardRef.current)
    }
  }, [dispatch, items.length])

  return (
    <>
      <GalleryList>
        {items.map((pokemon) => {
          return (
            <Card
              className={`type-${pokemon.types[0]}`}
              ref={lastCardRef}
              key={pokemon.name}
            >
              <a>
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
              </a>
            </Card>
          )
        })}
        {isLoading && <Loader />}
      </GalleryList>
    </>
  )
}
