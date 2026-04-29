import { z } from "zod";

export const ArtworkSchema = z.object({
	id: z.number(),
	title: z.string(),
	artist_title: z.string().nullable().optional(),
	image_id: z.string().nullable().optional(),
});

export type ArtworkProps = z.infer<typeof ArtworkSchema>;

export interface AddArtworkProps extends ArtworkProps {
	addFn: (obj: ArtworkProps) => void;
}
