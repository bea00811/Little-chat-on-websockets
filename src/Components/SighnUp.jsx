import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuthContext';
import {useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyHeader from './Header';
import { toast } from 'react-toastify';







  

 function SighnUpPage(props) {
    let { logIn } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [error, setError]= useState(false)


    const SignupSchema = Yup.object().shape({
      nickName: Yup.string()
        .min(3, t('maximum 20 symb min 3'))
        .max(20, t('maximum 20 symb min 3'))
        .required(t('required field')),
      pass: Yup.string()
        .min(6,  t('Password must be 6 characters long'))   
        .required(t('required field')),
      confirmPass: Yup.string()
      .min(6, t('Password must be 6 characters long'))
      .label(t('confirmPass'))
      .required(t('required field'))
      .oneOf([Yup.ref('pass'), null], t( 'Passwords must match')),
    });


    return (
        <div className='container'>
          <MyHeader/>
          <h1 className='text-center'>{t('SighnUp')}</h1>
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
                toast.error('Connection mistake');
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
               
                <label htmlFor="nickName">{t('nic')}</label>
                <Field id = 'nickName' className = {errors.nickName&& touched.nickName?'form-control is-invalid':'form-control'} placeholder="Ваш Ник" name="nickName" />
                {errors.nickName && touched.nickName ? (
                  <div>{errors.nickName}</div>
                ) : null}
                <label htmlFor="sighnPass">{t('pass')}</label>
                <Field id ='sighnPass' className = {errors.pass&& touched.pass?'form-control is-invalid':'form-control'} placeholder="Ваш пароль" name="pass" />
                {errors.pass && touched.pass ? <div>{errors.pass}</div> : null}

                <label htmlFor="confirmPass">{t('confirmPass')}</label>
                <Field id = 'confirmPass' className = {errors.confirmPass&& touched.confirmPass?'form-control is-invalid':'form-control'} placeholder="Confirm password" name="confirmPass" />
                {errors.confirmPass && touched.confirmPass ? <div>{errors.confirmPass}</div> : null}
                <button className='submit-btn' type="submit" disabled = {isSubmitting}> {t('register')}</button>
                {error&&<div>{t('User is already insist')}</div>}
              </Form>
            )}
          </Formik>
        </div>
      );

}

export default SighnUpPage;