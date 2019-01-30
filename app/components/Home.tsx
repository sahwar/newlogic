// This ccmponents controls the resizing of all of the windows
// It then sends the updated states to each component afftected by a resize
import * as React from 'react';
import { HomeProps, HomeState, WinBarResize, Child } from '../interfaces/components';

import WindowBar from './WindowBar';

let styles = require('./styles/Home.scss');

export default class Home extends React.Component<HomeProps, HomeState> {
	private _child1: WindowBar | null;
	private _child2: WindowBar | null;

	public constructor(props: HomeProps) {
		super(props);
		this.state = {
			child1: {width: 79.5, height: 80, x: 0, y: 0, initHeight: 80, initWidth: 80, initX: 0, initY: 0},
			child2: {width: 20, height: 80, x: 0, y: 0, initHeight: 80, initWidth: 80, initX: 0, initY: 0}
		};
	}

	private resizeChild = (i: number): void => {
		switch(i) {
			case 1: {
				const props: WinBarResize = {
					width: this.state.child1.width, height: this.state.child1.height, x: this.state.child1.x, y: this.state.child1.y
				};
				if (this._child1 !== null) {
					this._child1.resize(props);
				}
				break;
			}
			case 2: {
				const props: WinBarResize = {
					width: this.state.child2.width, height: this.state.child2.height, x: this.state.child2.x, y: this.state.child2.y
				};
				if (this._child2 !== null) {
					this._child2.resize(props);
				}
				break;
			}
		}
	}

	public componentDidMount(): void {
		// TODO: get these vals from settings
		this.resizeChild(1);
		this.resizeChild(2);
	}

	private onDragResize = (e: React.DragEvent<HTMLDivElement>): void => {
		let parentStyles: HTMLElement;
		let lockV = false;
		let lockH = false;
		let child: Child;
		let childOther: Child[] = [];

		console.log(e.type);
		
		if (e.currentTarget instanceof Element && e.currentTarget.parentElement instanceof Element
			&& e.currentTarget.parentElement.parentElement instanceof Element) {
			
			parentStyles = e.currentTarget.parentElement;

			switch(parentStyles.id) {
				case "child1": {
					lockV = true;
					child = this.state.child1;
					childOther.push(this.state.child2);
					break;
				}
				default: {
					child = this.state.child1;
				};
			}

			const cH =  window.innerHeight;
			const cW =  window.innerWidth;
			const mousePosX = (( e.clientX == 0 ? child.x : e.clientX - child.initX) / cW) * 100;
			const mousePosY = (( e.clientY == 0 ? child.y : e.clientY - child.initY) / cH) * 100;

			switch(e.type) {
				case "dragstart": {
					child.initHeight = (parentStyles.offsetHeight / cH) * 100;
					child.initWidth = (parentStyles.offsetWidth / cW) * 100;

					childOther.forEach((v: Child) => {
						v.initHeight = v.height;
						v.initWidth = v.width;
					});
					
					child.initX = e.clientX;
					child.initY = e.clientY;
							
					break;
				}
				case "drag": {
					if (!lockV) child.height = child.initHeight - mousePosY - 0.5;
					if (!lockH) child.width = child.initWidth - mousePosX - 0.5;

					childOther.forEach((v: Child) => {
						if (!lockV) v.height = v.initHeight + mousePosY;
						if (!lockH) v.width = v.initWidth + mousePosX;
					});

					child.x = e.clientX - child.initX;
					child.y = e.clientY - child.initY;
					break;
				}
			}

			if (child.width >= 100) child.width = 99;
			console.log(cH, child.height, e.type);
			switch(parentStyles.id) {
				case "child1": {
					this.setState({child1: child});
					this.resizeChild(1);
					this.setState({child2: childOther[0]});
					this.resizeChild(2);
					break;
				}
			}
			
		}
	}

	public render(): JSX.Element {
	
		return (
			<div>
				<div className={styles.container} data-tid="container">
					<div id={"child2"} className={styles.window}>
						<WindowBar ref={(child) => { this._child2 = child; }} resize={"horizontal"} identity={1} type={"Menu"} title={"Canvas"} />
					</div>
					<div id={"child1"} className={styles.window}>
						<div onDragEnd={this.onDragResize} onDragStart={this.onDragResize} onDrag={this.onDragResize} style={{height: this.state.child1.height.toString() + "vh"}} className={styles.barV} />
						<WindowBar ref={(child) => { this._child1 = child; }} resize={"horizontal"} identity={1} type={"Workspace"} title={"Canvas"} />
					</div>
				</div>
			</div>
		);

	}

}
