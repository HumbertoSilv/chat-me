import '@/app/ui/globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from './lib/context/authContext';
import { ChatsProvider } from './lib/context/chatContext';
import { UserProvider } from './lib/context/userContext';
import { WebSocketProvider } from './lib/context/webSocketContext';
import ProtectedRoute from './ui/ProtectedRoute';
import { Provider } from './ui/provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chat Me",
  description: "A real-time chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased text-gray-400`}
      >
        <Provider>
          <AuthProvider>
            <UserProvider>
              <ChatsProvider>
                <WebSocketProvider>
                  <ProtectedRoute>
                    {children}
                  </ProtectedRoute>
                </WebSocketProvider>
              </ChatsProvider>
            </UserProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}