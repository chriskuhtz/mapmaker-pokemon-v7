import { JSX } from 'react';
import { useDrawBackground } from './useDrawBackground';
import { GameMap, tileSize } from './interfaces';
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
