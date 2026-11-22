/* =========================================================
   Final.store — المتجر النهائي
   ملف JavaScript المشترك لجميع الصفحات
   ========================================================= */
'use strict';

/* ---------- بيانات المتجر ---------- */
const WHATSAPP_NUMBER = '966530087694';
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

const PRODUCTS = [
  {
    id: 'hilal',
    clubKey: 'hilal',
    club: 'نادي الهلال',
    name: 'قميص نادي الهلال',
    desc: 'قميص أزرق بخطوط ذهبية أنيقة، اختيار مثالي لكل مشجع هلالي يفتخر بناديه.',
    price: 100,
    image: 'images/al-hilal.webp',
    alt: 'قميص نادي الهلال الأزرق',
    badge: 'الأكثر مبيعًا'
  },
  {
    id: 'ahli',
    clubKey: 'ahli',
    club: 'نادي الأهلي',
    name: 'قميص نادي الأهلي',
    desc: 'قميص أخضر بلمسة عصرية، يعكس هوية الأهلي الكلاسيكية مع راحة تدوم طوال اليوم.',
    price: 99,
    image: 'images/al-ahli.webp',
    alt: 'قميص نادي الأهلي الأخضر',
    badge: 'جديد'
  },
  {
    id: 'nassr',
    clubKey: 'nassr',
    club: 'نادي النصر',
    name: 'قميص نادي النصر',
    desc: 'قميص أصفر جريء بتفصيل مريح، لكل مشجع نصراوي يرفع شعار الفخر والانطلاق.',
    price: 99,
    image: 'images/al-nassr.webp',
    alt: 'قميص نادي النصر الأصفر',
    badge: 'مميز'
  }
];

/* ---------- رسم بطاقات المنتجات (مصدر واحد لجميع الصفحات) ---------- */
function productCardHTML(product, variant) {
  const detailed = variant === 'detailed';
  const desc = detailed ? `<p class="product-desc">${product.desc}</p>` : '';
  const meta = detailed
    ? `<ul class="product-meta">
         <li>شحن سريع داخل جدة وجميع مدن المملكة</li>
         <li>دفع عند الاستلام متاح</li>
       </ul>`
    : '';

  return `
    <article class="product-card reveal" data-club="${product.clubKey}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.alt}" loading="lazy" decoding="async" width="600" height="750">
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-body">
        <span class="product-club">${product.club}</span>
        <h3 class="product-name">${product.name}</h3>
        ${desc}
        ${meta}
        <div class="product-foot">
          <div class="price">
            <span class="price-current">${product.price} ر.س</span>
          </div>
          <a class="btn btn-primary btn-sm" href="${WHATSAPP_BASE}" target="_blank" rel="noopener"
             data-order="${product.name}" data-price="${product.price}">
            اطلب عبر واتساب
          </a>
        </div>
      </div>
    </article>`;
}

function renderProducts() {
  document.querySelectorAll('[data-products-grid]').forEach((grid) => {
    const variant = grid.dataset.variant || 'compact';
    grid.innerHTML = PRODUCTS.map((product) => productCardHTML(product, variant)).join('');
  });
}

/* ---------- القيمة الافتراضية للسنة في التذييل ---------- */
function setYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- تمييز رابط الصفحة الحالية ---------- */
function markActiveNav() {
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- قائمة الجوال ---------- */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('.nav-link')) closeNav();
  });

  document.addEventListener('click', (event) => {
    if (
      nav.classList.contains('is-open') &&
      !event.target.closest('.main-nav') &&
      !event.target.closest('.nav-toggle')
    ) {
      closeNav();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeNav();
  });
}

/* ---------- تغير خلفية الترويسة عند التمرير ---------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- الظهور التدريجي عند التمرير ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  // تأخير متتابع بسيط داخل كل مجموعة
  items.forEach((item) => {
    const siblings = Array.from(item.parentElement.children).filter((child) =>
      child.classList.contains('reveal')
    );
    const index = Math.min(siblings.indexOf(item), 4);
    item.style.setProperty('--reveal-delay', `${index * 90}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // يظهر عند الدخول ويختفي مجددًا عند الخروج من النطاق
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------- فلترة المنتجات حسب النادي ---------- */
function initFilters() {
  const buttons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-club]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      const filter = button.dataset.filter;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.club === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

/* ---------- رسائل واتساب ---------- */
function openWhatsApp(text) {
  window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

function initOrderButtons() {
  // تفويض الحدث حتى تعمل الأزرار المولدة عبر JavaScript
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-order]');
    if (!button) return;

    event.preventDefault();
    const product = button.dataset.order;
    const price = button.dataset.price;

    openWhatsApp(
      `مرحبًا Final.store، أرغب بطلب المنتج التالي:\n\n` +
        `المنتج: ${product}\n` +
        `السعر: ${price} ر.س\n\n` +
        `أرجو تأكيد التوفر وزمن التوصيل.`
    );
  });
}

/* ---------- نموذج التواصل ---------- */
function setFieldError(input, message) {
  const field = input.closest('.field');
  if (!field) return;
  const error = field.querySelector('.error');
  if (error) error.textContent = message;
  input.classList.toggle('is-invalid', Boolean(message));
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateContactForm(form) {
  const name = form.elements.name;
  const phone = form.elements.phone;
  const message = form.elements.message;
  let valid = true;

  if (name.value.trim().length < 2) {
    setFieldError(name, 'فضلًا أدخل اسمك الكامل.');
    valid = false;
  } else {
    setFieldError(name, '');
  }

  const phoneDigits = phone.value.replace(/[^\d]/g, '');
  if (!/^\+?[0-9\s-]{9,16}$/.test(phone.value.trim()) || phoneDigits.length < 9) {
    setFieldError(phone, 'فضلًا أدخل رقم جوال صحيح.');
    valid = false;
  } else {
    setFieldError(phone, '');
  }

  if (message.value.trim().length < 5) {
    setFieldError(message, 'فضلًا اكتب رسالتك (5 أحرف على الأقل).');
    valid = false;
  } else {
    setFieldError(message, '');
  }

  return valid;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateContactForm(form)) {
      status.textContent = 'فضلًا صحح الحقول المحددة بالأحمر.';
      status.className = 'form-status is-error';
      return;
    }

    const name = form.elements.name.value.trim();
    const phone = form.elements.phone.value.trim();
    const club = form.elements.club.value;
    const message = form.elements.message.value.trim();

    const text =
      `مرحبًا Final.store، لدي استفسار:\n\n` +
      `الاسم: ${name}\n` +
      `الجوال: ${phone}\n` +
      `النادي المفضل: ${club}\n` +
      `الرسالة: ${message}`;

    status.textContent = 'تم تجهيز رسالتك، جارٍ فتح واتساب...';
    status.className = 'form-status is-success';

    openWhatsApp(text);
    form.reset();
  });

  // إزالة رسالة الخطأ أثناء الكتابة
  form.querySelectorAll('input, textarea').forEach((input) => {
    input.addEventListener('input', () => setFieldError(input, ''));
  });
}

/* ---------- التشغيل ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setYear();
  markActiveNav();
  initNav();
  initHeaderScroll();
  initReveal();
  initFilters();
  initOrderButtons();
  initContactForm();
});
