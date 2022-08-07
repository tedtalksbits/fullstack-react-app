import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Payment } from './pages/Payment';
import { Success } from './pages/Success';
import { Container } from '@chakra-ui/react'
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { Nav } from './components/nav/Nav';
function App() {
  return (
    <Router>
      <Nav />
      <Container maxW='100vw' padding='0'>
        <Routes>
          <Route path='/success' element={<Success />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/' exact element={<Home />} />
          <Route path='/sign-in' exact element={<SignIn />} />
          <Route path='/sign-up' exact element={<SignUp />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
