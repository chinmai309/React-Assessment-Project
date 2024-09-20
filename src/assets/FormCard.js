import React from 'react';
import { Card, ConfigProvider, Form, Input, InputNumber} from 'antd';

const FormCard = ({ title, form, onFinish, fields, buttons,onValuesChange, style }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerFontSize: 20,
          },
        },
      }}
    >
      <Card
        title={title}
        hoverable={true}
        style={{
          width: 400,
          borderWidth: 2,
          borderColor: 'grey',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          fontFamily: 'cursive',
          ...style,
        }}
      >
        <div className="form-container">
          <ConfigProvider
            theme={{
              token: {
                fontSize: 16,
                fontFamily: 'cursive',
              },
            }}
          >
            <Form form={form} onFinish={onFinish} onValuesChange={onValuesChange} layout="vertical">
              {fields.map((field, index) => (
                <Form.Item
                  key={index}
                  name={field.name}
                  label={<span style={{ fontWeight: 'bold', fontSize: 18 }}>{field.label}</span>}
                  rules={field.rules}
                >
                  {field.type === 'number' ? (
                    <InputNumber style={{ width: 350 }} />
                  ) : field.type === 'textarea' ? (
                    <Input.TextArea />
                  ) : (
                    <Input type={field.type} />
                  )}
                </Form.Item>
              ))}
              {buttons}
            </Form>
          </ConfigProvider>
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default FormCard;
