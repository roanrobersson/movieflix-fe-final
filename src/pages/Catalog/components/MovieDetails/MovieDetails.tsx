import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, Review } from "types/Movie";

import { isAllowedByRole } from "utils/auth";
import { makePrivateRequest } from "utils/request";

import MovieDescriptionLoader from "../Loaders/MovieDescriptionLoader";
import MovieDetailsReviews from "../MovieDetailsAddReview";
import MovieDetailsComment from "../MovieDetailsReview";

import "./styles.scss";

type ParamsType = {
	movieId: string;
};

const MovieDetails = () => {
	const { movieId } = useParams<ParamsType>();
	const [movie, setMovie] = useState<Movie>();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		makePrivateRequest({ url: `/movies/${movieId}` })
			.then((response) => setMovie(response.data))
			.finally(() => setIsLoading(false));
		makePrivateRequest({ url: `/movies/${movieId}/reviews` }).then(
			(response) => {
				setReviews(response.data);
			}
		);
	}, [movieId]);

	const handleAddReview = (review: Review) => {
		setReviews((reviews) => [...reviews, review]);
	};

	return (
		<div className="container">
			<h1 className="movie-details-name mt-5 mb-4">
				<span>Tela detalhes do filme id: </span>
				{movie?.id}
			</h1>

			{isLoading ? (
				<MovieDescriptionLoader />
			) : (
				isAllowedByRole(["ROLE_MEMBER"]) && (
					<MovieDetailsReviews id={movieId!} onAddReview={handleAddReview} />
				)
			)}

			{!!reviews?.length && (
				<div className="move-details-comment-container">
					{reviews?.map((review) => (
						<MovieDetailsComment
							key={review.id}
							commentReview={review.text}
							autorReview={review.user.name}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default MovieDetails;
