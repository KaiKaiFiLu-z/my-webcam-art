let zhuxinButton;
let myVideo;
let frozen = false;

let btn, clearBtn;
let doodleLayer;
let frozenImage;

let mySlider;

let brushSlider;

function setup() {
    createCanvas(640, 480);
    background(100);

    zhuxinButton = createButton("click me");
    zhuxinButton.size(150, 50);
    zhuxinButton.position(170, 750);
    zhuxinButton.id("my_css_button");
    zhuxinButton.mouseClicked(freezeSwitch);

    myVideo = createCapture(VIDEO);
    myVideo.size(320, 240);
    myVideo.hide();

    doodleLayer = createGraphics(320, 240);
    doodleLayer.stroke("#33FFFF");
    doodleLayer.strokeWeight(4);
    
    brushSlider = createSlider(2, 20, 3, 1);
    brushSlider.position(500, 650);
    brushSlider.style('width', '120px');

    btnCode();

}

function draw() {

    background(100);

    push();
    translate(width / 4, 50);

    if (frozen === false) {

        if (myVideo.elt.readyState >= 2) {
            image(myVideo, 0, 0, 320, 240);
        }

    } else {

        textAlign(CENTER);
        fill(255);
        text("now doodle!", 160, -10);

        image(frozenImage, 0, 0, 320, 240);
        image(doodleLayer, 0, 0);
    }

    pop();
}

function btnCode() {

    clearBtn = createButton("Clear drawing");
    clearBtn.size(110, 40);
    clearBtn.position(340, 755);
    clearBtn.mouseClicked(clearDrawing);
    clearBtn.hide();
}

function freezeSwitch() {

    console.log("Freeze button clicked");

    if (frozen === false) {

        if (myVideo.elt.readyState < 2) return;

        frozenImage = myVideo.get();

        frozen = true;

        zhuxinButton.html("unfreeze");

        clearBtn.show();

        noLoop();
        redraw();

    } else {

        frozen = false;

        zhuxinButton.html("click me");

        clearBtn.hide();
        doodleLayer.clear();

        loop();
    }
}

function mouseDragged() {

    if (frozen === true) {

        let x = mouseX - width / 4;
        let y = mouseY - 50;

        if (x >= 0 && x < 320 && y >= 0 && y < 240) {

            doodleLayer.noStroke();
            doodleLayer.fill("#33FFFF");
            doodleLayer.circle(x, y, brushSlider.value());

            redraw();
        }

        return false;
    }
}

function clearDrawing() {

    doodleLayer.clear();

    redraw();
}