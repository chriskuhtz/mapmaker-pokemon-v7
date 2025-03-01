import { useState } from 'react';
import './App.css';
import { MapEditor } from './components/MapEditor';
import { ToolSelection } from './components/ToolSelection';

export interface GameMap {
	baselayer: TileIdentifier[][];
	decorationLayer: (TileIdentifier | undefined)[][];
	passabilityLayer: number[][];
}

export interface TileIdentifier {
	src: string;
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
