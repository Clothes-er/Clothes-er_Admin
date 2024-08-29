import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

type inputType = "text" | "password" | "write" | "textarea" | "array";

export interface InputProps {
  label?: string;
  value: any;
  size?: "large" | "medium" | "small" | "xsmall";
  onChange: (value: any) => void;
  onClick?: () => void;
  placeholder?: string;
  inputType?: inputType;
  successMsg?: string;
  errorMsg?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    label,
    value,
    size = "medium",
    onChange,
    onClick,
    placeholder,
    inputType = "text",
    successMsg,
    errorMsg,
    readOnly = false,
    disabled = false,
  } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputType === "array") {
      onChange(inputValue.split(",").map((item) => item.trim()));
    } else {
      onChange(inputValue);
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Container $label={label || ""}>
      {label && <Label>{label}</Label>}
      <StyledInput
        className={size + " " + inputType}
        type={inputType}
        value={value}
        onChange={handleChange}
        onClick={handleClick}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
      />
      <Message successMsg={successMsg} errorMsg={errorMsg}>
        {successMsg || errorMsg}
      </Message>
    </Container>
  );
};

export default Input;

const Container = styled.div<{ $label: string }>`
  width: 100%;
  display: ${({ $label }) => $label && "flex"};
  flex-direction: ${({ $label }) => $label && "column"};
  justify-content: center;
  align-items: flex-start;
`;

const Label = styled.div`
  color: ${theme.colors.black};
  ${(props) => props.theme.fonts.b2_bold};
  font-size: 15px;
  margin-left: 5px;
  margin-bottom: 7px;
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;

  /* inputType */
  &.text,
  &.password,
  &.array {
    padding: 12px 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    border: 1px solid
      ${({ errorMsg, theme }) =>
        errorMsg && errorMsg.length > 0
          ? theme.colors.red
          : theme.colors.gray400};
    background: ${theme.colors.white};
    color: ${theme.colors.b200};
    outline: none;
    ${(props) => props.theme.fonts.b2_regular};
    &::placeholder {
      color: ${theme.colors.gray900};
      ${(props) => props.theme.fonts.b2_regular};
    }
  }

  &.write,
  &.textarea {
    height: 30px;
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray700};
    background: ${theme.colors.white};
    color: ${theme.colors.b100};
    outline: none;
    ${(props) => props.theme.fonts.c1_regular};
    &::placeholder {
      color: ${theme.colors.gray600};
    }
  }

  /* size (=height) */
  &.large {
    height: 56px;
  }

  &.medium {
    height: 50px;
  }

  &.small {
    height: 44px;
  }

  /* ect */
  &:disabled {
    border: none;
    background: ${theme.colors.gray100};
  }
  &:focus {
    border: 1px solid ${theme.colors.purple800};
  }
`;

/* 성공, 에러 메세지 */
interface MessageProps {
  successMsg?: string;
  errorMsg?: string;
}

const Message = styled.div<MessageProps>`
  height: 16px;
  padding-left: 10px;
  color: ${({ successMsg, theme }) =>
    successMsg ? theme.colors.green : theme.colors.red};
  ${(props) => props.theme.fonts.c1_regular};
  opacity: ${(props) => (props.successMsg || props.errorMsg ? 1 : 0)};
  margin-top: 5px;
`;
