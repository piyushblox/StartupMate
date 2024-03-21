'use client'

import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Form, Input, Radio, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
const { Title, Paragraph } = Typography

export default function SignUpPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    try {
      const userCreated = await Api.User.createOne({
        email: values.email,
        name: values.name,
        password: values.password,
        status: values.role,
      })
      if (userCreated) {
        enqueueSnackbar('User created successfully', { variant: 'success' })
        // Check the selected role and redirect accordingly
        const redirectPath = values.role === 'individual' ? '/individual/profile-setup' : '/startup/profile-setup'
        router.push(redirectPath)
      }
    } catch (error) {
      enqueueSnackbar('Failed to create user', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Sign Up</Title>
      <Paragraph>
       Fill in your details to get started.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Radio.Group>
            <Radio value="startup">Startup</Radio>
            <Radio value="individual">User</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}