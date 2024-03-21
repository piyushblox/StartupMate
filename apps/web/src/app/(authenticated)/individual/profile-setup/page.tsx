'use client'

import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Upload, Typography, Row, Col, Avatar } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function IndividualProfileSetup() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await Api.User.findOne(userId)
        setUser(fetchedUser)
        setImageUrl(fetchedUser.pictureUrl)
      } catch (error) {
        enqueueSnackbar('Failed to fetch user data', { variant: 'error' })
      }
    }

    if (userId) {
      fetchUser()
    }
  }, [userId])

  const handleUpdate = async values => {
    try {
      setLoading(true)
      await Api.User.updateOne(userId, { ...values, pictureUrl: imageUrl })
      enqueueSnackbar('Profile updated successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to update profile', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      enqueueSnackbar('You can only upload JPG/PNG file!', { variant: 'error' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      enqueueSnackbar('Image must smaller than 2MB!', { variant: 'error' })
    }
    return isJpgOrPng && isLt2M
  }

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setImageUrl(url)
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Profile Setup</Title>
      <Text>Edit your basic profile information.</Text>
      <Form layout="vertical" onFinish={handleUpdate} initialValues={user}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Profile Picture">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            customRequest={handleUpload}
            beforeUpload={beforeUpload}
          >
            {imageUrl ? (
              <Avatar src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Profile
        </Button>
      </Form>
    </PageLayout>
  )
}
