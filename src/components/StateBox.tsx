import React from "react";
import styled from "styled-components";

interface StateBoxProps {
  check: boolean;
  text: string;
}

const StateBox = (props: StateBoxProps) => {
  const { check, text } = props;

  return <Box $check={check}>{text}</Box>;
};

export default StateBox;

const Box = styled.button<{ $check: boolean }>`
  width: auto;
  height: 35px;
  padding: 6px 15px;
  border-radius: 20px;
  background: ${({ theme, $check }) =>
    $check ? theme.colors.purple100 : theme.colors.gray100};
  color: ${({ theme, $check }) =>
    $check ? theme.colors.purple300 : theme.colors.b100};
  ${(props) => props.theme.fonts.b3_bold};
  display: flex;
  align-items: center;
  justify-content: center;
`;
