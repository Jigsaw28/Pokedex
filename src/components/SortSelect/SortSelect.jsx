import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortType } from '../../redux/sortSlice'
import { clearItemsForSort, resetDisplayCount, setSortedResults } from '../../redux/pokemonSlice'
import { fetchDetailsBatch } from '../../redux/operations'

const options = [
  { id: 1, label: 'Highest Number First', value: 'HIGH_FIRST' },
  { id: 2, label: 'Lowest Number First', value: 'LOW_FIRST' },
  { id: 3, label: 'Alphabetically (A-Z)', value: 'A_Z' },
  { id: 4, label: 'Alphabetically (Z-A)', value: 'Z_A' },
]

export const SortSelect = () => {
  const dispatch = useDispatch()
  const { sortType } = useSelector((state) => state.sortPokemons)
  const resultsList = useSelector((state) => state.pokemons.resultsList)
  const selectedOption = options.find((option) => option.value === sortType)
  
  const sortResults = (list, type) => {
    const arr = list.slice()
    switch (type) {
      case 'HIGH_FIRST':
        return arr.sort((a, b) => {
          const idA = parseInt(a.url.split('/').filter(Boolean).pop(), 10)
          const idB = parseInt(b.url.split('/').filter(Boolean).pop(), 10)
          return idB - idA
        })
      case 'LOW_FIRST':
        return arr.sort((a, b) => {
          const idA = parseInt(a.url.split('/').filter(Boolean).pop(), 10)
          const idB = parseInt(b.url.split('/').filter(Boolean).pop(), 10)
          return idA - idB
        })
      case 'A_Z':
        return arr.sort((a, b) => a.name.localeCompare(b.name))
      case 'Z_A':
        return arr.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return arr
    }
  }

  const handleSortChange = (newValue) => {
    dispatch(setSortType(newValue))
    dispatch(resetDisplayCount())
    // 3) пересортувати resultsList і зберегти sortedResults
    const sorted = sortResults(resultsList || [], newValue)
    dispatch(setSortedResults(sorted))
    // 4) очистити items і перезавантажити перший батч
    dispatch(clearItemsForSort())
    dispatch(fetchDetailsBatch({ offset: 0 }))
 }
  return (
    <>
      <Listbox
        value={selectedOption}
        onChange={handleSortChange}
      >
        <ListboxButton>{selectedOption?.label}</ListboxButton>
        <ListboxOptions>
          {options.map((option) => (
            <ListboxOption key={option.id} value={option.value}>
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </>
  )
}
