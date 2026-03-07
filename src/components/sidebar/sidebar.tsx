import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate, useLocation } from "react-router-dom";
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
  onNavItemClick?: (itemId: string) => void;
  onSearch?: (value: string) => void;
  onTeamCreated?: () => void;
  onTeamUpdated?: () => void;
}

function Sidebar({ onNavItemClick = () => {} }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [navItems, setNavItems] = useState<SidebarNavItem[]>([
    { id: "section-1", label: "Section 1", path: "/section-1" },
  ]);

  const isMainItemActive = useCallback(
    (itemId: string) => {
      const item = navItems.find((i) => i.id === itemId);
      if (!item || !item.path) return false;
      return location.pathname === item.path;
    },
    [location.pathname, navItems],
  );

  const handleMainItemClick = useCallback(
    (itemId: string) => {
      const item = navItems.find((i) => i.id === itemId);
      if (item?.path) {
        navigate(item.path);
      } else {
        navigate(`/${itemId}`);
      }
      onNavItemClick(itemId);
    },
    [navItems, navigate, onNavItemClick],
  );

  const handleAddItem = useCallback(() => {
    setNavItems((prev) => {
      const nextIndex = prev.length + 1;
      const newId = `section-${nextIndex}`;
      const newLabel = `Section ${nextIndex}`;
      const newPath = `/${newId}`;
      return [...prev, { id: newId, label: newLabel, path: newPath }];
    });
  }, []);

  return (
    <SidebarContainer>
      <SidebarHeader />
      <SidebarContent>
        <Title>
          <span>Section</span>
          <img
            src={Plus}
            alt="plus icon"
            style={{ width: 25, height: 25, cursor: "pointer" }}
            onClick={handleAddItem}
          />
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
