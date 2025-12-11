import { useCallback, useRef } from 'react'
import { editId } from '../../utils/editId'
import { firstElUpperCase } from '../../utils/firstElUpperCase'
import { typeIcons } from '../../utils/typeIcons'
import { useDispatch, useSelector } from 'react-redux'
import { increaseDisplayCount } from '../../redux/pokemonSlice'
import { fetchDetailsBatch } from '../../redux/operations'
import {
  CardId,
  CardImage,
  CardItem,
  Name,
  Thumb,
  TypeEl,
  TypesList,
} from '../Gallery/Gallery.styled'

export const Card = ({ pokemon, isLast }) => {
  const dispatch = useDispatch()
  const observerRef = useRef(null)
  const loadingBatchRef = useRef(false)
  const { items, displayCount, batchOffset, sortedResults } = useSelector(
    (state) => state.pokemons
  )

  const setLastElement = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect()

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
              // показати ще 20
              dispatch(increaseDisplayCount())

              // підвантажити батч, якщо потрібно
              if (
                !loadingBatchRef.current &&
                items.length < displayCount &&
                batchOffset < (sortedResults?.length || 0)
              ) {
                loadingBatchRef.current = true
                dispatch(fetchDetailsBatch({ offset: batchOffset })).finally(
                  () => {
                    loadingBatchRef.current = false
                  }
                )
              }
            }
          },
          {
            threshold: 1,
          }
        )
        observerRef.current.observe(node)
      }
    },
    [dispatch, displayCount, items.length, batchOffset, sortedResults]
  )
  return (
    <>
      <CardItem
        className={`type-${pokemon.types[0]}`}
        ref={isLast ? setLastElement : null}
      >
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
      </CardItem>
    </>
  )
}
