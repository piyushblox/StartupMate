'use client'

import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Radio, Row, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
interface TestQuestionWithAnswers extends Model.TestQuestion {
  testAnswersAsQuestion: Model.TestAnswer[]
}
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function TestPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [developerRequirements, setDeveloperRequirements] = useState<
    Model.DeveloperRequirement[]
  >([])
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: string
  }>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchDeveloperRequirements = async () => {
      if (params.startupId) {
        try {
          const requirements =
            await Api.DeveloperRequirement.findManyByStartupProfileId(
              params.startupId,
              {
                includes: [
                  'testQuestions',
                  'testQuestions.testAnswersAsQuestion',
                ],
              },
            )
          setDeveloperRequirements(requirements)
        } catch (error) {
          enqueueSnackbar(
            'Failed to load test questions. Please try again later.',
            { variant: 'error' },
          )
        }
      }
    }

    fetchDeveloperRequirements()
  }, [params.startupId])

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    })
  }

  const handleSubmit = async () => {
    if (!userId) return
    setSubmitting(true)

    try {
      const passed = Object.entries(selectedAnswers).every(
        ([questionId, answerId]) => {
          const question = developerRequirements
            .flatMap(req => req.testQuestions ?? [])
            .find(q => q.id === questionId)
          const answer = question?.testAnswersAsQuestion.find(
            a => a.id === answerId,
          )
          return answer?.isCorrect
        },
      )

      await Api.DeveloperTest.createOneByUserId(userId, {
        passed,
        developerRequirementId: developerRequirements[0].id, // Assuming one requirement per test for simplicity
      })

      enqueueSnackbar(
        passed
          ? 'Congratulations! You have passed the test.'
          : 'Unfortunately, you did not pass the test.',
        {
          variant: passed ? 'success' : 'error',
        },
      )

      if (passed) {
        router.push('/community/developer')
      }
    } catch (error) {
      enqueueSnackbar('Failed to submit your test. Please try again later.', {
        variant: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Developer Verification Test</Title>
      <Text>
        This test is designed to verify your skills as a developer. Please
        answer all questions.
      </Text>
      <Form layout="vertical" onFinish={handleSubmit}>
        {developerRequirements.map(requirement =>
          requirement.testQuestions?.map(
            (question: TestQuestionWithAnswers) => (
              <Form.Item key={question.id} label={question.questionText}>
                <Radio.Group
                  onChange={e =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                >
                  {question.testAnswersAsQuestion.map(answer => (
                    <Radio key={answer.id} value={answer.id}>
                      {answer.answerText}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            ),
          ),
        )}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<CheckCircleOutlined />}
            loading={submitting}
          >
            Submit Test
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
