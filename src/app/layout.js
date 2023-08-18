import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from "./context/postContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'XiaFitness',
  description: 'fitness app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}
