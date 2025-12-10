import { useDispatch, useSelector } from 'react-redux'
import { editId } from '../../utils/editId'
import { fetchDetailsBatch, fetchResultsList } from '../../redux/operations'
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
import { useCallback, useEffect, useRef } from 'react'
import { increaseDisplayCount } from '../../redux/pokemonSlice'
import { Loader } from '../Loader/Loader'

export const Gallery = () => {
  const dispatch = useDispatch()
  const { isLoading, isLoadingBatch, items, displayCount, batchOffset, sortedResults } = useSelector(
    (state) => state.pokemons
  )
  // Використовуємо селектор, який вертає items (вже відсортовані/отримані)
  const renderedItems = items.slice(0, displayCount)
  const observerRef = useRef(null)
  const loadingBatchRef = useRef(false)

  // На mount: завантажити список results, потім перший батч
  useEffect(() => {
    const promise = dispatch(fetchResultsList())
    // після отримання results — ініціюватимемо перший батч у fulfilled reducer або тут:
    promise.then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        // якщо sortedResults вже ініціалізований, підвантажуємо перший батч
        dispatch(fetchDetailsBatch({ offset: 0 }))
      }
    })
    return () => {
      promise.abort && promise.abort()
    }
  }, [dispatch])

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
              if (!loadingBatchRef.current && items.length < displayCount && batchOffset < (sortedResults?.length || 0)) {
                loadingBatchRef.current = true
                dispatch(fetchDetailsBatch({ offset: batchOffset })).finally(() => {
                  loadingBatchRef.current = false
                })
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
      <GalleryList>
        {renderedItems.map((pokemon, index) => {
        const isLast = index === renderedItems.length - 1
        return (
          <Card className={`type-${pokemon.types[0]}`} ref={isLast ? setLastElement : null} key={pokemon.id}>
            <Thumb>
              <CardImage src={pokemon.sprite} alt={pokemon.name} loading='lazy' />
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
      {(isLoading || isLoadingBatch) && <Loader />}
    </GalleryList>
    </>
  )
}
