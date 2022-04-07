import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handelEmail = (event) => {
    setEmail(event.target.value)
  }
  const handelPassword = (event) => {
    setPassword(event.target.value)
  }
  const handelSubmit = (event) => {
    console.log(email, password)
    event.preventDefault();
  }
  return (
    <div >

      <div className="w-50 mx-auto mt-3">
        <Form onSubmit={handelSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmail} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPassword} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
