import * as React from 'react';
import './App.css';
import AppRouter from './components/router';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
