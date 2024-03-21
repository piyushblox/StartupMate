'use client'

// TestPage.tsx
import { Button, Card, Col, Form, Radio, Row, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
const { Title, Text } = Typography;
const questions = [
  {
    question: "What is React?",
    options: ["JavaScript library", "CSS Framework", "Database"],
    answer: "JavaScript library",
  },
  {
    question: "What is JSX?",
    options: ["JavaScriptXML", "Java Syntax Extension", "JavaScript Syntax"],
    answer: "JavaScriptXML",
  },
  {
    question: "In React, props are?",
    options: ["Mutable", "Immutable", "Undefined"],
    answer: "Immutable",
  },
  {
    question: "What is the virtual DOM in React?",
    options: ["A real DOM copy", "A concept", "An HTML template"],
    answer: "A concept",
  },
];

export default function TestPage() {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleSubmit = (values: any) => {
    let score = 0;
    questions.forEach((question, index) => {
      if (values[`question_${index}`] === question.answer) {
        score += 1;
      }
    });

    if (score >= 2) {
      enqueueSnackbar('You have been qualified as a verified developer', { variant: 'success' });
    } else {
      enqueueSnackbar('Try again!', { variant: 'error' });
    }
  };

  return (
    <Row justify="center">
      <Col xs={54} sm={46} md={42}>
        <Card>
          <Title level={2}>Developer Qualification Test</Title>
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {questions.map((question, index) => (
              <Form.Item key={index} name={`question_${index}`} label={question.question} rules={[{ required: true, message: 'Please select an option!' }]}>
                <Radio.Group>
                  {question.options.map(option => (
                    <Radio key={option} value={option}>{option}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Answers
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

// Note: Add the route for this page in your Next.js routing configuration to make it accessible via '/test'.
// Example (in pages/_app.tsx or similar):
// <Route path="/test" element={<TestPage />} />