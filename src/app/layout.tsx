"use client";

import GlobalStyles from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import styled, { ThemeProvider } from "styled-components";
import StyledJsxRegistry from "./registry";
import Header from "@/components/Header";
import VerticalTab from "@/components/VerticalTab";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <Column>
              <Header />
              <Row>
                <VerticalTab />
                {children}
              </Row>
            </Column>
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
  display: flex;
`;
