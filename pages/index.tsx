import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

type Block = {
    x: number;
    y: number;
    type: string;
  };
  type Character = {
    x: number;
    y: number;
    name: string;
  };
  
  
  

const Home: NextPage =()=>{

  const [random, setRandom] = useState<number>(0)
  const [nextPosition , setNextPosition] = useState<Character>({ 
    x: 0,
    y: 0,
    name: ''}
    )

  const [board, setBoard] = useState (
    {
    width: 15,
    height: 15,
    players: [{ x: 0, y: 1, name: "Guille" }],
    effects: [{ x: 0, y: 0, type: "storm" }],
    blocks: [
      { x: 0, y: 1, type: "space" },
      { x: 1, y: 1, type: "space" },
      { x: 2, y: 1, type: "space" },
      { x: 3, y: 1, type: "space" },
      { x: 4, y: 1, type: "space" },
      { x: 5, y: 1, type: "space" },
      { x: 6, y: 1, type: "space" },
      { x: 2, y: 2, type: "space" },
      { x: 2, y: 3, type: "space" },
      { x: 2, y: 4, type: "space" },
      { x: 3, y: 4, type: "space" },
      { x: 4, y: 4, type: "space" },
      { x: 6, y: 4, type: "space" },
      { x: 7, y: 4, type: "space" },
      { x: 8, y: 4, type: "space" },
      { x: 9, y: 4, type: "space" },
      { x: 5, y: 2, type: "space" },
      { x: 5, y: 3, type: "space" },
      { x: 5, y: 4, type: "space" },
      { x: 5, y: 5, type: "space" },
      { x: 5, y: 6, type: "space" },
      { x: 5, y: 7, type: "space" }
    ]
  })
    const blocks = (() => {
        return board.blocks.reduce((r, block) => {
          return { ...r, [`${block.x}-${block.y}`]: block };
        }, {});
      })();
     const getBlock = (x: number, y: number) =>{
        return board.blocks.find((row) => row.x === x && row.y === y);
      }
      
      const getPlayer = (x: number, y: number) => {
        return board.players.find((row) => row.x === x && row.y === y);
      }
      
      const getColor = (block?: Block) => {
        if (!block) return "black";
        switch (block.type) {
          case "space":
            return "gray";
          case "wall":
          default:
            return "green";
        }
      }
      const rollOfTheDice = () => {
        setRandom(Math.floor(Math.random() * (6 - 1 + 1) + 1))
      }
      const playerMovement = (x:number, y:number) => {
        if(getBlock(x, y)?.type === 'wall'){
        setBoard({...board, players:[nextPosition]})
        }
      }

      useEffect(()=>{
        let player = board.players
        let pos = board.blocks.find(e => e.x === player[0].x && e.y === player[0].y)
       if(pos){
         let newP = {
           x: pos?.x + random,
           y: pos?.y,
           name:player[0]?.name
         } 
         setNextPosition(newP);
       }
      },[random])

      useEffect(()=>{
        const newBlocks = board.blocks.map(e =>{
          if( e.x === nextPosition?.x && e.y === nextPosition?.y && random !== 0){
             e.type = 'wall'
          }else{
             e.type = 'space'
          }
          return e
        })
         setBoard({...board, blocks:newBlocks})
      },[nextPosition])

      console.log({nextPosition, random, board})

 return(
        <>
          <div
            style={{
              width: "100vw",
              height: "100vw",
              display: "grid",
              gridTemplateColumns: new Array(board.width)
                .fill(0)
                .map((d) => "1fr")
                .join(" "),
              gridTemplateRows: new Array(board.height)
                .fill(0)
                .map((d) => "1fr")
                .join(" ")
            }}
          >
            {new Array(board.width).fill(0).map((_, x) => (
              <div>
                {new Array(board.height).fill(0).map((_, y) => (
                  <div
                    onClick={() => playerMovement(x, y)}
                    style={{
                      background: getColor(getBlock(x, y)),
                      height: "100%",
                      width: "100%",
                      border: `1px solid black`
                    }}
                  >
                    {getPlayer(x, y) && <div>{getPlayer(x, y)?.name}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button onClick={rollOfTheDice}>dado</button>
        </>
      );
}

export default Home