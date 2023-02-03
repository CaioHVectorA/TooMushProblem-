import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './Game';
import Inicial from './Inicial';
import UserContext from './UserContext';
import styled from "styled-components"
import useLocalStorage from './useLocalStorage';
const Card = styled.div`
height: 350px;
width: 250px;
background: ${(props) => props.color};
border: 2px solid #000;
border-radius: 8px;
transform: scale(1.5);
@media (max-width: 450px)  {
 height: 150px;
 width: 105px; 
}
`

const App = () => {
  const [modalGlob,setModalGlob] = useState([false,null])
  const [numPlayers,setNumPlayers] = useState(null)
  // const [rodada,setRodada] = useLocalStorage('rodada',1)
  var colors = {
    initial: `url(${process.env.PUBLIC_URL} + back.png)`,
    virada: '#202020'
  }
  const [color,setColor] = useState(colors.initial)
  return (
   <BrowserRouter>
    <UserContext.Provider value={{modalGlob,setModalGlob,numPlayers,setNumPlayers}}>
      {modalGlob[0] && <div style={{width: '100vw',height: '100vh',backgroundColor: 'rgba(0,0,0,0.8)',position: 'absolute',zIndex: '20000000000',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        <button onClick={() => setModalGlob([false,null])} style={{fontSize: '48px',position: 'absolute',button: '1.3px solid black',zIndex: '300',bottom: '32px',cursor: 'pointer',background: '#d9d9d9',borderRadius: '50px',padding: '0px 8px'}}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" style={{marginTop: '6px'}}><path d="m12.45 37.65-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1Z"/></svg></button>
        <Card color={modalGlob[2]}>
        {modalGlob[1].nome}
        {modalGlob[1].pontos}
        </Card>
        </div>}

   <Routes>
    <Route path={'/'} element={<Inicial/>} />
    <Route path='/Game' element={<Game/>} />
   </Routes>
    </UserContext.Provider>
   </BrowserRouter>
  )
}

export default App