import Star from "assets/images/star.svg";

import "./styles.scss";

type Props = {
	autorReview?: string;
	commentReview?: string;
};

const MovieDetailsReview = ({ autorReview, commentReview }: Props) => {
	return (
		<div className="container-form-list-reaviews">
			<div>
				<h4 className="username-review">
					<Star />
					{autorReview}
				</h4>
				<div className="description-review">
					<span>{commentReview}</span>
				</div>
			</div>
		</div>
	);
};
export default MovieDetailsReview;
