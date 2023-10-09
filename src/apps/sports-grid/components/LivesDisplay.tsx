import React from 'react';
import { IconContext } from 'react-icons';
import { BiCheck, BiX } from "react-icons/bi";
import { MAX_NUMBER_OF_LIVES } from '../games/sports-game-service';

interface Props {
  numLives: number
}

export default function LivesDisplay({ numLives }: Props) {
  const lives: React.JSX.Element[]  = [];

  for (var i = MAX_NUMBER_OF_LIVES; i > 0; i--) {
    if (i > numLives) {
      lives.push(
        <IconContext.Provider key={i} value={{ size: '4em', color: 'red' }}>
          <BiX></BiX>
        </IconContext.Provider>
      );
    } else {
      lives.push(
        <IconContext.Provider key={i} value={{ size: '4em', color: 'green' }}>
          <BiCheck></BiCheck>
        </IconContext.Provider>
      )
    }
  }


  return (
    <div className='lives-display-container'>
      <div className='lives-display-icons'>
        {lives}
      </div>
    </div>
  );
}
