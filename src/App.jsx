import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import AddContact from './components/AddContact'
import GetContact from './components/GetContact'

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
const App = () => {
  const [contacts, setContacts] = useState([])
  const [id, setId] = useState("")
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetContact id={id} setId={setId} />} />
        <Route
          path="/addcontact"
          element={<AddContact id={id} setId={setId} />}
        />
      </Routes>
    </Router>
  );
}

export default App