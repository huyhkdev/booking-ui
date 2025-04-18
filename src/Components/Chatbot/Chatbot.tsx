import { useState } from 'react'
import { Button, Input, Card, Avatar, Typography, Spin } from 'antd'
import { MessageOutlined, SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../../hooks/chat/useChat'

const { Text } = Typography

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const { sendMessage, isLoading } = useChat()

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: inputValue
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    try {
      const response = await sendMessage(inputValue)
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.'
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  return (
    <>
      <motion.div
        className='fixed bottom-6 right-6 z-50'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          type='primary'
          shape='circle'
          size='large'
          icon={<MessageOutlined />}
          onClick={() => setIsOpen(!isOpen)}
          className='shadow-lg'
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className='fixed bottom-24 right-6 w-96 z-50'
          >
            <Card
              title='Trợ lý ảo'
              extra={
                <Button type='text' onClick={() => setIsOpen(false)}>
                  ×
                </Button>
              }
              className='shadow-xl'
            >
              <div className='h-96 flex flex-col'>
                <div className='flex-1 overflow-y-auto mb-4 space-y-4'>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar icon={<RobotOutlined />} className='bg-blue-500' />
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Text className={message.role === 'user' ? 'text-white' : ''}>
                          {message.content}
                        </Text>
                      </div>
                      {message.role === 'user' && (
                        <Avatar icon={<UserOutlined />} className='bg-gray-500' />
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className='flex justify-start items-center gap-2'>
                      <Avatar icon={<RobotOutlined />} className='bg-blue-500' />
                      <div className='bg-gray-100 p-3 rounded-lg'>
                        <Spin size='small' />
                      </div>
                    </div>
                  )}
                </div>
                <div className='flex gap-2'>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={handleSendMessage}
                    placeholder='Nhập tin nhắn...'
                  />
                  <Button
                    type='primary'
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Chatbot 