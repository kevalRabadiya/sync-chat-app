import './globals.css';
import ConvexClientProvider from '@/providers/ConvexClientProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
           <ConvexClientProvider>
            {children}
           </ConvexClientProvider>
        </body>
      </html>
  )
}