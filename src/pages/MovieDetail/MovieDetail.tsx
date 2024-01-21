import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowIcon from "assets/images/arrow.svg";
import { Movie, Review } from "types/Movie";

import { isAllowedByRole } from "utils/auth";
import { makePrivateRequest } from "utils/request";

import MovieDetailsReviews from "./components/AddReview";
import MovieDescriptionLoader from "./components/MovieDescriptionLoader";
import MovieInfoLoader from "./components/MovieInfoLoader";
import MovieDetailsComment from "./components/Review";

import "./styles.scss";

type ParamsType = {
	movieId: string;
};

const MovieDetail = () => {
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
		<div className="container movie-details-container">
			<div className="movie-details-main-info">
				<Link to="/movies" className="movie-details-goback">
					<ArrowIcon className="icon-goback" />
					<h1 className="text-goback">voltar</h1>
				</Link>

				<div className="movie-details-info">
					{isLoading ? (
						<MovieInfoLoader />
					) : (
						<div className="movie-details-image-container">
							<img
								className="movie-details-image"
								src={movie?.imgUrl}
								alt={movie?.title}
							/>
						</div>
					)}

					{isLoading ? (
						<MovieDescriptionLoader />
					) : (
						<div className="movie-info-fields">
							<div>
								<h1 className="movie-details-name">{movie?.title}</h1>
								<h4 className="movie-details-year">{movie?.year}</h4>
								<h6 className="movie-details-subtitle">{movie?.subTitle}</h6>
							</div>
							<div className="movie-details-sinopse">
								<span>{movie?.synopsis}</span>
							</div>
						</div>
					)}
				</div>
			</div>

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

export default MovieDetail;
