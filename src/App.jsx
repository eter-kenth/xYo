import { Children } from 'react'
import './App.css'
import { useState } from 'react'

const TURNS = { // constante que son los turnos
  X:'x',
  O:'o'
}

// componente tablero 
const Square = ({children, isSelected,updateBoard,index}) =>{
  const className = `square ${isSelected ?'is-selected' : ''}` // esto solo es para actualizar la visibilidad del turno 
  const handleClick = ()=>{ // esta funcion solo llama ala funcion updateboard 
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}> 
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6] 
]

function App() {

  const [board,setBoard] = useState( // estado con el que modificaremos el componente
    Array(9).fill(null)
  ) 

  const [turn,setTurn] = useState(TURNS.X) // se le pasa el estado inicial que se guarda en el primer elemento del array y en el segundo elemento ira a forma en la que cambiara o actualizara el estado
  const [winner,setWinner] = useState(null) // null es que no hay ganador, false es que hay un empate

  const checkWinner = (boardToCheck)=>{

    //revisamos todas las combinaciones ganadoras 
    //para ver si X o O gano
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c] 
      ){
        return boardToCheck[a]
      }
    }
    return NULL

  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index)=>{ //en esta funcion se actualiza el turno y se actualiza el tablero para renderizar la x o el o
    if(board[index] || winner)return // este if es solo para no reescribir el indice
    const newBoard = [...board] // aqui se crea un nuevo tablero que remplazara al actual
    newBoard[index] = turn  
    setBoard(newBoard) // aqui se actualiza el estadod del tablero

    const  newTurns = turn ===  TURNS.X ? TURNS.O:TURNS.X // aqui se actualiza el turno
    setTurn(newTurns)
    //revisar si hay un ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)

    }

  }
  return (

    <main className='board'>
      <h1> X  y  O</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((_,index)=>{
            return(
             <Square
             key={index}
             index={index}
             updateBoard={updateBoard}
             >
              {board[index]}
              
             </Square>
            
            )
          })
        }
      </section>
      
      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>  
          {TURNS.X}
        </Square>
        <Square isSelected = {turn === TURNS.O}> 
          {TURNS.O}
        </Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Gano: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div> 
          </section>
        )
      }
    </main>

    
  )
}

export default App
