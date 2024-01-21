import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieFilters from "pages/Catalog/components/MovieFilters";
import { Genre, MoviesResponse } from "types/Movie";

import Pagination from "components/Pagination";
import { makePrivateRequest } from "utils/request";

import MovieCard from "./components/MovieCard";
import MovieCardLoader from "./components/MovieCardLoader";

import "./styles.scss";

const Catalog = () => {
	const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();
	const [isLoading, setIsLoading] = useState(false);
	const [activePage, setActivePage] = useState(0);
	const [genre, setGenre] = useState<Genre>();

	const getMovies = useCallback(() => {
		const params = {
			page: activePage,
			size: 4,
			direction: "ASC",
			orderBy: "title",
			genreId: genre?.id
		};
		setIsLoading(true);
		makePrivateRequest({ url: "/movies", params })
			.then((response) => setMoviesResponse(response.data))
			.finally(() => setIsLoading(false));
	}, [activePage, genre]);

	useEffect(() => {
		getMovies();
	}, [getMovies]);

	const handleChangeGenre = (genre: Genre) => {
		setActivePage(0);
		setGenre(genre);
	};

	return (
		<div className="container catalog-container">
			<div className="filter-container">
				<MovieFilters genre={genre} handleChangeGenre={handleChangeGenre} />
			</div>
			<div className="catalog-movies">
				{isLoading ? (
					<MovieCardLoader />
				) : (
					moviesResponse?.content.map((movie) => (
						<Link to={`/movies/${movie.id}`} key={movie.id}>
							<MovieCard movie={movie} />
						</Link>
					))
				)}
			</div>
			{moviesResponse && (
				<Pagination
					totalPages={moviesResponse.totalPages}
					onChange={(page) => setActivePage(page)}
				/>
			)}
		</div>
	);
};

export default Catalog;
