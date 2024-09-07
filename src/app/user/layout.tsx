"use client";

import Header from "@/components/Header";
import VerticalTab from "@/components/VerticalTab";
import styled from "styled-components";

const layout = (props: any) => {
  return (
    <>
      <Column>
        <Header />
        <Row>
          <VerticalTab />
          {props.children}
        </Row>
      </Column>
    </>
  );
};

export default layout;

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
