import React, { useState,useEffect } from 'react'

const Index = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true)
    
    const winPatterns=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    const checkWinner=(board)=> {
        for(let i=0;i<winPatterns.length;i++) {
            const [a,b,c]=winPatterns[i];
            if(board[a] && board[a]===board[b] && board[a]===board[c] ) {
                return board[a];
            }
            if(!board.includes(null)) return "T"
        }
        return null;
    }

    const winner=checkWinner(board);

    const display=winner ? winner==="T" ? "Tie Match" : ` winner ${winner}`:xIsNext? 'Next is X':'Next is O';

    useEffect(()=> {
        if(!xIsNext) {
        setBoard((prevBoard)=> {

            const newBoard=[...prevBoard];

            for (let i=0;i<9;i++) {
                if(!newBoard[i]) {
                    newBoard[i]='O';
                    if(checkWinner(newBoard)) {
                        setXIsNext(true);
                        return newBoard;
                    }
                    newBoard[i]=null;
                }
            }
            for (let i=0;i<9;i++) {
                if(!newBoard[i]) {
                    newBoard[i]='X';
                    if(checkWinner(newBoard)) {
                        newBoard[i]='O'
                        setXIsNext(true);
                        return newBoard;
                    }
                    newBoard[i]=null;
                }
            }

        const empty=board.reduce((acc,value,idx)=> {
            if(!value) {
                acc.push(idx);
            }
            return acc;
        },[])
        
        if(!newBoard[4]) {
            newBoard[4]='O'
            setXIsNext(true);
            return newBoard;
        }

        if(empty.length>0) {
            const idx=Math.floor(Math.random()*empty.length);
            newBoard[empty[idx]]='O';
            setXIsNext(true);
            return newBoard;
        }
        return newBoard;
      })
    }
    },[xIsNext,board])

    


    const handleClick=(val)=> {
        if(winner || board[val]) return;

        setBoard((prevBoard) => {
            const newBoard = [...prevBoard];
            newBoard[val] = 'X';
            return newBoard;
        });
        setXIsNext(false);
        
    }

    const reset=()=> {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    }

  return (
    <div className=' mt-60 ml-60'>
        <div className='py-3 flex '>{display}</div>
        <div className=' grid grid-flow-row grid-cols-3 gap-2' style={{display:'grid', gridTemplateColumns:'repeat(3,100px)'}}>

            {Array.from({length:9}).map((_,i)=> (
                <button key={i} className='px-6 py-6 border' onClick={()=>handleClick(i)}>{board[i]}</button>
            ))}
        </div>
        <button className=' py-2 px-2 bg-red-500 text-white rounded-md my-4' onClick={reset}>Reset</button>
    </div>
  )
}

export default Index