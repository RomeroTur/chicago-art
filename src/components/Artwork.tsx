import type { ArtworkProps } from "../schemas/artwork";

const Artwork = ({ title, artist_title, image_id }: ArtworkProps) => {
	const imageUrl = image_id
		? `https://www.artic.edu/iiif/2/${image_id}/full/300,/0/default.jpg`
		: null;

	return (
		<div className="mb-4 border-2">
			{imageUrl && <img src={imageUrl} alt={title} />}
			<p>{title}</p>
			<p>{artist_title ?? "Unknown artist"}</p>
		</div>
	);
};

export default Artwork;
