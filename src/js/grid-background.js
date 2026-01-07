// Gradient grid background
class GradientGrid {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = window.innerWidth > 767 ? 40 : 20;
    
    this.setupCanvas();
    this.drawGrid();
    
    window.addEventListener('resize', () => this.handleResize());
  }
  
  setupCanvas() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    document.body.prepend(this.canvas);
  }
  
  getColorByPosition(position) {
    const colors = [
      { r: 101, g: 64, b: 251 },    // accent violet
      { r: 154, g: 131, b: 247 },   // gradient purple light
      { r: 151, g: 172, b: 248 },   // gradient purple blue
      { r: 210, g: 64, b: 251 },    // pink
      { r: 73, g: 38, b: 216 },     // purple-40
      { r: 38, g: 56, b: 89 },      // button-grey
      { r: 19, g: 25, b: 34 },      // blue-dark
    ];
    
    // Плавная интерполяция между цветами
    const totalColors = colors.length;
    const colorIndex = position * (totalColors - 1);
    const index1 = Math.floor(colorIndex);
    const index2 = Math.min(index1 + 1, totalColors - 1);
    const blend = colorIndex - index1;
    
    const color1 = colors[index1];
    const color2 = colors[index2];
    
    return {
      r: Math.round(color1.r + (color2.r - color1.r) * blend),
      g: Math.round(color1.g + (color2.g - color1.g) * blend),
      b: Math.round(color1.b + (color2.b - color1.b) * blend)
    };
  }
  
  createGradient(x1, y1, x2, y2) {
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    
    // Создаем градиент на основе позиции в пространстве
    const positions = [0, 0.33, 0.66, 1];
    const alphas = [0.25, 0.20, 0.15, 0.10];
    
    positions.forEach((pos, i) => {
      const color = this.getColorByPosition(pos);
      gradient.addColorStop(pos, `rgba(${color.r}, ${color.g}, ${color.b}, ${alphas[i]})`);
    });
    
    return gradient;
  }
  
  drawGrid() {
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Horizontal lines
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.strokeStyle = this.createGradient(0, y, this.canvas.width, y);
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
    
    // Vertical lines
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.strokeStyle = this.createGradient(x, 0, x, this.canvas.height);
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
  }
  
  handleResize() {
    this.gridSize = window.innerWidth > 767 ? 40 : 20;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.drawGrid();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new GradientGrid());
} else {
  new GradientGrid();
}

