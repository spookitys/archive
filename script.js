document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    
    
    let currentOffset = 0;
    const speed = 0.25; 

    
    function animate() {
        currentOffset += speed; 
        
        
        
        const period = 56.57;
        const transformValue = (currentOffset % period);
        
        
        document.documentElement.style.setProperty('--stripe-offset', `${transformValue}px`);
        
        requestAnimationFrame(animate);
    }
    
    
    animate();

    
    const verifyBtn = document.querySelector('.verify-btn');
    const warningBox = document.querySelector('.warning-box');

    if (verifyBtn && warningBox) {
        verifyBtn.addEventListener('click', handleVerifyClick);
    }

    function handleVerifyClick() {
        
        if (verifyBtn.classList.contains('ready-to-proceed')) {
            window.location.href = 'home.html';
            return;
        }

        
        if (verifyBtn.disabled) return;
        verifyBtn.disabled = true;
        
        verifyBtn.style.opacity = '0';
        verifyBtn.style.pointerEvents = 'none';
        
        
        const setContentWithTransition = (newContent) => {
            
            const currentRect = warningBox.getBoundingClientRect();
            const startHeight = currentRect.height;
            const startWidth = currentRect.width;
            
            warningBox.style.height = `${startHeight}px`;
            warningBox.style.width = `${startWidth}px`;
            
            
            
            warningBox.innerHTML = newContent;

            
            
            
            
            const savedTransition = warningBox.style.transition;
            warningBox.style.transition = 'none';
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
            count--; 
            if (count > 0) {
                countdownEl.textContent = count;
                
                countdownEl.style.animation = 'none';
                countdownEl.offsetHeight; 
                countdownEl.style.animation = 'pulseRed 0.9s ease-out forwards'; 
                
                
            } else {
                clearInterval(countdownInterval);
                playFractalSequence(); 
            }
        }, 1000); 
    }

    
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
        
        const img = new Image();
        img.className = "fractal-gif fade-in";
        img.alt = "Sequence";
        
        img.onload = () => {
            
            updateBoxContent(img.outerHTML);
            
            setTimeout(() => {
                playDotsSequence();
            }, 3000); 
        };
        
        img.src = "assets/fractal.gif";
    }

    function playDotsSequence() {
        
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
        
        const verifyBtn = document.querySelector('.verify-btn');
        updateBoxContent(`
            <p class="warning-green fade-in">
                Lifeform detected, press the countinue button to proceed.
            </p>
        `);

        
        verifyBtn.textContent = "CONTINUE";
        verifyBtn.disabled = false;
        verifyBtn.style.opacity = '1';
        verifyBtn.style.pointerEvents = 'auto';
        verifyBtn.style.cursor = 'pointer';
        verifyBtn.classList.add('ready-to-proceed');
    }

    
    const tooltip = document.getElementById('cursor-tooltip');
    
    
    if (tooltip) {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                tooltip.textContent = element.getAttribute('data-tooltip');
                tooltip.style.opacity = '1';
                
                
                let x = e.clientX + 15;
                let y = e.clientY + 15;
                
                
                if (x + 250 > window.innerWidth) {
                    x = e.clientX - 265; 
                }
                if (y + 100 > window.innerHeight) {
                    y = e.clientY - 100; 
                }

                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
            });

            element.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
        });
    }

    
    const modal = document.getElementById('announcement-modal');
    if (modal) {
        const modalTitle = document.getElementById('modal-title');
        const modalSubheader = document.getElementById('modal-subheader');
        const modalText = document.getElementById('modal-text');
        const closeBtn = document.querySelector('.modal-close-btn');
        const announcementFolders = document.querySelectorAll('.announcement-folder');

        announcementFolders.forEach(folder => {
            folder.addEventListener('click', () => {
                
                const division = folder.getAttribute('data-division');
                const header = folder.getAttribute('data-header'); 
                const text = folder.getAttribute('data-text');
                
                
                
                
                
                modalTitle.textContent = header;
                if (modalSubheader) modalSubheader.textContent = division;
                modalText.textContent = text;
                
                modal.classList.remove('hidden');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
});
