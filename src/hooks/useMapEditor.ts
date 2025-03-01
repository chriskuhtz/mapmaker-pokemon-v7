import { useState } from 'react';
import { TileIdentifier, GameMap } from '../App';

const initialBaseLayer: TileIdentifier[][] = [
	[{ src: "url('/tilesets/fireRedBase.png')", yOffset: 1, xOffset: 1 }],
];

const init: GameMap = {
	baseLayer: initialBaseLayer,
	obstacleLayer: [[]],
	decorationLayer: [[]],
};

export const useMapEditor = ({
	selected,
}: {
	selected: TileIdentifier | undefined;
}) => {
	const [newMap, setNewMap] = useState<GameMap>(init);

	const addColumn = () =>
		setNewMap((newMap) => ({
			baseLayer: newMap.baseLayer.map((row) => [...row, row[row.length - 1]]),
			obstacleLayer: newMap.obstacleLayer.map((row) => [...row, undefined]),
			decorationLayer: newMap.decorationLayer.map((row) => [...row, undefined]),
		}));
	const addRow = () =>
		setNewMap((newMap) => ({
			baseLayer: [
				...newMap.baseLayer,
				newMap.baseLayer[newMap.baseLayer.length - 1],
			],
			obstacleLayer: [
				...newMap.obstacleLayer,
				Array.from({ length: newMap.obstacleLayer.length }).map(
					() => undefined
				),
			],
			decorationLayer: [
				...newMap.decorationLayer,
				Array.from({ length: newMap.decorationLayer.length }).map(
					() => undefined
				),
			],
		}));

	const changeTile = (
		i: number,
		j: number,
		layer: 'Base' | 'Obstacle' | 'Decoration'
	) => {
		if (!selected) {
			return;
		}
		setNewMap((newMap) => ({
			baseLayer:
				layer === 'Base'
					? newMap.baseLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return selected;
								}
								return el;
							});
					  })
					: newMap.baseLayer,
			obstacleLayer:
				layer === 'Obstacle'
					? newMap.obstacleLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return selected;
								}
								return el;
							});
					  })
					: newMap.obstacleLayer,
			decorationLayer:
				layer === 'Decoration'
					? newMap.decorationLayer.map((row, h) => {
							return row.map((el, k) => {
								if (h === i && k === j) {
									return selected;
								}
								return el;
							});
					  })
					: newMap.decorationLayer,
		}));
	};

	return { newMap, addColumn, addRow, changeTile };
};
