/* ═══════════════════════════════════════════════════════════
   السيرة الذاتية الرقمية — جنى عمر سعيد بالحول
   script.js — Interactivity & Scroll Animations
   ═══════════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────
     1) بيانات المشاريع (تُبنى منها البطاقات)
     ───────────────────────────────────────────── */
  const projects = [
    {
      id: 1,
      icon: '☕',
      name: 'موقع إيسو كافيه',
      short: 'موقع إلكتروني تعريفي لمقهى إيسو يعرض القائمة والأجواء وهوية العلامة.',
      desc: 'موقع ويب تعريفي لمقهى «إيسو»، صُمم لإبراز هوية المقهى وقائمة المشروبات والأجواء العامة بأسلوب بصري جذاب ومريح للزائر، مع تخطيط متجاوب يعمل على جميع الأجهزة.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 2,
      icon: '☕',
      name: 'موقع أراولا كافيه',
      short: 'واجهة رقمية أنيقة لمقهى أراولا تعكس طابعه العصري وقائمته المميزة.',
      desc: 'موقع إلكتروني لمقهى «أراولا» يقدم تجربة تصفح أنيقة تعكس الطابع العصري للمقهى، ويشمل عرض القائمة والمعلومات الأساسية بتصميم متجاوب وتجربة استخدام سلسة.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 3,
      icon: '🪪',
      name: 'موقع السيرة الذاتية الرقمية',
      short: 'سيرة ذاتية مكوّنة من صفحة واحدة بأزرار تفاعلية بتصميم بني وبيجي.',
      desc: 'سيرة ذاتية مكوّنة من صفحة واحدة بأزرار تفاعلية بتصميم بني وبيجي، تعرض معلوماتي ومهاراتي وأعمالي بأسلوب أنيق ومتجاوب يعمل على جميع الأجهزة.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 4,
      icon: '⚽',
      name: 'متجر دُرة الملاعب',
      short: 'متجر إلكتروني متخصص بالمستلزمات والأدوات الرياضية وأجهزة الملاعب.',
      desc: 'متجر إلكتروني «دُرة الملاعب» متخصص في عرض وبيع المستلزمات الرياضية والأدوات المتعلقة بالملاعب، بتصميم تجاري منظم يسهّل على الزائر استعراض المنتجات وتصفح الأقسام.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 5,
      icon: '🎨',
      name: 'معرض أعمالي',
      short: 'معرض رقمي يجمع أعمالي ومشاريعي في مكان واحد بشكل تفاعلي.',
      desc: 'معرض أعمال رقمي يجمع نماذج من مشاريعي وأعمالي التقنية والتصميمية في واجهة واحدة تفاعلية، لعرض ما أنجزته بأسلوب منظم وسهل التصفح لأصحاب العمل والزوار.',
      tech: ['HTML', 'CSS', 'JavaScript']
    },
    {
      id: 6,
      icon: '🖥️',
      name: 'عرض تقديمي للتعريف بالمواقع الإلكترونية',
      short: 'عرض تقديمي تعليمي يعرّف بأساسيات المواقع الإلكترونية وآلية عملها.',
      desc: 'عرض تقديمي أعدّه للتعريف بالمواقع الإلكترونية: ما هي، وكيف تُبنى، وما مكوناتها الأساسية (الواجهة، الخوادم، قواعد البيانات)، بأسلوب مبسط مناسب للمبتدئين في المجال التقني.',
      tech: ['عرض تقديمي']
    },
    {
      id: 7,
      icon: '🍽️',
      name: 'موقع مطعم نملية',
      short: 'موقع تعريفي لمطعم نملية يعرض قائمة الطعام والهوية البصرية للمطعم.',
      desc: 'موقع إلكتروني لمطعم «نملية» يعرض قائمة الطعام والهوية البصرية للمطعم والأجواء العامة، بتصميم دافئ وجذاب يتناسب مع طابع المطعم ويعمل بكفاءة على الجوال والكمبيوتر.',
      tech: ['HTML', 'CSS', 'JavaScript']
    }
  ];

  /* ─────────────────────────────────────────────
     2) بناء بطاقات المشاريع داخل الشبكة
     ───────────────────────────────────────────── */
  const projectsGrid = document.getElementById('projectsGrid');

  if (projectsGrid) {
    projectsGrid.innerHTML = projects.map((project, index) => `
      <button type="button" class="project-card reveal" style="--delay: ${(index * 0.08).toFixed(2)}s"
              data-project-id="${project.id}"
              aria-haspopup="dialog"
              aria-label="عرض تفاصيل مشروع: ${project.name}">
        <span class="project-card__num">/${String(index + 1).padStart(2, '0')}</span>
        <span class="project-card__icon" aria-hidden="true">${project.icon}</span>
        <span class="project-card__name">${project.name}</span>
        <span class="project-card__desc">${project.short}</span>
        <span class="project-card__more">
          عرض التفاصيل
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </button>
    `).join('');
  }

  /* ─────────────────────────────────────────────
     3) حركات الظهور عند التمرير — Intersection Observer
        (تُعاد الحركة عند كل دخول وخروج من نطاق الرؤية)
     ───────────────────────────────────────────── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // إضافة عند الدخول، وإزالة عند الخروج → إعادة تشغيل الحركة دائماً
          entry.target.classList.toggle('visible', entry.isIntersecting);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // احتياط للمتصفحات القديمة: إظهار كل العناصر فوراً
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  /* ─────────────────────────────────────────────
     4) شريط التنقل: حالة التمرير + الرابط النشط
     ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  updateNavbar();

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ─────────────────────────────────────────────
     5) قائمة الجوال (Hamburger)
     ───────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  const closeMobileMenu = () => {
    if (!hamburger || !navMenu) return;
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'فتح القائمة');
  };

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    });

    // إغلاق القائمة عند اختيار أي رابط أو الضغط خارجها
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('open') &&
          !navMenu.contains(event.target) &&
          !hamburger.contains(event.target)) {
        closeMobileMenu();
      }
    });
  }

  /* ─────────────────────────────────────────────
     6) قسم المهارات: فتح / إغلاق
     ───────────────────────────────────────────── */
  const skillsToggle = document.getElementById('skillsToggle');
  const skillsPanel = document.getElementById('skillsPanel');

  if (skillsToggle && skillsPanel) {
    skillsToggle.addEventListener('click', () => {
      const willOpen = !skillsPanel.classList.contains('open');
      skillsPanel.classList.toggle('open', willOpen);
      skillsToggle.setAttribute('aria-expanded', String(willOpen));
      skillsToggle.querySelector('.skills-toggle__label').lastChild.textContent =
        willOpen ? ' إخفاء المهارات' : ' عرض المهارات';
    });
  }

  /* ─────────────────────────────────────────────
     7) النافذة المنبثقة للمشاريع (Modal)
        الإغلاق: زر × / زر «حسناً» / النقر خارج النافذة / مفتاح Escape
     ───────────────────────────────────────────── */
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalOkBtn = document.getElementById('modalOk');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTag = document.getElementById('modalTag');
  const modalTech = document.getElementById('modalTech');
  let lastFocusedCard = null;

  const openModal = (project, triggerCard) => {
    if (!modalOverlay) return;
    lastFocusedCard = triggerCard || document.activeElement;

    modalTitle.textContent = project.name;
    modalDesc.textContent = project.desc;
    modalTag.textContent = `PROJECT / ${String(project.id).padStart(2, '0')}`;
    modalTech.innerHTML = (project.tech || [])
      .map((tech) => `<span class="chip">${tech}</span>`)
      .join('');

    modalOverlay.hidden = false;
    // طلب إعادة التلوين للانتقال ثم إضافة صنف الفتح في الإطار التالي
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modalOverlay.classList.add('open'));
    });
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  };

  const closeModal = () => {
    if (!modalOverlay || modalOverlay.hidden) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // انتظار انتهاء الانتقال ثم إخفاء النافذة
    const onTransitionEnd = (event) => {
      if (event.target !== modalOverlay) return;
      modalOverlay.hidden = true;
      modalOverlay.removeEventListener('transitionend', onTransitionEnd);
    };
    modalOverlay.addEventListener('transitionend', onTransitionEnd);

    // احتياط في حال لم يُطلَق transitionend
    window.setTimeout(() => {
      if (!modalOverlay.classList.contains('open')) modalOverlay.hidden = true;
    }, 350);

    // إعادة التركيز إلى البطاقة التي فتحت النافذة
    if (lastFocusedCard && typeof lastFocusedCard.focus === 'function') {
      lastFocusedCard.focus();
    }
  };

  // فتح النافذة عند الضغط على أي بطاقة مشروع
  if (projectsGrid) {
    projectsGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.project-card');
      if (!card) return;
      const project = projects.find((p) => p.id === Number(card.dataset.projectId));
      if (project) openModal(project, card);
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

  // الإغلاق بالنقر على الخلفية (خارج النافذة نفسها)
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) closeModal();
    });
  }

  // الإغلاق بمفتاح Escape + حصار التركيز داخل النافذة (Focus Trap)
  document.addEventListener('keydown', (event) => {
    const isModalOpen = modalOverlay && !modalOverlay.hidden;

    if (event.key === 'Escape') {
      if (isModalOpen) closeModal();
      closeMobileMenu();
      return;
    }

    if (event.key === 'Tab' && isModalOpen) {
      const focusable = modalOverlay.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* ─────────────────────────────────────────────
     8) زر العودة إلى أعلى الصفحة
     ───────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');

  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 320);
  };
  updateBackToTop();

  // تمرير موحّد وخفيف عبر rAF
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      updateNavbar();
      updateBackToTop();
      ticking = false;
    });
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────
     9) السنة الحالية في التذييل
     ───────────────────────────────────────────── */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
