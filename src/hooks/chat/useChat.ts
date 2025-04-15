import { useMutation } from '@tanstack/react-query'
import api from '../../api/api'
import { baseURL } from '../../api/constant'
import { useAccessToken } from '../auth/useUserInfo'

interface ChatResponse {
  httpStatusCode: number
  data: {
    response: string
  }
}

export const useChat = () => {
  const accessToken = useAccessToken()

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      const response = await api.post<ChatResponse>(
        `${baseURL}/chatbot/chat`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      return response.data.data.response
    }
  })

  return {
    sendMessage,
    isLoading: isPending
  }
} 