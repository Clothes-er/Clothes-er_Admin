import { TABS } from "@/constants/tab";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

const VerticalTab = () => {
  const router = useRouter();
  return (
    <Container>
      관리페이지
      <TabList>
        {TABS.map((item) => (
          <Tab
            key={item.id}
            onClick={() => {
              router.push(`/${item.pathname}`);
            }}
          >
            {item.text}
          </Tab>
        ))}
      </TabList>
    </Container>
  );
};

export default VerticalTab;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 41px;
  width: 330px;
  height: 100vh;
  padding: 51px 52px;
  border-right: 1px solid #c6c6c6;
  background: #fafaff;
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.h1_semiBold}
`;

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const Tab = styled.button`
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.h2_semiBold};

  &:hover {
    color: ${theme.colors.purple500};
  }
`;
