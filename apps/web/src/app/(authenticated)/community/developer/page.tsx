'use client'

import React, { useEffect, useState } from 'react'
import { Button, Input, List, Avatar, Form, Typography } from 'antd'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CommunityDeveloper() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [developerTests, setDeveloperTests] = useState([])
  const [communityMessages, setCommunityMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    if (userId) {
      Api.DeveloperTest.findManyByUserId(userId, { includes: ['user'] })
        .then(tests => {
          const passedTests = tests.filter(test => test.passed)
          if (passedTests.length > 0) {
            setDeveloperTests(passedTests)
            fetchCommunityMessages()
          } else {
            enqueueSnackbar(
              'You must pass the developer test to access this page.',
              { variant: 'error' },
            )
          }
        })
        .catch(() => {
          enqueueSnackbar('Failed to fetch developer tests.', {
            variant: 'error',
          })
        })
    }
  }, [userId, router])

  const fetchCommunityMessages = () => {
    Api.CommunityMessage.findManyByUserId(userId, { includes: ['user'] })
      .then(messages => {
        setCommunityMessages(messages)
      })
      .catch(() => {
        enqueueSnackbar('Failed to fetch community messages.', {
          variant: 'error',
        })
      })
  }

  const handleSendMessage = async () => {
    if (messageText.trim() === '') {
      enqueueSnackbar('Message cannot be empty.', { variant: 'info' })
      return
    }

    try {
      await Api.CommunityMessage.createOneByUserId(userId, { messageText })
      setMessageText('')
      fetchCommunityMessages()
      enqueueSnackbar('Message sent successfully.', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message.', { variant: 'error' })
    }
  }

  return (
    <div>
      <Title level={2}>Developer Community Chat</Title>
      <Text>Connect, share, and learn with other verified developers.</Text>

      <Form onFinish={handleSendMessage} style={{ marginTop: '20px' }}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
            placeholder="Type your message here..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>

      <List
        dataSource={communityMessages}
        renderItem={item => (
          <li>
            <div>
              <div>
                <Avatar src={item.user?.pictureUrl} alt={item.user?.name} />
                <span>{item.user?.name}</span>
              </div>
              <p>{item.messageText}</p>
              <span>{dayjs(item.dateCreated).format('DD/MM/YYYY HH:mm')}</span>
            </div>
          </li>
        )}
      />
    </div>
  )
}
