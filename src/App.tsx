import * as React from 'react';
import './App.css';
import AppRouter from './components/router';

class App extends React.Component {
  public render() {
    // const myAdd = (x: number, y: number): number => x + y;
    //   myAdd(10, 3);
    //   console.log(myAdd(10, 3));

    const TFunction = function identity<T> (arg: T): T {console.log(arg);return arg;};
    TFunction('asdasd');
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
