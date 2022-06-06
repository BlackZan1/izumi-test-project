import { AppRoutes } from 'router'

// components
import { Header } from 'components/Header'

export default () => {
  return (
    <main>
      <Header />

      <AppRoutes />
    </main>
  )
}
