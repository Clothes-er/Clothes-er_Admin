import { ChatList } from "@/app/chat/page";
import { theme } from "@/styles/theme";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";

const ChatPreview: React.FC<ChatList> = ({
  id,
  userSid,
  nickname,
  recentMessage,
  title,
  profileImgUrl,
  rentalImgUrl,
  rentalState,
  recentMessageTime,
  isDeleted,
  isRestricted,
  isSuspended,
}) => {
  const router = useRouter();

  const handleChatDetail = () => {
    router.push(`/chat/${id}`);
  };

  const handleUserClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLImageElement>,
    route: string
  ) => {
    e.stopPropagation(); // 부모 요소로의 클릭 전파 방지
    if (!isRestricted) {
      router.push(route);
    }
  };

  return (
    <Container onClick={handleChatDetail}>
      <Left>
        <ProfileImage
          src={profileImgUrl || `/assets/images/basic_profile.svg`}
          width={56}
          height={56}
          alt="profile"
          style={{ borderRadius: "100px", background: "white" }}
          onClick={(e) => handleUserClick(e, `/user/${userSid}`)}
        />
        <ProductImage
          src={rentalImgUrl || "/assets/images/noImage.svg"}
          width={56}
          height={56}
          alt="product"
          style={{ borderRadius: "190px", background: "white" }}
        />
      </Left>
      <Right>
        <Top>
          <Name>
            <NickName onClick={(e) => handleUserClick(e, `/user/${userSid}`)}>
              {nickname} {isRestricted || (isSuspended && "(신고된 유저)")}
            </NickName>
            {rentalState === "RENTED" && (
              <StateBox check={true}>대여중</StateBox>
            )}
            {rentalState === "RETURNED" && (
              <StateBox check={false}>대여완료</StateBox>
            )}
          </Name>
        </Top>
        <Preview>{recentMessage}</Preview>
        <Product>{`${
          isDeleted ? "삭제된 글    |   " : title + "   |   "
        }${recentMessageTime}`}</Product>
      </Right>
    </Container>
  );
};

export default ChatPreview;

const Container = styled.div`
  width: 100%;
  padding: 24px 8px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  z-index: 0;
`;

const Left = styled.div`
  width: 100px;
  height: 100%;
  position: relative;
`;

const ProfileImage = styled(Image)`
  position: absolute;
  top: 10px;
  left: 0;
  z-index: 100;
  box-shadow: 0px 4px 8px 0px rgba(161, 161, 161, 0.25);
  cursor: pointer;
`;

const ProductImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 20px;
  box-shadow: 0px 4px 8px 0px rgba(161, 161, 161, 0.25);
`;

const Right = styled.div`
  width: calc(100% - 100px);
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Top = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
`;

const NickName = styled.div`
  ${(props) => props.theme.fonts.b2_medium};
  cursor: pointer;
`;

const Preview = styled.div`
  ${(props) => props.theme.fonts.b3_regular};
  color: ${theme.colors.b100};
  /* overflow: hidden; */
  text-overflow: ellipsis;
`;

const Product = styled.div`
  ${(props) => props.theme.fonts.c1_regular};
  color: ${theme.colors.gray800};
  white-space: pre;
`;

const StateBox = styled.button<{ check: boolean }>`
  width: auto;
  height: 25px;
  padding: 6px 10px;
  border-radius: 20px;
  background: ${(props) =>
    props.check ? props.theme.colors.purple100 : props.theme.colors.gray100};
  color: ${(props) =>
    props.check ? props.theme.colors.purple300 : props.theme.colors.b100};
  ${(props) => props.theme.fonts.b3_bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;
