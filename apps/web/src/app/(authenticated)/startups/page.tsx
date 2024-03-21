'use client'

import React, { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Avatar, Space } from 'antd'
import {
  GlobalOutlined,
  LinkedinOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function StartupsPageforIndividualsPage() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [startupProfiles, setStartupProfiles] = useState([])

  useEffect(() => {
    const fetchStartupProfiles = async () => {
      try {
        const profiles = await Api.StartupProfile.findMany({
          includes: ['user'],
        })
        setStartupProfiles(profiles)
      } catch (error) {
        enqueueSnackbar('Failed to fetch startup profiles', {
          variant: 'error',
        })
      }
    }

    fetchStartupProfiles()
  }, [])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Explore Startups</Title>
      <Text>Discover potential collaborations with innovative startups.</Text>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {startupProfiles?.map(profile => (
          <Col key={profile.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              actions={[
                profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GlobalOutlined key="website" />
                  </a>
                ),
                profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinOutlined key="linkedin" />
                  </a>
                ),
              ]}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    src={profile.user?.pictureUrl || undefined}
                    icon={<UserOutlined />}
                  />
                }
                title={profile.name}
                description={
                  <Space direction="vertical">
                    <Text>
                      Founded: {dayjs(profile.dateCreated).format('YYYY')}
                    </Text>
                    <Text>{profile.user?.email}</Text>
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
