const canvas = document.querySelector('.fireworks-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create a firework
function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.exploded = false;

    this.initialize();
}

// Initialize firework
Firework.prototype.initialize = function() {
    for (let i = 0; i < 100; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        this.particles.push({
            x: this.x,
            y: this.y,
            velocityX: Math.cos(angle) * speed,
            velocityY: Math.sin(angle) * speed,
            size: Math.random() * 3 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        });
    }
    this.exploded = true;
};

// Update particles
Firework.prototype.update = function() {
    if (!this.exploded) return;

    this.particles.forEach((particle, index) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.1; // Gravity effect

        if (particle.size > 0.1) {
            particle.size -= 0.1; // Fade out effect
        } else {
            this.particles.splice(index, 1);
        }
    });
};

// Draw particles
Firework.prototype.draw = function() {
    if (!this.exploded) return;

    this.particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
    });
};

// Create fireworks at random positions
function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const firework = new Firework(x, y);
    fireworks.push(firework);
}

// Update and draw fireworks
const fireworks = [];
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles.length === 0) {
            fireworks.splice(index, 1); // Remove finished firework
        }
    });

    requestAnimationFrame(animate);
}

// Trigger fireworks every second
setInterval(createFirework, 1000);

// Trigger explosion and reveal card after lights blink


// Create lights dynamically
const lightsContainer = document.querySelector('.lights');
const lightCount = 100; // Increase the number of lights
for (let i = 0; i < lightCount; i++) {
    const light = document.createElement('div');
    light.classList.add('light');
    lightsContainer.appendChild(light);
}

// Start the animation loop
animate();
