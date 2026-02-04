import { useState } from "react";

export default function useDeviceAddMode() {
	const [isAddMode, setIsAddMode] = useState(false);
	const [inputText, setInputText] = useState("");

	// const activeEnter = (e:any) => {
	// 	if (e.key === "Enter") {
	// 		return e.target.value;
	// 	}
	// }
	
	const toggleAddMode = () => {
		setIsAddMode((prev) => !prev);
	};

	return {
		isAddMode,
		setIsAddMode,
		toggleAddMode,
		inputText,
		setInputText,
		// activeEnter,
	};
}