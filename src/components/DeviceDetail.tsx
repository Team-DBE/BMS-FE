import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

interface DeviceDetailProps {
  isVisible: boolean;
  onClose?: () => void;
}

export default function DeviceDetail({ isVisible, onClose }: DeviceDetailProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (menuRef.current && menuRef.current.contains(target)) {
        return;
      }
      if (target.closest(".menu-trigger")) {
        return;
      }
      onClose && onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  return (
      <Container ref={menuRef} isVisible={isVisible} onClick={(e) => e.stopPropagation()}>
        <Category>별명 수정</Category>
        <Category>페이지 이동</Category>
        <Category>일련번호</Category>
      </Container>
  );
}

const Container = styled.div<DeviceDetailProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 6px;

  position: absolute;
  top: 20px;
  left: 220px;
  width: 79px;
  height: 88px;

  background: #26282b;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 100;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Category = styled.p`
  width: 63px;
  height: 20px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.025em;

  color: #e3e3e3;

  cursor: pointer;
`;
