
import './App.css'
import ContactList from './components/ContactList';
import MenuForm from './components/MenuForm'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateUser from './components/UpdateUser';
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MenuForm/>}/>
        <Route path='/contacts' element={<ContactList/>}/>
        <Route path="/update_user/:id" element={<UpdateUser />} />
      </Routes>
     
    </BrowserRouter>
    
  )
}

export default App
