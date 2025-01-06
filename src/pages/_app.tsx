import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Urbanist } from "next/font/google";


const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={urbanist.className}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </main>
  )
}
