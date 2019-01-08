import * as React from 'react';

export interface ShowTime {
    timeStr: string;
}

const style = {
    font: '24px bold',
    margin: '20px auto',
    width: '40%',
};

const MajorClock = (props: ShowTime) => {
    const {timeStr} = props;
    return <div style={style}>
        {timeStr}
    </div>
  };

  
export default MajorClock;