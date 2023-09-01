import { Formik, Form, Field } from 'formik';
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';




const SignupSchema = Yup.object().shape({
  nickName: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  pass:Yup.string()
  /*.min(8, 'Password must be 8 characters long')
  .matches(/[0-9]/, 'Password requires a number')
  .matches(/[a-z]/, 'Password requires a lowercase letter')
  .matches(/[A-Z]/, 'Password requires an uppercase letter')
  .matches(/[^\w]/, 'Password requires a symbol')*/
  .required('Обязательное поле'),
});

// const sendRequest  = async (value) => {
//   try {
//       const resp = await axios.post('/api/v1/login', value);
//       console.log(resp.data);
//       localStorage.setItem('token', resp.data.token);
//       localStorage.setItem('username', resp.data.username);
//       console.log(localStorage.token)
//       console.log(localStorage.username)
//       console.log(localStorage.somedata)
//       console.log(localStorage)
//       const emptylocalStorage = !Object.keys(localStorage).length
//       console.log(emptylocalStorage)
//       if(emptylocalStorage){
//         <Navigate to="/login"/>
//       }
// // const navigate = useNavigate();   
// // const handleClick = () => navigate('/one');
// //       handleClick();

//       return resp.data;
//   } catch (err) {
//       // Handle Error Here
//       console.error(err);
//       return err;
//   }
// }

 function ValidationSchemaExample  ()  {
  const navigate = useNavigate(); 
    return(  
      <div>
    <h1>Signup</h1>
  
    <Formik
      initialValues={{
        nickName: '',
        pass: '',
      }}
      
      validationSchema={SignupSchema}
      onSubmit={ async (values) => {
        console.log(values);
         const {nickName,pass} = values
         const userData = { username: nickName, password: pass};
         try {
          const resp = await axios.post('/api/v1/login', userData );
          console.log(resp.data);
          localStorage.setItem('token', resp.data.token);
          localStorage.setItem('username', resp.data.username);
          console.log(localStorage.token)
          console.log(localStorage.username)
          console.log(localStorage.somedata)
          console.log(localStorage)
          const emptylocalStorage = !Object.keys(localStorage).length
          console.log(emptylocalStorage)
          const handleClick = () => navigate('/');
          handleClick();
          if(emptylocalStorage){
            <Navigate to="/login"/>
          }
    // const navigate = useNavigate();   
    // const handleClick = () => navigate('/one');
    //       handleClick();
    
          return resp.data;
      } catch (err) {
          // Handle Error Here
          console.error(err);
          return err;
      }
        
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field placeholder = 'Ваш Ник' name="nickName" />
          {errors.nickName && touched.nickName ? (
            <div>{errors.nickName}</div>
          ) : null}
          <Field placeholder = 'Ваш пароль'  name="pass" />
          {errors.pass && touched.pass ? (
            <div>{errors.pass}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
  )
};

export default ValidationSchemaExample