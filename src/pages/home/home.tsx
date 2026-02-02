import styled from "@emotion/styled";
import DeviceCard from "../../components/DeviceCard";
import DeviceDeleteButton from "../../components/DeviceDeleteButton";
import DeviceAddCard from "../../components/DeviceAddCard";
import useDeleteMode from "../../hooks/useDeleteMode";
import DeleteButton from "../../components/DeleteButton";

const devices = Array.from({ length: 11 }, (_, i) => ({
  id: `device-${i + 1}`,
  name: `기기 ${i + 1}`,
  temperature: 10000,
  warning: i === 0,
}));

function Home() {
  const { isDeleteMode, selectedItems, toggleDeleteMode, toggleItemSelection } = useDeleteMode();

  return (
    <HomeContainer>
      <Header>
        <DeviceText>연결된 기기</DeviceText>
        <DeviceDeleteButton onClick={() => toggleDeleteMode(devices.map(device => device.id))} isDeleteMode={isDeleteMode} />
      </Header>
      <CardGrid>
        <DeviceAddCard />
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            deviceName={device.name}
            temperature={device.temperature}
            warning={device.warning}
            isDeleteMode={isDeleteMode}
            isSelected={selectedItems.includes(device.id)}
            onSelect={() => toggleItemSelection(device.id)}
          />
        ))}
      </CardGrid>
      {selectedItems.length > 0 && <DeleteButton onClick={() => toggleDeleteMode([])} />}
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

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;

  color: #FFFFFF;
`;


export default Home;
