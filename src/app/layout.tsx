import type { Metadata } from 'next'
import "./style.scss"
import dynamic from 'next/dynamic'
import TanstackProvider from '@/utils/TanstackProvider'

export const metadata: Metadata = {
  title: 'Inspire My Space',
  description: 'IMS port to NextJS',
}

const NavBar = dynamic(() => import("../components/NavBar"),{
  loading: () => null,
  ssr: false
})

// anything defined here is displayed on all pages
//  navbar / footer etc.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <main>
            <NavBar />
            {children}
          </main>
        </TanstackProvider>
      </body>
    </html>
  )
}
