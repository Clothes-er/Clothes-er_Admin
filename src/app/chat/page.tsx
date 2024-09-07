"use client";

import AuthAxios from "@/api/authAxios";
import ChatPreview from "@/components/ChatPreview";
import Topbar from "@/components/Topbar";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

export interface ChatList {
  id: number;
  userSid: string;
  nickname: string;
  profileImgUrl: string;
  recentMessage: string;
  recentMessageTime: string;
  rentalImgUrl?: string;
  rentalState?: string;
  title?: string;
  isDeleted?: boolean;
  isRestricted?: boolean;
  isSuspended?: boolean;
}

const Chat = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userSid = searchParams.get("userSid");
  const [chatList, setChatList] = useState<ChatList[]>([]);

  useEffect(() => {
    AuthAxios.get(`/api/v1/admin/chats/${userSid}/rented-rooms`)
      .then((response) => {
        const data = response.data.result;
        setChatList(data);
        console.log(data);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("chatList", chatList);
  }, [chatList]);

  return (
    <MaxWidth>
      <Layout>
        <Image
          src="/assets/images/logo_black.svg"
          width={101}
          height={18}
          alt="logo"
          onClick={() => router.push("/home")}
          style={{ cursor: "pointer" }}
        />
        <Topbar text="채팅" icon={true} align="center" />
        {chatList.length > 0 ? (
          <ChatListContianer>
            {chatList.map((data, index) => (
              <ChatContainer key={data.id}>
                <ChatPreview
                  key={data.id}
                  id={data.id}
                  userSid={data.userSid}
                  nickname={data.nickname}
                  recentMessage={data.recentMessage}
                  title={data.title}
                  profileImgUrl={data.profileImgUrl}
                  rentalImgUrl={data.rentalImgUrl}
                  rentalState={data.rentalState}
                  recentMessageTime={data.recentMessageTime}
                  isDeleted={data.isDeleted}
                  isRestricted={data.isRestricted}
                  isSuspended={data.isSuspended}
                />
                {index < chatList.length - 1 && <Divider />}
              </ChatContainer>
            ))}
          </ChatListContianer>
        ) : (
          <NoList>거래 중인 채팅 목록이 없습니다.</NoList>
        )}
      </Layout>
    </MaxWidth>
  );
};

export default Chat;

const MaxWidth = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  max-width: 480px;
  overflow-x: hidden;
  padding: 42px 20px;
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const ChatListContianer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.colors.gray300};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.div`
  height: 0.5px;
  background-color: rgba(219, 219, 219, 0.7);
`;

const NoList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  color: ${theme.colors.gray900};
`;
