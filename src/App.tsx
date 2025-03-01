import { useState } from 'react';
import { MapEditor } from './components/MapEditor';
import { ToolSelection } from './components/ToolSelection';
import { TileIdentifier } from './shared/interfaces';

export interface TilePlacer {
	type: 'tileplacer';
	tile: TileIdentifier;
}
export interface Eraser {
	type: 'eraser';
}
export type Tool = TilePlacer | Eraser;

export const App = () => {
	const [selected, setSelected] = useState<Tool | undefined>();

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr' }}>
			<MapEditor tool={selected} />

			<ToolSelection selected={selected} setSelected={setSelected} />
		</div>
	);
};
