import type { AddArtworkProps } from "../schemas/artwork";

const ArtworkCard = ({
	id,
	title,
	artist_title,
	image_id,
	addFn,
}: AddArtworkProps) => {
	const imageUrl = image_id
		? `https://www.artic.edu/iiif/2/${image_id}/full/300,/0/default.jpg`
		: null;

	return (
		<div className="mb-4 border-2">
			{imageUrl && <img src={imageUrl} alt={title} />}
			<p>{title}</p>
			<p>{artist_title ?? "Unknown artist"}</p>
			<button
				onClick={() => addFn({ id, title, artist_title, image_id })}
			>
				Add
			</button>
		</div>
	);
};

export default ArtworkCard;
