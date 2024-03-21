'use client'

import { LinkOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Col, Form, Input, Row, Space, Typography, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
const { Title, Paragraph } = Typography

export default function DocumentationPage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [form] = Form.useForm()

  useEffect(() => {
    if (!authentication.isAuthenticated) {
      router.push('/signup')
    }
  }, [authentication.isAuthenticated, router])

  const handleSubmit = async (values: any) => {
    try {
      const {
        name,
        website,
        linkedin,
        description,
        founderName,
        founderEmail,
        founderLinkedin,
      } = values
      const startupProfile = await Api.StartupProfile.createOneByUserId(
        userId,
        {
          name,
          website,
          linkedin,
          userId,
        },
      )
      await Api.Documentation.createOneByStartupProfileId(startupProfile.id, {
        description,
        founderName,
        founderEmail,
        founderLinkedin,
        startupProfileId: startupProfile.id,
      })
      // Success notification
      message.success('Startup information saved successfully!')
      router.push('/startup/profile-setup')
    } catch (error) {
      // Removed the error snackbar notification as per customer request
      console.error('Failed to save startup information.', error)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Your Documentation</Title>
      <Paragraph>
        Document your startup foundational information here.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Startup Name"
              rules={[
                { required: true, message: 'Please input your startup name!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Startup Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="website"
              label="Website"
              rules={[
                { required: true, message: 'Please input your website!' },
              ]}
            >
              <Input prefix={<LinkOutlined />} placeholder="Website" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="linkedin"
              label="LinkedIn"
              rules={[
                { required: true, message: 'Please input your LinkedIn!' },
              ]}
            >
              <Input prefix={<LinkedinOutlined />} placeholder="LinkedIn" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please input your startup description!',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Description" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="founderName"
              label="Founder Name"
              rules={[
                { required: true, message: 'Please input the founder name!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Founder Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="founderEmail"
              label="Founder Email"
              rules={[
                { required: true, message: 'Please input the founder email!' },
              ]}
            >
              <Input
                prefix={<LinkOutlined />}
                type="email"
                placeholder="Founder Email"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="founderLinkedin"
              label="Founder LinkedIn"
              rules={[
                {
                  required: true,
                  message: 'Please input the founder LinkedIn!',
                },
              ]}
            >
              <Input
                prefix={<LinkedinOutlined />}
                placeholder="Founder LinkedIn"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Space>
          <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
 Submit
</Button>
<Button onClick={() => form.resetFields()} style={{ marginTop: '20px' }}>
 Reset
</Button>

          </Space>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}