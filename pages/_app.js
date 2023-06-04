import '@/styles/globals.css'
import MainLayout from '@/components/mainLayout'

export default function App({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
