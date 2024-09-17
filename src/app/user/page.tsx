"use client";

import AuthAxios from "@/api/authAxios";
import Table from "@/components/Table";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface UserList {
  name: string;
  nickname: string;
  email: string;
  phoneNumber: string;
  closetScore: number;
  keywordCount: number;
  rentalCount: number;
  isRestricted: boolean;
}

export default function UsrePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reportList, setReportList] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getUserList = useCallback(() => {
    AuthAxios.get("/api/v1/admin/users", {
      params: {
        search: searchTerm,
      },
    })
      .then((response) => {
        console.log("회원 전체 목록 조회 성공", response.data);
        setReportList(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("회원 전체 조회 실패", error);
        setLoading(false);
      });
  }, [searchTerm]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <>
      <Layout>
        {loading ? (
          <Loading>페이지를 불러오고 있어요...</Loading>
        ) : (
          <>
            <Title>
              유저 정보<Span>유저 정보를 조회하고, 관리해요.</Span>
            </Title>
            <InputWrapper>
              <Image
                src="/assets/icons/ic_search.svg"
                width={21}
                height={20}
                alt="search"
              />
              <Input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="유저 정보 검색..."
              />
            </InputWrapper>
            <Table tableType="user" list={reportList} />
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  padding: 78px 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: ${theme.colors.purple500};
  ${(props) => props.theme.fonts.h1_semiBold};
  font-size: 36px;
  margin-bottom: 20px;
`;

const Span = styled.span`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b1_medium};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  width: 320px;
  height: 39px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background: #fbfbfb;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: none;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray500};
  font-size: 24px;
  ${(props) => props.theme.fonts.b2_regular};
`;
