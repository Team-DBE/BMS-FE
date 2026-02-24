import { useMutation } from "@tanstack/react-query";

const checkDevice = async (serialNumber: string) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/devices/check?serialNumber=${serialNumber}`);
  if (!response.ok) {
    throw { status: response.status };
  }
  const data = await response.json();
  if (!data) {
    throw { status: 404 };
  }
  return data;
};

export const useCheckDevice = () => {
  return useMutation({
    mutationFn: (serialNumber: string) => checkDevice(serialNumber),
    onSuccess: () => {
      alert("장치가 성공적으로 등록되었습니다.");
    },
    onError: (error: { status: number }) => {
      switch (error.status) {
        case 400:
          alert("요청이 잘못되었습니다. 일련번호를 확인해주세요.");
          console.error("요청이 잘못되었습니다. 일련번호를 확인해주세요.");
          break;
        case 409:
          alert("이미 등록된 장치입니다.");
          console.error("이미 등록된 장치입니다.");
          break;
        case 404:
          alert("장치를 찾을 수 없습니다. 일련번호를 확인해주세요.");
          console.error("장치를 찾을 수 없습니다. 일련번호를 확인해주세요.");
          break;
        default:
          alert("장치 등록 중 오류가 발생했습니다.");
          console.error("장치 등록 중 오류가 발생했습니다.");
      }
    },
  });
};
