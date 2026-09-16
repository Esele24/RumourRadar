import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rumor Radar — Nigeria-First Evidence AI Fact-Checker',
  description: 'Evidence-first AI disinformation verification system for viral Nigerian WhatsApp messages, breaking news, and social forwards.',
  keywords: ['fact check nigeria', 'fake news detection', 'nacos hackathon', 'cbn rumors', 'opay', 'jamb cutoff', 'ncdc cholera alert'],
  openGraph: {
    title: 'Rumor Radar — Evidence-First AI Fact-Checker',
    description: 'Verify viral WhatsApp forwards, breaking headlines, and social media claims in Nigeria in seconds.',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
