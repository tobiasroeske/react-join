import { useEffect, useState } from 'react'

export default function useGreetingMessage() {
  const [greetingMessage, setGreetingMessage] = useState<string>('Good Day,')

  useEffect(() => {
    getGreetingMessage()
  }, [])

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours()
    if (currentHour >= 0 && currentHour <= 11) {
      setGreetingMessage('Good Morning,')
    } else if (currentHour > 11 && currentHour < 14) {
      setGreetingMessage('Good Day,')
    } else if (currentHour >= 14 && currentHour < 18) {
      setGreetingMessage('Good Afternoon,')
    } else {
      setGreetingMessage('Good Evening,')
    }
  }

  return greetingMessage
}
