import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import { Provider } from "react-redux";
import store from "@/redux/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Mi tienda",
  description: "Mi tienda online challenge",
};

export default function RootLayout({ children }) {
  return (
    // <Provider store={store}> 
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/imagelogo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {children}
      </body>
    </html>
    // </Provider>
  );
}
