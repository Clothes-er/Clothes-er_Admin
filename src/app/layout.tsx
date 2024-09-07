"use client";

import GlobalStyles from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import StyledJsxRegistry from "./registry";
import Header from "@/components/Header";
import VerticalTab from "@/components/VerticalTab";
import { useEffect, useState } from "react";
import { getToken } from "@/hooks/getToken";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [email, setEmail] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(!!getToken());

  useEffect(() => {
    if (typeof window !== "undefined" && isLogin) {
      const storedEmail = localStorage.getItem("email");
      setEmail(storedEmail);
    }
  }, [isLogin]);

  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#796EF2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <StyledJsxRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
