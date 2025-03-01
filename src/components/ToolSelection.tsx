import { JSX } from 'react';
import { TileIdentifier, tileSize } from '../App';
import { tileMaps } from '../constants/tileMaps';
import { TileMapViewer } from './TileMapViewer';

export const ToolSelection = ({
	selected,
	setSelected,
}: {
	selected: TileIdentifier | undefined;
	setSelected: (x: TileIdentifier) => void;
}): JSX.Element => {
	return (
		<div>
			<h2 style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
				Selected:{' '}
				{selected ? (
					<div
						style={{
							scale: 2,
							height: tileSize,
							width: tileSize,
							background: `url(/tilesets/fireRedBase.png) ${selected.xOffset}px ${selected.yOffset}px`,
						}}
					></div>
				) : (
					'Select a Tile'
				)}
			</h2>

			{Object.entries(tileMaps).map(([name, t]) => (
				<TileMapViewer name={name} t={t} key={name} onClick={setSelected} />
			))}
		</div>
	);
};
