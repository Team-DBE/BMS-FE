export const AddDevice = (name: string) => {
	const temp = Math.floor(Math.random() * 100);
		return {
      id: `device-${Date.now()}`,
      name,
      temperature: temp,
      warning: temp > 70, 
    };
}