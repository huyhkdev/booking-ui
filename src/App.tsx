import './index.pcss'
import { ConfigProvider } from 'antd'
import Chatbot from './Components/Chatbot/Chatbot'
import RouterElement from './router/RouterElement'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff'
        }
      }}
    >
      <RouterElement />
      <Chatbot />
    </ConfigProvider>
  )
}

export default App
