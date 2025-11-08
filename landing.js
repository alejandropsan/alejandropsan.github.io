// ========================================
// LANDING PAGE - EFECTOS Y ANIMACIONES
// ========================================

// Efecto de partículas en el fondo
class ParticlesEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speedX: Math.random() * 0.5 - 0.25,
                speedY: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, i) => {
            // Dibujartícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            // Dibujar conexiones
            this.particles.forEach((otherParticle, j) => {
                if (i === j) return;
                
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    update() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
        });
    }
    
    animate() {
        this.draw();
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// Efecto de escritura (typing)
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pausa al final
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Inicializar efectos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar partículas
    new ParticlesEffect('particles');
    
    // Inicializar efecto de escritura
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'Full Stack Developer',
            'DevOps Engineer',
            'Cybersecurity Enthusiast',
            'OSCP Candidate'
        ];
        new TypingEffect(typingElement, texts, 80);
    }
    
    // Smooth scroll para el indicador
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
});
