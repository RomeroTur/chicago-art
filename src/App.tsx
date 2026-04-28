import { z } from "zod";
import { useEffect, useState } from "react";
import { ArtworkSchema } from "./schemas/artwork";
import type { ArtworkProps } from "./schemas/artwork";
import ArtworkCard from "./components/ArtworkCard";

const URL_BASE = "https://api.artic.edu/api/v1/artworks";

const AICDataSchema = z.object({
	pagination: z
		.object({
			total: z.number(),
			limit: z.number(),
			offset: z.number(),
			total_pages: z.number(),
			current_page: z.number(),
			next_url: z.string().url().optional(),
		})
		.optional(),
	data: z.array(ArtworkSchema),
});

const SearchSchema = z.string().min(3, { message: "at least 3 chars!!" });

function App() {
	const [artworksArray, setArtworksArray] = useState<ArtworkProps[]>([]);
	const [fetchErrors, setFetchErrors] = useState<string[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | undefined>();
	const [searchStringError, setSearchStringError] = useState<string>("");

	useEffect(() => {
		const url = searchQuery
			? `${URL_BASE}/search?q=${searchQuery}&fields=id,title,artist_title,image_id`
			: `${URL_BASE}?fields=id,title,artist_title,image_id`;

		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const respData = await response.json();

				console.log("respData: ", respData.data);

				const { data, success, error } =
					AICDataSchema.safeParse(respData);

				if (!success) {
					const fetchErrorMsgs = error.issues.map((issue) => {
						return issue.message;
					});
					setFetchErrors(fetchErrorMsgs);
					return;
				}

				setArtworksArray(data.data);
			} catch (error) {
				console.log("error: ", error);
			}
		};
		fetchData();
	}, [searchQuery]);

	function handleSearch(formData: FormData) {
		try {
			const rawSearchString = formData.get("searchString");
			const searchString: string | undefined = rawSearchString
				?.toString()
				.trim();

			const { data, success, error } =
				SearchSchema.safeParse(searchString);

			if (!success) {
				setSearchStringError(error.issues[0].message);
				return;
			}

			setSearchStringError("");
			setSearchQuery(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<form action={handleSearch}>
				<input
					type="text"
					name="searchString"
					id="searchString"
					className="border-2"
				/>
				{searchStringError && <p>{searchStringError}</p>}
				<button type="submit" className="btn border-2">
					Search
				</button>
			</form>

			<div id="output">
				{fetchErrors &&
					fetchErrors.map((error, index) => (
						<p key={`error-${index}`}>{error}</p>
					))}
			</div>

			{artworksArray && artworksArray.length > 0 ? (
				artworksArray.map((item) => (
					<ArtworkCard
						key={item.id}
						id={item.id}
						title={item.title}
						artist_title={item.artist_title}
						image_id={item.image_id}
					/>
				))
			) : (
				<p>No artwork</p>
			)}
		</>
	);
}

export default App;
