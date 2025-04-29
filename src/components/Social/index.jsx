import qrcode from "../../assets/images/qrcode.png";
import "./style.sass";

const Social = () => {
	return (
		<section className="social">
			<div className="social-box">
				<h2 className="title">
					Follow <br /> on Instagram
				</h2>
				<p>Scan the QR code below ⬇️</p>
				<div className="qrcode">
					<img src={qrcode} alt="qrcode" />
				</div>
				<p>
					Or just click the
					<a href="http://instagram.com/somethinglostonroad" target="_blank">
						link
					</a>
					!
				</p>
			</div>
		</section>
	);
};

export default Social;
