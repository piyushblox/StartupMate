'use client'

import React, { useEffect, useState } from 'react'
import { Button, Comment, Form, Input, List, Avatar } from 'antd'
import { HeartOutlined, MessageOutlined } from '@ant-design/icons'
const { TextArea } = Input
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CommunityIndividual() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const communityMessagesFound =
          await Api.CommunityMessage.findManyByUserId(userId, {
            includes: ['user'],
          })
        setMessages(communityMessagesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch messages', { variant: 'error' })
      }
    }

    if (userId) {
      fetchMessages()
    }
  }, [userId])

  const handleNewMessageChange = e => {
    setNewMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    try {
      await Api.CommunityMessage.createOneByUserId(userId, {
        messageText: newMessage,
        userId,
      })
      setNewMessage('')
      enqueueSnackbar('Message sent successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ maxWidth: 768, margin: '0 auto' }}>
        <h2>Community Chat</h2>
        <p>
          Engage with the community by commenting, replying, and liking ongoing
          chats.
        </p>
        <Form.Item>
          <TextArea
            rows={4}
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write a message..."
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleSendMessage} type="primary">
            Send
          </Button>
        </Form.Item>
        <List
          dataSource={messages}
          header={`${messages.length} ${messages.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => (
            <Comment
              {...props}
              author={props.user?.name}
              avatar={
                <Avatar src={props.user?.pictureUrl} alt={props.user?.name} />
              }
              content={props.messageText}
              datetime={dayjs(props.dateCreated).format('DD/MM/YYYY HH:mm')}
              actions={[
                <span key="comment-list-reply-to-0">
                  <MessageOutlined /> Reply
                </span>,
                <span key="comment-list-like-0">
                  <HeartOutlined /> Like
                </span>,
              ]}
            />
          )}
        />
      </div>
    </PageLayout>
  )
}
