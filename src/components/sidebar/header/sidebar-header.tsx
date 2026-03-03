import { memo } from "react";
import styled from "@emotion/styled";
import LogoIcon from "../../../assets/logo.svg";

function SidebarHeaderComponent() {
  return (
    <SideBarHeader>
      <img src={LogoIcon} alt="logo" />
    </SideBarHeader>
  );
}

const SideBarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  width: 100%;
  background-color: #222222;
  padding-top: 95px;
  padding-bottom: 40px;
  box-sizing: border-box;
  cursor: default;
`;

export const SidebarHeader = memo(SidebarHeaderComponent);
