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

export interface TilePlacer {
	type: 'tileplacer';
	tile: TileIdentifier;
}
export interface Eraser {
	type: 'eraser';
}
export type Tool = TilePlacer | Eraser;
export interface TileIdentifier {
	yOffset: number;
	xOffset: number;
}
export const App = () => {
	const [selected, setSelected] = useState<Tool | undefined>();

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr' }}>
			<MapEditor tool={selected} />

			<ToolSelection selected={selected} setSelected={setSelected} />
		</div>
	);
};
