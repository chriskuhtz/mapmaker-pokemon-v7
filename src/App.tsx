import { useState } from 'react';
import './App.css';
import { MapEditor } from './components/MapEditor';
import { ToolSelection } from './components/ToolSelection';

export const tileSize = 16;
export interface GameMap {
	baseLayer: TileIdentifier[][];
	decorationLayer: (TileIdentifier | undefined)[][];
	obstacleLayer: (TileIdentifier | undefined)[][];
}

export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
export const App = () => {
	const [selected, setSelected] = useState<TileIdentifier | undefined>();

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr' }}>
			<MapEditor selected={selected} />
			<ToolSelection selected={selected} setSelected={setSelected} />
		</div>
	);
};
