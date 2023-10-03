import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from './useAuthContext';
import {useState } from 'react';
import MyHeader from './Header';


const SignupSchema = Yup.object().shape({
  nickName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  pass: Yup.string()
    .min(4, 'Password must be 8 characters long')
    /*.matches(/[0-9]/, 'Password requires a number')
  .matches(/[a-z]/, 'Password requires a lowercase letter')
  .matches(/[A-Z]/, 'Password requires an uppercase letter')
  .matches(/[^\w]/, 'Password requires a symbol')*/
    .required('Обязательное поле'),
});

function Login() {
  let { logIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError]= useState(false)
  return (
    <div>
      <MyHeader/>
      <h1>Login</h1>

      <Formik
        initialValues={{
          nickName: '',
          pass: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          console.log(values);
          const { nickName, pass } = values;
          const userData = { username: nickName, password: pass };
          try {
            const resp = await axios.post('/api/v1/login', userData);
           const userName = resp.data.username;
           const token = resp.data.token;
    

            logIn(token, userName);
            navigate('/');

        
        

            return resp.data;
          } catch (err) {
            // Handle Error Here
            console.error(err.name);
            console.log(err.message)
            if(err.response.status===401){
              setError(true)
          }
          if(err.response.status===401){
            setError(true)
        }
            return err;
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field className = {errors.nickName&& touched.nickName?'form-control is-invalid':'form-control'} placeholder="Ваш Ник" name="nickName" />
            {errors.nickName && touched.nickName ? (
              <div>{errors.nickName}</div>
            ) : null}
            <Field className = {errors.pass&& touched.pass?'form-control is-invalid':'form-control'}placeholder="Ваш пароль" name="pass" />
            {errors.pass && touched.pass ? <div>{errors.pass}</div> : null}
            <button type="submit">Submit</button>
            {error&&<div>User does not insist</div>}
          </Form>
        )}
      </Formik>
      <p>Have no account yet?</p>
      <button onClick={()=>navigate('/sighnup')}>Sighn up2</button>
    </div>
  );
}

export default Login;
