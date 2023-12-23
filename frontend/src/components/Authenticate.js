import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import app_config from '../../config';
import { AppContext } from '../AppContext';

const Authenticate = () => {
    
    const navigate = useNavigate();
    const url = app_config.backend_url
    const {setLoggedIn} = useContext(AppContext);

    const userSubmit = async (formdata) => {
        console.log(formdata);

        const response = await fetch(url+'/user/authenticate', {
            method : 'POST',
            body : JSON.stringify(formdata),
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if(response.status === 200){
            Swal.fire({
                icon : 'success',
                title: 'Success',
                text: 'You have successfully logged in'
            })
            const data = await response.json();
            console.log(data);
            setLoggedIn(true);
            // this will store user data in session
            sessionStorage.setItem('user', JSON.stringify(data));
            navigate('/home');
        }else if(response.status === 300){
            Swal.fire({
                icon : 'error',
                title: 'Failed',
                text: 'Invalid Credentials'
            })
        }

    }

  return (
    <div>
        <Formik initialValues={{
            password : '',
            email : ''
        }} 
        onSubmit={userSubmit}
        >
            { ( { values, handleChange, handleSubmit } ) => (
                <form onSubmit={handleSubmit}>
                    <TextField label="Email Address" id="email" onChange={handleChange} value={values.email} />    
                    <TextField type="password" label="Password" id="password" onChange={handleChange} value={values.password} />    

                    <Button type='submit'>Submit</Button>
                </form>
            ) }
        </Formik>
    </div>
  )
}

export default Authenticate