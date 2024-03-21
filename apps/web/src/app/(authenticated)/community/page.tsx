'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Row, Col, Avatar, Input, Button } from 'antd'
import { MessageOutlined, UserOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CommunitySectionPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [communityMessages, setCommunityMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchCommunityMessages = async () => {
      try {
        const messages = await Api.CommunityMessage.findMany({
          includes: ['user'],
        })
        setCommunityMessages(messages)
      } catch (error) {
        enqueueSnackbar('Failed to fetch community messages', {
          variant: 'error',
        })
      }
    }

    fetchCommunityMessages()
  }, [])

  const handleNewMessageChange = e => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      enqueueSnackbar('Message cannot be empty', { variant: 'error' })
      return
    }

    try {
      await Api.CommunityMessage.createOneByUserId(userId, {
        messageText: newMessage,
        communityType: 'general',
      })
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
      setNewMessage('')
      // Refresh messages
      const messages = await Api.CommunityMessage.findMany({
        includes: ['user'],
      })
      setCommunityMessages(messages)
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Community Discussions</Title>
      <Text>Engage in discussions and share insights with the community.</Text>

      <div style={{ margin: '20px 0' }}>
        <TextArea
          rows={4}
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Share something with the community..."
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          style={{ marginTop: '10px' }}
        >
          Send
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {communityMessages?.map(message => (
          <Col span={24} key={message.id}>
            <Card>
              <Card.Meta
                avatar={
                  <Avatar src={message.user?.pictureUrl || UserOutlined} />
                }
                title={message.user?.name || 'Anonymous'}
                description={
                  <>
                    <Text>{message.messageText}</Text>
                    <br />
                    <Text type="secondary">
                      {dayjs(message.dateCreated).format('DD MMM YYYY')}
                    </Text>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
