import React, {useState , useEffect} from 'react'
import { useGetUserdataQuery, useLoginUserMutation } from '../../services/apiurl'
import { getToken, storeToken } from '../../services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Radio, Row, Col } from "antd";
import { setUserInfo } from '../../features/Auth/AuthSlice';
import { useSelector, useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const [loginuser] = useLoginUserMutation()
  const { access_token } = getToken();
  console.log(useGetUserdataQuery(access_token), 'profile data');
  const {data , isSuccess} = useGetUserdataQuery(access_token)
  const [userData, setuserData] = useState({
    email: '',
    name: '',
    profile: ''
  })
  // const {name , email} = useSelector(state => state.userSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    if(data && isSuccess){
      setuserData({
        name: data.name,
        email: data.email,
        profile: data.name

      })
    }
  }, [data , isSuccess ])

   
  useEffect(() => {
    if(data && isSuccess){
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        profile: data.name


      }))
    }
  }, [data , isSuccess , dispatch])
  
  const [server_error, setserver_error] = useState({})
  const [form] = Form.useForm();

  const HandleSubmit = async(e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    let actualData = {
      email: data.get('email'),
      password: data.get('password')
    }
    const res = await loginuser(actualData)
    console.log(res, 'res');
    if (res.data) {
      storeToken(res.data.token)
      navigate('/')

      
  }
  if (res.error){
    console.log(res.error.data.errors);
    setserver_error(res.error.data.errors)
  }

  }
 
  return (
    <div className="pt-20 mt-20">
    <h1>Registration page</h1>
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        {" "}
        <Form
          form={form}
          layout="vertical"
          className="ml-20 mr-20s"
          onClick={HandleSubmit}
        >
       
          <Form.Item label="Email">
            <Input placeholder="input placeholder" name="email" id="email" />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              placeholder="Please enter passwword"
              name="password"
              id="password"
              type="password"
            />
          </Form.Item>
         

          <Form.Item>
            <Button type="primary" className="bg-red-50">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}></Col>
    </Row>
  </div>
  )
}

export default Login