import React from 'react';
import { Background } from '../Background';
import { Button } from '../Button';
import { RocketWithShape } from '../Icon/RocketWithShape';
import { StarsBackground } from '../StarsBackground';

export const HomeComponent = () => {
  return (
    <>
      <Background />
      <StarsBackground />
      <div className='home' style={{ width: '100%', display: 'grid', gridTemplateRows: '1fr 300px' }}>
        <div className='home__body' style={{ position: 'relative' }}>
          <div
            className='home__body-rocket'
            style={{
              height: '600px',
              width: '630px',
              position: 'absolute',
              bottom: '-18%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <RocketWithShape />
          </div>
        </div>
        <div
          className='home__footer'
          style={{ height: '100%', width: '100%', background: '#26374D', zIndex: '1', position: 'relative' }}
        >
          <h1
            style={{
              width: '100%',
              textAlign: 'center',
              color: '#fff',
              fontSize: '150px',
              lineHeight: '150px',
              marginTop: '-70px',
            }}
          >
            SPACE RACE
          </h1>

          <Button text='Start' />
        </div>
      </div>
    </>
  );
};
