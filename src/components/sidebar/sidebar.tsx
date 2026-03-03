import { useCallback } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { SidebarHeader } from "./header/sidebar-header";
import { SidebarItem } from "./item/sidebar-item";
import Plus from "../../assets/+.svg";
import {
  SidebarContainer,
  SidebarContent,
  SidebarNavContainer,
  SidebarNavContent,
} from "./sidebar-style";

interface SidebarNavItem {
  id: string;
  label: string;
  subItems?: SidebarNavItem[];
  path?: string;
}

interface SidebarProps {
  navItems?: SidebarNavItem[];
  projectName?: string;
  searchPlaceholder?: string;
  userName?: string;
  teamsLoading?: boolean;
  teamsError?: Error | null;
  userRole?: "admin" | "member";
  onNavItemClick?: (itemId: string) => void;
  onSearch?: (value: string) => void;
  onTeamCreated?: () => void;
  onTeamUpdated?: () => void;
}

function Sidebar({ navItems = [], onNavItemClick = () => {} }: SidebarProps) {
  const location = useLocation();

  const isMatch = (basePath?: string) =>
    basePath != null &&
    (location.pathname === basePath ||
      location.pathname.startsWith(`${basePath}/`));

  const activeItemId =
    navItems.find(
      (i) => isMatch(i.path) || i.subItems?.some((s) => isMatch(s.path)),
    )?.id ??
    navItems[0]?.id ??
    "";

  const isMainItemActive = useCallback(
    (itemId: string) =>
      itemId === activeItemId ||
      navItems
        .find((i) => i.id === itemId)
        ?.subItems?.some((sub) => sub.id === activeItemId),
    [activeItemId, navItems],
  );

  const handleMainItemClick = useCallback(
    (itemId: string) => {
      onNavItemClick(itemId);
    },
    [onNavItemClick],
  );

  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarContent>
        <Title>
          <span>Section</span>
          <img src={Plus} alt="plus icon" style={{ width: 25, height: 25 }} />
        </Title>
        <SidebarNavContent>
          <SidebarNavContainer>
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                label={item.label}
                isActive={isMainItemActive(item.id)}
                onClick={() => handleMainItemClick(item.id)}
              />
            ))}
          </SidebarNavContainer>
        </SidebarNavContent>
      </SidebarContent>
    </SidebarContainer>
  );
}

const Title = styled.span`
  appearance: none;
  background: transparent;
  border: 0;
  color: #ababab;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  padding-left: 40px;
  text-align: left;
  width: 100%;
  font-family: "Pretendard";
  font-weight: 500;
  justify-content: space-between;
  padding-right: 45px;
`;

export { Sidebar };
