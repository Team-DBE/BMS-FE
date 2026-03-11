import styled from "@emotion/styled";
import { Sidebar } from "../../components/sidebar/sidebar.tsx";
import DeviceCardItem from "../../components/DeviceCardItem.tsx";
import DeviceDeleteButton from "../../components/DeviceDeleteButton";
import DeviceAddCard from "../../components/DeviceAddCard";
import useDeleteMode from "../../hooks/useDeleteMode";
import DeleteButton from "../../components/DeleteButton";
import useDeviceAddMode from "../../hooks/useDeviceAddMode";
import DeviceRegisterModal from "../../components/modal/DeviceRegisterModal.tsx";
import WarningModal from "../../components/modal/WarningModal.tsx";
import useDeviceData from "../../hooks/useDeviceData.ts";

function Home() {
  const {
    devices,
    checkWarning,
    deleteDevice,
    addDevice,
    updateDeviceName,
    warningDevices,
  } = useDeviceData();
  const {
    isDeleteMode,
    selectedItems,
    toggleDeleteMode,
    toggleItemSelection,
    setIsDeleteMode,
    setSelectedItems,
  } = useDeleteMode();
  const { isAddMode, toggleAddMode, setIsAddMode } = useDeviceAddMode();
  const warningModalDevice = warningDevices.find((device) => device.showModal);

  return (
    <HomeContainer>
      <Header>
        <DeviceText>연결된 기기</DeviceText>
        <DeviceDeleteButton
          onClick={() => toggleDeleteMode(devices.map((device) => device.id))}
          isDeleteMode={isDeleteMode}
        />
      </Header>
      <CardGrid>
        <DeviceAddCard onClick={() => toggleAddMode()} />
        {warningDevices.map((device) => (
          <DeviceCardItem
            key={device.id}
            id={device.id}
            deviceName={device.name}
            temperature={device.temperature}
            warning={device.warning}
            isDeleteMode={isDeleteMode}
          />
        </Header>
        <CardGrid>
          <DeviceAddCard onClick={() => toggleAddMode()} />
          {warningDevices.map((device) => (
            <DeviceCardItem
              key={device.id}
              id={device.id}
              deviceName={device.name}
              temperature={device.temperature}
              warning={device.temperature > 70}
              isDeleteMode={isDeleteMode}
              isSelected={selectedItems.includes(device.id)}
              onSelect={() => toggleItemSelection(device.id)}
              updateDeviceName={updateDeviceName}
            />
          ))}
        </CardGrid>
      </MainContent>
      {warningDevices.some((device) => device.warning) && (
        <WarningModal
          deviceName={warningDevices.find((device) => device.warning)?.name}
          deviceTemp={
            warningDevices.find((device) => device.warning)?.temperature
          }
          checkWarning={() =>
            checkWarning(
              warningDevices.find((device) => device.warning)?.id || "",
            )
          }
        />
      )}
      {isAddMode && (
        <DeviceRegisterModal
          onClose={() => setIsAddMode(false)}
          addDevice={addDevice}
          deviceCount={devices.length}
        />
      )}
      {selectedItems.length > 0 && (
        <DeleteButton
          onClick={() => {
            setIsDeleteMode(false);
            selectedItems.forEach((id) => deleteDevice(id));
            setSelectedItems([]);
          }}
        />
      )}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Sidebar가 position: fixed(폭 280px)이므로
// 메인 콘텐츠는 그 오른쪽에서 시작하도록 여백을 둠
const MainContent = styled.div`
  margin-left: 432px;
  padding: 100px 40px 40px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1104px;
  margin-bottom: 40px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1104px;
  width: 100%;
  gap: 40px;
`;

const DeviceText = styled.p`
  width: 110px;
  height: 26px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;

  color: #ffffff;
`;

export default Home;
