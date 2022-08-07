import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Heading } from '@chakra-ui/react'
import { useUser } from '../../context/UserContext'

const NavWrap = styled.nav`
   box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
   background: white;
   z-index: 3;
   position: sticky;
   top: 0;
`
const Navbar = styled.div`
   
   margin: 0;
   min-block-size: 4rem;
   margin-bottom: 2rem;
   display: flex;
   align-items: center;
   justify-content: space-between;
   gap: 1rem;
   padding: 10px;
   top: 0;
   left: 0;
   max-inline-size: 1200px;
   margin: auto;
   button{
      margin-left: auto;
   }
   @media screen and (min-width: 740px) {
      padding: 10px 3rem;
      button.mobile{
         display: none;
      }
   }
`
const NLinks = styled.ul`
   display: flex;
   gap: 2rem;
   align-items: center;
   justify-content: center;
   margin: 0;
   opacity: 1;
   transition: .3s cubic-bezier(0.39, 0.58, 0.57, 1) all;
   
   li{
      list-style: none;
   }
   
   @media screen and (max-width: 740px){
      flex-direction: column;
      padding: 2rem 1rem;
      background: lightgrey;
      color: white;
      width: 100%;
      position: fixed;
      top: ${({ when }) => when ? '0' : '14rem'};
      bottom: 0;
      left: 0;
      z-index: -1;
      border-radius: ${({ when }) => when ? '0' : '100px 100px 0 0'};
      font-size: 1.5rem;

      &.hide{
         /* position: fixed; */
         visibility: hidden;
         opacity: 0;
      }
   }
`
const NLink = styled(NavLink)`
   padding: .5rem .9rem;
   border-radius: 100px; 
   text-decoration: none;
   color: #212121;
   transition: all ease 300ms;
   text-transform: capitalize;
   font-weight: 500;

:hover{
   background: var(--chakra-colors-gray-100);
}
   &.active{
      color: teal;
      background: var(--chakra-colors-gray-100);
      font-weight: 600;
   }
`


export const Nav = () => {
   const { user, setUser } = useUser();
   const [showMobile, setShowMobile] = useState(false)

   const hideMobileNav = () => {
      setShowMobile(false);
   }
   return (
      <>
         <NavWrap className="nav-wrapper">
            <Navbar className='nav'>
               <Heading>🌐</Heading>
               <NLinks className={showMobile ? 'show' : 'hide'} when={showMobile}>
                  <li>
                     <NLink to='/' onClick={hideMobileNav} activeclassname='active'>Home</NLink>
                  </li>
                  <li>
                     <NLink to='/sign-in' onClick={() => { setUser({}); hideMobileNav() }} activeclassname='active'>{user.username ? 'Sign Out' : 'Sign In'}</NLink>
                  </li>
                  {user.username ? ('')
                     : (
                        <li>
                           <NLink to='/sign-up' onClick={hideMobileNav} activeclassname='active'>Sign Up</NLink>
                        </li>
                     )
                  }
               </NLinks>

               <Button className='mobile' colorScheme='teal' onClick={() => setShowMobile(!showMobile)}>{showMobile ? 'x' : '='}</Button>
            </Navbar>
         </NavWrap>
      </>
   )
}
