import { useEffect, useState, useRef } from "react";
import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loading from "./components/Loading";
import Info from "./components/Info";
import Gallery from "./components/Gallery";
import Social from "./components/Social";

gsap.registerPlugin(ScrollTrigger);

function App() {
	const [isEnd, setIsEnd] = useState(false);
	const [isShowLoading, setIsShowLoading] = useState(true);

	const isEndTimerRef = useRef(null);
	const hideLoadingTimerRef = useRef(null);

	// 設定 vh 變數
	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}, []);

	// Gallery 載入完成後要執行的事情
	const handleGalleryLoaded = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		isEndTimerRef.current = setTimeout(() => {
			setIsEnd(true);
		}, 2000);
		hideLoadingTimerRef.current = setTimeout(() => {
			setIsShowLoading(false);
		}, 6000);
	};

	// 清理 timeout
	useEffect(() => {
		return () => {
			clearTimeout(isEndTimerRef.current);
			clearTimeout(hideLoadingTimerRef.current);
		};
	}, []);

	return (
		<div className="App">
			{isShowLoading && <Loading isEnd={isEnd} />}
			<Info />
			<Gallery onLoaded={handleGalleryLoaded} />
			<Social />
		</div>
	);
}

export default App;
