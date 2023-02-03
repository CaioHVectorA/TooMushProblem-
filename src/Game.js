import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import backend from "./backend.json"
import styled, { keyframes } from 'styled-components'
import UserContext from './UserContext.js';
import SVGComponent from './SVGComponent';
import maozinha from './maozinha.png'
import useLocalStorage from './useLocalStorage';
const Card = styled.div`
height: 320px;
width: 233px;
background: ${(props) => props.color};
border: 2px solid #000;
border-radius: 8px;
@media (max-width: 450px)  {
 height: 150px;
 width: 105px; 
}
`


function Game() {
  var [rodada,setRodada] = useLocalStorage('RodadaAtual','1') 
  // const [rodada,setRodada] = useState(1)
  function Placar(props) {
    
    const [pts,setPts] = useState(0)
    const placar = {
      width: 'calc(190px - 24px)',
      height: 'calc(160px - 24px)',
      background: '#121212',
      borderRadius: '8px',
      // position: 'absolute',
      display: 'flex',
      zIndex: '3000',
      textAlign: 'start',
      margin: '0',
      padding: '12px',
      flexDirection: 'column',
      alignItems: 'center',
      left: props.player === 1 ? '30px' : props.player === 3 ? '30px' : '0px' ,
      top: props.player === 1 ? '30px' : props.player === 2 ? '30px' : '0px',
      right: props.player === 2 ? '30px' : props.player === 4 ? '30px' : '0px',
      bottom: props.player  === 3 ? '30px' : props.player === 4 ? '30px' : '0px',
      boxShadow: props.player == rodada ? '0px 9px 30px rgba(255, 149, 5, 0.7)' : null,
      border: props.player == rodada ? '3px solid rgba(255, 149, 5, 0.7)' : null,
    }
    return (
      <div style={placar}>
        <p style={{fontFamily: 'Unbounded'}}>Jogador {props.player}</p>
        <h2 style={{margin: '0px'}}>{pts} Pontos</h2>
        <div style={{display: 'flex'}}>
        <button onClick={() => setPts(Pts => Pts -= 1)} style={{scale: '0.7',cursor: 'pointer'}}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M10 25.5v-3h28v3Z"/></svg></button>
        <button onClick={() => setPts(Pts => Pts += 1)} style={{scale: '0.7',cursor: 'pointer'}}><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/></svg></button>
        </div>
      </div>
    )
  }
  
  var memoizedDeck;
  var memoizedCards;
  document.addEventListener("contextmenu",function(e) {
    e.preventDefault()
  })
  var mobile = window.outerWidth < 450
  memoizedDeck = useMemo(() => <Deck/>,[])
  function Deck() {
    const [frontArray,setFArray] = useState([])
    const [cartasmovidas,setMovidas] = useState([])
    const div = useRef('div')
    const [acaboudegerar,setacaboudegerar] = useState(false)
    const { modalGlob,setModalGlob } = useContext(UserContext)
    function embaralhar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}
function embaralhareOrganizar(arr) {
  const arrayembaralhada = embaralhar(arr)
  const tempArray = arrayembaralhada.map((item,index) => {
    return { ...item, i: index };
  })
  // console.log('arr:',arr,'; arrayembaralhada:',arrayembaralhada,'; tempArray',tempArray)
  return tempArray
}
function CardFunc(props) {
  const [top,setTop] = useState(null)
  // const [cancel,n] = useState(null)
  useEffect(() => {
    setTop(props.index * -1)
  },[])
  var colors = {
    initial: `url(${process.env.PUBLIC_URL} + back.png)`,
        virada: '#202020'
      }
      const [color,setColor] = useState(colors.initial)
      const [conteudo,setConteudo] = useState(true)
      const [virando,setVirando] = useState(false)
      const [embaralhar,setEmbaralhar] = useState(false)
      useEffect(() => {
        if (conteudoCard) {
          setConteudo(true)
        }
      },[conteudoCard])
      const divCarta = useRef()
      // console.log(props)
      return (
        <div ref={divCarta} style={{position: 'relative',top: '328px'}}>
        <Card  color={color}  style={{position: 'absolute',top: top * 3,transition: 'none'}}>
        {conteudo === true && <div onContextMenu={(e) => {if (conteudo === false){setModalGlob([true,props.item.ref,e.target.style.backgroundColor])}}} onClick={(e) => {gerarCarta(props,div.current.children[props.index]) ; setColor(colors.virada) ; if (!virando && acaboudegerar) {e.target.classList.add('rotateCard') ; setConteudo(!conteudo) ;setVirando(false) }}}> {/* conteudo de frente*/}
        <img src={process.env.PUBLIC_URL + 'back.png'} style={{width: '100%',height: '100%',borderRadius: '8px'}} /> 
        </div>}
        {conteudo === false && <div style={{width: '100%',height: '100%'}}> {/* conteudo de costas*/}
        {/* backgroundImage: 'url(' + process.env.PUBLIC_URL + 'back.png)',objectFit: 'cover',backgroundPosition: "center",backgroundSize: '100%',backgroundBlendMode: 'color-burn' */}
        <div onContextMenu={(e) => {if (conteudo === false){setModalGlob([true,props.item.ref,e.target.style.backgroundColor])}}} onClick={(e) => {gerarCarta(props,div.current.children[props.index]) ; setColor(colors.virada) ; if (!virando && acaboudegerar) {e.target.classList.add('rotateCard') ; setConteudo(!conteudo) ;setVirando(false) }}} style={{minWidth: '100%',minHeight: '100%',borderRadius: '8px',background: '#58A760',display: 'flex',flexDirection: 'column',alignItems: 'center',backgroundImage: `url('${process.env.PUBLIC_URL}/img/${props.item.ref.img}')`,backgroundPosition: 'center',backgroundSize: '100%'}}> 
          {/* <h1 style={{margin: '0'}}>{props.item.i}</h1> */}
          {/* <p style={{margin: '0',fontSize: '16px'}}>{props.item.ref.nome}</p> */}
          {/* <p style={{backgroundColor: '#121212',borderRadius: '100px',fontSize: '20px',padding: '10px 18px',color: 'white'}}>{props.item.ref.poder}</p> */}
        </div>  
        <img style={{transform: 'translateX(155%)',cursor: 'pointer'}} onClick={() => EscolherCarta(props, divCarta.current,div.current.children[props.index])} src={maozinha} />       
        </div>}
      </Card>
      </div>
      )
    }
    function gerarCarta(ref,refdom) {
      if (!acaboudegerar) {
        let number = frontArray.length
        number -= 1
        let tempnumber = number
        tempnumber -= 1
          setMovidas([number,tempnumber])
          // div.current.children[number].style.display = 'block'
      if (!mobile) {
        div.current.children[number].style.transform = `translate(-300px,-0px)`
        div.current.children[tempnumber].style.transform = `translate(-600px,-0px)`
      } else {
        div.current.children[number].style.transform = `translate(-120px,-0px)`
          div.current.children[tempnumber].style.transform = `translate(-240px,-0px)`
        }
        Array.from(div.current.children).forEach((element,index) => {
          if (index !== number && index !== tempnumber)  {
            element.style.pointerEvents = 'none'
          }
        });
        setacaboudegerar(true)
      } 
    }
    useEffect(() => {
      let array = []
      const arrayembaralhada = embaralhar(backend.AllCards)
      for (let i = arrayembaralhada.length;i !== 0;i--) {
        // const arrayembaralhada = embaralhar(backend.AllCards)
        // pra funfar tem que colocar as cartas antes
        // dai poe o i dentro da [i],utilizando a array embaralhada ao inves da variavel direto
          array.push({ref: arrayembaralhada[i],i})
      setFArray(array)
    }
  },[])
  const [conteudoCard,setConteudoDaCard] = useState(null)
  memoizedCards = React.memo(CardFunc)
  function EscolherCarta(props,ref,refdom) {
    let cartarejeitada;
    let cartaaceita;  
    setPtsInt(props.item.ref.poder)
    setTimeout(() => {
      cartasmovidas.forEach(cartamovida => {
        if (cartamovida === props.index) {
          cartaaceita = [cartamovida,refdom]
        } else {
          cartarejeitada = [cartamovida,div.current.children[cartamovida]]
        }
      });
      cartarejeitada[1].style.transform = 'translate(0px,0px)'
      setConteudoDaCard(true)
      // cartaaceita[1].style.display = 'none'
      cartaaceita[1].style.transform = 'translate(0px,0px)'
      console.log(frontArray)
      // frontArray.splice(cartaaceita[0],1)
      // setFArray([...frontArray])
      console.log(frontArray)
      Array.from(div.current.children).forEach(elem => {
        elem.style.pointerEvents = 'all'
      })
      if (numPlayers === 2) {
        console.log('rodada:',localStorage.getItem('RodadaAtual'))
        if (localStorage.getItem('RodadaAtual') === '1') {
          setRodada(2)
        } else if (localStorage.getItem('RodadaAtual') === '2') {
          setRodada(1)
        }
      } else if (numPlayers === 3) {
        if (localStorage.getItem('RodadaAtual') === '1') {
          setRodada(2)
        } else if (localStorage.getItem('RodadaAtual') === '2') {
          setRodada(3)
        } else {
          setRodada(1)
        }
      } else if (numPlayers === 4) {
        if (localStorage.getItem('RodadaAtual') === '1') {
          setRodada(2)
        } else if (localStorage.getItem('RodadaAtual') === '2') {
          setRodada(3)
        } else if (localStorage.getItem('RodadaAtual') === '3') {
          setRodada(4)
        } else {
          setRodada(1)
        }
      }
      embaralhareOrganizar(frontArray)
      setTimeout(() => {
        setPtsInt(null)
      },300)
      setacaboudegerar(false)
    },800)
  }
  return (
    <div onClick={() => {console.log(frontArray)}} style={{marginLeft: !mobile ? '68%' : '60%',position: 'relative',top: '100px'}}>
      {frontArray && <div ref={div} >
        {frontArray.map( (item, index) =>
          <div key={index} style={{fontSize: '48px',color: 'black'}}>{
            <CardFunc index={index}  item={item}/>
          }</div>
          )}
        </div>}
    </div>
    )
    // onAnimationEnd={(e) => {e.target.classList.remove('rotateCard') ; setVirando(false)}} onClick={(e) => {if (!virando) {e.target.classList.add('rotateCard') ; setConteudo(!conteudo) ; setVirando(true)}}}
  }
  const { modalGlob,setModalGlob,numPlayers } = useContext(UserContext)
  const [pontosInt,setPtsInt] = useState(null)
  return (
    <div>
      {pontosInt && <div style={{position: 'absolute',display: 'flex',justifyContent: 'center',width: '100vw',height: '100vh'}}>
      <h1 style={{color: 'black',textAlign: 'center'}}>{pontosInt > 0 ? `Jogador ${rodada} ganhou ${pontosInt} pontos!` : `Jogador ${rodada} perdeu ${pontosInt} pontos!`}</h1>
        </div>}
              {numPlayers === 2 && <div style={{display: 'grid',justifyContent: 'space-between',gridTemplateColumns: '1fr 1fr',gridTemplateRows: '1fr 1fr',columnGap: '69vw',position: 'absolute',width: 'calc(100vw - 50px)',height: 'calc(100vh - 40px)',padding: '20px 25px'}}>
          <Placar player={1} />
          <Placar player={2} />
          </div>}
        {numPlayers === 3 && <div style={{display: 'grid',justifyContent: 'space-between',gridTemplateColumns: '1fr 1fr',gridTemplateRows: '1fr 1fr',columnGap: '69vw',position: 'absolute',width: '100vw',height: '100vh',padding: '20px 25px'}}>
          <Placar player={1} />
          <Placar player={2} />
          <Placar player={3} />
          </div>}
        {numPlayers === 4 && <div style={{display: 'grid',justifyContent: 'space-between',gridTemplateColumns: '1fr 1fr',gridTemplateRows: '1fr 1fr',columnGap: '69vw',position: 'absolute',width: '100vw',height: '100vh',padding: '20px 25px'}}>
          <Placar player={1} />
          <Placar player={2} />
          <Placar player={3} />
          <Placar player={4} />
          </div>}
    <div>
      {memoizedDeck}
    </div>
    </div>
  );
}

export default Game;
