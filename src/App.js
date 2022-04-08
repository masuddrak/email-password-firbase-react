import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [register, setRegister] = useState(false)
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // email,password handelar
  const handelEmail = (event) => {
    setEmail(event.target.value)
  }
  const handelPassword = (event) => {
    setPassword(event.target.value)
  }
  // checked handel 
  const handelChecked = (event) => {
    setRegister(event.target.checked)
  }
  // handel submit button 
  const handelSubmit = (event) => {

    // validation
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError('please type one special(?=.*[!@#$%^&*])')
      return
    }
    setError('')
    setValidated(true);

    // validation
    if (register) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // ...
          console.log(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage)
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setEmail('')
          setPassword('')
          console.log(user)
        })
        .catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage)
          console.log(errorMessage)
        });
    }

  }
  return (
    <div >
      <h2 className="text-center text-primary mt-4">Now {register ? 'Login' : "Register"}!!</h2>
      <div className="w-50 mx-auto mt-3">
        <Form noValidate validated={validated} onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmail} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please type valid  email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPassword} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.....
            </Form.Control.Feedback>
            <p className=" text-danger">{error}</p>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check onChange={handelChecked} type="checkbox" label="Already Register?" />
            </Form.Group>
          </Form.Group>
          <Button variant="primary" type="submit">
            {register ? 'Login' : "Submit"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
