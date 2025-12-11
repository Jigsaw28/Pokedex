import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailsBatch, fetchResultsList } from '../../redux/operations'
import { useEffect } from 'react'
import { Loader } from '../Loader/Loader'
import { Card } from '../Card/Card'
import { GalleryList } from './Gallery.styled'

export const Gallery = () => {
  const dispatch = useDispatch()
  const { isLoading, isLoadingBatch, items, displayCount } = useSelector(
    (state) => state.pokemons
  )

  const renderedItems = items.slice(0, displayCount)

  useEffect(() => {
    const promise = dispatch(fetchResultsList())
    promise.then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(fetchDetailsBatch({ offset: 0 }))
      }
    })
    return () => {
      promise.abort && promise.abort()
    }
  }, [dispatch])

  return (
    <>
      <GalleryList>
        {renderedItems.map((pokemon, index) => {
          const isLast = index === renderedItems.length - 1
          return <Card pokemon={pokemon} isLast={isLast} key={pokemon.id} />
        })}
        {(isLoading || isLoadingBatch) && <Loader />}
      </GalleryList>
    </>
  )
}
