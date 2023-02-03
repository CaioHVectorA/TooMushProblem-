import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useLocalStorage from './useLocalStorage'
import UserContext from './UserContext'
const Button = styled.button`
  appearance: button;
  background-color: #1899D6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: din-round,sans-serif;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: .8px;
  line-height: 20px;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 32px 20px;
  text-align: center;
  text-transform: uppercase;
  touch-action: manipulation;
  transform: translateZ(0);
  transition: filter .2s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
&:after {
  background-clip: padding-box;
  background-color: #1CB0F6;
  border: solid transparent;
  border-radius: 16px;
  border-width: 0 0 4px;
  bottom: -4px;
  content: "";
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
}

&:main,
&:focus {
  user-select: auto;
}

&:hover:not(:disabled) {
  filter: brightness(1.1);
  -webkit-filter: brightness(1.1);
}

&:disabled {
  cursor: auto;
}
`
const Inicial = () => {
    var mobile = window.outerWidth < 420
  var [rodada,setRodada] = useLocalStorage('RodadaAtual','1')
  useEffect(() => {
    setRodada('1')
  },[])
  // setRodada('1') 
    const {numPlayers, setNumPlayers} = useContext(UserContext)
  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',paddingTop: '96px'}}>
        <h1 style={{color: 'black',fontSize: !mobile ? '64px' : '40px ',fontFamily: 'Unbounded',textShadow: '#474747 3px 5px 2px'}}>NomeDoJogo</h1>
       <div style={{display: 'flex',flexDirection: 'column',gap: '12px'}}>

        <Link to={'/Game'} onClick={() => setNumPlayers(2)}><Button>2 players</Button></Link>
        <Link to={'/Game'} onClick={() => setNumPlayers(3)}><Button>3 players</Button></Link>
        <Link to={'/Game'} onClick={() => setNumPlayers(4)}><Button>4 players</Button></Link>
       </div>
    </div>
  )
}

export default Inicial