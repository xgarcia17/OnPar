import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnPar",
  description: "A gameified goal tracking app for friends.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-primary w-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (theme === null && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className="min-h-screen w-full flex flex-col">
        <ThemeProvider>
          <NavBar />
          <main className="flex-1 w-full flex flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
