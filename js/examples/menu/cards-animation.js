// constants
const COLOR = { grey: 0x21252f, pink: 0xec407a, white: 0xf2f5ea };
const DURATION = 50;
const PATH = 50;
let lastY = 164;
let cardCount = 143;

// create application
const app = new PIXI.Application({
    backgroundColor: COLOR.grey,
    antialias: true,
});
document.body.appendChild(app.view);

const cards = [];

const totalSprites = 144;

for (let i = 0; i < totalSprites; i++) {
    // create a new Sprite
    const card = PIXI.Sprite.from('../assets/images/card.png');

    card.tint = Math.random() * 0xE8D4CD;

    // set the anchor point so the texture is centerd on the sprite
    card.anchor.set(0.5);

    // scatter them all
    card.x = 128;
    card.y = lastY + 2;
    lastY = card.y;

    card.tint = Math.random() * 0x808080;

    // finally we push the dude into the maggots array so it it can be easily accessed later
    cards.push(card);

    app.stage.addChild(card);
}

lastY = 164;

// add graphics
const graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

// create and add interactive dots
let dot1 = createDot(128, 450, 1);
app.stage.addChild(dot1);

let dot2 = createDot(228, 200, 2);
app.stage.addChild(dot2);

let dot3 = createDot(628, 200, 3);
app.stage.addChild(dot3);

let dot4 = createDot(728, 164, 4);
app.stage.addChild(dot4);


// runs an update loop
let elapsedTime = 0;
    app.ticker.add(function(deltaTime) {
        update(deltaTime, cards[cardCount]);
        console.log(dot4.y);
        console.log(cards[cardCount].y);
        if(cards[cardCount].y >= dot4.y -2 && cards[cardCount].y <= dot4.y +2){
            dot4.y = lastY + 2;
            lastY = dot4.y;
            cardCount --;
        }
        if(cardCount <= 0)
        {
            let pAux = dot1;
            dot1.position = dot4.position;
            dot4.position = pAux.position;
            pAux = dot2;
            dot2.position = dot3.position;
            dot3.position = pAux.position;
            cardCount = 143;
        }
    });


function createDot(x, y, id) {
    // create a PIXI graphics object
    const dot = new PIXI.Graphics();
    dot.beginFill(COLOR.pink, 0.05);
    dot.position.set(x, y);
    dot.dragOffset = new PIXI.Point();


    // enable the dot to be interactive
    // this will allow it to respond to mouse and touch events
    dot.interactive = true;

    // this button mode will mean the hand cursor appears
    // when you roll over the bunny with your mouse
    dot.buttonMode = true;

    return dot;
}

function update(deltaTime, walker) {
    elapsedTime += deltaTime;
    const t = (elapsedTime % DURATION) / DURATION;
    walker.position = cubicBezier(t, dot1, dot2, dot3, dot4);
}

// first call
//draw();

function draw() {
    graphics.clear();

    // line between dots
    graphics.lineStyle(5, COLOR.pink, 0.25);
    graphics.moveTo(dot1.x, dot1.y);
    graphics.lineTo(dot2.x, dot2.y);
    graphics.lineTo(dot3.x, dot3.y);
    graphics.lineTo(dot4.x, dot4.y);

    // draw path
    graphics.lineStyle(0);
    graphics.beginFill(COLOR.white);
    for (let i = 0; i < PATH; i++) {
        const pt = cubicBezier(i / PATH, dot1, dot2, dot3, dot4);
        graphics.drawCircle(pt.x, pt.y, 2);
    }
    graphics.endFill();
}

function cubicBezier(t, p1, p2, p3, p4) {
    const t1 = 1 - t;
    // prettier-ignore
    return new PIXI.Point(
        t1**3*p1.x + 3*t1**2*t*p2.x + 3*t1*t**2*p3.x + t**3*p4.x,
        t1**3*p1.y + 3*t1**2*t*p2.y + 3*t1*t**2*p3.y + t**3*p4.y
    );
}
