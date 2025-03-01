import { JSX } from 'react';
import { TileIdentifier } from '../App';
import { useMapEditor } from '../hooks/useMapEditor';
import { LayerEditor } from './LayerEditor';

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
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.baseLayer}
				layerName="Base"
			/>
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.decorationLayer}
				layerName="Decoration"
			/>
			<LayerEditor
				addColumn={addColumn}
				addRow={addRow}
				changeTile={changeTile}
				layer={newMap.obstacleLayer}
				layerName="Obstacle"
			/>
		</div>
	);
};
