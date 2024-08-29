import AuthAxios from "@/api/authAxios";
import { theme } from "@/styles/theme";
import React, { useState } from "react";
import styled from "styled-components";

interface TableProps {
  tableType: "report" | "user";
  list: any[];
}

const Table: React.FC<TableProps> = ({ tableType, list }) => {
  const [more, setMore] = useState(false);
  const [detailData, setDetailData] = useState<any>(null);

  const handleMoreModal = (id: number) => async () => {
    if (tableType === "report") {
      try {
        const response = await AuthAxios.get(`/api/v1/admin/reports/${id}`);
        setDetailData(response.data.result);
        setMore(true);
      } catch (error) {
        console.error("상세 정보 조회 실패", error);
      }
    } else {
      return;
    }
  };

  const columns =
    tableType === "report"
      ? [
          "번호",
          "신고대상 ID",
          "신고사유",
          "내용",
          "옷장 점수",
          "처리 상태",
          "상태 변경",
        ]
      : [
          "이름",
          "닉네임",
          "이메일",
          "전화번호",
          "옷장 점수",
          "매너 키워드 횟수",
          "거래 건수",
          "이용제한",
        ];

  return (
    <>
      <TableWrapper>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <Th key={index}>{column}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <Tr key={index} onClick={handleMoreModal(item.id)}>
              {tableType === "report" ? (
                <>
                  <Td>{index + 1}</Td>
                  <Td>{item.reporteeNickname}</Td>
                  <Td>{item.reason}</Td>
                  <Td>{item.content}</Td>
                  <Td>{item.closetScore}</Td>
                  <Td>
                    {item.state === "PENDING" ? "접수 완료" : "처리 완료"}
                  </Td>
                  <Td>
                    {item.action === null ? (
                      <Button>조치 선택</Button>
                    ) : item.action === "RESTRICTED" ? (
                      "이용 제한"
                    ) : item.action === "DOCKED" ? (
                      "처벌"
                    ) : (
                      "무시"
                    )}
                  </Td>
                </>
              ) : (
                <>
                  <Td>{item.name}</Td>
                  <Td>{item.nickname}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.phoneNumber}</Td>
                  <Td>{item.closetScore}</Td>
                  <Td>{item.keywordCount}</Td>
                  <Td>{item.rentalCount}</Td>
                  <Td>{item.isRestricted ? "제한됨" : "정상"}</Td>
                </>
              )}
            </Tr>
          ))}
        </tbody>
      </TableWrapper>
      {more && (
        <Modal>
          <Title>신고 내역 조회</Title>
          <ModalContent>
            <DetailRow>
              <DetailLabel>신고 글 번호</DetailLabel>{" "}
              <DetailValue>{detailData.id}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>신고대상 ID</DetailLabel>{" "}
              <DetailValue>{detailData.reporteeNickname}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>신고사유</DetailLabel>{" "}
              <DetailValue>{detailData.reason}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>내용</DetailLabel>{" "}
              <DetailValue>{detailData.content}</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>옷장 점수</DetailLabel>{" "}
              <DetailValue>{detailData.closetScore}점</DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>처리 상태</DetailLabel>{" "}
              <DetailValue>
                {detailData.state === "PENDING" ? "접수 완료" : "처리 완료"}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>상태 변경</DetailLabel>{" "}
              <DetailValue>
                {detailData.action === null
                  ? "조치 선택"
                  : detailData.action === "RESTRICTED"
                  ? "이용 제한"
                  : detailData.action === "DOCKED"
                  ? "처벌"
                  : "무시"}
              </DetailValue>
            </DetailRow>
          </ModalContent>
          <CloseButton onClick={() => setMore(false)}>닫기</CloseButton>
        </Modal>
      )}
    </>
  );
};

export default Table;

const TableWrapper = styled.table`
  width: 100%;
  height: 500px;
  border-collapse: collapse;
  flex-shrink: 0;
  border-radius: 10px;
  padding: 0 25px;
  border: 1px solid ${theme.colors.purple500};
  background: ${theme.colors.white};
  overflow-y: scroll;
`;

const Th = styled.th`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple100};
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.purple500};
  padding: 15px 25px;
  white-space: nowrap;
`;

const Tr = styled.tr`
  &:hover {
    background: ${theme.colors.purple50};
  }
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
  text-align: center;
  white-space: nowrap;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Button = styled.button`
  width: 81px;
  height: 31px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #d9d9d9;
  background: #fcfcfc;
  color: ${theme.colors.b100};
  ${(props) => props.theme.fonts.b2_regular};
`;

const Modal = styled.div`
  width: 496px;
  height: 549px;
  padding: 58px 55px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 4px 4px 30px 3px rgba(185, 185, 185, 0.25);
  position: fixed;
  top: 300px;
  left: 500px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 24px;
  margin-bottom: 38px;
  color: ${theme.colors.black};
`;

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  grid-template-columns: 1fr 3fr;
`;

const DetailLabel = styled.div`
  width: 100px;
  font-weight: bold;
  margin-right: 10px;
  color: #231e5c;
`;

const DetailValue = styled.div`
  color: ${theme.colors.b100};
`;

const CloseButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: ${theme.colors.purple500};
  color: ${theme.colors.white};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.purple400};
  }
`;
