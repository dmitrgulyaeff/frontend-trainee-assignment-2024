import { Col, Row } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Row justify='center' >
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={20}
            xl={18}
            xxl={16}
            style={{ paddingBlock: 20, paddingInline: 30 }}
          >
            <Outlet />
          </Col>
        </Row>
      </main>
      <Footer />
    </>
  );
}
