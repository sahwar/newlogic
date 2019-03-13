import { GateCoords, GateSize, Nodes } from '../interfaces/canvas';
import Gates from './Gates';
import GateNode from './Node';

// import img from '../img/and.svg'
let img = require('../img/and.svg')
export default class AndGate extends Gates<AndGate> {
	svg = new Image();
	nodeOffsetStart = [{ x: 40, y: 20.5 }]
	nodeOffsetEnd = [{ x: 0, y: 1.5 }, { x: 0, y: 39.5 }]

	public static LOAD = (ctx: CanvasRenderingContext2D): Promise<boolean> => new Promise<boolean>((resolve, _) => {
		const listen = (_: Event): void => resolve(true);
		const svg = new Image();
		svg.src = img;

		ctx.drawImage(svg, 0, 0, 0, 0);
		svg.addEventListener("load", listen);
	})

	public constructor(ctx: CanvasRenderingContext2D) {
		super();
		this.ctx = ctx;
		this.svg.src = img;
	}

	public add = (c: GateCoords, s: GateSize, id?: number): Nodes<any> => {
		this.svg.src = img;
		const c1: GateCoords = { x: c.x + this.nodeOffsetEnd[0].x, y: c.y + this.nodeOffsetEnd[0].y }
		const c2: GateCoords = { x: c.x + this.nodeOffsetEnd[1].x, y: c.y + this.nodeOffsetEnd[1].y }

		const c3: GateCoords = { x: c.x + this.nodeOffsetStart[0].x, y: c.y + this.nodeOffsetStart[0].y }

		this.state = {
			coords: { x: c.x, y: c.y },
			size: s,
			nodes: {
				start: [new GateNode<AndGate>(this, c3, "start")],
				end: [new GateNode<AndGate>(this, c1, "end"), new GateNode<AndGate>(this, c2, "end")]
			},
			gateIn: new Array(),
			gateOut: new Array(),
			id: !!id ? id : Gates.INCID()
		}

		this.render();

		return this.state.nodes;
	}

	public evaluate = (): void => {
		this.upEval();
		
		// Bitwise AND
		this.state.nodes.start[0].setVal(
			this.state.nodes.end[0].getVal() && this.state.nodes.end[1].getVal()
		);
	}

}