import { RouterObject } from '@web/core/router'
import { useDesignSystem } from '@web/designSystem'
import { Model } from '@web/domain'
import { useAuthentication } from '@web/modules/authentication'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Leftbar } from './components/Leftbar'
import { Logo } from './components/Logo'
import { SubNavigation } from './components/SubNavigation'
import { Topbar } from './components/Topbar/index.layout'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const authentication = useAuthentication()
  const user = authentication?.user as Model.User

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const goToUserPage = (url: string) => {
    router.push(url.replace(':id', user?.id))
  }

  const itemsLeftbar = []

  const itemsUser = []

  const itemsTopbar = [
    {
      key: '/signup',
      label: 'Sign Up',
      onClick: () => goTo('/signup'),
    },

    {
      key: '/startup/profile-setup',
      label: 'Profile Setup-StartUp',
      onClick: () => goTo('/startup/profile-setup'),
    },

    {
      key: '/startup/documentation',
      label: 'Documentation',
      onClick: () => goTo('/startup/documentation'),
    },

    {
      key: '/startup/developer-alliance',
      label: 'Developer Alliance',
      onClick: () => goTo('/startup/developer-alliance'),
    },

    {
      key: '/community',
      label: 'Community',
      onClick: () => goTo('/community'),
    },

    {
      key: '/tutorials',
      label: 'Tutorials',
      onClick: () => goTo('/tutorials'),
    },

    {
      key: '/tutorials/verified',
      label: 'Verified Tutorials',
      onClick: () => goTo('/tutorials/verified'),
    },

    {
      key: '/leaderboard',
      label: 'Leaderboard',
      onClick: () => goTo('/leaderboard'),
    },

    {
      key: '/startups',
      label: 'Startups',
      onClick: () => goTo('/startups'),
    },

    {
      key: '/community/individual',
      label: 'community-individual',
      onClick: () => goTo('/community/individual'),
    },

    {
      key: '/community/developer',
      label: 'community-developer',
      onClick: () => goTo('/community/developer'),
    },

    {
      key: '/individual/profile-setup',
      label: 'Profile Setup-Individuals',
      onClick: () => goTo('/individual/profile-setup'),
    },
  ]

  const itemsSubNavigation = [
    {
      key: '/signup',
      label: 'Sign Up',
    },

    {
      key: '/startup/profile-setup',
      label: 'Profile Setup-StartUp',
    },

    {
      key: '/startup/documentation',
      label: 'Documentation',
    },

    {
      key: '/startup/developer-alliance',
      label: 'Developer Alliance',
    },

    {
      key: '/community',
      label: 'Community',
    },

    {
      key: '/tutorials',
      label: 'Tutorials',
    },

    {
      key: '/tutorials/verified',
      label: 'Verified Tutorials',
    },

    {
      key: '/leaderboard',
      label: 'Leaderboard',
    },

    {
      key: '/startups',
      label: 'Startups',
    },

    {
      key: '/test/:startupId',
      label: 'Test',
    },

    {
      key: '/community/individual',
      label: 'community-individual',
    },

    {
      key: '/community/developer',
      label: 'community-developer',
    },

    {
      key: '/individual/profile-setup',
      label: 'Profile Setup-Individuals',
    },
  ]

  const itemsMobile = [
    {
      key: 'profile',
      label: 'Profile',
      onClick: () => goTo(RouterObject.route.PROFILE),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      onClick: () => goTo(RouterObject.route.NOTIFICATIONS),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                items={itemsLeftbar}
                itemsUser={itemsUser}
                logo={<Logo className="m-2" />}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              items={itemsTopbar}
              itemsMobile={itemsMobile}
              logo={!isLeftbar && <Logo width={40} height={40} />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubNavigation items={itemsSubNavigation} />

              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
