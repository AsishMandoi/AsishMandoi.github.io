import { Work_Sans, Fira_Code, EB_Garamond } from 'next/font/google'

// Configure optimized fonts
const nextSans = Work_Sans({
  subsets: ['latin'],
  variable: '--next-sans',
})

const nextMono = Fira_Code({
  subsets: ['latin'],
  variable: '--next-mono',
})

const nextSerif = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--next-serif',
})

export { nextSans, nextMono, nextSerif };
