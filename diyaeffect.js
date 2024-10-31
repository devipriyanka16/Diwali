let diyas = [];
let targetPositions = [];
let targetText = "Happy Diwali";
let fontSize = 200;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(fontSize);
    textFont('Georgia');
    fill(255);

    // Generate positions for diyas to form text
    for (let x = 0; x < width; x += 15) {
        for (let y = 0; y < height; y += 15) {
            if (textContainsPoint(targetText, x, y)) {
                targetPositions.push({ x, y });
            }
        }
    }

    // Create diyas at random positions outside the canvas to "fly in"
    for (let i = 0; i < targetPositions.length; i++) {
        diyas.push(new Diya(random(-width, width * 2), random(-height, height * 2), targetPositions[i]));
    }
}

function draw() {
    background(30, 30, 50);
    for (let diya of diyas) {
        diya.update();
        diya.show();
    }
}

function textContainsPoint(text, x, y) {
    // Check if a point is within the drawn text for diya alignment
    return textWidth(text) && dist(x, y, width / 2, height / 2) < 200; // Customize range as per need
}

class Diya {
    constructor(startX, startY, target) {
        this.x = startX;
        this.y = startY;
        this.targetX = target.x;
        this.targetY = target.y;
        this.size = random(8, 12);
        this.flameSize = this.size / 2;
    }

    update() {
        // Move diya towards target position
        this.x = lerp(this.x, this.targetX, 0.05);
        this.y = lerp(this.y, this.targetY, 0.05);
    }

    show() {
        // Draw the base of the diya
        fill(139, 69, 19); // Dark brown color for diya base
        ellipse(this.x, this.y, this.size, this.size / 2);

        // Draw the flame of the diya
        fill(255, 140, 0); // Orange for outer flame
        ellipse(this.x, this.y - this.flameSize / 2, this.flameSize, this.flameSize * 1.5);
        fill(255, 215, 0); // Yellow for inner flame
        ellipse(this.x, this.y - this.flameSize / 2, this.flameSize / 2, this.flameSize);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
