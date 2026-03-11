import styled from "@emotion/styled";

const SIDEBAR_WIDTH = "432px";
const ANIMATION_DURATION = "0.3s";
const CONTENT_GAP = "10px";
const NAV_GAP = "5px";
const NAV_PADDING = "20px";

export const SidebarContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  height: 100vh;
  width: ${SIDEBAR_WIDTH};
  transition: width ${ANIMATION_DURATION} ease;
  border-right: 1px solid #393939;
  cursor: default;
`;

export const SidebarContent = styled.div`
  background-color: #222222;
  display: flex;
  flex-direction: column;
  gap: ${CONTENT_GAP};
  height: 100%;
`;

export const SidebarNavContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
`;

export const SidebarNavContainer = styled.nav`
  align-items: flex-start;
  align-self: stretch;
  background-color: #222222;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${NAV_GAP};
  padding: ${NAV_PADDING};
  width: ${SIDEBAR_WIDTH};
`;
