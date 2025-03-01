import { useState } from 'react';
import './App.css';
import { TileMapViewer } from './components/TileMapViewer';
import { tileMaps } from './constants/tileMaps';

const initialMap: TileIdentifier[][] = [
	[{ src: "url('/tilesets/fireRedBase.png')", yOffset: 1, xOffset: 1 }],
];

export interface TileIdentifier {
	src: string;
	yOffset: number;
	xOffset: number;
}
export const App = () => {
	const [selected, setSelected] = useState<TileIdentifier | undefined>();

	const [newMap, setNewMap] = useState<TileIdentifier[][]>(initialMap);

	return (
		<div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr' }}>
			<div>
				<h2>My Map</h2>
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
							gridTemplateColumns: `${Array.from({ length: newMap[0].length })
								.map(() => '1fr')
								.join(' ')}`,
							gap: '2px',
						}}
					>
						{newMap.map((row, i) =>
							row.map(({ src, yOffset, xOffset }, j) => {
								return (
									<div
										onClick={() => {
											if (!selected) {
												return;
											}
											setNewMap((newMap) =>
												newMap.map((row, h) => {
													return row.map((el, k) => {
														if (h === i && k === j) {
															return selected;
														}
														return el;
													});
												})
											);
										}}
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
					<div
						style={{ border: '1px solid white' }}
						onClick={() =>
							setNewMap((newMap) =>
								newMap.map((row) => [...row, row[row.length - 1]])
							)
						}
					>
						add Column
					</div>
					<div
						style={{ border: '1px solid white' }}
						onClick={() =>
							setNewMap((newMap) => [...newMap, newMap[newMap.length - 1]])
						}
					>
						add Row
					</div>
				</div>
			</div>
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
		</div>
	);
};
