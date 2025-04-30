import { useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./style.sass";

const baseURL = import.meta.env.BASE_URL;
gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ onLoaded }) => {
	const galleryRef = useRef(null);

	useEffect(() => {
		if (!galleryRef.current) return;

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
			if (onLoaded) {
				onLoaded();
			}
		});
		return () => {
			imgLoad.off();
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, [onLoaded]);

	const imageList = Array.from({ length: 45 }, (_, i) => `${baseURL}/images/item-${i + 1}.jpg`);
	const chunked = [];
	for (let i = 0; i < imageList.length; i += 5) {
		chunked.push(imageList.slice(i, i + 5));
	}

	return (
		<section className="img" ref={galleryRef}>
			{chunked.map((group, rowIndex) => (
				<div className="img-box" key={rowIndex}>
					<ul>
						{group.map((src, colIndex) => (
							<li className="img" key={colIndex}>
								<img src={src} alt={`img${rowIndex * 5 + colIndex + 1}`} />
							</li>
						))}
					</ul>
				</div>
			))}
		</section>
	);
};

export default Gallery;
