import { JSX } from 'react';
import { tileSize, Tool } from '../App';
import { tileMaps } from '../constants/tileMaps';
import { TileMapViewer } from './TileMapViewer';

export const ToolSelection = ({
	selected,
	setSelected,
}: {
	selected: Tool | undefined;
	setSelected: (x: Tool) => void;
}): JSX.Element => {
	return (
		<div>
			<h2 style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
				Selected:{' '}
				{selected?.type === 'tileplacer' && (
					<div
						style={{
							scale: 2,
							height: tileSize,
							width: tileSize,
							background: `url(/tilesets/fireRedBase.png) ${selected.tile.xOffset}px ${selected.tile.yOffset}px`,
						}}
					></div>
				)}
				{selected?.type === 'eraser' && 'Eraser'}
				{!selected && 'Select a Tool'}
			</h2>
			<button
				style={{ margin: '1rem', padding: '1rem' }}
				onClick={() => setSelected({ type: 'eraser' })}
			>
				Eraser
			</button>
			{Object.entries(tileMaps).map(([name, t]) => (
				<TileMapViewer
					name={name}
					t={t}
					key={name}
					onClick={(tile) => setSelected({ type: 'tileplacer', tile })}
				/>
			))}
		</div>
	);
};
