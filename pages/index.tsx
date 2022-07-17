import type { NextPage } from 'next'
import { LoginForm } from '../client/containers/login-form'

const Home: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Home
