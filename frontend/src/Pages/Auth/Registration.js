import React, { useState } from "react";
import { useRegisterUserMutation } from "../../services/apiurl";
import { storeToken } from "../../services/LocalStorage";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Radio, Row, Col } from "antd";

function Registration() {
  const navigate = useNavigate();
  const [server_error, setserverError] = useState({});
  const [registerUser, isSuccess] = useRegisterUserMutation();
  const [form] = Form.useForm();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password2: data.get("password2"),
      tc: data.get("tc"),
    };
    const res = await registerUser(actualData);
    console.log(res);
    if (res.data) {
      storeToken(res.data.token);
      navigate("/login");
    }
    if (res.error) {
      console.log(res.error.data.errors);
      setserverError(res.error.data.errors);
    }
  };
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
            <Form.Item label="Names">
              <Input placeholder="input placeholder" name="name" id="name" />
            </Form.Item>
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
            <Form.Item label="Confirm Password">
              <Input
                placeholder="Confirm Password"
                name="password2"
                type="password"
                id="password2"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox
                value={true}
                id="tc"
                name="tc"
                label="I agree to term and condition."
              >
                I agree to term and condition.
              </Checkbox>
              ;
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
  );
}

export default Registration;
