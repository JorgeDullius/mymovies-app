import React from 'react';
import './styles/global.css';
import Routes from './routes';
export default class App extends React.Component {

  render() {  
    return (
        <div className="App">
          <Routes/>
        </div>
    );
  }
}
