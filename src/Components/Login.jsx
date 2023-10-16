import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from './useAuthContext';
import {useState } from 'react';
import MyHeader from './Header';
import { toast } from 'react-toastify';







function Login() {
  const { t } = useTranslation();
   
  let { logIn } = useAuth();
  const navigate = useNavigate(); 
  const [error, setError]= useState(false)

  const SignupSchema = Yup.object().shape({
    nickName: Yup.string()
      .min(3, t('maximum 20 symb min 3'))
      .max(20, t('maximum 20 symb min 3'))
      .required(t('required field')),
    pass: Yup.string()
      .required(t('required field')),
  });

  return (
    <div className='container'>
      <MyHeader/>
      <h1 className='text-center'>{t('Submit')}</h1> 
      <Formik
        initialValues={{
          nickName: '',
          pass: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
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
            
            if(err.response.status===401){
            setError(true)
            toast.error(t('wrongUser'))
          }else{
            toast.error(t('wrongUser'));
          }
           return err;
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
             <label htmlFor="nickName">{t('nic')}</label>
            <Field id = 'nickName' className = {errors.nickName&& touched.nickName?'form-control is-invalid':'form-control'} placeholder="Ваш Ник" name="nickName" />
           
            {errors.nickName && touched.nickName ? (
              <div>{errors.nickName}</div>
            ) : null}

            <label htmlFor="pass">{t('pass')}</label>
            <Field  id = 'pass' type='password' className = {errors.pass&& touched.pass?'form-control is-invalid':'form-control'}placeholder="Ваш пароль" name="pass" />
             {errors.pass && touched.pass ? <div>{errors.pass}</div> : null}
             {error&&<div className ='is-invalid'>{t('wrongUser')}</div>}
            <button className='submit-btn' type="submit">{t('Submit')}</button>
            
          </Form>
        )}
      </Formik>
      <p className='text-center'>{t('Have no account yet?')}</p>
      <button className='submit-btn' onClick={()=>navigate('/signup')}>{t('SighnUp')}</button>
  

    </div>
  );
}

export default Login;