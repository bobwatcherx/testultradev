import { useRoute } from "wouter";

export default function Nice({age}){
	 const [match, params] = useRoute("/nice/:id");

	return(
		<div>
		Nice {age} - {params.id}
		</div>
		)
}