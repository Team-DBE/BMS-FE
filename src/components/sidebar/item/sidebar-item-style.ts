import styled from "@emotion/styled";

const ITEM_PADDING = "10px 0";
const LABEL_FONT_SIZE = "20px";
const TRANSITION_DURATION = "0.05s";

interface SideBarMenuItemProps {
  isActive: boolean;
}

interface SideBarMenuItemLabelProps {
  isActive?: boolean;
}

export const SideBarMenuItem = styled.div<SideBarMenuItemProps>`
  align-items: center;
  background-color: #121212;
  display: flex;
  padding: ${ITEM_PADDING};
  width: 100%;
  cursor: pointer;
`;

export const SideBarMenuItemLabel = styled.button<SideBarMenuItemLabelProps>`
  appearance: none;
  background: transparent;
  border: 0;
  color: ${(props) => (props.isActive ? "#ffffff" : "#a0a0a0")};
  cursor: pointer;
  display: block;
  font-size: ${LABEL_FONT_SIZE};
  font-style: normal;
  line-height: normal;
  margin-bottom: 20px;
  padding-left: 65px;
  text-align: left;
  transition: color ${TRANSITION_DURATION} linear;
  width: 100%;
  font-family: "Pretendard";
  font-weight: 500;

  &:hover,
  &:focus-visible {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 2px;
  }
`;
