const container = document.getElementById('grid-container');

const numCols = Math.floor(window.innerWidth / 50); 
const numRows = Math.floor(window.innerHeight / 50); 

for (let i = 0; i < numCols * numRows; i++) {
    const cell = document.createElement('div');
    cell.classList.add('grid-item');
    container.appendChild(cell);
}

//create circles
function createCircles() {
    const existingCircles = document.querySelectorAll('.circle');
    existingCircles.forEach(circle => circle.remove());

    //circles with labels
    const circleContainer = document.querySelector('.circle-container');
    const labels = [
        "Commerce Tools", "Shopware", "Dan Domain", "Plentymarkets", "CCV Shop",
        "Magneto", "Shopify", "WooCommerce", "OpenCart", "xt: Commerce", "OXID",
        "Presta Shop", "JTL"
    ];

    labels.forEach(label => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.dataset.label = label;
        circleContainer.appendChild(circle);
        circle.style.zIndex = '10000';
    });
}

createCircles();


//calculate the intersection point of a line with a circle
function calculateIntersectionPoint(x1, y1, x2, y2, cx, cy, r) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dr = Math.sqrt(dx * dx + dy * dy);
    const D = x1 * y2 - x2 * y1;

    const discriminant = r * r * dr * dr - D * D;
    if (discriminant < 0) {
        return null; // No intersection
    }

    const sqrtDiscriminant = Math.sqrt(discriminant);

    const sign = (dy < 0) ? -1 : 1;

    const intersectionX1 = (D * dy + sign * dx * sqrtDiscriminant) / (dr * dr);
    const intersectionX2 = (D * dy - sign * dx * sqrtDiscriminant) / (dr * dr);

    const intersectionY1 = (-D * dx + Math.abs(dy) * sqrtDiscriminant) / (dr * dr);
    const intersectionY2 = (-D * dx - Math.abs(dy) * sqrtDiscriminant) / (dr * dr);

    return { x1: intersectionX1, y1: intersectionY1, x2: intersectionX2, y2: intersectionY2 };
}

//create connecting lines
function createLines() {
    const box = document.querySelector('.box');
    const circles = document.querySelectorAll('.circle');

    const boxRect = box.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;

    circles.forEach((circle, index) => {
        const circleRect = circle.getBoundingClientRect();
        const circleCenterX = circleRect.left + circleRect.width / 2;
        const circleCenterY = circleRect.top + circleRect.height / 2;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
        svg.style.position = 'absolute';
        svg.style.top = 0;
        svg.style.left = 0;
        document.body.appendChild(svg);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        // Calculate line coordinates
        let x1, y1, x2, y2;
        if (index === 0) {
            // First circle
            x1 = boxCenterX - (boxRect.width / 2); // Go straight left first
            y1 = boxCenterY;
            x2 = circleCenterX;
            y2 = circleCenterY;
        } else if (index === circles.length - 1) {
            // Last circle
            x1 = boxCenterX + (boxRect.width / 2); // Go straight right first
            y1 = boxCenterY;
            x2 = circleCenterX;
            y2 = circleCenterY;
        } else {
            // Other circles
            x1 = boxCenterX;
            y1 = boxCenterY;
            x2 = circleCenterX;
            y2 = circleCenterY;
        }

        // Calculate intersection point with circle
        const intersectionPoint = calculateIntersectionPoint(x1, y1, x2, y2, circleCenterX, circleCenterY, circleRect.width / 2);

        // Set line coordinates to the intersection point
        if (intersectionPoint) {
            x2 = intersectionPoint.x1;
            y2 = intersectionPoint.y1;
        }

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);

        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.3)');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    });
}

createLines();

const box = document.querySelector('.box');
box.classList.add('glowing');

const circles = document.querySelectorAll('.circle');
circles.forEach(circle => {
    circle.classList.add('circle-glowing');
});

const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(gridItem => {
    gridItem.classList.add('lighting-up');
});