import { JSX } from 'react';
import { Tool } from '../App';
import { tileMaps } from '../constants/tileMaps';
import { TileMapViewer } from './TileMapViewer';
import { tileSize } from '../shared/interfaces';

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
				Selected Tool:{' '}
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
				{!selected && '-'}
			</h2>
			<button
				style={{ margin: '1rem', padding: '1rem' }}
				onClick={() => setSelected({ type: 'eraser' })}
			>
				Eraser
			</button>
			<div style={{ maxHeight: '80dvh', overflowY: 'scroll' }}>
				{Object.entries(tileMaps).map(([name, t]) => (
					<TileMapViewer
						name={name}
						t={t}
						key={name}
						onClick={(tile) => setSelected({ type: 'tileplacer', tile })}
					/>
				))}
			</div>
		</div>
	);
};
