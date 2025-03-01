export interface TileMap {
	height: number;
	width: number;
	src: string;
	gap: number;
}
export const tileMaps: Record<string, TileMap> = {
	fireRedBase: {
		src: "url('/tilesets/fireRedBase.png')",
		height: 47,
		width: 28,
		gap: 1,
	},
	palletTown: {
		src: "url('/tilesets/palletTown.png')",
		height: 20,
		width: 24,
		gap: 0,
	},
	oaksLab: {
		src: "url('/tilesets/oaksLab.png')",
		height: 14,
		width: 13,
		gap: 0,
	},
};
