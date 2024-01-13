function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  ctx!.strokeStyle = 'red';
  ctx!.lineWidth = 15;
  ctx?.fillRect(x, y, w, h);
  ctx?.strokeRect(x, y, w, h);
}

class CanvasAudioPlayerView {
  make() {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100px';
    canvas.width = 1024;
    canvas.height = 1024;

    const ctx = canvas.getContext('2d');
    drawRect(ctx!, 30, 0, 100, 100);

    return canvas;
  }
}
