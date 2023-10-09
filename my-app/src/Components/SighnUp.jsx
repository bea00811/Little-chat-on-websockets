import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyHeader from './Header';
import { toast } from 'react-toastify';



const SignupSchema = Yup.object().shape({
    nickName: Yup.string()
      .min(3, 'Минимум 2 буквы')
      .max(20, 'Максимум 50 букв')
      .required('Обязательное поле'),
    pass: Yup.string()
      .min(6, 'Password must be 6 characters long')   
      .required('Обязательное поле'),
    confirmPass: Yup.string()
    .min(6, 'Password must be 6 characters long')
    .label('confirm password')
    .required()
    .oneOf([Yup.ref('pass'), null], 'Passwords must match'),
  });



  

 function SighnUpPage(props) {
    let { logIn } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError]= useState(false)


    return (
        <div>
          <MyHeader/>
          <h1>SighnUp</h1>    
          <Formik
            initialValues={{
              nickName: '',
              pass: '',
              confirmPass: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              console.log(values);
              const { nickName, pass, confirmPass} = values;
              const userData = { username: nickName, password: pass};
              try {
                const resp = await axios.post('/api/v1/signup', userData);
                console.log(resp.data)
                const userName = resp.data.username;
                const token = resp.data.token;
                logIn(token, userName);
                navigate('/');
                values.nickName = '';
                values.pass = '';
                values.confirmPass = '';

                return resp.data;
              } catch (err) {
                console.log(err.message)
                toast.error(err.message);
                console.log(err.response.status)
                if(err.response.status===409){
                    setError(true)
                }
                return err;
              }
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field className = {errors.nickName&& touched.nickName?'form-control is-invalid':'form-control'} placeholder="Ваш Ник" name="nickName" />
                {errors.nickName && touched.nickName ? (
                  <div>{errors.nickName}</div>
                ) : null}
                <Field className = {errors.pass&& touched.pass?'form-control is-invalid':'form-control'} placeholder="Ваш пароль" name="pass" />
                {errors.pass && touched.pass ? <div>{errors.pass}</div> : null}
                <Field className = {errors.confirmPass&& touched.confirmPass?'form-control is-invalid':'form-control'} placeholder="Confirm password" name="confirmPass" />
                {errors.confirmPass && touched.confirmPass ? <div>{errors.confirmPass}</div> : null}
                <button type="submit" disabled = {isSubmitting}>Submit</button>
                {error&&<div>User is already insist</div>}
              </Form>
            )}
          </Formik>
        </div>
      );

}

export default SighnUpPage;
