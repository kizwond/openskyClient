import axios from 'axios'
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Modal
} from 'antd';
import Login from './Login'
import './Register.css'

const RegistrationForm = (props) => {
  const msg = "중복된 아이디가 있습니다."
  const [visible, setVisible] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)
    axios.post('api/user/register', {
      user_id:values.user_id,
      password:values.password
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "중복된 아이디가 있습니다."){
          alert(msg)
      } else {
        alert('회원가입에 성공하셨습니다. 로그인 페이지로 이동합니다.')
        // props.history.push('/login')
        document.getElementById("register_form").innerHTML='';
        document.getElementById("register_title").innerHTML='';
        showModal()
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  };

  const showModal = () => {
    setVisible({
      visible: true,
    });
  };

  const handleOk = e => {
    console.log(e);
    setVisible({
      visible: false,
    });
  };

  const handleCancel = e => {
    console.log(e);
    setVisible({
      visible: false,
    });
  };

  return (
    <div className="register_form_container">
      <div id='register_title' className="register_title"><img src="img/logo.png" alt="logo"/></div>
      <Form
        form={form}
        className="register_form"
        id='register_form'
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '82',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="user_id"
          label="아이디"
          rules={[
            {
              required: true,
              message: '사용할 아이디를 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해 주세요.',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="비밀번호 확인"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호를 다시한번 입력해 주세요.',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('비밀번호가 일치하지 않습니다.');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title={null}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        className="login_modal"
      >
        <Login onOk={handleOk} />
      </Modal>
    </div>
  );
};

export default RegistrationForm