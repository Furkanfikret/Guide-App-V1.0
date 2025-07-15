
import  { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MdAddCircle } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa6";
import AddPerson from './AddPerson';
import { useNavigate } from 'react-router-dom';

function MenuForm() {
    const [isOpenAddMenu,setOpenAddMenu] = useState(false);
    const navigate = useNavigate();
  return (
    <div className='main-frame-menu-form'>
        <div className='title'>Welcome To Guide App</div>
        <div className='menu'>
            <Stack direction='row' spacing={4}>
                <Button variant='contained' color='success' onClick={()=>setOpenAddMenu(true)}>
                    <MdAddCircle style={{margin:'5px',fontSize:'x-large'}}/>Add
                </Button>
                <Button onClick={()=>navigate('/contacts')}  variant='contained' color='warning'>
                    <FaAddressBook  style={{margin:'5px',fontSize:'x-large'}}/>Show All Contact List
                </Button>
                
            </Stack>
          
        </div>
        <div>
              {
                   isOpenAddMenu && <AddPerson onCancel={() => setOpenAddMenu(false)} />
              }
        </div>
    </div>
  )
}

export default MenuForm