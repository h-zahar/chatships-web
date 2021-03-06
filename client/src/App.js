import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Join />
          </Route>

          <Route path='/chat'>
            <Chat />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
