document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    
    // Variables for animation
    let currentOffset = 0;
    const speed = 0.25; // Constant base speed

    // Animation Loop
    function animate() {
        currentOffset += speed; // Moving Right -> Increase X
        
        // Loop the pattern
        // Pattern matches geometric period approx 56.57 (matched to CSS background-size)
        const period = 56.57;
        const transformValue = (currentOffset % period);
        
        // Apply to CSS variable
        document.documentElement.style.setProperty('--stripe-offset', `${transformValue}px`);
        
        requestAnimationFrame(animate);
    }
    
    // Start loop
    animate();
});
