import { OutState } from './../interfaces/canvas.d';
import { GateCoords, GateSize, Nodes } from '../interfaces/canvas';
import Gates from './Gates';
import GateNode from './Node';

// import img from '../img/and.svg'
let img = require('../img/switch.svg')
export default class Switch extends Gates<Switch> {

	public static LOAD = (ctx: CanvasRenderingContext2D): Promise<boolean> => new Promise<boolean>((resolve, _) => {
		const listen = (_: Event): void => resolve(true);
		const svg = new Image();
		svg.src = img;

		ctx.drawImage(svg, 0, 0, 0, 0);
		svg.addEventListener("load", listen);
	})

	public state: OutState<Switch>

	public constructor(ctx: CanvasRenderingContext2D) {
		super();
		this.ctx = ctx;
		this.svg = new Image();
		this.svg.src = img;

		this.nodeOffsetStart = [{ x: 40, y: 20.5 }]
	}

	public add = (c: GateCoords, s: GateSize, id?: number): Nodes<any> => {
		const c1: GateCoords = { x: c.x + this.nodeOffsetStart[0].x, y: c.y + this.nodeOffsetStart[0].y }

		this.state = {
			coords: { x: c.x, y: c.y },
			size: s,
			nodes: {
				start: [new GateNode<Switch>(this, c1, "start")],
				end: []
			},
			clicked: false,
			connected: false,
			gateIn: new Array(),
			gateOut: new Array(),
			id: !!id ? id : Gates.INCID()
		}

		this.render();

		return this.state.nodes;
	}

	public clickSpecific = (): void => {
		this.state.clicked = !this.state.clicked;
	}

	public evaluate = (): void => {
		this.state.nodes.start[0].setVal(this.state.clicked);
	}

}