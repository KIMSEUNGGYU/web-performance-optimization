import React, { useEffect, useRef } from 'react'

function Card(props) {
	const imgRef = useRef(null)

	// 옵저버 기능을 매 순간하는 것이 아닌, 
	// 마운트 될 때 한 번만 수행해도됨
	useEffect(() => {
		const options = {};
		const callback = () => {
			console.log('callback')
		};

		// 옵저버 객체 등록
		const observer = new IntersectionObserver(callback, options);
		observer.observe(imgRef.current)	
	}, [])

	return (
		<div className="Card text-center">
			<img src={props.image} alt="img" ref={imgRef} />
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card
