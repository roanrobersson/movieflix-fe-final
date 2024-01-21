import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Review } from "types/Movie";

import { makePrivateRequest } from "utils/request";

import "./styles.scss";

type ParamsType = {
	id: string;
	onAddReview: (review: Review) => void;
};

type FormState = {
	text?: string;
	movieId: number;
};

const AddReview = ({ id, onAddReview }: ParamsType) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormState>();

	const onSubmit = (data: FormState) => {
		data.movieId = parseInt(id);
		makePrivateRequest({
			url: `/reviews`,
			method: "POST",
			data
		})
			.then((response) => {
				toast.info("Obrigado pela sua Avaliação!");
				onAddReview(response.data);
				reset();
			})
			.catch(() => {
				toast.error("Houve um erro na validação de seu comentário.");
			});
	};
	return (
		<div className="container-form-create-reaviews">
			<form onSubmit={handleSubmit(onSubmit)} className="comment-container">
				{errors.text && (
					<div className="comment-alert">A Avaliação deve ser preenchida!</div>
				)}
				<textarea
					placeholder="Deixe sua avaliação aqui"
					className="input-review"
					cols={2}
					rows={10}
					{...register("text", {
						required: "A Avaliação deve ser preenchida"
					})}
				></textarea>
				<button className="btn-save-review mt-4">SALVAR AVALIAÇÃO</button>
			</form>
		</div>
	);
};

export default AddReview;
