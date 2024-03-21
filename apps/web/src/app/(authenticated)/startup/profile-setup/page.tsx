'use client'

import { UploadOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Button, Col, Form, Input, Row, Typography, Upload } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography

export default function ClientProfileSetupPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [startupProfile, setStartupProfile] = useState(null)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (userId) {
      Api.StartupProfile.findManyByUserId(userId, { includes: ['user'] }).then(
        profiles => {
          if (profiles.length > 0) {
            const profile = profiles[0]
            setStartupProfile(profile)
            form.setFieldsValue({
              name: profile.name,
              website: profile.website,
              linkedin: profile.linkedin,
            })
          }
        },
      )
    }
  }, [userId, form])

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
    enqueueSnackbar('File uploaded successfully', { variant: 'success' })
  }

  const onFinish = async values => {
    try {
      if (startupProfile) {
        await Api.StartupProfile.updateOne(startupProfile.id, {
          ...values,
          pictureUrl:
            fileList.length > 0 ? fileList[0].url : startupProfile.pictureUrl,
        })
        enqueueSnackbar('Profile updated successfully', { variant: 'success' })
      } else {
        await Api.StartupProfile.createOneByUserId(userId, {
          ...values,
          pictureUrl: fileList.length > 0 ? fileList[0].url : undefined,
        })
        enqueueSnackbar('Profile created successfully', { variant: 'success' })
      }
      router.push('/startup/documentation')
    } catch (error) {
      enqueueSnackbar('Failed to save profile', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Your Business Profile</Title>
      
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Startup Name"
          rules={[
            { required: true, message: 'Please input your startup name!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website"  rules={[
            { required: true, message: 'Please input your startup name!' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="linkedin" label="LinkedIn"  rules={[
            { required: true, message: 'Please input your startup name!' },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
 label="Profile Picture"
 name="profilePicture"
 rules={[
    { required: true, message: 'Please upload a profile picture!' },
 ]}
>
 <Upload fileList={fileList} customRequest={handleUpload} maxCount={1}>
    <Button icon={<UploadOutlined />}>Click to upload</Button>
 </Upload>
</Form.Item>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Save Profile
            </Button>
          </Col>
        </Row>
      </Form>
    </PageLayout>
  )
}
