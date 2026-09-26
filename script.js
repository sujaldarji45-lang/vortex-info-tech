$(function () {

  /* ============================================================
     VORTEX BRAND INTRO / SPLASH SCREEN
  ============================================================ */
  (function initSplash() {
    const $intro = $('#intro-screen');
    const alreadyEntered = sessionStorage.getItem('vortex_intro_seen') === 'true';

    function revealSite() {
      $('html, body').removeClass('intro-lock');
      $('body').addClass('intro-done');
    }

    if (alreadyEntered) {
      // Skip the full splash on subsequent navigation within the same session
      $intro.addClass('intro-removed');
      revealSite();
      return;
    }

    // lock scroll while the intro is visible
    $('html, body').addClass('intro-lock');

    // generate ambient particles drifting toward the vortex center
    const $particles = $('#introParticles');
    const particleCount = window.innerWidth < 700 ? 14 : 26;
    for (let i = 0; i < particleCount; i++) {
      const sx = (Math.random() * 100 - 50) + 'vw';
      const sy = (Math.random() * 100 - 50) + 'vh';
      const delay = (Math.random() * 3).toFixed(2) + 's';
      const duration = (2.5 + Math.random() * 2).toFixed(2) + 's';
      $('<span></span>').css({
        top: '50%', left: '50%',
        '--sx': sx, '--sy': sy,
        animationDelay: delay,
        animationDuration: duration
      }).appendTo($particles);
    }

    // enable the Enter Store button once its fade-in animation completes (~2.1s)
    setTimeout(() => $('#enter-store').addClass('ready'), 1700);

    // ENTER STORE -> vortex wipe transition -> reveal main site
    $('#enter-store').on('click', function () {
      if (!$(this).hasClass('ready')) return;
      $(this).removeClass('ready');
      $intro.addClass('wiping');

      // once the circular wipe has fully covered the screen, fade the whole
      // intro out and hand control back to the shopping website
      setTimeout(() => {
        $intro.addClass('intro-hidden');
        revealSite();
        sessionStorage.setItem('vortex_intro_seen', 'true');
      }, 1150);

      setTimeout(() => $intro.addClass('intro-removed'), 1700);
    });
  })();

  /* ---------- PRODUCT DATA ---------- */
  let products = [
    { id:'p1', cat:'laptops', brand:'ASUS', name:'ROG Strix Gaming Laptop', specs:'i7 · RTX 4060 · 16GB · 1TB SSD',
      price:129999, old:145999, rating:4.8, stock:'In Stock',
      desc:'A powerhouse gaming laptop built for competitive play and heavy creative workloads, with a high-refresh display and advanced cooling.',
      specList:['Intel Core i7 13th Gen','RTX 4060 8GB Graphics','16GB DDR5 RAM','1TB NVMe SSD','15.6" 165Hz Display'],
      img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80' },
    { id:'p2', cat:'laptops', brand:'Dell', name:'XPS Business Laptop', specs:'i5 · 16GB RAM · 512GB SSD · 14" FHD',
      price:84999, old:0, rating:4.6, stock:'In Stock',
      desc:'A slim, premium business laptop with an all-day battery, ideal for professionals who need reliability and portability.',
      specList:['Intel Core i5 12th Gen','Intel Iris Xe Graphics','16GB LPDDR5 RAM','512GB NVMe SSD','14" FHD+ InfinityEdge'],
      img:'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=600&q=80' },
    { id:'p3', cat:'gaming', brand:'MSI', name:'Aegis Gaming Desktop PC', specs:'Ryzen 7 · RTX 4070 · 32GB · 1TB NVMe',
      price:189999, old:205999, rating:4.9, stock:'In Stock',
      desc:'A pre-built gaming desktop tuned for 1440p and 4K gaming, with RGB lighting and tool-free upgradeability.',
      specList:['AMD Ryzen 7 7700X','RTX 4070 12GB Graphics','32GB DDR5 RAM','1TB NVMe SSD','750W 80+ Gold PSU'],
      img:'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80' },
    { id:'p4', cat:'components', brand:'NVIDIA', name:'GeForce RTX 4070 Ti', specs:'12GB GDDR6X · Ray Tracing · DLSS 3',
      price:79999, old:0, rating:4.8, stock:'Only 4 left',
      desc:'A high-performance graphics card delivering smooth ray-traced visuals and DLSS 3 frame generation for the latest titles.',
      specList:['12GB GDDR6X Memory','2610MHz Boost Clock','3x DisplayPort, 1x HDMI','PCIe 4.0','285W TDP'],
      img:'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=600&q=80' },
    { id:'p5', cat:'storage', brand:'Samsung', name:'980 PRO 1TB NVMe SSD', specs:'PCIe 4.0 · 7000MB/s Read Speed',
      price:8999, old:10499, rating:4.9, stock:'In Stock',
      desc:'Blazing-fast NVMe storage for gamers and creators who need near-instant load times and file transfers.',
      specList:['1TB Capacity','PCIe Gen 4.0 x4','7000MB/s Sequential Read','5100MB/s Sequential Write','5-Year Warranty'],
      img:'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80' },
    { id:'p6', cat:'accessories', brand:'Logitech', name:'Mechanical Gaming Keyboard', specs:'RGB Backlit · Hot-swappable Switches',
      price:6499, old:0, rating:4.7, stock:'In Stock',
      desc:'A tactile mechanical keyboard with per-key RGB lighting and hot-swappable switches for custom typing feel.',
      specList:['Hot-swappable Switches','Per-key RGB Lighting','Aluminum Top Plate','Detachable USB-C Cable','Onboard Memory'],
      img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80' },
    { id:'p7', cat:'accessories', brand:'Logitech', name:'Wireless Gaming Mouse', specs:'25K DPI Sensor · 70-hour Battery',
      price:4299, old:4999, rating:4.7, stock:'In Stock',
      desc:'An ultra-light wireless mouse with a precision sensor, built for fast-paced competitive gaming.',
      specList:['25,600 DPI Sensor','63g Ultra-light Body','70-hour Battery Life','LIGHTSPEED Wireless','5 Programmable Buttons'],
      img:'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80' },
    { id:'p8', cat:'accessories', brand:'Samsung', name:'27-inch QHD Monitor', specs:'165Hz · 1ms · IPS Panel',
      price:24999, old:0, rating:4.6, stock:'In Stock',
      desc:'A vivid QHD monitor with a fast refresh rate, ideal for gaming and everyday productivity alike.',
      specList:['27" QHD IPS Panel','165Hz Refresh Rate','1ms Response Time','HDR10 Support','Height Adjustable Stand'],
      img:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80' },
    { id:'p9', cat:'networking', brand:'ASUS', name:'AX6000 WiFi 6 Router', specs:'Dual Band · Mesh Support · 8 Antenna',
      price:15999, old:0, rating:4.5, stock:'In Stock',
      desc:'A high-speed WiFi 6 router with mesh support, built for lag-free gaming and smooth 4K streaming across the home.',
      specList:['WiFi 6 (802.11ax)','Dual Band up to 6000Mbps','8 High-gain Antennas','AiMesh Support','4x Gigabit LAN Ports'],
      img:'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80' },
  ];
    const localProducts = products;

    async function loadProductsFromDatabase() {
  try {
    let response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error('Products load nahi hue');
    }

    let dbProducts = await response.json();

    products = dbProducts.map(function (p) {
      let oldProduct = localProducts.find(function (x) {
        return x.name === p.name;
      });

      return {
        ...oldProduct,
        id: 'p' + p.product_id,
        dbId: p.product_id,
        cat: p.category,
        brand: p.brand,
        name: p.name,
        price: Number(p.price),
        img: p.image,
        stock: Number(p.stock) > 0 ? 'In Stock' : 'Out of Stock'
      };
    });

    console.log('Products loaded from MySQL:', products);

  } catch (error) {
    console.log('Product API Error:', error);
  }
}

loadProductsFromDatabase();
 /* ---------- RENDER PRODUCT GRID ---------- */

function renderProducts() {
  const $grid = $('#productGrid');
  $grid.empty();

  products.forEach(p => {
    $grid.append(`
      <div class="product-card" data-cat="${p.cat}" data-id="${p.id}">
        <div class="product-thumb tilt"><img src="${p.img}" alt="${p.name}"></div>
        <div class="product-body">
          <span class="product-brand">${p.brand}</span>
          <h4>${p.name}</h4>
          <div class="product-specs">${p.specs}</div>
          <div class="product-rating"><i class="ri-star-fill"></i> ${p.rating} <span>(120+ reviews)</span></div>
          <div class="product-price">₹${p.price.toLocaleString('en-IN')} ${p.old ? `<small>₹${p.old.toLocaleString('en-IN')}</small>` : ''}</div>
          <div class="product-actions">
            <button class="p-btn add" data-id="${p.id}">Add to Cart</button>
            <button class="p-btn view" data-id="${p.id}">View Details</button>
          </div>
        </div>
      </div>
    `);
  });
}

renderProducts();

  $('.products-section .pill').on('click', function () {
    $('.products-section .pill').removeClass('active');
    $(this).addClass('active');
    const filter = $(this).data('filter');
    $('.product-card').each(function () {
      const show = filter === 'all' || $(this).data('cat') === filter;
      $(this).toggleClass('hidden-card', !show);
    });
  });

  /* ---------- PROJECT DATA ---------- */
  const projects = [
    { cat:'gaming', title:'Gaming PC Setup', img:'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&q=80' },
    { cat:'business', title:'Office Computer Setup', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80' },
    { cat:'workstation', title:'Custom Workstation', img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80' },
    { cat:'networking', title:'Network Installation', img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80' },
    { cat:'workstation', title:'Video Editing PC', img:'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80' },
    { cat:'business', title:'Student PC Setup', img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80' },
  ];
  const $pgrid = $('#projectGrid');
  projects.forEach(p => {
    $pgrid.append(`
      <div class="project-card" data-cat="${p.cat}">
        <div class="project-thumb tilt"><img src="${p.img}" alt="${p.title}"></div>
        <div class="project-body"><span>${p.cat}</span><h4>${p.title}</h4></div>
      </div>
    `);
  });
  $('.projects-section .pill').on('click', function () {
    $('.projects-section .pill').removeClass('active');
    $(this).addClass('active');
    const filter = $(this).data('pfilter');
    $('.project-card').each(function () {
      const show = filter === 'all' || $(this).data('cat') === filter;
      $(this).toggleClass('hidden-card', !show);
    });
  });

  /* ---------- NAVBAR SCROLL ---------- */
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 40);
    $('#backToTop').toggleClass('show', $(this).scrollTop() > 500);
  });

  /* ---------- HAMBURGER ---------- */
  $('#hamburger').on('click', function () { $('#navLinks').toggleClass('open'); });
  $('.nav-links a').on('click', function () {
    $('#navLinks').removeClass('open');
    $('.nav-links a').removeClass('active');
    $(this).addClass('active');
  });

  /* ---------- BACK TO TOP ---------- */
  $('#backToTop').on('click', function () { $('html, body').animate({ scrollTop: 0 }, 600); });

  /* ---------- THEME TOGGLE ---------- */
  $('#themeToggle').on('click', function () {
    $('body').toggleClass('light-mode');
    $(this).find('i').toggleClass('ri-moon-line ri-sun-line');
  });

  /* ---------- CURSOR GLOW ---------- */
  $(document).on('mousemove', function (e) {
    $('.cursor-glow').css({ left: e.clientX, top: e.clientY, opacity: 1 });
  });

  /* ---------- TILT EFFECT ON IMAGES/CARDS ---------- */
  $(document).on('mousemove', '.tilt', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    $(this).css('transform', `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`);
  }).on('mouseleave', '.tilt', function () {
    $(this).css('transform', 'perspective(600px) rotateX(0) rotateY(0) scale(1)');
  });

  /* hero image subtle parallax */
  $('.hero-visual').on('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    $('.hero-img').css('transform', `translate(${x}px, ${y}px)`);
  }).on('mouseleave', function () { $('.hero-img').css('transform', 'translate(0,0)'); });

  /* ---------- BUTTON RIPPLE ---------- */
  $(document).on('click', '.btn, .p-btn, .pill', function (e) {
    const $b = $(this);
    const offset = $b.offset();
    const x = e.pageX - offset.left, y = e.pageY - offset.top;
    const $r = $('<span class="ripple"></span>').css({ left: x, top: y, width: 10, height: 10, marginLeft: -5, marginTop: -5 });
    $b.css('overflow', 'hidden').append($r);
    setTimeout(() => $r.remove(), 600);
  });

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  /* ---------- ANIMATED COUNTERS ---------- */
  let counted = false;
  const statsSection = document.querySelector('.stats-grid');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        $('.stat strong').each(function () {
          const target = +$(this).data('count');
          const $el = $(this);
          $({ val: 0 }).animate({ val: target }, {
            duration: 1400,
            step: function () { $el.text(Math.floor(this.val)); },
            complete: function () { $el.text(target + '+'); }
          });
        });
      }
    });
  }, { threshold: 0.4 });
  if (statsSection) counterObserver.observe(statsSection);

  /* ---------- BUILD YOUR PC PRICE CALC ---------- */
  function calcBuild() {
    let total = 0;
    $('[data-price]').each(function () { total += +$(this).val(); });
    $('#buildPrice').text('₹' + (total * 100).toLocaleString('en-IN'));
  }
  $('[data-price]').on('change', calcBuild);
  calcBuild();
  $('#startBuild').on('click', function (e) {
    e.preventDefault();
    const priceText = $('#buildPrice').text();
    addToCart({ id:'custom-build', name:'Custom PC Build', brand:'INFO-TECH HUB',
      price: parseInt($('#buildPrice').text().replace(/[^0-9]/g,'')), old:0,
      img:'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=600&q=80' }, 1);
    $(this).text('Added to Cart ✓');
    setTimeout(() => $(this).html('Start Building <i class="ri-arrow-right-line"></i>'), 1600);
  });

  /* ---------- TESTIMONIAL CAROUSEL ---------- */
  const $track = $('#testiTrack');
  const slides = $('.testi-card').length;
  let current = 0;
  const $dots = $('#testiDots');
  for (let i = 0; i < slides; i++) $dots.append(`<span class="${i === 0 ? 'active' : ''}" data-i="${i}"></span>`);
  function goTo(i) {
    current = i;
    $track.css('transform', `translateX(-${i * 100}%)`);
    $dots.find('span').removeClass('active').eq(i).addClass('active');
  }
  $dots.on('click', 'span', function () { goTo(+$(this).data('i')); });
  setInterval(() => goTo((current + 1) % slides), 5000);

  /* ======================================================
     CART SYSTEM
  ====================================================== */
  let cart = JSON.parse(localStorage.getItem('ith_cart') || '[]');

  function saveCart() { localStorage.setItem('ith_cart', JSON.stringify(cart)); }

  function findProduct(id) { return products.find(p => p.id === id); }

  function addToCart(productLike, qty) {
    qty = qty || 1;
    const existing = cart.find(c => c.id === productLike.id);
    if (existing) { existing.qty += qty; }
    else {
      cart.push({ id: productLike.id, name: productLike.name, brand: productLike.brand,
        price: productLike.price, img: productLike.img, qty: qty });
    }
    saveCart();
    renderCart();
    pulseCartIcon();
  }

  function pulseCartIcon() {
    $('#cartBtn').css('transform', 'scale(1.2)');
    setTimeout(() => $('#cartBtn').css('transform', 'scale(1)'), 250);
  }

  function removeFromCart(id) { cart = cart.filter(c => c.id !== id); saveCart(); renderCart(); }

  function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) removeFromCart(id); else { saveCart(); renderCart(); }
  }

  function cartTotals() {
    const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    const delivery = subtotal > 0 ? (subtotal > 50000 ? 0 : 499) : 0;
    return { subtotal, delivery, total: subtotal + delivery };
  }

  function renderCart() {
    const count = cart.reduce((s, c) => s + c.qty, 0);
    $('#cartCount').text(count);
    const $items = $('#cartItems');
    if (cart.length === 0) {
      $items.html('<div class="cart-empty" id="cartEmpty"><i class="ri-shopping-bag-line"></i><p>Your cart is empty</p></div>');
    } else {
      $items.html(cart.map(c => `
        <div class="cart-item" data-id="${c.id}">
          <img src="${c.img}" alt="${c.name}">
          <div class="ci-info">
            <h5>${c.name}</h5>
            <div class="ci-price">₹${(c.price * c.qty).toLocaleString('en-IN')}</div>
            <div class="ci-qty">
              <button class="ci-minus">−</button>
              <span>${c.qty}</span>
              <button class="ci-plus">+</button>
              <span class="ci-remove">Remove</span>
            </div>
          </div>
        </div>
      `).join(''));
    }
    const t = cartTotals();
    $('#cartSubtotal').text('₹' + t.subtotal.toLocaleString('en-IN'));
    $('#cartDelivery').text(t.delivery === 0 ? 'Free' : '₹' + t.delivery);
    $('#cartTotal').text('₹' + t.total.toLocaleString('en-IN'));
  }
  renderCart();

  $(document).on('click', '.ci-minus', function () { changeQty($(this).closest('.cart-item').data('id'), -1); });
  $(document).on('click', '.ci-plus', function () { changeQty($(this).closest('.cart-item').data('id'), 1); });
  $(document).on('click', '.ci-remove', function () { removeFromCart($(this).closest('.cart-item').data('id')); });

  /* quick add from product grid */
  $(document).on('click', '.p-btn.add', function () {
    const p = findProduct($(this).data('id'));
    if (!p) return;
    addToCart(p, 1);
    const original = $(this).text();
    $(this).text('Added ✓');
    setTimeout(() => $(this).text(original), 1200);
  });

  /* open/close cart drawer */
  function openCart() { $('#cartDrawer').addClass('open'); $('#cartOverlay').addClass('show'); }
  function closeCartFn() { $('#cartDrawer').removeClass('open'); $('#cartOverlay').removeClass('show'); }
  $('#cartBtn').on('click', openCart);
  $('#closeCart, #cartOverlay').on('click', closeCartFn);

  /* ======================================================
     PRODUCT DETAIL MODAL
  ====================================================== */
  let activeProduct = null, modalQty = 1;

  function openProductModal(id) {
    const p = findProduct(id);
    if (!p) return;
    activeProduct = p; modalQty = 1;
    $('#qtyVal').text(1);
    $('#pmImg').attr('src', p.img).attr('alt', p.name);
    $('#pmBrand').text(p.brand);
    $('#pmName').text(p.name);
    $('#pmRating').html(`<i class="ri-star-fill"></i> ${p.rating} <span>(120+ reviews) · ${p.stock}</span>`);
    $('#pmPrice').html(`₹${p.price.toLocaleString('en-IN')} ${p.old ? `<small>₹${p.old.toLocaleString('en-IN')}</small>` : ''}`);
    $('#pmDesc').text(p.desc);
    $('#pmSpecs').html(p.specList.map(s => `<li><i class="ri-checkbox-circle-line"></i> ${s}</li>`).join(''));
    $('#productModalOverlay').addClass('show');
  }
  function closeProductModal() { $('#productModalOverlay').removeClass('show'); }

  $(document).on('click', '.p-btn.view', function () { openProductModal($(this).data('id')); });
  $('#closeProductModal, #productModalOverlay').on('click', function (e) {
    if (e.target === this) closeProductModal();
  });
  $('.product-modal').on('click', function (e) { e.stopPropagation(); });

  $('#qtyPlus').on('click', () => { modalQty++; $('#qtyVal').text(modalQty); });
  $('#qtyMinus').on('click', () => { if (modalQty > 1) modalQty--; $('#qtyVal').text(modalQty); });

  $('#pmAddCart').on('click', function () {
    if (!activeProduct) return;
    addToCart(activeProduct, modalQty);
    $(this).html('Added ✓');
    setTimeout(() => $(this).html('<i class="ri-shopping-bag-3-line"></i> Add to Cart'), 1200);
  });
  $('#pmBuyNow').on('click', function () {
    if (!activeProduct) return;
    addToCart(activeProduct, modalQty);
    closeProductModal();
    openCheckout();
  });

  /* ======================================================
     CHECKOUT / BILLING FLOW
  ====================================================== */
  function openCheckout() {
    if (cart.length === 0) { alert('Your cart is empty. Add a product first.'); return; }
    closeCartFn();
    showStep(1);
    renderOrderSummary();
    $('#checkoutOverlay').addClass('show');
  }
  function closeCheckout() { $('#checkoutOverlay').removeClass('show'); }

  $('#checkoutBtn').on('click', openCheckout);
  $('#closeCheckout, #checkoutOverlay').on('click', function (e) { if (e.target === this || this.id === 'closeCheckout') closeCheckout(); });
  $('.checkout-modal').on('click', function (e) { e.stopPropagation(); });

  function showStep(n) {
    $('.checkout-panel').addClass('hidden');
    $('#stepBilling').toggleClass('hidden', n !== 1);
    $('#stepPayment').toggleClass('hidden', n !== 2);
    $('#stepConfirm').toggleClass('hidden', n !== 3);
    $('.step').removeClass('active completed');
    
    for (let i = 1; i < n; i++) {
      $(`.step[data-step="${i}"]`).addClass('completed');
    }
    $(`.step[data-step="${n}"]`).addClass('active');
  }

  // Address Type toggle
  $(document).on('click', '.addr-pill', function() {
    $('.addr-pill').removeClass('active');
    $(this).addClass('active');
    $(this).find('input').prop('checked', true);
  });

  // Clear validation error on input
  $(document).on('input', '.input-icon-wrap input', function() {
    $(this).removeClass('input-error');
  });

  $('#toPayment').on('click', function () {
    const required = [
      { id: '#billName', name: 'Full Name' },
      { id: '#billEmail', name: 'Email' },
      { id: '#billPhone', name: 'Phone Number' },
      { id: '#billPincode', name: 'Pincode' },
      { id: '#billAddress', name: 'Address' },
      { id: '#billCity', name: 'City' },
      { id: '#billState', name: 'State' }
    ];
    let valid = true;
    required.forEach(f => {
      const val = $(f.id).val().trim();
      if (!val) {
        $(f.id).addClass('input-error');
        valid = false;
      } else {
        $(f.id).removeClass('input-error');
      }
    });

    if (!valid) {
      const firstInvalid = $('.input-error').first();
      if (firstInvalid.length) {
        firstInvalid.focus();
      }
      return;
    }

    // Save address info for confirmation
    const name = $('#billName').val().trim();
    const addr = $('#billAddress').val().trim();
    const city = $('#billCity').val().trim();
    const state = $('#billState').val().trim();
    const pin = $('#billPincode').val().trim();
    $('#confirmedAddress').text(`${name}, ${addr}, ${city}, ${state} - ${pin}`);

    showStep(2);
    renderOrderSummary();
  });

  $('#backToBilling').on('click', () => showStep(1));

  // Payment tab switching — UPI/QR + COD only
