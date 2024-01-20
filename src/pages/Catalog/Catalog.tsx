import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoviesResponse } from "types/Movie";

import { makePrivateRequest } from "utils/request";

import "./styles.scss";

const Catalog = () => {
	const [moviesResponse, setMoviesResponse] = useState<MoviesResponse>();

	const getMovies = useCallback(() => {
		makePrivateRequest({ url: "/movies" }).then((response) =>
			setMoviesResponse(response.data)
		);
	}, []);

	useEffect(() => {
		getMovies();
	}, [getMovies]);

	return (
		<div className="container">
			<h1 className="mt-5">Tela listagem de filmes</h1>

			<div className="catalog-movies">
				{moviesResponse?.content.map((movie) => (
					<Link to={`/movies/${movie.id}`} key={movie.id}>
						Acessar movies/{movie.id}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Catalog;
