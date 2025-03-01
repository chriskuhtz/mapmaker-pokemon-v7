import { JSX } from 'react';
import { TileIdentifier } from '../App';
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
							scale: 4,
							height: 16,
							width: 16,
							background: `${selected.src} ${selected.xOffset}px ${selected.yOffset}px`,
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
