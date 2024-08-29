import { getToken } from "@/hooks/getToken";
import { theme } from "@/styles/theme";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Header = () => {
  const isLogin = !!getToken();

  return (
    <Wrapper>
      <Image src="/assets/images/logo.svg" width={172} height={33} alt="logo" />
      <Right>
        <p>
          {isLogin
            ? "관리자 {유진주} 님"
            : "접근 권한을 얻기 위해서는 로그인이 필요해요."}
        </p>
        <Button $isLogin={isLogin}>로그인</Button>
      </Right>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 90px;
  padding: 28px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.h2_medium};
  background-color: ${theme.colors.purple500};
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 35px;
`;
const Button = styled.button<{ $isLogin: boolean }>`
  padding: 13px 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ $isLogin, theme }) =>
    $isLogin ? theme.colors.gray500 : theme.colors.purple200};
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_semiBold};
`;
