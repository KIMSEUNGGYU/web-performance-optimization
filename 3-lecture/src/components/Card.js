import React, { useEffect, useRef } from 'react'

function Card(props) {
	const imgRef = useRef(null)

	// 옵저버 기능을 매 순간하는 것이 아닌, 
	// 마운트 될 때 한 번만 수행해도됨
	useEffect(() => {
		const options = {};
		const callback =(entries, observer) => {
			entries.forEach(entry => {
			  // entry.isIntersecting //  화면 안에 요소가 들어있냐 없냐를 확인
			  if(entry.isIntersecting) {
				  const target = entry.target;
			      const previousSibling = target.previousSibling;

				  console.log('callback', entry.target.dataset.src);
				  // 이 시점에 img 태그의 src 요소가 생겨, 이때 이미지 리소스를 로드
				  target.src = target.dataset.src; // 콜백 함수가 호출되면 이미지를 요청!
				  // source 태그도 lazy 로딩 적용
				  previousSibling.srcset = previousSibling.dataset.srcset;

				  // 최초 한 번만 호출되어야 하므로 unobserve 
				  observer.unobserve(entry.target)
			  }
			});
		  };

		// 옵저버 객체 등록
		const observer = new IntersectionObserver(callback, options);
		observer.observe(imgRef.current)	
	}, [])

	return (
		<div className="Card text-center">
			<picture>
				<source data-srcset={props.webp} type='image/webp' />
				{/* 에러 확인 용
				<source data-srcset={props.webp + 's'} type='image/wp' /> */}
				<img data-src={props.image} alt="img" ref={imgRef} />
			</picture>
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
