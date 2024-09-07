"use client";
import AuthAxios from "@/api/authAxios";
import ChatMsg from "@/components/ChatMsg";
import Post from "@/components/Post";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";

interface Message {
  nickname: string;
  message: string;
  createdAt: string;
}

interface ChatMsg {
  id: number;
  buyerNickname: string;
  lenderNickname: string;
  opponentNickname: string;
  opponentSid: string;
  rentalId: number;
  rentalImgUrl: string;
  title: string;
  minPrice: number;
  rentalState: string;
  messages: Message[];
  isChecked: boolean;
  isDeleted: boolean;
  isReviewed: boolean;
  isRestricted: boolean;
  isSuspended: boolean;
}

const ChatDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();
  const type = searchParams.get("type");

  /* get 메소드에서 받아오는 데이터 상태 저장 */
  const [chatMsg, setChatMsg] = useState<ChatMsg>();

  /* 메뉴 상태 */
  const [menu, setMenu] = useState<boolean>(false);

  /* 채팅 메시지 조회 */
  useEffect(() => {
    getChatMessages();
  }, []);

  const getChatMessages = () => {
    AuthAxios.get(`/api/v1/chats/rental-rooms/${id}`)
      .then((response) => {
        const data = response.data.result;
        setChatMsg(data);
        console.log("ㅋㅋㅋㅋ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <Top>
          <Image
            src="/assets/icons/ic_arrow.svg"
            width={24}
            height={24}
            alt="back"
            onClick={() => router.back()}
            style={{ cursor: "pointer" }}
          />
          <Nickname
            onClick={() => {
              router.push(`/user/${chatMsg?.opponentSid}`);
            }}
          >
            {chatMsg?.opponentNickname}
            {chatMsg?.isRestricted ||
              (chatMsg?.isSuspended && " (신고된 유저)")}
          </Nickname>
          <div></div>
        </Top>
        {chatMsg && (
          <Post
            postType="normal"
            title={chatMsg.title}
            minPrice={chatMsg.minPrice}
            imgUrl={chatMsg.rentalImgUrl}
            id={chatMsg.rentalId}
            isDeleted={chatMsg.isDeleted}
            showReviewed={Boolean(chatMsg.rentalState)}
            size="small"
          />
        )}
        {chatMsg && (
          <ChatList>
            {chatMsg.messages.map((data, index) => (
              <ChatMsg
                key={index}
                nickname={data.nickname}
                me={data.nickname !== chatMsg?.opponentNickname}
                msg={data.message}
              />
            ))}
          </ChatList>
        )}
      </Layout>
    </MaxWidth>
  );
};

export default ChatDetail;

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
  position: relative;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  ${(props) => props.theme.fonts.h2_bold};
`;

const Nickname = styled.div`
  cursor: pointer;
`;

const ChatList = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
`;
