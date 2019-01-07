import * as React from 'react';

export interface ShowTime {
    min: string;
    sec: string;
    ms: string;
}

const style = {
    font: '24px bold',
    margin: '20px auto',
    width: '40%',
};

const MajorClock = (props: ShowTime) => {
    const {min, sec, ms} = props;
    return <div style={style}>
        {`${min}:${sec}:${ms}`}
    </div>
  };

  
export default MajorClock;