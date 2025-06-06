// 建議放在 script.js
document.addEventListener('DOMContentLoaded', function () {
  const userName = document.querySelector('.user-name');
  const dropdown = document.querySelector('.dropdown');

  // 切換下拉選單顯示
  userName.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  // 點擊外部自動關閉
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // 鍵盤支援（Esc 關閉）
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdown.classList.remove('active');
    }
  });

  // === 進場動畫 ===
  function animateOnScroll(selector, visibleClass = 'visible') {
    const elements = document.querySelectorAll(selector);
    if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add(visibleClass));
      return;
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(visibleClass);
          // 只針對 brand-item 移除 transform
          if (entry.target.classList.contains('brand-item')) {
            entry.target.style.transform = '';
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    elements.forEach(el => observer.observe(el));
  }

  // 1. top-bar 內元件
  animateOnScroll('.top-bar > *', 'visible');
  document.querySelectorAll('.top-bar > *').forEach(el => el.classList.add('slide-in-left'));

  // 2. hero-section 內元件由下往上淡入
  animateOnScroll('.hero-content', 'visible');
  document.querySelectorAll('.hero-content').forEach(el => el.classList.add('fade-in-up'));

  // 2. articles-content 內元件由下往上淡入
  animateOnScroll('.featured-article, .secondary-articles', 'visible');
  document.querySelectorAll('.featured-article, .secondary-articles').forEach(el => el.classList.add('fade-in-up'));

  // 3. brand-logos 由兩側向中間淡入集中
  animateOnScroll('.brand-item', 'visible');
  const brandItems = document.querySelectorAll('.brand-item');
  const mid = (brandItems.length - 1) / 2;
  brandItems.forEach((el, i) => {
    el.classList.add('fade-in-center');
    // 小螢幕時不做 translateX 動畫，避免 logo 消失
    if (window.innerWidth > 640) {
      const offset = (i - mid) * 80; // 80px 可調整
      el.style.transform = `translateX(${offset}px) scale(0.95)`;
      el.style.transitionDelay = (Math.abs(i - mid) * 0.1) + 's';
      el.dataset.offset = offset;
    } else {
      el.style.transform = '';
      el.style.transitionDelay = '';
      el.dataset.offset = '';
    }
  });

  // 4. philosophy-section 由下往上淡入
  animateOnScroll('.philosophy-section', 'visible');
  document.querySelectorAll('.philosophy-section').forEach(el => el.classList.add('fade-in-up'));

  // 5. values-container 由下往上淡入
  animateOnScroll('.values-container', 'visible');
  document.querySelectorAll('.values-container').forEach(el => el.classList.add('fade-in-up'));

  // 6. philosophy-container 由下往上淡入
  animateOnScroll('.philosophy-container', 'visible');
  document.querySelectorAll('.philosophy-container').forEach(el => el.classList.add('fade-in-up'));

  // 7. main-footer 內元件由左往右淡入
  animateOnScroll('.main-footer > *', 'visible');
  document.querySelectorAll('.main-footer > *').forEach(el => el.classList.add('slide-in-left'));

  // 8. section-box-con 由下往上淡入
  animateOnScroll('.section-box-con', 'visible');
  document.querySelectorAll('.section-box-con').forEach(el => el.classList.add('fade-in-up'));

  // 9. section-box-title 由下往上淡入
  animateOnScroll('.section-box-title', 'visible');
  document.querySelectorAll('.section-box-title').forEach(el => el.classList.add('fade-in-up'));

  // 10. menubook-item 一格一格由下到上淡入
  animateOnScroll('.menubook-item', 'visible');
  document.querySelectorAll('.menubook-item').forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = (i * 0.15) + 's';
  });

  // 將 section-title 及其他標題的每個字包進 span
  const blurHeadings = [
    '.section-title',
    '.philosophy-heading',
    '.values-heading',
    '.articles-heading',
    '.articles-subheading'
  ];
  blurHeadings.forEach(selector => {
    document.querySelectorAll(selector).forEach(title => {
      const chars = title.textContent.split('');
      title.innerHTML = chars.map((char, i) =>
        `<span class="char" style="transition-delay:${i * 0.04}s">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
    });
  });

  // 讓 notification-input focus 時 placeholder 立即清空，blur 時恢復
  function bindNotificationInputPlaceholder() {
    setTimeout(() => { // 確保 DOM 已插入
      const input = document.getElementById('notification-input');
      if (input) {
        const originalPlaceholder = input.getAttribute('data-original-placeholder') || input.getAttribute('placeholder');
        input.setAttribute('data-original-placeholder', originalPlaceholder);
        input.addEventListener('focus', function() {
          input.setAttribute('placeholder', '');
        });
        input.addEventListener('blur', function() {
          input.setAttribute('placeholder', originalPlaceholder);
        });
      }
    }, 0);
  }

  bindNotificationInputPlaceholder();

  const welcomeContainer = document.querySelector('.welcome-container');
  if (welcomeContainer) {
    const originalContent = welcomeContainer.innerHTML;
    welcomeContainer.addEventListener('click', function(e) {
      const iconLink = e.target.closest('.icon-container a');
      if (iconLink) {
        e.preventDefault();
        const oldContent = welcomeContainer.firstElementChild;
        if (oldContent) {
          oldContent.classList.add('fade-switch', 'fade-out');
          setTimeout(() => {
            welcomeContainer.innerHTML = `
              <div class="overlap-group fade-switch fade-in">
                <input 
                  type="text" 
                  id="notification-input" 
                  name="notification" 
                  class="input-field" 
                  placeholder="點數可兌換通知我" 
                />
                <div class="btn-create-bot">
                  <button type="button" class="btn-text">我的需求</button>
                </div>
              </div>
            `;
            // 綁定 button 點擊事件
            const btn = welcomeContainer.querySelector('.btn-create-bot .btn-text');
            if (btn) {
              btn.addEventListener('click', function() {
                const overlap = welcomeContainer.firstElementChild;
                if (overlap) {
                  overlap.classList.remove('fade-in');
                  overlap.classList.add('fade-out');
                  setTimeout(() => {
                    welcomeContainer.innerHTML = originalContent;
                    bindNotificationInputPlaceholder();
                  }, 400);
                } else {
                  welcomeContainer.innerHTML = originalContent;
                  bindNotificationInputPlaceholder();
                }
              });
            }
            bindNotificationInputPlaceholder();
          }, 400);
        } else {
          // fallback: 沒有舊內容直接切
          welcomeContainer.innerHTML = `
            <div class="overlap-group fade-switch fade-in">
              <input 
                type="text" 
                id="notification-input" 
                name="notification" 
                class="input-field" 
                placeholder="點數可兌換通知我" 
              />
              <div class="btn-create-bot">
                <button type="button" class="btn-text">我的需求</button>
              </div>
            </div>
          `;
          bindNotificationInputPlaceholder();
        }
      }
    });
  }

  var hamburger = document.getElementById('hamburger');
  var sideMenu = document.getElementById('sideMenu');
  var closeMenu = document.getElementById('closeMenu');
  if (hamburger && sideMenu && closeMenu) {
    hamburger.addEventListener('click', function() {
      sideMenu.classList.add('open');
    });
    closeMenu.addEventListener('click', function() {
      sideMenu.classList.remove('open');
    });
    // 點擊 menu 外部也可關閉
    sideMenu.addEventListener('click', function(e) {
      if (e.target === sideMenu) sideMenu.classList.remove('open');
    });
  }

  // News Events Carousel
  const newsEvents = document.querySelector('.news-events');
  if (newsEvents) {
    let isPaused = false;
    let scrollPos = 0;
    const speed = 1; // px per frame
    // 複製內容以實現無縫輪播
    newsEvents.innerHTML += newsEvents.innerHTML;
    const totalWidth = newsEvents.scrollWidth / 2;
    function animate() {
      if (!isPaused) {
        scrollPos += speed;
        if (scrollPos >= totalWidth) {
          scrollPos = 0;
        }
        newsEvents.scrollLeft = scrollPos;
      }
      requestAnimationFrame(animate);
    }
    newsEvents.addEventListener('mouseenter', () => { isPaused = true; });
    newsEvents.addEventListener('mouseleave', () => { isPaused = false; });
    animate();
  }

  // stores-list 內 store-item 一條一條由左到右滑入
  animateOnScroll('.stores-list .store-item', 'visible');
  document.querySelectorAll('.stores-list .store-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.12) + 's';
  });
});

// Parallax scrolling effect for .parallax-bg
window.addEventListener('scroll', function() {
  const bg = document.querySelector('.parallax-bg');
  if (bg) {
    const scrolled = window.scrollY;
    bg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});