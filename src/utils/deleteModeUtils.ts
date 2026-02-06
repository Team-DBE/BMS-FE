export const getAll = (selectedItems: string[], allIds: string[]) => {
	if (selectedItems.length === allIds.length) {
		return [];
	} else {
		return allIds;
	}
}; 

export const toggleItem = (prev: string[], id: string) => {
	if (prev.includes(id)) 
		return prev.filter((item) => item !== id); 
	else
		return [...prev, id];
};