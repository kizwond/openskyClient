import axios from 'axios'
import React, { useState } from 'react';
import {
  Form,
  Select,
  Input,
  Tooltip,
  Checkbox,
  Button,
  Modal
} from 'antd';
import Login from './Login'
import { QuestionCircleOutlined } from '@ant-design/icons';
import './Register.css'

const RegistrationForm = (props) => {
  const [msg, setMsg] = useState("중복된 아이디가 있습니다.");
  const [visible, setVisible] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
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
  // const prefixSelector = (
  //   <Form.Item name="prefix" noStyle>
  //     <Select
  //       style={{
  //         width: 70,
  //       }}
  //     >
  //       <Option value="82">+82</Option>
  //     </Select>
  //   </Form.Item>
  // );

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
{/* 
        <Form.Item
          name="name"
          label="이름"
          rules={[
            {
              required: true,
              message: '필수 정보입니다.',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: 'email',
              message: '올바른 이메일 주소를 입력하여 주세요.',
            },
            {
              required: true,
              message: '필수 정보입니다.',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nickname"
          label={
            <span>
              닉네임&nbsp;
              <Tooltip title="책 작성시 저자정보에 노출되는 정보입니다.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: '사용하실 별칭을 입력하여 주세요.',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('이용약관에 동의하여 주세요.'),
            },
          ]}
        >
          <Checkbox>
            CogBook <a href="/">이용약관</a> 동의
          </Checkbox>
        </Form.Item> */}
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