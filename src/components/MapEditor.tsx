import { JSX } from 'react';
import { TileIdentifier } from '../App';
import { useMapEditor } from '../hooks/useMapEditor';

export const MapEditor = ({
	selected,
}: {
	selected: TileIdentifier | undefined;
}): JSX.Element => {
	const { newMap, addColumn, addRow, changeTile } = useMapEditor({ selected });
	return (
		<div>
			<h2>
				My Map {newMap.baseLayer.length}/{newMap.baseLayer[0].length}
			</h2>
			<div
				style={{
					padding: '2rem',
					display: 'grid',
					gridTemplateColumns: '10fr 1fr',
				}}
			>
				<div
					style={{
						scale: 1,
						width: 'min-content',
						display: 'grid',
						justifyItems: 'flex-start',
						gridTemplateColumns: `${Array.from({
							length: newMap.baseLayer[0].length,
						})
							.map(() => '1fr')
							.join(' ')}`,
						gap: '2px',
					}}
				>
					{newMap.baseLayer.map((row, i) =>
						row.map(({ src, yOffset, xOffset }, j) => {
							return (
								<div
									onClick={() => changeTile(i, j, 'Base')}
									key={'newMap' + i + j}
									style={{
										height: 16,
										width: 16,
										background: `${src} ${xOffset}px ${yOffset}px`,
									}}
								></div>
							);
						})
					)}
				</div>
				<div style={{ border: '1px solid white' }} onClick={addColumn}>
					add Column
				</div>
				<div style={{ border: '1px solid white' }} onClick={addRow}>
					add Row
				</div>
			</div>
		</div>
	);
};
