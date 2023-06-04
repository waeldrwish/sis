import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to the university's website. This website was built to learn about NextJS capabilities. Click the button below to go to the login page.</h1>
        <Link href=" /loginpage" className="m-9">Click Me</Link>
      </div>
    </main>
  )
}
