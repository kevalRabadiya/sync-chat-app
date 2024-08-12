
import { TooltipProvider } from '@radix-ui/react-tooltip';
import './globals.css';
import ConvexClientProvider from '@/providers/ConvexClientProvider';
import { ThemeProvider } from '@/components/ui/theme/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body>
          <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
           <ConvexClientProvider>
            <TooltipProvider>
            {children}
            </TooltipProvider>
            <Toaster/>
           </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
  )
}