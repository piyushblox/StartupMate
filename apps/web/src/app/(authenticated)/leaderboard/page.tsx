'use client'

import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { Avatar, Card, Col, Rate, Row, Space, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
const { Title, Text } = Typography
interface DeveloperScore {
  id: string
  name: string
  pictureUrl: string
  testScore: number
  likes: number
  interactions: number
}

export default function LeaderboardPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [developers, setDevelopers] = useState<DeveloperScore[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await Api.User.findMany({
          includes: [
            'developerTests',
            'tutorials',
            'tutorialInteractions',
            'communityMessages',
          ],
        })
        const scores = users
          .map(user => ({
            id: user.id,
            name: user.name || 'Anonymous',
            pictureUrl: user.pictureUrl || '',
            testScore:
              user.developerTests?.reduce(
                (acc, test) => acc + (test.passed ? 1 : 0),
                0,
              ) || 0,
            likes:
              user.tutorials?.reduce(
                (acc, tutorial) =>
                  acc + (tutorial.tutorialInteractions?.length || 0),
                0,
              ) || 0,
            interactions: user.communityMessages?.length || 0,
          }))
          .sort(
            (a, b) =>
              b.testScore - a.testScore ||
              b.likes - a.likes ||
              b.interactions - a.interactions,
          )
        setDevelopers(scores)
      } catch (error) {
        enqueueSnackbar('Failed to fetch leaderboard data', {
          variant: 'error',
        })
      }
    }
    fetchData()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Top Rated Developers</Title>
      <Text>Ranked based on like and contributions.</Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {developers.map((developer, index) => (
          <Col key={developer.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              actions={[
                <Space>
                  <StarOutlined key="score" />
                  <Text>{developer.testScore}</Text>
                </Space>,
                <Space>
                  <LikeOutlined key="like" />
                  <Text>{developer.likes}</Text>
                </Space>,
                <Space>
                  <MessageOutlined key="message" />
                  <Text>{developer.interactions}</Text>
                </Space>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={developer.pictureUrl} />}
                title={developer.name}
                description={
                  <Rate
                    disabled
                    defaultValue={index < 3 ? 5 : index < 5 ? 4 : 3}
                  />
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageLayout>
  )
}
