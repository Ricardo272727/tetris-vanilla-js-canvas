document.body.style.padding = '0px';
document.body.style.margin = '0px';

// Los objetos se dibujaran en unas coordenadas especificas,
// tendran un metodo draw(x,y, degs)
//  este metodo va a renderizar a partir de unas coordenadas
//  x,y sera la coordenada de la esquina superior izquierda
//  de la figura
// 
// La clase de manejo necesita verificar en que coordenadas 
// puede una figura renderizarse 

class Square{
  constructor(color, step, ctx){
    this.id = Math.random() + '-sq';
    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.width = this.height = 15;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  draw(x, y){
    this.x = x;
    this.y = y;
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.translate(x, y);
    this.ctx.fillRect(0, 0, 15, 15);
    this.ctx.restore();
  }

  drawLastPos(){
    this.draw(this.x, this.y);
  }

  moveDown(){
    this.draw(this.x, this.y + this.step);
  }

  moveLeft(){
    this.draw(this.x - this.step, this.y);
  }

  moveRight(){
    this.draw(this.x + this.step, this.y);
  }
}


// clase L TODO: actualizar width and height con las rotaciones
class L{
  constructor(color, step, ctx){
    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }
  draw(x, y, degs = 0){
    this.x = x;
    this.y = y;
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate(degs);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, 15, 30);
    ctx.fillRect(15, 15, 45, 15);
    ctx.restore();
  }
  drawLastPos(){
    this.draw(this.x, this.y);
  }
  moveLeft(){
    this.draw(this.x - this.step, this.y);
  }
  moveRight(){
    this.draw(this.x + this.step, this.y);
  }
  moveDown(){
    this.draw(this.x, this.y + this.step);
  }
}
// clase I
class I {
  constructor(color, step, ctx){
    this.color = color;
    this.step = step;
    this.ctx = ctx;
    this.width = 45;
    this.height = 15;
    this.degs = 0;
    this.draw = this.draw.bind(this);
    this.drawLastPos = this.drawLastPos.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  draw(x, y){
    this.x = x;
    this.y = y;
    let ctx = this.ctx;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.degs);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, 45, 15);
    ctx.restore();
  }
  drawLastPos(){
    this.draw(this.x, this.y);
  }
  moveLeft(){
    this.draw(this.x - this.step, this.y);
  }
  moveRight(){
    this.draw(this.x + this.step, this.y);
  }
  moveDown(){
    this.draw(this.x, this.y + this.step);
  }
  rotate(){
    console.log('rotating');
    if(this.degs + toRadians(90) === toRadians(360)){
      this.degs = 0;
    } else {
      this.degs += toRadians(90);
    }
  }
}


function init(){
  const tetris = document.getElementById('tetris');
  const ctx = tetris.getContext('2d');
  tetris.style.width = '80vw';
  tetris.style.height = '80vh';
  tetris.style.backgroundColor = '#ccc';
  
  var draw = createDrawFunc(tetris, ctx);
  draw();
}

function getRandomPosition(width){
  return parseInt((Math.random() * 1000) % width + 1);
}

function isInInterval(x, [start, end]){
  return start <= x && x <= end;
}

function pointIsInRegion(x, y, x1, y1, width, height){
  return isInInterval(x, [x1, x1 + width])  
      && isInInterval(y, [y1, y1 + height]);
}

function canMoveRight(shape, shapesDrawed){
  for(let i = 0; i < shapesDrawed.length; i++){
    if(
      pointIsInRegion(
        shape.x + shape.step + shape.width,
        shape.y,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      ) ||
      pointIsInRegion(
        shape.x + shape.step + shape.width,
        shape.y + shape.height,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      )
    ){
      return false;
    }
  }
  return true;
}

function canMoveLeft(shape, shapesDrawed){
  for(let i = 0; i < shapesDrawed.length; i++){
    if(
      pointIsInRegion(
        shape.x - shape.step,
        shape.y,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      ) ||
      pointIsInRegion(
        shape.x - shape.step,
        shape.y + shape.height,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      )
    ){
      return false;
    }
  }
  return true;
}

function canMoveDown(shape, shapesDrawed){
  for(let i = 0; i < shapesDrawed.length; i++){
    if(
      pointIsInRegion(
        shape.x, 
        shape.y + shape.step + shape.height,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      ) ||
      pointIsInRegion(
        shape.x + shape.width,
        shape.y + shape.step + shape.height,
        shapesDrawed[i].x,
        shapesDrawed[i].y,
        shapesDrawed[i].width,
        shapesDrawed[i].height
      )
    ){
      return false;
    }
  }
  return true;
}

function getColor(){
  const colors = [
    '#1013FC',
    '#1999FB',
    '#E85418',
    '#ECC80A',
    '#1BF944',
    '#E7108E'
  ];
  let index = Math.floor(Math.random() * 100) % colors.length;
  return colors[index];
}

let shapes = ['L','I','S'];
let indexNewShape = -1;
function getNewShape(){
  if(indexNewShape + 1 < shapes.length)
    indexNewShape ++;
  else 
    indexNewShape = 0;
  console.log(shapes[indexNewShape]);
  return shapes[indexNewShape];
}

function createDrawFunc(canvas, ctx){
  var step = 5; 
  var speed = 200;
  var s = new Square(getColor(), step, ctx);
  var randomPos = getRandomPosition(canvas.width);
  s.draw(randomPos, 0);
  var objects = [];
  objects.push(s);
  var currentObj = objects[0];
  
  document.addEventListener('keydown', function(ev){
    ev.preventDefault();
    switch(ev.key){
      case "ArrowLeft":
        if(currentObj.x > 0 && canMoveLeft(currentObj, objects))
          currentObj.moveLeft();
        break;
      case "ArrowRight":
        if(currentObj.x + currentObj.width < canvas.width
          && canMoveRight(currentObj, objects))
          currentObj.moveRight();
        break;
      case "ArrowDown":
        if(
          currentObj.y + currentObj.height < canvas.height
          && canMoveDown(currentObj, objects)
        )
          currentObj.moveDown();
        break;
      case " ":
        if(currentObj.rotate)
          currentObj.rotate();
        break;
      default:
        console.log(ev.key);
    }
  });

  var draw = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(
      currentObj.y + currentObj.height < canvas.height 
      && canMoveDown(currentObj, objects)
    ){
      currentObj.moveDown();
     } else {
      // create new object
      let newShape;
       switch(getNewShape()){
        case 'S':
           newShape = new Square(getColor(), step, ctx);
           break;
        case 'I':
          newShape = new I(getColor(), step, ctx);
          break;
        case 'L':
          //newShape = new L(getColor(), step, ctx);
        default:
           newShape = new Square(getColor(), step, ctx);
      }
      
      objects.push(newShape);
      currentObj = objects[objects.length - 1];
      var pos = getRandomPosition(canvas.width);
      currentObj.draw(pos, 0);
    }
    for(let i = 0; i < objects.length; i++){
      objects[i].drawLastPos();
    }
    setTimeout(draw, speed);
  }
  return draw;
}

function toRadians(degs){
  return degs * Math.PI / 180;
}

init();












