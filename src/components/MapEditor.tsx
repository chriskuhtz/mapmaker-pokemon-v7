import { JSX, useEffect } from 'react';
import { GameMap, tileSize, Tool } from '../App';
import { useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

export const MapEditor = ({
	tool,
}: {
	tool: Tool | undefined;
}): JSX.Element => {
	const { newMap, addColumn, addRow, changeTile } = useMapEditor({ tool });
	return (
		<div>
			<h2>
				My Map {newMap.baseLayer.length}/{newMap.baseLayer[0].length}
			</h2>
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.baseLayer}
				layerName="Base"
			/>
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.decorationLayer}
				layerName="Decoration"
			/>
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.obstacleLayer}
				layerName="Obstacle"
			/>
			<CombinedCanvas newMap={newMap} />
		</div>
	);
};

export const CombinedCanvas = ({
	newMap,
}: {
	newMap: GameMap;
}): JSX.Element => {
	useDrawBackground('assembled', newMap);

	return (
		<div>
			<h1>Assembled Canvas:</h1>
			<canvas
				id="assembled"
				style={{ border: '1px solid red' }}
				height={newMap.baseLayer.length * tileSize}
				width={newMap.baseLayer[0].length * tileSize}
			></canvas>
		</div>
	);
};

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
