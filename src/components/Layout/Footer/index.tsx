import React from 'react';
import { Layout, Typography, Space } from 'antd';

const { Text, Link } = Typography;

export function Footer() {
  return (
    <Layout.Footer style={{ textAlign: 'center', marginBlockStart: 'auto' }}>
      <Space direction='vertical' size='middle'>
        <Text strong>
          Дмитрий Гуляев © {new Date().getFullYear()} Создано с использованием
          Ant Design
        </Text>
        <Space>
          <Link href='https://t.me/DmitriiGulyaev'>Телеграм</Link>
          <Link href='mailto:dmitrgulyaeff@yandex.ru'>Почта</Link>
        </Space>
      </Space>
    </Layout.Footer>
  );
}
