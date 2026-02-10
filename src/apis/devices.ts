import { useMutation, useQueryClient } from "@tanstack/react-query";

const registerDevice = async (serialNumber: string) => {
	const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${baseUrl}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serialNumber }),
  });
  if (!response.ok) {
    throw { status: response.status };
  }
  return response.json();
};

export const useRegisterDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (serialNumber: string) => registerDevice(serialNumber),
    onSuccess: () => {
			alert("장치가 성공적으로 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["devices"] });
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
        default:
					alert("장치 등록 중 오류가 발생했습니다.");
          console.error("장치 등록 중 오류가 발생했습니다.");
      }
    },
  });
};
