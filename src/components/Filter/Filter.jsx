import {
  Popover,
  PopoverButton,
} from '@headlessui/react'
import FilterIcon from '../../assets/icons/filter.svg?react'
import { FilterButton } from './Filter.styled'

export const Filter = () => {
  return (
    <>
      <Popover>
        <PopoverButton as={FilterButton}>
          <FilterIcon />
          Filters
        </PopoverButton>

      </Popover>
    </>
  )
}
