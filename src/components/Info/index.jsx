import "./style.sass";

const Info = () => {
	return (
		<section className="info">
			<div className="info-box">
				<h1 className="title">Welcome to LostAndFound !</h1>
				<p>We post things found on the road </p>
				<p>maybe it's yours?</p>
				<br />
				<p>
					But sorry, <span>Not responsible for safekeeping😜</span>
				</p>
			</div>
			<div className="scroll-downs">
				<div className="mousey">
					<div className="scroller"></div>
				</div>
			</div>
		</section>
	);
};

export default Info;
