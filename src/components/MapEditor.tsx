import { JSX, useState } from 'react';
import { TileIdentifier } from '../App';

const initialMap: TileIdentifier[][] = [
	[{ src: "url('/tilesets/fireRedBase.png')", yOffset: 1, xOffset: 1 }],
];

export const MapEditor = ({
	selected,
}: {
	selected: TileIdentifier | undefined;
}): JSX.Element => {
	const [newMap, setNewMap] = useState<TileIdentifier[][]>(initialMap);
	return (
		<div>
			<h2>
				My Map {newMap.length}/{newMap[0].length}
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
	);
};
