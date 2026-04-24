import "./globals.css";
import { Providers } from "./components/Providers";
import { ClientLayout } from "./components/ClientLayout";

export const metadata = {
  title: "Global Premium - Your One-Stop Shop",
  description: "Shop the best products at Global Premium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}


