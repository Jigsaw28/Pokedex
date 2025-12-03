import styled from 'styled-components'

export const LoaderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  column-gap: 32px;
`
export const CardLoader = styled.li`
  width: 322px;
  height: 260px;
  padding: 24px;
  padding-top: 118px;
  position: relative;
  border-radius: 6px;
  background-color: #d3d4d8;
`
export const ThumbLoader = styled.div`
  width: 180px;
  height: 134px;
  background-color: #aaaaaa;
  border-radius: 6px;
  position: absolute;
  top: -62px;
  left: 50%;
  transform: translateX(-50%);
`

export const NameLoader = styled.div`
  width: 102px;
  height: 33px;
  margin-bottom: 10px;
  border-radius: 999px;
  background-color: #aaaaaa;
`
export const CardIdLoader = styled.div`
  margin-bottom: 20px;
  width: 42px;
  height: 18px;
  border-radius: 999px;
  background-color: #aaaaaa;
`
export const TypesListLoader = styled.ul`
  display: flex;
  gap: 8px;
`
export const TypeElLoader = styled.div`
  width: 86px;
  height: 35px;
  background-color: #aaaaaa;
  border-radius: 999px;
`
