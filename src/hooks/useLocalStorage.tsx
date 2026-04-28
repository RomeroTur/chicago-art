import type { ArtworkProps } from "../schemas/artwork";
import { useState } from "react";

const useLocalStorage = () => {
	const [items, setItems] = useState<ArtworkProps[]>(() => {
		const itemsStoredString: string | null =
			localStorage.getItem("itemsStored");

		if (!itemsStoredString) return [];

		try {
			return JSON.parse(itemsStoredString);
		} catch {
			return [];
		}
	});

	function addItem(Obj: ArtworkProps) {
		setItems((prevItems) => {
			const isIn = prevItems.some((item) => Obj.id === item.id);
			return !isIn ? [...prevItems, Obj] : [...prevItems];
		});
	}

	function removeItem(Obj: ArtworkProps) {}

	return { addItem, removeItem, items };
};

export default useLocalStorage;
