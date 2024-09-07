"use client";

import AuthAxios from "@/api/authAxios";
import Table from "@/components/Table";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

export interface ReportList {
  id: number;
  userSid: string;
  reporteeNickname: string;
  reporteeEmail?: string;
  reporterNickname?: string;
  reporterEmail?: string;
  reason: string;
  content: string;
  closetScore: number;
  isRented: boolean;
  state: string;
  action: string;
  createdAt: string;
}

export default function ReportPage() {
  const [reportList, setReportList] = useState<ReportList[]>([]);

  const getReportList = () => {
    AuthAxios.get("/api/v1/admin/reports")
      .then((response) => {
        console.log("신고 목록 조회 성공", response.data);
        setReportList(response.data.result);
      })
      .catch((error) => {
        console.log("신고 목록 조회 실패", error);
      });
  };

  const updateReportList = (updatedReport: ReportList) => {
    setReportList((prevReportList) =>
      prevReportList.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      )
    );
  };

  useEffect(() => {
    getReportList();
  }, []);

  return (
    <>
      <Layout>
        <Title>
          신고 관리<Span>접수된 신고 내역을 확인하고, 처리해요.</Span>
        </Title>
        <Table
          tableType="report"
          list={reportList}
          updateReportList={updateReportList}
        />
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
  margin-bottom: 85px;
`;

const Span = styled.span`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b1_medium};
`;
