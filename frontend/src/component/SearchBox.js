import React , {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { increment } from "../features/counter/counterSlice";

function SearchBox() {
  const [keyword, setkeyword] = useState("");
  let navigate = useNavigate()
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword){
      console.log('if part');
      navigate(`/?search=${keyword}`)
      dispatch(increment())
      const btn = document.getElementById('btn');

  // 👇️ if you are submitting a form (prevents page reload)

  const firstNameInput = document.getElementById('first_name');

  // Send value to server
  console.log(firstNameInput.value);

  // 👇️ clear input field
  firstNameInput.value = '';

    }
    else{
      navigate('/')
        console.log('else part');
    }
    console.log(keyword , 'keyword');
  };
console.log('keyword');

  return (
    <Form onSubmit={submitHandler} id="block_container">
      <Form.Control
        type="text"
        className=""
        name="first_name"
        id="first_name"
        onChange={(e) => setkeyword(e.target.value)}
        ></Form.Control>
        <Button type="submit" id="btn"  variant="outline-success">Search</Button>
   
    </Form>
  );
}

export default SearchBox;
