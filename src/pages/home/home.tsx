import styled from "@emotion/styled";
import DeviceCard from "../../components/deviceCard";
import DeviceDeleteButton from "../../components/DeviceDeleteButton";
import DeviceAddCard from "../../components/DeviceAddCard";

function Home() {
  return (
    <>
      <Header>
        <DeviceText>연결된 기기</DeviceText>
        <DeviceDeleteButton />
      </Header>
      <CardGrid>
        <DeviceAddCard />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
        <DeviceCard deviceName="기기 1" temperature={10000} />
      </CardGrid>
    </>
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
  grid-template-columns: repeat(4, 2fr);
  max-width: 1102px;
  gap: 40px;
  position: absolute;
  width: 1104px;
  height: 1264px;
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
