import { useEffect, useState } from 'react'
import { AppBar } from './components/AppBar/AppBar'
import { getPokemonAPI } from './redux/operations'
import { useDispatch } from 'react-redux'
import { Gallery } from './components/Gallery/Gallery'
import { AppContainer } from './App.styled'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const promise = dispatch(getPokemonAPI())
    return () => promise.abort()
  }, [dispatch])

  return (
    <AppContainer>
      <h1>Pokedex</h1>
      <AppBar />
      <Gallery />
    </AppContainer>
  )
}

export default App
