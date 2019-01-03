import * as React from 'react';

// const ACTIVE = { color: 'red' }

export interface Props {
  enthusiasmLevel: number;
  name: string;
  onDecrement?: () => void;
  onIncrement?: () => void;
  onReset?: () => void;
}

class Hello extends React.Component<Props, object> {

  public render() {
    const { name, enthusiasmLevel = 1, onIncrement, onDecrement, onReset } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div>
        <div>
          Hello {name + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
          <button onClick={onReset}>重置</button>
        </div>
      </div>
    );
  }
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}