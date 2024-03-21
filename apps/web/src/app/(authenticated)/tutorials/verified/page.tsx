'use client'

import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Typography, Avatar, Space, Spin } from 'antd'
import { UserOutlined, CalendarOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function VerifiedTutorialsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [tutorials, setTutorials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const tutorialsFound = await Api.Tutorial.findMany({
          filters: { isVerified: { eq: true } },
          includes: ['user'],
        })
        setTutorials(tutorialsFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch tutorials', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Verified Developer Tutorials</Title>
      <Text>
        Explore in-depth tutorials submitted by verified developers on tech
        startup products.
      </Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {tutorials?.map(tutorial => (
            <Col xs={24} sm={12} md={8} lg={6} key={tutorial.id}>
              <Card
                hoverable
                title={tutorial.title}
                onClick={() => router.push(`/tutorials/${tutorial.id}`)}
              >
                <Space direction="vertical">
                  <Avatar
                    src={tutorial.user?.pictureUrl || ''}
                    icon={<UserOutlined />}
                  />
                  <Text>{tutorial.user?.name || 'Anonymous'}</Text>
                  <Space>
                    <CalendarOutlined />
                    <Text>
                      {dayjs(tutorial.dateCreated).format('DD MMM YYYY')}
                    </Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  )
}
