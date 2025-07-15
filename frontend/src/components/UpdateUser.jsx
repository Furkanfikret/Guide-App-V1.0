import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Paper, Typography, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    phone: "",
    gender: "",
    note: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/show_all_users/${id}`)
      .then(res => setUser(res.data.user))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
      if (!user.name || !user.surname || !user.phone) {
      alert("Lütfen tüm zorunlu alanları doldurun.");
      return;
  }
    axios.put(`http://localhost:3000/update_user/${id}`, user)
      .then(() =>{
        alert("Kullanıcı güncellendi");
        navigate("/contacts"); // otomatik geri dönüş
      } )
      .catch(err => console.error(err));
  };
  const handleCancel = () => {
    navigate("/contacts");
  }

  return (
    <Paper sx={{ p: 2, m: "30px auto", maxWidth: 400 ,marginTop:'120px'}}>
      <Typography variant="h6" gutterBottom>Update Info</Typography>

      <TextField label="Name" name="name" value={user.name} onChange={handleChange} fullWidth required margin="normal" />
      <TextField label="Surname" name="surname" value={user.surname} onChange={handleChange} fullWidth required  margin="normal" />
      <TextField label="Phone" name="phone" value={user.phone} onChange={handleChange} fullWidth required margin="normal" />

      <FormControl sx={{display:'flex',justifyContent:'center',alignItems:'center'}} fullWidth margin="normal">
        <FormLabel>Gender</FormLabel>
        <RadioGroup
          row
          name="gender"
          value={user.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>

      <TextField label="Note" name="note" value={user.note} onChange={handleChange} fullWidth margin="normal" />

      <Button variant="contained" color="primary" onClick={handleUpdate} fullWidth>
        Update User
      </Button>
      <Button sx={{marginTop:'10px'}} variant="contained" color="error" onClick={handleCancel} fullWidth>
        Cancel
      </Button>
    </Paper>
  );
}

export default UpdateUser;
