import { Metadata } from "next";

const metadata = (): Metadata => ({
  title: "Snake Game",
  applicationName: "Snake Game",
  description: "Snake Game built with Next.js",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "JavaScript"],
  authors: [{ name: "Atomatiz", url: "https://toanphan.me" }],
  creator: "Atomatiz",
  publisher: "Atomatiz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
});

export default metadata;
