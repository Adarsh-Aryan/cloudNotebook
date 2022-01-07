import React from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Note from './components/Note';

import About from './components/About';
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Note/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/signup" element={<SignUp/>} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
