document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    
    document.addEventListener('mousemove', (e) => {
        if (!header) return;

        const headerRect = header.getBoundingClientRect();
        const headerBottom = headerRect.bottom;
        
        // Calculate vertical distance of cursor from the header
        // e.clientY is cursor Y position relative to viewport
        // If cursor is above the header bottom, we treat distance as 0 or handle logic inside.
        // The prompt says "closer the cursor is to the header". 
        
        let distance;
        
        if (e.clientY < headerBottom) {
            // Inside the header
            distance = 0;
        } else {
            // Below the header
            distance = e.clientY - headerBottom;
        }

        // Calculate offset
        // We want the background to move RIGHT as we get CLOSER.
        // So at distance 0 (closest), offset should be Maximum.
        // At large distance (farthest), offset should be Minimum (0).
        
        const maxDist = window.innerHeight; // Use window height as a reference for "far"
        // Clamping the factor between 0 and 1
        const proximityFactor = Math.max(0, 1 - (distance / (maxDist / 1.5))); 
        
        // Max pixels to shift
        const maxShift = 50; 
        
        const offset = maxShift * proximityFactor;

        // Apply to CSS variable
        document.documentElement.style.setProperty('--stripe-offset', `${offset}px`);
    });
});