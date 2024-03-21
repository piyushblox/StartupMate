'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Avatar, Space } from 'antd'
import { PlayCircleOutlined, FileTextOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TutorialsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const [tutorials, setTutorials] = useState([])

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const tutorialsFound = await Api.Tutorial.findMany({
          includes: ['user', 'tutorialInteractions.user'],
        })
        setTutorials(tutorialsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tutorials', { variant: 'error' })
      }
    }

    fetchTutorials()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Tech Startup Ecosystem Tutorials</Title>
      <Text>
        Explore both video and written tutorials submitted by our community.
      </Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {tutorials?.map(tutorial => (
          <Col xs={24} sm={12} md={8} key={tutorial.id}>
            <Card
              hoverable
              cover={
                <Avatar
                  size={128}
                  icon={
                    tutorial.content?.startsWith('http') ? (
                      <PlayCircleOutlined />
                    ) : (
                      <FileTextOutlined />
                    )
                  }
                  style={{
                    margin: '20px auto',
                    display: 'block',
                    backgroundColor: '#f0f2f5',
                  }}
                />
              }
              onClick={() =>
                enqueueSnackbar('Feature not implemented yet', {
                  variant: 'info',
                })
              }
            >
              <Card.Meta
                title={tutorial.title}
                description={
                  <Space direction="vertical">
                    <Text>By: {tutorial.user?.name}</Text>
                    <Text>
                      Interactions: {tutorial.tutorialInteractions?.length}
                    </Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
