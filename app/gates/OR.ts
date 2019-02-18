import { GateCoords, GateSize, Nodes } from '../interfaces/canvas';
import Gates from './Gates';
import GateNode from './Node';

let img = require('../img/or.svg')
export default class OrGate extends Gates<OrGate> {

	public constructor(ctx: CanvasRenderingContext2D) {
		super();
		this.ctx = ctx;
		this.svg = new Image();
		this.svg.src = img;

		this.nodeOffsetStart = [{ x: 40, y: 20.5 }]
		this.nodeOffsetEnd = [{ x: 0, y: 1.5 }, { x: 0, y: 39.5 }]
	}

	public add = (c: GateCoords, s: GateSize): Nodes<OrGate> => {
		const c1: GateCoords = { x: c.x + this.nodeOffsetEnd[0].x, y: c.y + this.nodeOffsetEnd[0].y }
		const c2: GateCoords = { x: c.x + this.nodeOffsetEnd[1].x, y: c.y + this.nodeOffsetEnd[1].y }

		const c3: GateCoords = { x: c.x + this.nodeOffsetStart[0].x, y: c.y + this.nodeOffsetStart[0].y }

		this.state = {
			coords: { x: c.x, y: c.y },
			size: s,
			nodes: {
				start: [new GateNode<OrGate>(this, c3, "start")],
				end: [new GateNode<OrGate>(this, c1, "end"), new GateNode<OrGate>(this, c2, "end")]
			}
		}

		this.render();

		return this.state.nodes;
	}

}