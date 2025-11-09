import { useEffect, useState } from 'react'
import './App.css'
import { AppBar } from './components/AppBar/AppBar'
import { getPokemonAPI } from './redux/operations'
import { useDispatch } from 'react-redux'
import { Gallery } from './components/Gallery/Gallery'

function App() {
  const dispatch = useDispatch()

  // const handleSearch = searchText => {
  //   setSearch(searchText)
  // }

  useEffect(() => {
    const promise = dispatch(getPokemonAPI())
    return () => promise.abort()
  }, [dispatch])

  return (
    <>
      <h1>Pokedex</h1>
      <AppBar />
      <Gallery />
    </>
  )
}

export default App
