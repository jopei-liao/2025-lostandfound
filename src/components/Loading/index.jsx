import "./style.sass";

const Loading = ({ isEnd }) => {
	return (
		<div className={`loading ${isEnd ? "end" : ""}`}>
			<div className={`gooey ${isEnd ? "end" : ""}`}></div>
		</div>
	);
};

export default Loading;
