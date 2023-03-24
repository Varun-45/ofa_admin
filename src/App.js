import logo from './logo.svg';
import './App.css';
import Pending from './Components/Pending';
import Docs from './Components/Docs';
import { Route, Switch, Routes } from 'react-router-dom';
import Profile from './Components/Profile';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import Users from './Components/Users';
import Navbar from './Components/Navbar';
import Removed from './Components/Removed';
import Chamber from './Components/Chamber.js';

function App() {
  return (
    <>
      <Navbar />
      <Router>

        <Routes>
          <Route path='/page/:id' element={< Profile />} />
          <Route path='/' element={< Docs />} />
          <Route path='/removed' element={< Removed />} />
          <Route path='/chamber' element={< Chamber />} />
          <Route path='/pending-requests' element={< Pending />} />

          <Route path='/users' element={< Users />} />


        </Routes>
      </Router></>
  );
}

export default App;
