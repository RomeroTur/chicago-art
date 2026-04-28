import type { ArtworkProps } from "../schemas/artwork";
import { useState } from "react";

const useLocalStorage = () => {
	const [items, setItems] = useState<ArtworkProps[]>([]);

	function addItem(Obj: ArtworkProps) {}

	function removeItem(Obj: ArtworkProps) {}

	return { addItem, removeItem, items };
};

export default useLocalStorage;
