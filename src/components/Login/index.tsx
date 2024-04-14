import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import Title from 'antd/es/typography/Title';
import { AuthContext } from '../AuthProvider';

export function Login() {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (values: { username: string; password: string }) => {
    const { username, password } = values;

    if (username === 'user' && password === 'password') {
      const fakeToken = '12345';
      localStorage.setItem('authToken', fakeToken);
      setIsAuth(true)
      navigate(from, { replace: true });
    } else {
      message.error('Неверные учетные данные!');
    }
  };

  return (
    <>
      <Title level={1}>Вход в систему</Title>
      <Form name='login-form' onFinish={handleLogin}>
        <Form.Item
          name='username'
          rules={[
            { required: true, message: 'Пожалуйста, введите user!' },
          ]}
        >
          <Input placeholder='user' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Пожалуйста, введите password!' },
          ]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
