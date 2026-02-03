export const getAll = (selectedItems: string[], allIds: string[]) => {
	if (selectedItems.length === allIds.length) {
		return [];
	} else {
		return allIds;
	}
}; 

export const toggleItem = (prev: string[], Id: string) => {
	if (prev.includes(Id)) 
		return prev.filter((item) => item !== Id); 
	else
		return [...prev, Id];
};