import { AppBar } from './components/AppBar/AppBar'
import { Gallery } from './components/Gallery/Gallery'
import { AppContainer } from './App.styled'
import { SortSelect } from './components/SortSelect/SortSelect'
import { Filter } from './components/Filter/Filter'

function App() {
  return (
    <AppContainer>
      <h1>Pokedex</h1>
      <AppBar />
      <SortSelect />
      <Filter />
      <Gallery />
    </AppContainer>
  )
}

export default App
