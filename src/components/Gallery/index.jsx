import { useEffect, useRef, useState } from "react";
import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from "axios";

import "./style.sass";

const baseURL = import.meta.env.BASE_URL;
const apiKey = "AIzaSyDxdAD4gxDn1KC-EY5voWAnGFECheHHF-g";
const folderId = "16C5cqqry_u25yHTJpRfYYq_iiy3Pfufx";
const maxItems = 45;

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ onLoaded }) => {
	const galleryRef = useRef(null);
	const [imgListArr, setImgListArr] = useState([]);
	const [imgGroupArr, setGroupArr] = useState([]);

	useEffect(() => {
		// 創建 AbortController 實例
		const controller = new AbortController();
		const signal = controller.signal;

		getImagesFromGoogleDrive(signal);

		return () => {
			// 在元件 Unmount 或 Effect 重新執行前，取消請求
			controller.abort();
		};
	}, []);

	useEffect(() => {
		if (imgListArr?.length > 0) {
			// console.log("useeffect imgListArr");
			let arr = [];
			for (let i = 0; i < imgListArr.length; i += 5) {
				if (imgListArr.slice(i, i + 5).length === 5) {
					arr.push(imgListArr.slice(i, i + 5));
				}
			}
			setGroupArr(arr);
		}
	}, [imgListArr]);

	useEffect(() => {
		if (!galleryRef.current || imgGroupArr.length === 0) return;

		const images = galleryRef.current.querySelectorAll("img");

		const imgLoad = imagesLoaded(images).on("always", () => {
			const boxes = galleryRef.current.querySelectorAll(".img-box");

			boxes.forEach((box, index) => {
				const wrapper = box.querySelector("ul");
				if (!wrapper) return;

				const [x, xEnd] = index % 2 ? ["100%", (wrapper.scrollWidth - box.offsetWidth) * -1] : [wrapper.scrollWidth * -1, 0];

				gsap.fromTo(
					wrapper,
					{ x },
					{
						x: xEnd,
						scrollTrigger: {
							trigger: box,
							scrub: 0.1,
							start: "top center",
						},
					}
				);
			});

			// 通知 App 說 Gallery 載入完成
			onLoaded?.();
		});

		return () => {
			imgLoad.off();
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, [onLoaded, imgGroupArr]);

	const getImagesFromGoogleDrive = signal => {
		// console.log("getImagesFromGoogleDrive");

		axios
			.get(
				`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+(mimeType='image/jpeg'+or+mimeType='image/png'+or+mimeType='image/jpg')+and+trashed=false&fields=files(id,name)&key=${apiKey}`,
				{ signal: signal }
			)
			.then(response => {
				const files = response.data.files || [];
				const randomSample = setRandomImg(files, maxItems);
				// throw new Error("Parameter is not a number!");
				setImgListArr(randomSample);
			})
			.catch(error => {
				if (axios.isCancel(error) || error.name === "AbortError") {
					// console.log("Axios清理行為");
				} else {
					// console.error("請求發生錯誤:", error);
					const imageList = Array.from({ length: 45 }, (_, i) => `${baseURL}/images/item-${i + 1}.jpg`);
					setImgListArr(imageList);
				}
			});
	};

	const setRandomImg = (arr, count) => {
		// 取得的圖片隨機取出45筆
		// 1. 如果來源陣列的長度小於等於要求的數量，直接返回整個陣列的淺拷貝
		if (arr.length <= count) {
			return [...arr];
		}

		// 2. 創建陣列的淺拷貝，以避免修改原始陣列
		const arrayCopy = [...arr];
		const sample = [];

		// 3. 循環抽取 'count' 次
		for (let i = 0; i < count; i++) {
			// 隨機選擇 arrayCopy 中剩餘元素的索引
			const randomIndex = Math.floor(Math.random() * arrayCopy.length);

			// 將選中的元素移到結果陣列中 (sample)
			sample.push(arrayCopy[randomIndex]);

			// 從 arrayCopy 中移除已選中的元素，確保不重複抽取
			arrayCopy.splice(randomIndex, 1);
		}

		return sample;
	};

	const imgHandleError = (e, rowIndex, colIndex) => {
		// 當google drive圖片載入失敗時，替換為本地圖片
		e.target.src = `${baseURL}/images/item-${rowIndex * 5 + colIndex + 1}.jpg`;
	};

	return (
		<section className="img" ref={galleryRef}>
			{imgGroupArr.length > 0 &&
				imgGroupArr.map((group, rowIndex) => (
					<div className="img-box" key={rowIndex}>
						<ul>
							{group.map((files, colIndex) => (
								<li className="img" key={files.id}>
									<img src={`https://www.googleapis.com/drive/v3/files/${files.id}?alt=media&key=${apiKey}`} onError={e => imgHandleError(e, rowIndex, colIndex)} alt={files.name} />
								</li>
							))}
						</ul>
					</div>
				))}
		</section>
	);
};

export default Gallery;
