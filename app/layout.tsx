import Login from '@/components/Login';
import SideBar from '@/components/SideBar';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '../components/SessionProvider';
import '../styles/globals.css';

const siteName = 'ChatGPT Messenger';
const description = 'ChatGPT Messenger';
const url = 'https://ドメイン';
const ogImageUrl = 'https://OG画像のURL';

export const metadata = {
  title: {
    default: siteName,
    /** `next-seo`の`titleTemplate`に相当する機能 */
    template: `%s - ${siteName}`,
  },
  description,
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    // ドキュメントを参照して適宜増やすこと
  },
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    images: [
      {
        url: ogImageUrl,
        width: 1800,
        height: 1600,
        alt: '画像の説明文',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: '@サイト用アカウントのTwitterID',
    creator: '@作者のTwitterID',
    images: [ogImageUrl],
  },
  verification: {
    google: 'サーチコンソールのやつ',
  },
  alternates: {
    canonical: url,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ja">
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs h-screen overflow-y- md:min-w-[20rem]">
                <SideBar />
              </div>
              {/* ClientProvider - Notification */}

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
