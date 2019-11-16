// constants
const COLOR = { grey: 0x21252f, pink: 0xec407a, white: 0xf2f5ea };
const HUD_HEIGHT = 60;
const FONT_STYLE = {
    fontSize: 20,
    fontFamily: 'Courier New',
    fill: 0xffffff,
    wordWrap: true,
    wordWrapWidth: 800
};

// create application
const app = new PIXI.Application({
    backgroundColor: COLOR.grey,
    antialias: true
});

this._aboutMe = new PIXI.Text('Hello! In this test for SOFTGAMES, I needed:\n\n' +
    '-  Create 144 sprites (NOT graphics object) that are stacked on each other like cards in a deck(so object above covers bottom one, but not completely). Every second 1 object from top of stack goes to other stack - animation of moving should be 2 seconds long. So at the end of whole process you should have reversed stack. Display number of fps in left top corner and make sure, that this demo runs well on mobile devices.\n\n' +
'- Create a tool that will allow mixed text and images in an easy way (for example displaying text with emoticons or prices with money icon). It should come up every 2 seconds a random text with images in random configuration (image + text + image, image + image + image, image + image + text, text + image + text etc) and a random font size.\n\n' +
'- Particles - make a demo that shows an awesome fire effect. Please keep number of images low (max 10 sprites on screen at once). Feel free to use existing libraries how you would use them in a real project.', FONT_STYLE);
this._aboutMe.anchor.set(0, 0);
this._aboutMe.y = HUD_HEIGHT / 2;
this._aboutMe.x = 10;

app.stage.addChild(_aboutMe);
document.body.appendChild(app.view);
