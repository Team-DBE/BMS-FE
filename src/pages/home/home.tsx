import styled from "@emotion/styled";
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
  const { devices, checkWarning, deleteDevice, addDevice, updateDeviceName, warningDevices } = useDeviceData();
  const { isDeleteMode, selectedItems, toggleDeleteMode, toggleItemSelection, setIsDeleteMode, setSelectedItems } =
    useDeleteMode();
  const { isAddMode, toggleAddMode, setIsAddMode } = useDeviceAddMode();

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
            warning={device.temperature > 70}
            isDeleteMode={isDeleteMode}
            isSelected={selectedItems.includes(device.id)}
            onSelect={() => toggleItemSelection(device.id)}
            updateDeviceName={updateDeviceName}
          />
        ))}
      </CardGrid>
      {warningDevices.some((device) => device.warning) && (
        <WarningModal
          deviceName={warningDevices.find((device) => device.warning)?.name}
          deviceTemp={warningDevices.find((device) => device.warning)?.temperature}
          checkWarning={() => checkWarning(warningDevices.find((device) => device.warning)?.id || "")}
        />
      )}
      {isAddMode && (
        <DeviceRegisterModal onClose={() => setIsAddMode(false)} addDevice={addDevice} deviceCount={devices.length} />
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
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 1076px;
  height: 46px;
  left: 638px;
  top: 100px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  max-width: 1102px;
  gap: 40px;
  position: absolute;
  width: 1104px;
  height: auto;
  left: 624px;
  top: 170px;
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
