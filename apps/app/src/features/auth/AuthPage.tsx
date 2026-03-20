import { Button } from '@logdeck/shared'
import { FadeInItem, FadeInStagger } from '@logdeck/shared'
import { Logo } from '@logdeck/shared'
import { Layout } from 'antd'

import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuthActions } from './hooks/useAuth'
import { toast } from 'react-next-toast'

const AuthPage = () => {
  const navigate = useNavigate()
  const { login } = useAuthActions()

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await login(tokenResponse.access_token)
        toast.success('Logged in successfully')
        navigate('/')
      } catch (err) {
        toast.error('Failed to sign in with Google')
      }
    },
    onError: () => {
      toast.error('Google login failed')
    }
  })

  return (
    <Layout className="flex flex-col items-center justify-center gap-8 px-4 h-screen bg-(--bg-base)  text-(--text-secondary)">
      <FadeInStagger className="flex flex-col items-center gap-8">
        <Logo size="large" withTitle />

        <FadeInItem>
          <p className='text-center tracking-tight text-xl md:text-2xl text-text-primary max-w-md'>
            Real-time error monitoring for <br /><span className="text-(--brand-primary) font-bold">Node.js developers</span>.
          </p>
        </FadeInItem>

        <FadeInItem>
          <Button size="lg" className="px-12" onClick={() => handleLogin()}>
            Sign in with Google
          </Button>
        </FadeInItem>

        
      </FadeInStagger>
    </Layout>
  )
}

export default AuthPage