import {
  CardIdLoader,
  CardLoader,
  LoaderList,
  NameLoader,
  ThumbLoader,
  TypeElLoader,
  TypesListLoader,
} from './Loader.styled'

export const Loader = () => {
  const loaders = Array.from({ length: 4 })
  return (
    <>
      {loaders.map((_, index) => (
        <CardLoader key={index}>
          <ThumbLoader />
          <NameLoader />
          <CardIdLoader />
          <TypesListLoader>
            <TypeElLoader />
            <TypeElLoader />
          </TypesListLoader>
        </CardLoader>
      ))}
    </>
  )
}
