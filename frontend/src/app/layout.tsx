import type { Metadata } from "next";
import metadata from "@/common/constants/metadata.constants";
import { QueryProvider } from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" async></script>
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return metadata();
}