$('.pay-tab').on('click', function () {
    $('.pay-tab').removeClass('active');
    $(this).addClass('active');

    $('.pay-panel').addClass('hidden');

    let payType = $(this).data('pay');

    if (payType === 'upi') {
        $('#payUpi').removeClass('hidden');
    } else if (payType === 'cod') {
        $('#payCod').removeClass('hidden');
    }
});

  // Interactive Live Card Visualizer
  $('#cardNumber').on('input', function() {
    let val = $(this).val().replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
    $(this).val(formatted);
    $('#cardNumPreview').text(formatted || '•••• •••• •••• ••••');
    
    // Brand detection
    if (val.startsWith('4')) {
      $('#cardBrandLogo').html('<i class="ri-visa-line" style="color:#5aa9ff;"></i>');
    } else if (val.startsWith('5')) {
      $('#cardBrandLogo').html('<i class="ri-mastercard-line" style="color:#ff6b6b;"></i>');
    } else if (val.startsWith('6') || val.startsWith('8')) {
      $('#cardBrandLogo').html('<i class="ri-bank-card-2-line" style="color:#28e0e0;"></i>');
    } else {
      $('#cardBrandLogo').html('<i class="ri-bank-card-fill"></i>');
    }
  });

  $('#cardExpiry').on('input', function() {
    let val = $(this).val().replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    $(this).val(val);
    $('#cardExpiryPreview').text(val || 'MM/YY');
  });

  $('#cardHolder').on('input', function() {
    const val = $(this).val().trim();
    $('#cardHolderPreview').text(val.toUpperCase() || 'YOUR NAME');
  });

  // UPI App Selection
  $(document).on('click', '.upi-app-btn', function() {
    $('.upi-app-btn').removeClass('active');
    $(this).addClass('active');
    const app = $(this).data('app');
    const phone = $('#billPhone').val().trim() || '9876543210';
    if (app === 'gpay') $('#upiIdInput').val(phone + '@okhdfcbank');
    else if (app === 'phonepe') $('#upiIdInput').val(phone + '@ybl');
    else if (app === 'paytm') $('#upiIdInput').val(phone + '@paytm');
    else if (app === 'bhim') $('#upiIdInput').val(phone + '@upi');
  });

  $('#upiVerifyBtn').on('click', function() {
    const val = $('#upiIdInput').val().trim();
    if (!val || !val.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., username@upi)');
      return;
    }
    $(this).text('Verified ✓').css({ 'border-color': '#34d399', 'color': '#34d399' });
    setTimeout(() => {
      $(this).text('Verify').css({ 'border-color': '', 'color': '' });
    }, 2500);
  });

  // Bank Selection Pill
  $(document).on('click', '.bank-pill', function() {
    $('.bank-pill').removeClass('active');
    $(this).addClass('active');
    $(this).find('input').prop('checked', true);
  });

  function renderOrderSummary() {
    const count = cart.reduce((s, c) => s + c.qty, 0);
    $('#coItemCount').text(count);    

    if (cart.length === 0) {
      $('#orderSummary').html('<p style="color:var(--grey);font-size:13px;text-align:center;padding:10px 0;">No items in order</p>');
    } else {
      $('#orderSummary').html(cart.map(c => `
        <div class="os-item">
          <div class="os-item-left">
            <div class="os-item-icon"><i class="ri-box-3-line"></i></div>
            <div class="os-item-text">
              <span class="os-item-title">${c.name}</span>
              <span class="os-item-qty">Qty: ${c.qty} × ₹${c.price.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div class="os-item-price">₹${(c.price * c.qty).toLocaleString('en-IN')}</div>
        </div>
      `).join(''));
    }

    const t = cartTotals();
    $('#coSubtotal').text('₹' + t.subtotal.toLocaleString('en-IN'));
    $('#coDelivery').text(t.delivery === 0 ? 'FREE' : '₹' + t.delivery);
    if (t.delivery === 0) {
      $('#coDelivery').addClass('text-free');
    } else {
      $('#coDelivery').removeClass('text-free');
    }
    $('#coTotal').text('₹' + t.total.toLocaleString('en-IN'));
    $('#placeOrderBtnText').text('Pay ₹' + t.total.toLocaleString('en-IN') + ' & Confirm Order');
  }

  $('#placeOrder').on('click', async function () {

  const $btn = $(this);

  $btn.prop('disabled', true).html(
    '<i class="ri-loader-4-line" style="animation:spin 1s linear infinite;display:inline-block;"></i> Processing Order...'
  );

  let t = cartTotals();

  let orderData = {
    customer_name: $('#billName').val().trim(),
    email: $('#billEmail').val().trim(),
    mobile: $('#billPhone').val().trim(),
    address: $('#billAddress').val().trim(),
    city: $('#billCity').val().trim(),
    state: $('#billState').val().trim(),
    pincode: $('#billPincode').val().trim(),
    payment_method: $('.pay-tab.active').data('pay') || 'cod',
    total_amount: t.total,

    items: cart.map(function(item) {
      return {
        product_id: item.product_id || (
          item.id && item.id.startsWith('p')
            ? parseInt(item.id.substring(1))
            : null
        ),
        product_name: item.name,
        quantity: item.qty,
        price: item.price
      };
    })
  };

  try {

    let response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    let data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Order failed');
    }

    $('#orderId').text('#' + data.order_id);

    const d = new Date();
    d.setDate(d.getDate() + 3);

    const opt = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };

    $('#estimatedDeliveryDate').text(
      d.toLocaleDateString('en-US', opt) + ' (Guaranteed)'
    );

    cart = [];
    saveCart();
    renderCart();

    showStep(3);

  } catch (error) {

    console.log('Order Error:', error);

    alert('Order place nahi hua. Please try again.');

  }

  $btn.prop('disabled', false).html(
    '<i class="ri-lock-2-line"></i> <span id="placeOrderBtnText">Pay Now & Confirm Order</span>'
  );

});

  // Copy Order ID
  $('#copyOrderIdBtn').on('click', function() {
    const text = $('#orderId').text().replace('#', '');
    navigator.clipboard.writeText(text).then(() => {
      const $btn = $(this);
      $btn.html('<i class="ri-check-line" style="color:#34d399;"></i>');
      setTimeout(() => $btn.html('<i class="ri-file-copy-line"></i>'), 1800);
    }).catch(() => {
      alert('Order ID: #' + text);
    });
  });

  $('#continueShopping').on('click', function () {
    closeCheckout();
    showStep(1);
    $('#billName,#billEmail,#billPhone,#billPincode,#billAddress,#billCity,#billState,#cardNumber,#cardExpiry,#cardCvv,#cardHolder,#upiIdInput').val('');
    $('#cardNumPreview').text('•••• •••• •••• ••••');
    $('#cardHolderPreview').text('YOUR NAME');
    $('#cardExpiryPreview').text('MM/YY');
  });

  /* ======================================================
     CATEGORY SHOP CATALOG — click a category card to browse
     10-15 related items and add them straight to the cart
  ====================================================== */
  const categoryCatalog = {
    laptops: {
      title: 'Laptops', tagline: 'Work. Create. Perform.',
      banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['ASUS','ROG Zephyrus Gaming Laptop',124999],['Dell','XPS 13 Business Ultrabook',94999],
        ['HP','Spectre x360 Convertible',108999],['Lenovo','Legion 5 Pro Gaming Laptop',119999],
        ['Acer','Predator Helios Gaming Laptop',134999],['Dell','Inspiron 15 Everyday Laptop',54999],
        ['HP','Pavilion Gaming Laptop',74999],['Lenovo','ThinkPad X1 Carbon',149999],
        ['Acer','Swift 3 Ultra-light Laptop',64999],['ASUS','Vivobook Pro Creator Laptop',89999],
        ['MSI','Katana 15 Gaming Laptop',99999],['MSI','Modern 14 Slim Laptop',59999],
      ],
      imgs: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=500&q=80']
    },
    gaming: {
      title: 'Gaming PCs', tagline: 'Built for Victory.',
      banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['MSI','Aegis Gaming Desktop',189999],['HP','Omen Gaming Tower',159999],
        ['Lenovo','Legion Tower Gaming PC',174999],['Acer','Predator Orion Desktop',209999],
        ['ASUS','ROG Strix Gaming Desktop',219999],['CyberPowerPC','Gamer Xtreme Desktop',144999],
        ['NZXT','Prebuilt Gaming PC',164999],['Corsair','Vengeance Gaming PC',194999],
        ['Origin','Millennium Desktop',259999],['Dell','Alienware Aurora Desktop',229999],
        ['Skytech','Chronos Gaming Desktop',139999],
      ],
      imgs: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&q=80']
    },
    components: {
      title: 'Components', tagline: 'Build Without Limits.',
      banner: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['NVIDIA','RTX 4070 Ti Graphics Card',79999],['NVIDIA','RTX 4060 Graphics Card',32999],
        ['AMD','Ryzen 7 7700X Processor',31999],['Intel','Core i7-13700K Processor',33999],
        ['MSI','B650 Gaming Motherboard',17999],['ASUS','Z790 Motherboard',24999],
        ['Corsair','32GB DDR5 RAM Kit',10999],['Kingston','16GB DDR5 RAM Kit',5999],
        ['Corsair','750W Gold PSU',6999],['Cooler Master','850W Platinum PSU',10999],
        ['NZXT','RGB Mid Tower Cabinet',7999],['Corsair','360mm AIO Liquid Cooler',12999],
      ],
      imgs: ['https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=500&q=80']
    },
    keyboards: {
      title: 'Keyboards', tagline: 'Type With Precision.',
      banner: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['Logitech','Mechanical RGB Gaming Keyboard',6499],['Razer','Wireless Mechanical Keyboard',8999],
        ['Corsair','Compact 60% Keyboard',7499],['SteelSeries','TKL Mechanical Keyboard',7999],
        ['HP','Silent Membrane Keyboard',1499],['Keychron','Hot-swappable Keyboard',8499],
        ['ASUS','Low-profile Mechanical Keyboard',6999],['Microsoft','Ergonomic Split Keyboard',3999],
        ['Dell','Business Wireless Keyboard',1999],['Redragon','Budget Mechanical Keyboard',2999],
        ['HyperX','Pro Esports Keyboard',9499],
      ],
      imgs: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80']
    },
    mouse: {
      title: 'Mouse', tagline: 'Precision In Every Click.',
      banner: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['Logitech','Wireless Gaming Mouse',4299],['Razer','Wired Gaming Mouse',3499],
        ['HP','Ergonomic Office Mouse',999],['Corsair','Ultra-light Esports Mouse',5999],
        ['Dell','Vertical Ergonomic Mouse',1799],['ASUS','Silent Click Mouse',1299],
        ['SteelSeries','MMO Gaming Mouse',6499],['Microsoft','Compact Travel Mouse',899],
        ['Redragon','RGB Gaming Mouse',1499],['HyperX','Wireless Bluetooth Mouse',3999],
        ['Zebronics','Pro Gaming Mouse',799],
      ],
      imgs: ['https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=500&q=80']
    },
    monitors: {
      title: 'Monitors', tagline: 'See Every Detail.',
      banner: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['Samsung','27-inch QHD Gaming Monitor',24999],['LG','24-inch FHD Monitor',10999],
        ['Dell','32-inch 4K UHD Monitor',42999],['ASUS','Curved Ultrawide Monitor',34999],
        ['Acer','24-inch IPS Monitor',12999],['BenQ','27-inch 4K Creator Monitor',44999],
        ['ViewSonic','144Hz Esports Monitor',18999],['MSI','Portable USB-C Monitor',13999],
        ['HP','34-inch Ultrawide Monitor',39999],['AOC','22-inch Budget Monitor',8999],
        ['Samsung','Dual Monitor Bundle',22999],
      ],
      imgs: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=500&q=80']
    },
    networking: {
      title: 'Networking', tagline: 'Stay Connected.',
      banner: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
      items: [
        ['ASUS','AX6000 WiFi 6 Router',15999],['TP-Link','Mesh WiFi System',12999],
        ['Netgear','Gigabit Network Switch',3999],['D-Link','WiFi Range Extender',1999],
        ['TP-Link','USB WiFi Adapter',999],['Netgear','Powerline Adapter Kit',4499],
        ['ASUS','WiFi 6E Router',21999],['Cisco','Business Router',18999],
        ['Huawei','4G LTE Router',6999],['Xiaomi','Smart WiFi Router',2499],
      ],
      imgs: ['https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=500&q=80','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80']
    }
  };

  function openCategoryModal(catKey) {
    const cat = categoryCatalog[catKey];
    if (!cat) return;
    $('#cmHead').css('background-image', `linear-gradient(120deg, rgba(7,11,24,.55), rgba(7,11,24,.85)), url('${cat.banner}')`)
                .css('background-size', 'cover').css('background-position', 'center');
    $('#cmEyebrow').text('Category');
    $('#cmTitle').text(cat.title);
    $('#cmTagline').text(`${cat.items.length} items · ${cat.tagline}`);
    $('#cmGrid').html(cat.items.map((item, i) => {
      const [brand, name, price] = item;
      const img = cat.imgs[i % cat.imgs.length];
      const id = catKey + '-' + i;
      return `
        <div class="cm-card">
          <div class="cm-thumb"><img src="${img}" alt="${name}"></div>
          <div class="cm-body">
            <span class="cm-brand">${brand}</span>
            <h5>${name}</h5>
            <div class="cm-price">₹${price.toLocaleString('en-IN')}</div>
            <button class="cm-add" data-id="${id}" data-name="${name}" data-brand="${brand}" data-price="${price}" data-img="${img}">Add to Cart</button>
          </div>
        </div>
      `;
    }).join(''));
    $('#categoryModalOverlay').addClass('show');
  }
  function closeCategoryModal() { $('#categoryModalOverlay').removeClass('show'); }

  $(document).on('click', '.cat-card[data-cat]', function () { openCategoryModal($(this).data('cat')); });
  $('#closeCategoryModal, #categoryModalOverlay').on('click', function (e) { if (e.target === this || this.id === 'closeCategoryModal') closeCategoryModal(); });
  $('.category-modal').on('click', function (e) { e.stopPropagation(); });

  $(document).on('click', '.cm-add', function () {
    const $b = $(this);
    addToCart({
      id: $b.data('id'), name: $b.data('name'), brand: $b.data('brand'),
      price: +$b.data('price'), img: $b.data('img')
    }, 1);
    $b.addClass('added').text('Added ✓');
    setTimeout(() => $b.removeClass('added').text('Add to Cart'), 1200);
  });

  /* ---------- CONTACT FORM ---------- */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    const btn = $(this).find('button');
    btn.html('Message Sent ✓');
    setTimeout(() => { btn.html('Send Message <i class="ri-send-plane-line"></i>'); this.reset(); }, 2000);
  });

});
