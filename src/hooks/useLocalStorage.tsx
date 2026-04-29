import type { ArtworkProps } from "../schemas/artwork";
import { useState, useEffect } from "react";

const STORAGE_ITEM = "itemsStored";

const useLocalStorage = () => {
	const [items, setItems] = useState<ArtworkProps[]>(() => {
		const itemsStoredString = localStorage.getItem(STORAGE_ITEM);

		if (!itemsStoredString) return [];

		try {
			return JSON.parse(itemsStoredString);
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_ITEM, JSON.stringify(items));
	}, [items]);

	function addItem(Obj: ArtworkProps) {
		setItems((prevItems) => {
			const isIn = prevItems.some((item) => Obj.id === item.id);
			return isIn ? prevItems : [...prevItems, Obj];
		});
	}

	return { addItem, items };
};

export default useLocalStorage;
