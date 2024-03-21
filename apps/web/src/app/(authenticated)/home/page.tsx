'use client'

import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { PageLayout } from '@web/layouts/Page.layout'
import { Button, Carousel, Col, Row, Typography } from 'antd'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function HomePage() {
  const router = useRouter()
  const carouselRef = useRef<any>(null)

  const next = () => {
    carouselRef.current.next()
  }

  const previous = () => {
    carouselRef.current.prev()
  }

  return (
    <PageLayout layout="super-narrow">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <Carousel autoplay ref={carouselRef} dots={false}>
            <div>
              <img src="https://via.placeholder.com/600x300?text=Placeholder+1" alt="Placeholder 1" style={{ width: '100%', height: 'auto' }} />
              <Typography.Title level={4} style={{ textAlign: 'left' }}>Documentation</Typography.Title>
            </div>
            <div>
              <img src="https://via.placeholder.com/600x300?text=Placeholder+2" alt="Placeholder 2" style={{ width: '100%', height: 'auto' }} />
              <Typography.Title level={4} style={{ textAlign: 'left' }}>Tutorials</Typography.Title>
            </div>
            <div>
              <img src="https://via.placeholder.com/600x300?text=Placeholder+3" alt="Placeholder 3" style={{ width: '100%', height: 'auto' }} />
              <Typography.Title level={4} style={{ textAlign: 'left' }}>Community</Typography.Title>
            </div>
          </Carousel>
          <Button onClick={previous} shape="circle" icon={<LeftOutlined />} style={{ marginRight: 8, marginTop: 20 }} />
<Button onClick={next} shape="circle" icon={<RightOutlined />} style={{ marginTop: 20 }} />

        </Col>
      </Row>
    </PageLayout>
  )
}