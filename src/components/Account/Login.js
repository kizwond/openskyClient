import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { NavLink} from 'react-router-dom';
import axios from 'axios'

const NormalLoginForm = (props) => {
  const onFinish = (values) => {
    axios.post('api/user/login', {
      user_id:values.user_id,
      password:values.password
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "아이디가 없는 듯요"){
        alert('유저정보가 없습니다. 아이디와 비밀번호를 확인하여 주세요.')
      } else {
        alert('로그인 성공, 메인화면으로 이동합니다.')
        props.history.push('/')
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="login_container">
      <div className="login_title"><img src="img/logo.png" alt="logo"/></div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="user_id"
          rules={[
            {
              required: true,
              message: '아이디를 입력해 주세요.',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력해 주세요.',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="비밀번호"
          />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        <div className="find_my_info_container">
            <a className="login-form-forgot" href="/">아이디 찾기 / </a>
            <a className="login-form-forgot" href="/"> 비밀번호 찾기 / </a>
            <NavLink to="/register">회원가입</NavLink>
        </div>
      </Form>
    </div>
  );
};

export default NormalLoginForm;