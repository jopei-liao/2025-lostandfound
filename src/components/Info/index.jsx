import "./style.sass";
import logo from "../../assets/images/logo-lostAndFound.svg";

const Info = () => {
	return (
		<section className="info">
			<div className="info-box">
				<h2>Welcome to</h2>
				<h1>
					<img src={logo} alt="" />
				</h1>
				<p>We post things found on the road </p>
				<p>maybe it's yours?</p>
				<br />
				<p>
					But sorry, <br />
					<span>Not responsible for safekeeping 😜</span>
				</p>
			</div>
			<div className="scroll-down pc">
				<div className="mousey">
					<div className="scroller"></div>
				</div>
			</div>
			<div className="scroll-down mo">
				<span className="arrow"></span>
			</div>
		</section>
	);
};

export default Info;
