// Home
export interface HomeState {

}
export interface HomeProps {

}

// WinBar
export interface WinBarState {
	title: string,
	focused: boolean,
	offsetX: number,
	offsetY: number,
	width: number,
	height: number,
	resize: string
}
export interface WinBarProps {
	title: string,
	type: string,
	identity: number,
	resize: string,
}
export interface WinBarResize {
	width: number,
	height: number,
	x: number,
	y: number
}

// Workspace
export interface WorkspaceState {
	
}
export interface WorkspaceProps {
	width: number,
	height: number
}