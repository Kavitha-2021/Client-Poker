//eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import Home from './components/home/Home'
import Newgame from "./components/newgame/Newgame";

import './App.css';

function App() {
  return (
    <Router>
      <div className="layout-route">
        <Layout />
        <div>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
            <Route path='/game' element={ <Gamescreen /> } />
            <Route path='/newgame' element={ <Newgame />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
