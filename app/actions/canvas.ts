import { GateCoords } from "../interfaces/canvas";

export function drawWire(ctx: CanvasRenderingContext2D, init: GateCoords, current: GateCoords): void {
    ctx.beginPath();

    // Normalise for horizontal/vertical drawing
    const breakpoint: GateCoords = {
        y: (init.y + current.x),
        x: (current.x)
    }  

    ctx.moveTo(init.x, init.y);
    ctx.lineTo(breakpoint.x, breakpoint.y);
    ctx.lineTo(current.x, current.y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 14;
    ctx.stroke();
}