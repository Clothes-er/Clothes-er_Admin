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
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [name, setName] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(!!getToken());

  useEffect(() => {
    if (typeof window !== "undefined" && isLogin) {
      const storedName = localStorage.getItem("name");
      setName(storedName);
    }
  }, [isLogin]);

  const pathname = usePathname();
  const isHeader = pathname === "/";

  return (
    <html>
      <head>
        <title>Clothes:er 관리자용</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#796EF2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledJsxRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AuthProvider>
              {isHeader ? (
                <Column>
                  <Header />
                  <Row>
                    <VerticalTab />
                    {children}
                  </Row>
                </Column>
              ) : (
                children
              )}
            </AuthProvider>
          </ThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

const Column = styled.div`
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
`;
