import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

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
			document.documentElement.classList.remove("lock");
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

	useEffect(() => {
		const googleSheetApiUrl = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
		let params = {
			time: new Date().toLocaleString("zh-TW"),
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
		};
		if (import.meta.env.MODE != "production" && googleSheetApiUrl) {
			axios.get(googleSheetApiUrl, { params });
		}
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
