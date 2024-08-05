import { TooltipProvider } from '@radix-ui/react-tooltip';
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
            <TooltipProvider>
            {children}
            </TooltipProvider>
           </ConvexClientProvider>
        </body>
      </html>
  )
}