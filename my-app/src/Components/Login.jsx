import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import useAuth from './useAuthContext';

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

function ValidationSchemaExample() {
  let { logIn, loggedIn } = useAuth();
  const navigate = useNavigate();
  console.log('login1:' + loggedIn);

  return (
    <div>
      <h1>Signup</h1>

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

            const authData = resp.data;
            console.log(authData.token);

            localStorage.setItem('token', resp.data.token);
            localStorage.setItem('username', resp.data.username);

            const emptylocalStorage = !Object.keys(localStorage).length;
            console.log(emptylocalStorage);
            console.log(loggedIn);

            console.log(loggedIn);
            navigate('/');

            if (emptylocalStorage) {
              navigate('/login');
            } else {
              console.log('logIn()' + logIn);
              console.log(logIn());
              logIn();
              console.log(localStorage);
              console.log('login2:' + loggedIn);
            }

            const respLogin = await axios.get('/api/v1/data', {
              headers: {
                Authorization: `Bearer ${authData.token}`,
              },
            });

            console.log(respLogin.data);

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
            <Field placeholder="Ваш Ник" name="nickName" />
            {errors.nickName && touched.nickName ? (
              <div>{errors.nickName}</div>
            ) : null}
            <Field placeholder="Ваш пароль" name="pass" />
            {errors.pass && touched.pass ? <div>{errors.pass}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ValidationSchemaExample;
