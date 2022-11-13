import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { validEmail, validPassword, validName } from '../components/Regex.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
 const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [nameErr, setNameErr] = useState(false);
   const [emailErr, setEmailErr] = useState(false);
   const [pwdError, setPwdError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
//   const validate = () => {
   
//  };

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validName.test(name)) {
      setNameErr(true);
   }
    if (!validEmail.test(email)) {
       setEmailErr(true);
    }
    if (!validPassword.test(password)) {
       setPwdError(true);
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (

    <div>
      <Row>
      <Col md={5}>
        <div className='Sinupimg'>
    <img
    className="d-block w-100"
    src="https://www.silverliningstechnologies.co.za/wp-content/uploads/2021/06/designers-are-working-desing-web-page-web-design-user-interface-user-experience-content-organization_335657-4403.jpg"
     alt="Third slide"
  />
  
  </div>
  </Col>
  <Col md={5 }>
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        {nameErr && <small className="text-danger">Your name is invalid</small>}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErr && <small className="text-danger">Your email is invalid</small>}
          {/* {errors.name && ({errors.name.message})} */}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {pwdError && <small className="text-danger">Your password is invalid</small>}   
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
             
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        
        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
        </div>
    
  </Form>
    </Container>
    </Col>
    </Row>
    </div>
  );
}