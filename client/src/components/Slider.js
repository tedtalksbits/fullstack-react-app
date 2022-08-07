import React, { useState } from 'react'
import styled from 'styled-components'
import 'boxicons'
import { slides } from '../data/slides'
import { Button, Heading, Text } from '@chakra-ui/react'

const Container = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   position: relative;
   overflow: hidden;
`
const Arrow = styled.div`
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background: #ffffffaa;
   display: grid;
   place-items: center;
   cursor: pointer;
   position: absolute;
   top: 0;
   bottom: 0;
   margin: auto;
   left: ${props => props.direction === 'left' && ('12px')};
   right: ${props => props.direction === 'right' && ('12px')};
   z-index: 1;
   box-icon {
      width: 2rem;
      height: 2rem;
   }
`
const Wrapper = styled.div`
   height: 100%;
   display: flex;
   transition: 1s ease all;
   transform: translateX(${props => props.currentIndex * -100}vw);
   /* overflow: hidden; */
`
const Slide = styled.div`
   display: flex;
   align-items: center;
   width: 100vw;
   height: 100vh;
   background: ${props => props.bg || 'whitesmoke'};
`
const ImgContainer = styled.div`
   height: 100%;
   flex: 1;
`
const Img = styled.img`
   width: 100%;
   height: 100%;
   object-fit: contain;
`
const TxtContainer = styled.div`
   flex: 1;
   padding: 50px;
`

export const Slider = () => {

   const [currentIndex, setCurrentIndex] = useState(0)
   const handleClick = (direction) => {
      if (direction === 'left') {
         setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : slides.length - 1);
      }
      if (direction === 'right') {
         setCurrentIndex(currentIndex < slides.length - 1 ? currentIndex + 1 : 0);
      }
   }

   return (
      <Container>
         <Arrow direction='left' onClick={() => handleClick('left')}>
            <box-icon name='chevron-left' animation="fade-left-hover"></box-icon>
         </Arrow>
         <Wrapper currentIndex={currentIndex}>
            {slides.map((slide, key) => (

               <Slide key={key} bg={slide.bg}>
                  <ImgContainer>
                     <Img src={slide.img} />
                  </ImgContainer>
                  <TxtContainer>
                     <Heading>{slide.title}</Heading>
                     <Text>{slide.desc}</Text>
                     <Button colorScheme='teal'>Button</Button>
                  </TxtContainer>
               </Slide>
            ))}
         </Wrapper>
         <Arrow direction='right' onClick={() => handleClick('right')}>
            <box-icon name='chevron-right' animation="fade-right-hover"></box-icon>
         </Arrow>
      </Container>
   )
}
