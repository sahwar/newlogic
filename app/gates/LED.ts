import { GateCoords, GateSize, Nodes } from '../interfaces/canvas';
import Gates from './Gates';
import GateNode from './Node';

// import img from '../img/and.svg'
let img = require('../img/switch.svg')
export default class LED extends Gates<LED> {

	public constructor(ctx: CanvasRenderingContext2D) {
		super();
		this.ctx = ctx;
		this.svg = new Image();
		this.svg.src = img;

		this.nodeOffsetEnd = [{ x: 0, y: 20.5 }]
	}

	public add = (c: GateCoords, s: GateSize): Nodes<LED> => {
		const c1: GateCoords = { x: c.x + this.nodeOffsetEnd[0].x, y: c.y + this.nodeOffsetEnd[0].y }

		this.state = {
			coords: { x: c.x, y: c.y },
			size: s,
			nodes: {
				start: [],
				end: [new GateNode<LED>(this, c1, "end")]
			}
		}

		this.render();

		return this.state.nodes;
	}

}