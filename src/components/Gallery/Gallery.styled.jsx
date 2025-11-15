import styled from 'styled-components'

export const GalleryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  max-width: calc(1512px - 128px);
`
export const Card = styled.li`
width: 322px;
height: 260px;
padding: 24px;
padding-top: 118px;
position: relative;
border-radius: 16px;
background: var(--card-bg);
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