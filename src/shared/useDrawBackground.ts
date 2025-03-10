import { useEffect } from 'react';
import { GameMap, tileSize } from './interfaces';

export const useDrawBackground = (canvasId: string, map: GameMap) => {
	useEffect(() => {
		const el: HTMLCanvasElement | null = document.getElementById(
			canvasId
		) as HTMLCanvasElement | null;
		const ctx = el?.getContext('2d');

		const { baseLayer, obstacleLayer, decorationLayer } = map;
		const spriteSheet = new Image();
		ctx?.clearRect(
			0,
			0,
			baseLayer[0].length * tileSize,
			baseLayer.length * tileSize
		);

		spriteSheet.addEventListener('load', () => {
			baseLayer.forEach((row, h) => {
				row.forEach((el, w) => {
					ctx?.drawImage(
						spriteSheet,
						-el.xOffset,
						-el.yOffset,
						tileSize,
						tileSize,
						tileSize * w,
						tileSize * h,
						tileSize,
						tileSize
					);
					const deco = decorationLayer[h][w];
					if (deco) {
						ctx?.drawImage(
							spriteSheet,
							-deco.xOffset,
							-deco.yOffset,
							tileSize,
							tileSize,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}

					const ob = obstacleLayer[h][w];
					if (ob) {
						ctx?.drawImage(
							spriteSheet,
							-ob.xOffset,
							-ob.yOffset,
							tileSize,
							tileSize,
							tileSize * w,
							tileSize * h,
							tileSize,
							tileSize
						);
					}
				});
			});
		});

		spriteSheet.src = '/tilesets/fireRedBase.png';
	}, [canvasId, map]);
};
