import type { Metadata } from "next";
import metadata from "@/common/constants/metadata.constants";
import { QueryProvider } from "@/providers/QueryProvider";
import "../styles/global.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return metadata();
}
