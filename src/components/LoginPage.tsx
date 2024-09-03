import Axios from "@/api/axios";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

export default function LoginPage() {
  const router = useRouter();
  const { setIsLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [save, setSave] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    setSave(!save);
  };

  const handleLogin = () => {
    Axios.post("/api/v1/admin/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        console.log("로그인 성공", response.data);
        const user = response.data.result;
        localStorage.setItem("name", user.name);
        localStorage.setItem("accessToken", user.token.accessToken);
        localStorage.setItem("refreshToken", user.token.refreshToken);
        setIsLogin(true);
        router.push("/report");
      })
      .catch((error) => {
        console.log("로그인 실패", error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("이메일과 비밀번호를 확인해주세요.");
        }
      });
  };

  return (
    <>
      <Layout>
        <LoginBox>
          <Title>LOGIN</Title>
          <InputBox>
            <Input
              size="small"
              value={email}
              onChange={(value: string) => setEmail(value)}
              placeholder="이메일"
            />
            <Input
              size="small"
              inputType="password"
              value={password}
              onChange={(value: string) => setPassword(value)}
              placeholder="비밀번호"
            />
          </InputBox>
          <Save $save={save} onClick={handleSave}>
            {save ? (
              <Image
                src="/assets/icons/ic_save.svg"
                width={23}
                height={23}
                alt="check"
              />
            ) : (
              <Image
                src="/assets/icons/ic_notsave.svg"
                width={23}
                height={23}
                alt="check"
              />
            )}
            로그인 정보 저장하기
          </Save>
          <Button onClick={handleLogin}>로그인</Button>
        </LoginBox>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LoginBox = styled.div`
  width: 496px;
  height: 572px;
  padding: 102px 98px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 4px 4px 30px 3px rgba(185, 185, 185, 0.25);
`;

const Title = styled.div`
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.h1_semiBold};
  margin-bottom: 48px;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Save = styled.button<{ $save: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 7px;
  justify-content: flex-start;
  align-items: center;
  color: ${({ $save, theme }) =>
    $save ? "rgba(90, 66, 238, 0.7)" : theme.colors.gray900};
  ${(props) => props.theme.fonts.b3_medium};
  margin-bottom: 32px;
`;

const Button = styled.button`
  width: 100%;
  padding: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  color: ${theme.colors.white};
  ${(props) => props.theme.fonts.b2_semiBold};

  background-color: ${theme.colors.purple500};

  &:disabled {
    background-color: ${theme.colors.gray500};
  }
  &:active {
    background: ${theme.colors.purple700};
  }
  &:hover {
    background: ${theme.colors.purple700};
  }
`;
