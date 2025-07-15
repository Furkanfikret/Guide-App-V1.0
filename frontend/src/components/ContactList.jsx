import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button,TextField, InputAdornment } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import  '../css/ContactList.css';
import { MdModeEdit } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const backend_api_url = 'https://guide-app-v1-0.onrender.com';
function ContactList() {
  const navigate = useNavigate();
  // useState'e arama ekle
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const handleDelete = (id) => {
    axios.delete(`${backend_api_url}/${id}`)
      .then(()=>{
        setUsers(users.filter(user => user.id !== id))
      })
      .catch(error => console.log(error))
  }
  const handleUpdate = (id) => {
    // örnek olarak id'yi route ile güncelleme sayfasına gönder
    navigate(`/update_user/${id}`);
  };
  useEffect(() => {
    axios.get(`${backend_api_url}/show_all_users`)
      .then(res => setUsers(res.data.users))
      //res bir obje ve data key inde axios un verielri var
      //res.data = {users:[{},{},{},...]} gibi her bir user ı içeren bir object
      //res.data.users = [{},{},{},...] buda her bir user ı içeren  bir dizi
      .catch(err => console.error("Error fetching users:", err));
  }, []);
  useEffect(() => {
  axios.get(`${backend_api_url}/show_all_users?arama=${searchTerm}`)
    .then(res => setUsers(res.data.users))
    .catch(err => console.error("Error fetching users:", err));
  }, [searchTerm]);
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Paper sx={{ p: 3, m: 5, width:'1300px'}}>
       <Button
        variant="contained"
        color="warning"
        startIcon={<HomeIcon />}
        onClick={() => navigate("/")} // Ana menüye yönlendir
        sx={{ mb: 2 }}
      >
        HOME PAGE
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 ,marginLeft:'800px'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />
      <Typography variant="h5" gutterBottom>All Contacts</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow >
              <TableCell className="table-header">Name</TableCell>
              <TableCell className="table-header">Surname</TableCell>
              <TableCell className="table-header">Phone</TableCell>
              <TableCell className="table-header">Gender</TableCell>
              <TableCell className="table-header">Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.surname}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.note}</TableCell>
                <TableCell>
                  <Button 
                    variant='contained' 
                    startIcon={<DeleteIcon/>}
                    color="error" 
                    style={{marginLeft:'50px'}}
                    onClick={()=>handleDelete(user.id)}>Delete
                  </Button>
                   <Button 
                    variant='contained' 
                    color='primary' 
                    startIcon={<MdModeEdit />}
                    onClick={() => handleUpdate(user.id)} 
                    style={{ marginRight: '10px', marginLeft:'10px'}}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </div>
    
   
    
   
  );
}

export default ContactList;
