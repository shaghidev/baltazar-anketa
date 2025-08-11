import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Anketa osobnosti',
  description: 'Demo anketa i diploma',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr">
      <body className=" relative min-h-screen flex items-center justify-center px-6 font-baltazar">
        {/* Pozadina */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: "url('/images/background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            zIndex: 0,
          }}
        />
        {/* Overlay */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(72, 175, 50, 0.7)', // tamno zelena sa 60% prozirnosti
            zIndex: 1,
          }}
        />
        {/* Glavni sadržaj */}
        <div
  style={{
    position: 'relative',
    zIndex: 10,
    width: '100%',
    maxWidth: '960px',
    minHeight: '100vh',
    borderRadius: '1rem',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {children}
</div>

      
      </body>
    </html>
  )
}
