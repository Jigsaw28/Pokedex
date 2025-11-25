import styled from 'styled-components'
import pokeball from '../../assets/icons/pokeball.svg?url'

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  row-gap: 82px;
  max-width: calc(1512px - 128px);
`
export const Card = styled.li`
  width: 322px;
  height: 260px;
  padding: 24px;
  padding-top: 118px;
  position: relative;
  border-radius: 16px;
  background-color: var(--card-bg);
  background-image: url("${pokeball}");
  background-repeat: no-repeat;
  background-size: 155px 155px;
  background-position: left -50% bottom -75%;
  box-shadow: 0px 11px 20px rgba(145, 145, 145, 0.16);
`
export const Thumb = styled.div`
  width: 180px;
  height: 180px;
  position: absolute;
  top: -62px;
  left: 50%;
  transform: translateX(-50%);
`
export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`
export const TypesList = styled.ul`
  display: flex;
  gap: 8px;
`
export const TypeEl = styled.div`
  background: var(--card-tag);
  padding: 8px 12px;
  display: flex;
  gap: 4px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  color: #212121;
`
export const Name = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  height: 33px;
  font-size: 28px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #ffffff;
`
export const CardId = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  height: 21px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #ffffff;
`
