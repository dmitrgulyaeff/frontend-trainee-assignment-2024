import { HomeOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';

export function Header() {
  const location = useLocation();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <header
      style={{ boxShadow: '0 1px 10px rgba(0,0,0,0.1)', paddingBlock: 15 }}
    >
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={20}
        xl={18}
        xxl={16}
        style={{ marginInline: 'auto' }}
      >
        <Row justify={'space-between'} align={'middle'}>
          <Button type='primary' disabled={!isAuth}>
            <Link to='/random' state={{ from: location }}>
              Мне повезёт
            </Link>
          </Button>

          <Link to='/'>
            <HomeOutlined style={{ fontSize: '24px' }} />
          </Link>

          {isAuth ? (
            <Button
              type='primary'
              onClick={() => {
                setIsAuth(false);
              }}
            >
              Выйти
            </Button>
          ) : (
            <Button type='primary' disabled={location.pathname === '/login'}>
              <Link to='/login' state={{ from: location }}>
                Войти
              </Link>
            </Button>
          )}
        </Row>
      </Col>
    </header>
  );
}
