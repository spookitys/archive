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

    // Verify Button Logic
    const verifyBtn = document.querySelector('.verify-btn');
    const warningBox = document.querySelector('.warning-box');

    if (verifyBtn && warningBox) {
        verifyBtn.addEventListener('click', handleVerifyClick);
    }

    function handleVerifyClick() {
        // If already successful, redirect
        if (verifyBtn.classList.contains('ready-to-proceed')) {
            window.location.href = 'home.html';
            return;
        }

        // Prevent multiple clicks during sequence
        if (verifyBtn.disabled) return;
        verifyBtn.disabled = true;
        // Verify Button Hidden during animation as requested
        verifyBtn.style.opacity = '0';
        verifyBtn.style.pointerEvents = 'none';
        
        // Helper to smoothly animate height and width
        const setContentWithTransition = (newContent) => {
            // 1. Lock dimensions at current pixel values
            const currentRect = warningBox.getBoundingClientRect();
            const startHeight = currentRect.height;
            const startWidth = currentRect.width;
            
            warningBox.style.height = `${startHeight}px`;
            warningBox.style.width = `${startWidth}px`;
            
            // 2. Update content (invisible/hidden overflow prevents flashing, but we assume box-sizing handles most)
            // Note: The content change might change the natural width if not constrained
            warningBox.innerHTML = newContent;

            // 3. Measure new desired dimensions
            // We must unlock styles temporarily to measure
            // Using display:block and auto helps
            // Save transition to restore later
            const savedTransition = warningBox.style.transition;
            warningBox.style.transition = 'none';
            warningBox.style.height = 'auto';
            warningBox.style.width = 'auto'; 
            
            // We might need to ensure max-width is respected if measuring 'auto' width
            // Since max-width is in CSS, it should be fine.
            
            const newHeight = warningBox.scrollHeight; 
            const newWidth = warningBox.scrollWidth; // Or offsetWidth
            
            // 4. Reset to Start dimensions (Still with transition: none to prevent jumping)
            warningBox.style.height = `${startHeight}px`;
            warningBox.style.width = `${startWidth}px`;
            
            // Force reflow
            warningBox.offsetHeight; 
            
            // 5. Enable transition and set to New dimensions
            warningBox.style.transition = savedTransition;
            
            // Use requestAnimationFrame to ensure the style change registers for transition
            requestAnimationFrame(() => {
                warningBox.style.height = `${newHeight}px`;
                // Only animate width if it's actually changing significantly or if we want the "squeeze/expand" effect
                // However, if we lock width 800px -> 800px, it's fine. 
                // If text is small, width might be small.
                // We'll trust the measurement. 'auto' width on block elements usually fills container (800px max).
                // If we want it to shrink to content, we'd need display: inline-block or similar, 
                // but .warning-box is likely display: block (or flex column).
                // Flex column items usually stretch to width.
                // Lets check if newWidth is significantly different. 
                // If the box is display:flex, align-items: center -> we might want width to fit content?
                // The CSS says align-items: center. Items inside are centered. The box itself is width: 100%?
                // The box is inside .content-container (flex).
                // If .content-container is align-items: center, then .warning-box width depends on content or stretch.
                // Let's set it to pixel width.
                warningBox.style.width = `${newWidth}px`;
            });

            // 6. Cleanup after transition
            // Match the 500ms CSS transition
            setTimeout(() => {
                warningBox.style.height = 'auto';
                warningBox.style.width = 'auto'; // Release width constraint
            }, 500);
        };

        // 1. Initial Countdown Text
        setContentWithTransition(`
            <p class="warning-red fade-in" style="margin-bottom: 10px;">
                Last warning,<br>
                Navarro perception gate deploy in . .
            </p>
            <p class="warning-red pulse-anim" id="countdown" style="font-size: 3rem; margin-top: 0;">3</p>
        `);

        let count = 3;
        const countdownEl = document.getElementById('countdown');

        const countdownInterval = setInterval(() => {
            count--; // Decrement first
            if (count > 0) {
                countdownEl.textContent = count;
                // Reset animation
                countdownEl.style.animation = 'none';
                countdownEl.offsetHeight; 
                countdownEl.style.animation = 'pulseRed 0.9s ease-out forwards'; 
                // Use 'forwards' to keep the end state (white) if the interval is slow, 
                // but since it repeats, it will snap back to red on next tick.
            } else {
                clearInterval(countdownInterval);
                playFractalSequence(); 
            }
        }, 1000); 
    }

    // Helper reused for other sequences
    const updateBoxContent = (newContent) => {
        const warningBox = document.querySelector('.warning-box');
        
        const currentRect = warningBox.getBoundingClientRect();
        const startHeight = currentRect.height;
        const startWidth = currentRect.width;

        warningBox.style.height = `${startHeight}px`;
        warningBox.style.width = `${startWidth}px`;

        const savedTransition = warningBox.style.transition;
        warningBox.style.transition = 'none';
        
        warningBox.innerHTML = newContent;
        
        warningBox.style.height = 'auto';
        warningBox.style.width = 'auto';
        
        const newHeight = warningBox.scrollHeight;
        const newWidth = warningBox.scrollWidth;

        warningBox.style.height = `${startHeight}px`;
        warningBox.style.width = `${startWidth}px`;
        
        warningBox.offsetHeight; 

        warningBox.style.transition = savedTransition;
        
        requestAnimationFrame(() => {
            warningBox.style.height = `${newHeight}px`;
            warningBox.style.width = `${newWidth}px`;
        });

        setTimeout(() => {
            warningBox.style.height = 'auto';
            warningBox.style.width = 'auto'; 
        }, 500);
    };

    function playFractalSequence() {
        // 2. Fractal Gif
        const img = new Image();
        img.className = "fractal-gif fade-in";
        img.alt = "Sequence";
        
        img.onload = () => {
            // Only update content once dimensions are known (loaded)
            updateBoxContent(img.outerHTML);
            
            setTimeout(() => {
                playDotsSequence();
            }, 3000); 
        };
        
        img.src = "assets/fractal.gif";
    }

    function playDotsSequence() {
        // 3. Animated Dots
        updateBoxContent('<p class="warning-red" style="font-size: 2rem;">.</p>');
        const warningBox = document.querySelector('.warning-box');
        const p = warningBox.querySelector('p');
        
        let dots = 1;
        const maxDots = 3;
        const startTime = Date.now();
        const duration = 4851; 

        const dotInterval = setInterval(() => {
            if (Date.now() - startTime > duration) {
                clearInterval(dotInterval);
                showSuccessState();
                return;
            }
            
            dots = (dots % maxDots) + 1;
            p.textContent = '.'.repeat(dots);
        }, 500);
    }

    function showSuccessState() {
        // 4. Success Message
        const verifyBtn = document.querySelector('.verify-btn');
        updateBoxContent(`
            <p class="warning-green fade-in">
                Lifeform detected, press the countinue button to proceed.
            </p>
        `);

        // Re-enable button and show "CONTINUE"
        verifyBtn.textContent = "CONTINUE";
        verifyBtn.disabled = false;
        verifyBtn.style.opacity = '1';
        verifyBtn.style.pointerEvents = 'auto';
        verifyBtn.style.cursor = 'pointer';
        verifyBtn.classList.add('ready-to-proceed');
    }

    // --- Home Page Tooltip Logic ---
    const tooltip = document.getElementById('cursor-tooltip');
    
    // Only run if the tooltip element exists (i.e. we are on home.html)
    if (tooltip) {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                tooltip.textContent = element.getAttribute('data-tooltip');
                tooltip.style.opacity = '1';
                
                // Calculate position to keep it on screen
                let x = e.clientX + 15;
                let y = e.clientY + 15;
                
                // Adjust if going off screen (basic check)
                if (x + 250 > window.innerWidth) {
                    x = e.clientX - 265; // shift left
                }
                if (y + 100 > window.innerHeight) {
                    y = e.clientY - 100; // shift up
                }

                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    }
});
