import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stack,
  Box,
  Paper,
  Typography
} from '@mui/material';

function AddPerson({onCancel}) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    gender: '',
    note: ''
  });
  const [serverMessage,setServerMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // burada veriyi işleyebilirsin
    const response = await axios.post("http://localhost:3000/users",formData);
    setServerMessage(response.data.message);
    setFormData({name: '',
    surname: '',
    phone: '',
    gender: '',
    note: ''});
    
    
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: 500, margin: 'auto' ,mt: 6 ,mb: 6 }}>
      <Typography variant="h6" gutterBottom>
        User Info Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            type="tel"
          />
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              
            </RadioGroup>
            </div>
            
          </FormControl>
          <TextField
            label="Note"
            name="note"
            value={formData.note}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Button variant="outlined" color="error" onClick={onCancel}>
            Cancel
          </Button>

        </Stack>
      </form>
      {
        serverMessage && <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'x-large',fontFamily:'sans-serif'}}><h3>{serverMessage}</h3></div> 
      } 
     
    </Paper>
  );
}

export default AddPerson;
