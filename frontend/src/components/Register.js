import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import app_config from '../config';


const Register = () => {

    const navigate = useNavigate();

    const url = app_config.backend_url
    const userForm = {
        username: "",
        email: "",
        contact: "",
        age: 0,
        password: "",
    };


    const userSubmit = async (formdata) => {
        console.log(formdata);
        const response = await fetch(url +'/user/add', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            console.log('success');
            Swal.fire({
                icon: 'success',
                title: 'Well Done 👍',
                text: 'You have done a wonderfull Job!!'
            })
            navigate('/login');
        } else {
            console.log(response.status);
            console.log('something went wrong');
        }
    }

    const formSchema = Yup.object().shape({
        username: Yup.string()
            .min(5, 'Too Short Username!')
            .max(10, 'Too Long Username!')
            .required('Username is Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'),

    });


    return (
        <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" } }>
        <div className=" bg-white p-3 rounded" style={{width : '40%'}} >
        <h1>Signup Here</h1>
        <hr className="mb-5" />
  
        <Formik initialValues={userForm} onSubmit={userSubmit} 
        validationSchema={formSchema}
         >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Username"
                variant="outlined"
                className="w-100 mb-4"
                id="username"
                onChange={handleChange}
                value={values.username}
                helperText={touched.username ? errors.username : ''}
                error={Boolean(errors.username && touched.username)}
              />
              
              <TextField
                label="Email"
                variant="outlined"
                className="w-100 mb-4"
                id="email"
                onChange={handleChange}
                value={values.email}
                helperText={touched.email ? errors.email : ''}
                error={Boolean(errors.email && touched.email)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                className="w-100 mb-4"
                id="password"
                onChange={handleChange}
                value={values.password}
                helperText={touched.password ? errors.password : ''}
                error={Boolean(errors.password && touched.password)}
              />
  
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </form>
          )}
        </Formik>

    </div>
</div>
  
    )
}

export default Register;