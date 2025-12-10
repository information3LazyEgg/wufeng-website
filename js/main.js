// ==========================================
// 霧峰旅遊宣傳網 - 主要 JavaScript 功能
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavbar();
    initCarousel();
    initBackToTop();
    initSmoothScroll();
    initReadMore();
});

// ==========================================
// 導覽列功能（手機版選單切換）
// ==========================================

function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // 動畫效果：漢堡圖示變形
            this.classList.toggle('active');
        });

        // 點擊選單項目後關閉選單（手機版）
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });

        // 點擊外部區域關閉選單
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// ==========================================
// 輪播圖功能
// ==========================================

function initCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!carouselInner) return; // 如果不是首頁，直接返回

    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    const totalItems = items.length;
    let autoPlayInterval;

    // 創建指示器
    function createIndicators() {
        if (!indicatorsContainer) return;

        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (i === 0) indicator.classList.add('active');

            indicator.addEventListener('click', function() {
                goToSlide(i);
            });

            indicatorsContainer.appendChild(indicator);
        }
    }

    // 更新指示器
    function updateIndicators() {
        if (!indicatorsContainer) return;

        const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 顯示指定幻燈片
    function goToSlide(index) {
        // 移除當前活動狀態
        items[currentIndex].classList.remove('active');

        // 更新索引
        currentIndex = index;
        if (currentIndex < 0) currentIndex = totalItems - 1;
        if (currentIndex >= totalItems) currentIndex = 0;

        // 添加新的活動狀態
        items[currentIndex].classList.add('active');

        // 更新指示器
        updateIndicators();

        // 重置自動播放
        resetAutoPlay();
    }

    // 下一張
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // 上一張
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 自動播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 每5秒切換
    }

    // 重置自動播放
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // 暫停自動播放
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 事件監聽器
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // 滑鼠懸停時暫停自動播放
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // 鍵盤控制
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // 觸控滑動支援（手機版）
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', function(event) {
            touchStartX = event.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', function(event) {
            touchEndX = event.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // 向左滑動
            } else {
                prevSlide(); // 向右滑動
            }
        }
    }

    // 初始化
    createIndicators();
    startAutoPlay();
}

// ==========================================
// 返回頂部按鈕
// ==========================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');

    if (!backToTopBtn) return;

    // 滾動時顯示/隱藏按鈕
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // 點擊按鈕返回頂部
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// 平滑滾動（錨點連結）
// ==========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');

            // 忽略空錨點
            if (href === '#' || href === '#!') {
                event.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                const offsetTop = target.offsetTop - 80; // 減去導覽列高度

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// 查看更多功能（文字展開/收合）
// ==========================================

function initReadMore() {
    // 找到所有具有 data-read-more 屬性的元素
    const descriptions = document.querySelectorAll('[data-read-more]');

    descriptions.forEach(desc => {
        const maxLength = parseInt(desc.getAttribute('data-read-more')) || 150;
        const text = desc.textContent.trim();

        // 只有當文字長度超過限制時，才添加查看更多功能
        if (text.length > maxLength) {
            // 添加 collapsed 類別
            desc.classList.add('collapsed');

            // 創建「查看更多」按鈕
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = '查看更多';

            // 插入按鈕
            desc.parentNode.insertBefore(readMoreBtn, desc.nextSibling);

            // 點擊事件
            readMoreBtn.addEventListener('click', function() {
                if (desc.classList.contains('collapsed')) {
                    // 展開
                    desc.classList.remove('collapsed');
                    desc.classList.add('expanded');
                    this.textContent = '收合';
                    this.classList.add('expanded');
                } else {
                    // 收合
                    desc.classList.remove('expanded');
                    desc.classList.add('collapsed');
                    this.textContent = '查看更多';
                    this.classList.remove('expanded');

                    // 滾動回卡片頂部
                    const card = desc.closest('.item-card');
                    if (card) {
                        const offsetTop = card.offsetTop - 100;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    });
}

// ==========================================
// 滾動動畫（進入視窗時淡入）
// ==========================================

function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察所有卡片元素
    const cards = document.querySelectorAll('.item-card, .quick-nav-card, .timeline-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 可選：如果想要滾動淡入效果，請在 CSS 中添加以下樣式：
/*
.item-card, .quick-nav-card, .timeline-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.item-card.fade-in, .quick-nav-card.fade-in, .timeline-card.fade-in {
    opacity: 1;
    transform: translateY(0);
}
*/

// 取消註解下面這行以啟用滾動動畫
// initScrollAnimation();

// ==========================================
// 圖片延遲載入（優化效能）
// ==========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// 工具函數：節流（Throttle）
// ==========================================

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}

// ==========================================
// 工具函數：防抖（Debounce）
// ==========================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ==========================================
// 響應式調整（視窗大小改變時）
// ==========================================

window.addEventListener('resize', debounce(function() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');

    // 大螢幕時確保選單是展開的
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
    }
}, 250));

// ==========================================
// ==========================================
// Modal 彈窗功能
// ==========================================

function openDetailModal(contentId) {
    const modal = document.getElementById('detailModal');
    const modalBody = document.getElementById('modalBody');

    // 根據當前頁面判斷內容來源
    let detailsContainer;
    if (document.getElementById('attraction-details')) {
        detailsContainer = document.getElementById('attraction-details');
    } else if (document.getElementById('activity-details')) {
        detailsContainer = document.getElementById('activity-details');
    } else if (document.getElementById('food-details')) {
        detailsContainer = document.getElementById('food-details');
    }

    if (!detailsContainer) {
        console.error('找不到詳細資訊容器');
        return;
    }

    // 獲取詳細內容
    const detailContent = detailsContainer.querySelector('#' + contentId);

    if (detailContent) {
        // 複製內容到 Modal
        modalBody.innerHTML = detailContent.innerHTML;

        // 顯示 Modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    } else {
        console.error('找不到指定的詳細內容: ' + contentId);
    }
}

function closeDetailModal() {
    const modal = document.getElementById('detailModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 恢復背景滾動
}

// 點擊 Modal 外部區域關閉
window.addEventListener('click', function(event) {
    const modal = document.getElementById('detailModal');
    if (event.target === modal) {
        closeDetailModal();
    }
});

// ESC 鍵關閉 Modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('detailModal');
        if (modal && modal.classList.contains('show')) {
            closeDetailModal();
        }
    }
});

// ==========================================
// 頁面載入完成
// ==========================================

window.addEventListener('load', function() {
    console.log('霧峰旅遊宣傳網已載入完成');
});
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.ppt-carousel').forEach(initPPTCarousel);

  function initPPTCarousel(carousel) {
    const viewport = carousel.querySelector('.ppt-carousel-viewport');
    const track = carousel.querySelector('.ppt-carousel-track');
    const prevBtn = carousel.querySelector('.ppt-prev');
    const nextBtn = carousel.querySelector('.ppt-next');

    function pageWidth() {
      return viewport.clientWidth;
    }

    function updateButtons() {
      const max = track.scrollWidth - viewport.clientWidth - 2;
      prevBtn.disabled = viewport.scrollLeft <= 0;
      nextBtn.disabled = viewport.scrollLeft >= max;
    }

    prevBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -pageWidth(), behavior: 'smooth' });
      setTimeout(updateButtons, 350);
    });

    nextBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: pageWidth(), behavior: 'smooth' });
      setTimeout(updateButtons, 350);
    });

    viewport.addEventListener('scroll', () =>
      requestAnimationFrame(updateButtons)
    );

    window.addEventListener('resize', () =>
      requestAnimationFrame(updateButtons)
    );

    updateButtons();
  }
});
