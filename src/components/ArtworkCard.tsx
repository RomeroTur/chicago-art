import type { ArtworkProps } from "../schemas/artwork";

const ArtworkCard = ({ id, title, artist_title, image_id }: ArtworkProps) => {
	const addToGallery = () => {
		const objectToHandle = {
			id: id,
			title: title,
			artist_title: artist_title,
			image_id: image_id,
		};
		localStorage.setItem("favorites", JSON.stringify(objectToHandle));
	};
	const imageUrl = image_id
		? `https://www.artic.edu/iiif/2/${image_id}/full/300,/0/default.jpg`
		: null;

	return (
		<div className="mb-4 border-2">
			{imageUrl && <img src={imageUrl} alt={title} />}
			<p>{title}</p>
			<p>{artist_title ?? "Unknown artist"}</p>
			<button onClick={addToGallery}>Add</button>
		</div>
	);
};

export default ArtworkCard;
