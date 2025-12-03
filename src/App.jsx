// import { useEffect, useRef, useState } from 'react'
import { AppBar } from './components/AppBar/AppBar'
// import { getPokemonAPI } from './redux/operations'
// import { useDispatch, useSelector } from 'react-redux'
import { Gallery } from './components/Gallery/Gallery'
import { AppContainer } from './App.styled'
// import { increaseOffset } from './redux/pokemonSlice'

function App() {
  // const dispatch = useDispatch()
  // const loaderRef = useRef(null)
  // const { offset, items, isLoading } = useSelector((state) => state.pokemons)

  // const [firstLoadDone, setFirstLoadDone] = useState(false)

  // // --- 1) Завантаження покемонів при зміні offset (з unwrap для надійності)
  // useEffect(() => {
  //   console.log('[fetch] start offset=', offset)
  //   const p = dispatch(getPokemonAPI(offset))

  //   // unwrap() повертає проміс який резолвиться payload або реджектиться з помилкою
  //   p
  //     .unwrap()
  //     .then(() => {
  //       console.log('[fetch] fulfilled offset=', offset, 'items now=', items.length)
  //       setFirstLoadDone(true)
  //     })
  //     .catch((err) => {
  //       console.warn('[fetch] rejected or aborted', err)
  //       // навіть при помилці ставимо firstLoadDone, або можна лишити false — залежить від логіки
  //       // setFirstLoadDone(true)
  //     })

  //   return () => {
  //     // Безпечний виклик abort(), тільки якщо є метод
  //     if (p && typeof p.abort === 'function') {
  //       p.abort()
  //       console.log('[fetch] aborted offset=', offset)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dispatch, offset])

  // // --- 2) IntersectionObserver: вмикаємо тільки коли є items (перше завантаження пройшло)
  // useEffect(() => {
  //   // діагностика
  //   console.log('[observer effect] items.length=', items.length, 'isLoading=', isLoading, 'firstLoadDone=', firstLoadDone)

  //   if (!loaderRef.current) return
  //   // ключові умови блокування observer поки немає даних або йде перше завантаження
  //   if (!firstLoadDone) return
  //   if (items.length === 0) return

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const target = entries[0]
  //       if (target.isIntersecting) {
  //         console.log('[observer] loader isIntersecting, isLoading=', isLoading)
  //         // додаткова захисна умова щоб не інкрементувати поки йде fetch
  //         if (!isLoading) {
  //           dispatch(increaseOffset())
  //           console.log('[observer] dispatch(increaseOffset)')
  //         }
  //       }
  //     },
  //     {
  //       threshold: 0.6, // 60% видно — зменшить помилкові тригери
  //       rootMargin: '0px 0px 200px 0px', // підвантажувати трохи раніше, можна регулювати
  //     }
  //   )

  //   observer.observe(loaderRef.current)

  //   return () => observer.disconnect()
  // }, [dispatch, isLoading, firstLoadDone, items.length])
  return (
    <AppContainer>
      <h1>Pokedex</h1>
      <AppBar />
      <Gallery />
      
    </AppContainer>
  )
}

export default App
