import AuthAxios from "@/api/authAxios";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Header = () => {
  const router = useRouter();
  const { isLogin, setIsLogin } = useAuth();

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("name");
      const storedEmail = localStorage.getItem("email");
      const token = localStorage.getItem("refreshToken");

      setName(storedName);
      setEmail(storedEmail);
      setRefreshToken(token);
    }
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLog = () => {
    if (isLogin) {
      if (refreshToken) {
        AuthAxios.post("/api/v1/users/logout", {
          refreshToken,
        })
          .then((response) => {
            console.log("로그아웃 성공", response);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            router.push("/");
          })
          .catch((error) => {
            console.log("로그아웃 실패", error);
          });
      }
      setIsLogin(false);
    }
    router.push("/");
  };

  return (
    <Wrapper>
      <Image src="/assets/images/logo.svg" width={172} height={33} alt="logo" />
      <Right>
        <Info>
          {isClient
            ? isLogin
              ? `관리자   ${name} 님 (${email})`
              : "접근 권한을 얻기 위해서는 로그인이 필요해요."
            : "Loading..."}
        </Info>
        {isClient && (
          <Button $isLogin={isLogin} onClick={handleLog}>
            {isLogin ? "로그아웃" : "로그인"}
          </Button>
        )}
      </Right>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  padding: 20px 50px;
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

const Info = styled.div`
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Button = styled.button<{ $isLogin: boolean }>`
  padding: 10px 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ $isLogin, theme }) =>
    $isLogin ? theme.colors.gray400 : theme.colors.purple200};
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_medium};
`;
