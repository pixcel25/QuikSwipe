// ─── QuikSwipe Prototype ─── //

const state = {
  currentScreen: 'prompt',
  selectedCategory: null,
  cart: [],
  roadmapTracks: [], // Tracks available to customize in Roadmap Screen
  categories: [],    // Active tracks being swiped
  currentCategoryIndex: 0,
  currentCardIndex: 0,
};

// ─── Format INR ─── //
function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

// ─── Confetti Animation ─── //
function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';
  
  // Palette matching theme profile (mustard, orange, off-white, dark olive)
  const colors = ['#DDC655', '#FF5722', '#FF6B35', '#EBE9DE', '#3B3F37', '#10b981'];
  for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.className = 'absolute pointer-events-none rounded-none';
    p.style.width = Math.random() * 8 + 4 + 'px';
    p.style.height = Math.random() * 12 + 6 + 'px';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = Math.random() * 100 + '%';
    p.style.top = '-10px';
    p.style.opacity = Math.random() * 0.7 + 0.3;
    
    const rotate = Math.random() * 360;
    p.style.transform = `rotate(${rotate}deg)`;
    container.appendChild(p);

    const duration = Math.random() * 2 + 2;
    const delay = Math.random() * 0.5;
    
    p.style.transition = `transform ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s, top ${duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${delay}s, opacity ${duration}s ease-out ${delay}s`;
    
    setTimeout(() => {
      p.style.top = Math.random() * 65 + 25 + '%';
      p.style.transform = `rotate(${rotate + Math.random() * 720}deg) translate(${Math.random() * 60 - 30}px)`;
      p.style.opacity = '0';
    }, 50);
  }
}

// ─── Mock Data with Dropdown Options ─── //
const MOCK_DATA = {
  cooking: {
    label: 'Cooking/Recipe Commerce (Chilli Egg Curry)',
    promptValue: 'how to make spicy chilli egg curry',
    prefilled: [
      { question: 'Portions?', options: ['2 Servings', '4 Servings', '6 Servings', '8 Servings'], answer: '4 Servings' },
      { question: 'Spice level?', options: ['Mild', 'Medium', 'Hot', 'Extra Spicy'], answer: 'Extra Spicy' },
      { question: 'Cooking Time?', options: ['15 Minutes', '25 Minutes', '40 Minutes', '60 Minutes'], answer: '25 Minutes' },
    ],
    categories: [
      {
        id: 'c1', title: 'Main Ingredients', icon: '🥚', desc: 'Fresh eggs and base proteins for the curry', items: [
          { id: 'i1', name: 'Fresh Farm Eggs', price: 90, image: '🥚', desc: '12 pack · White eggs · High protein', details: 'Farm fresh white eggs. Collected daily and quality inspected. High in protein and vitamins. Best consumed within 15 days.' },
          { id: 'i2', name: 'Organic Red Onions', price: 60, image: '🧅', desc: '1kg · Sweet & crunchy · Locally sourced', details: 'Naturally grown red onions with no synthetic pesticides. Essential base for rich curry gravy.' },
          { id: 'i3', name: 'Fresh Vine Tomatoes', price: 80, image: '🍅', desc: '1kg · Juicy · Crimson red', details: 'Plump, vine-ripened tomatoes. Perfect for creating the tangy tomato gravy required for the curry.' },
        ],
      },
      {
        id: 'c2', title: 'Spices & Curry Base', icon: '🌶️', desc: 'Authentic Indian spice mixes and oils', items: [
          { id: 'i4', name: 'Guntur Red Chilli Powder', price: 95, image: '🌶️', desc: '100g · High heat spice', details: 'Authentic Guntur chillies, finely ground. Gives the egg curry its signature spicy kick and vibrant red color.' },
          { id: 'i5', name: 'Cold Pressed Mustard Oil', price: 210, image: '🫗', desc: '1L · Aromatic cooking oil', details: 'Traditionally extracted mustard oil. Adds a unique pungent aroma and depth to the egg curry base.' },
          { id: 'i6', name: 'Ginger Garlic Paste', price: 55, image: '🧄', desc: '200g · Freshly ground', details: 'Equal parts fresh ginger and garlic. Prepared without preservatives. Adds a classic savory base note.' },
        ],
      },
      {
        id: 'c3', title: 'Herbs & Garnishing', icon: '🌿', desc: 'Finishing touches for texture and flavor', items: [
          { id: 'i7', name: 'Fresh Coriander Bunch', price: 30, image: '🌿', desc: '100g · Hydroponically grown', details: 'Crisp coriander leaves. Cleaned and packed in a moisture-controlled bag to maintain freshness.' },
          { id: 'i8', name: 'Spicy Green Chillies', price: 40, image: '🌶️', desc: '250g · Freshly plucked', details: 'Hot green chillies. Slice them lengthwise to garnish and add an extra layer of raw heat.' },
        ],
      },
    ],
  },
  party: {
    label: 'Event Planning (House Warming Party)',
    promptValue: 'throw a house warming party for 15 people',
    prefilled: [
      { question: 'Number of Guests?', options: ['5 Guests', '10 Guests', '15 Guests', '25 Guests', '50 Guests'], answer: '15 Guests' },
      { question: 'Vibe?', options: ['Casual Cozy', 'High Energy', 'Elegant Formal', 'Thematic Decor'], answer: 'Casual Cozy' },
      { question: 'Catering?', options: ['Finger Foods & Snacks', 'Full Buffet Dinner', 'Desserts Only', 'Drinks & Charcuterie'], answer: 'Finger Foods & Snacks' },
    ],
    categories: [
      {
        id: 'c1', title: 'Food & Appetizers', icon: '🍔', desc: 'Delicious bites for guests to munch on', items: [
          { id: 'i9', name: 'Party Sliders Platter', price: 1899, image: '🍔', desc: '16 Mini burgers · Veg & Chicken mix', details: 'Bite-sized sliders with premium cheese, fresh lettuce, and house sauce. Perfect for self-serving counters.' },
          { id: 'i10', name: 'Paneer Tikka Skewers', price: 999, image: '🍢', desc: '12 skewers · Grilled to perfection', details: 'Spiced cottage cheese cubes grilled with bell peppers and onions. Served with mint chutney.' },
        ],
      },
      {
        id: 'c2', title: 'Beverages & Drinks', icon: '🥤', desc: 'Refreshing drinks and cups', items: [
          { id: 'i11', name: 'Craft Lemonade Cans', price: 450, image: '🥫', desc: '6 pack · Fizzy citrus refresh', details: 'Sparkling lemonade made with real juice and organic cane sugar. Best served chilled.' },
          { id: 'i12', name: 'Reusable Party Cups', price: 299, image: '🥤', desc: '25 pack · Navy blue · Eco-friendly', details: 'Biodegradable paper cups in a sleek navy blue finish. Solid, leak-proof construction.' },
        ],
      },
      {
        id: 'c3', title: 'Decor & Vibe', icon: '✨', desc: 'Lighting and decor essentials', items: [
          { id: 'i13', name: 'Warm White LED Strip', price: 699, image: '💡', desc: '15m · Dimmable with remote', details: 'Flexible adhesive LED strip to create a warm, inviting ambient glow in your living room.' },
          { id: 'i14', name: 'Marigold Welcome Garland', price: 349, image: '🌸', desc: '5 strands · Traditional welcome decor', details: 'Handmade artificial marigold flowers. Brings a beautiful traditional warmth to your entrance.' },
        ],
      },
    ],
  },
  travel: {
    label: 'Trip Planning (Ooty Vacation)',
    promptValue: 'plan a budget trip to Ooty for 3 days',
    prefilled: [
      { question: 'Travelers?', options: ['1 Adult', '2 Adults', '4 Adults (Family)', '6+ Group'], answer: '2 Adults' },
      { question: 'Duration?', options: ['2 Days, 1 Night', '3 Days, 2 Nights', '5 Days, 4 Nights'], answer: '3 Days, 2 Nights' },
      { question: 'Transport mode?', options: ['Outstation Cab', 'Luxury Sleeper Bus', 'Self-Drive Car', 'Flight + Local Cab'], answer: 'Outstation Cab' },
    ],
    categories: [
      {
        id: 'c1', title: 'Travel & Transport', icon: '🚗', desc: 'Cab rentals and roundtrip transit options', items: [
          { id: 'i15', name: 'Roundtrip Hatchback Cab', price: 6800, image: '🚗', desc: 'Bangalore to Ooty · Driver included', details: 'Dedicated hatchback cab for 3 days. Includes toll taxes, driver allowance, and sightseeing.' },
          { id: 'i16', name: 'Luxury AC Sleeper Bus', price: 2400, image: '🚌', desc: '2 tickets · Multi-axle semi-sleeper', details: 'Comfortable overnight bus tickets from Bangalore to Ooty. Reclining seats and charging points.' },
        ],
      },
      {
        id: 'c2', title: 'Cozy Stays', icon: '🏡', desc: 'Budget homestays and hotels in Ooty', items: [
          { id: 'i17', name: 'Pine View Homestay', price: 4500, image: '🏠', desc: '2 nights · Double room · Mountain view', details: 'A charming cottage near Ooty Lake. Includes free Wi-Fi, heaters, and home-cooked breakfast.' },
          { id: 'i18', name: 'Orchid Hill Resort', price: 7900, image: '🏨', desc: '2 nights · Deluxe room · Garden view', details: 'Premium budget resort with bonfire facilities and panoramic views of the tea gardens.' },
        ],
      },
      {
        id: 'c3', title: 'Sightseeing Pass', icon: '🎟️', desc: 'Passes to national parks and boat rides', items: [
          { id: 'i19', name: 'Ooty Lake Boating Pass', price: 600, image: '⛵', desc: '2 Adults · Self-pedal boat', details: '30-minute self-pedal boating experience at Ooty Lake. Lifejackets included.' },
          { id: 'i20', name: 'Botanical Garden Entry', price: 150, image: '🌸', desc: 'Fast-track entry tickets', details: 'Skip-the-line tickets to the famous Government Botanical Gardens containing rare flora.' },
        ],
      },
    ],
  },
  dorm: {
    label: 'New Dorm Setup (Minimalist Hostel Room)',
    promptValue: 'setup a minimalist hostel room under ₹15,000',
    prefilled: [
      { question: 'Room Layout?', options: ['Single Occupancy', 'Double Sharing', 'Quad Suite'], answer: 'Single Occupancy' },
      { question: 'Style?', options: ['Wood & White', 'Industrial Dark', 'Cozy Bohemian', 'Minimalist Gray'], answer: 'Wood & White' },
      { question: 'Priority?', options: ['Study Space + Storage', 'Sleeping Comfort First', 'Entertainment & Chill'], answer: 'Study Space + Storage' },
    ],
    categories: [
      {
        id: 'c1', title: 'Study Furniture', icon: '🪑', desc: 'Compact study tables and chairs', items: [
          { id: 'i21', name: 'Folding Study Desk', price: 2999, image: '💻', desc: 'Wall-mountable · Oak finish', details: 'Space-saving folding desk. Sturdy engineered wood top. Perfect for holding laptops and books.' },
          { id: 'i22', name: 'Ergonomic Desk Chair', price: 4200, image: '🪑', desc: 'Mesh back · Medium backrest', details: 'Breathable mesh chair with nylon base. Offers comfortable lumbar support for long study hours.' },
        ],
      },
      {
        id: 'c2', title: 'Comfort Bedding', icon: '🛌', desc: 'Mattresses and sheets for good sleep', items: [
          { id: 'i23', name: 'Single Cotton Mattress', price: 3499, image: '🛏️', desc: '4-inch thick · High density foam', details: 'Firm support single mattress. Covered in breathable cotton fabric. Hypoallergenic design.' },
          { id: 'i24', name: 'Solid Navy Bedsheet', price: 799, image: '🧼', desc: '100% cotton · Includes pillow cover', details: 'Premium thread-count cotton sheet. Machine washable, color-fast, and extremely soft.' },
        ],
      },
      {
        id: 'c3', title: 'Room Utility & Lights', icon: '💡', desc: 'Clocks, bins, and reading lights', items: [
          { id: 'i25', name: 'Clamp Reading Light', price: 850, image: '💡', desc: 'USB rechargeable · 3 modes', details: 'Eye-care LED reading light. Clamps onto bedheads or desks. Flexible neck for adjustable angles.' },
          { id: 'i26', name: 'Collapsible Laundry Hamper', price: 499, image: '🧺', desc: 'Waterproof fabric · Foldable', details: 'Canvas hamper with steel rings. Collapses flat when empty. Dual carrying handles.' },
        ],
      },
    ],
  },
  shopping: {
    label: 'General Shopping (Half Marathon Gear)',
    promptValue: 'buy running gear for a half marathon',
    prefilled: [
      { question: 'Experience Level?', options: ['Beginner Runner', 'Intermediate Runner', 'Pro/Marathoner'], answer: 'Intermediate Runner' },
      { question: 'Shoe Size?', options: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'], answer: 'UK 9' },
      { question: 'Gear Focus?', options: ['Shoes & Accessories', 'Apparel Only', 'Hydration & Tech Gears'], answer: 'Shoes & Accessories' },
    ],
    categories: [
      {
        id: 'c1', title: 'Running Shoes', icon: '👟', desc: 'Performance road running shoes', items: [
          { id: 'i27', name: 'Nike Pegasus 40', price: 9500, image: '👟', desc: 'React foam · UK 9 · Light grey', details: 'Classic road runner with responsive React foam. Breathable upper mesh, secure midfoot band.' },
          { id: 'i28', name: 'Puma Velocity Nitro 2', price: 7200, image: '👟', desc: 'Nitro foam · UK 9 · Orange', details: 'Daily trainer featuring Nitro foam for lightweight responsiveness. Excellent traction sole.' },
        ],
      },
      {
        id: 'c2', title: 'Apparel & Socks', icon: '🎽', desc: 'Dry-fit clothing to prevent chafing', items: [
          { id: 'i29', name: 'Dry-Fit Training Tee', price: 1199, image: '👕', desc: 'Sweat-wicking · reflective strip', details: 'Polyester tee built with mesh ventilation zones. Reflective details on chest for low-light safety.' },
          { id: 'i30', name: 'Anti-Blister Running Socks', price: 450, image: '🧦', desc: 'Double layer · Reinforced heel', details: 'Padded running socks that reduce friction to prevent blisters. Arch compression bands.' },
        ],
      },
      {
        id: 'c3', title: 'Hydration & Trackers', icon: '💧', desc: 'Running bottles and calorie counters', items: [
          { id: 'i31', name: 'Running Hydration Belt', price: 1250, image: '🎒', desc: 'Holds 2 bottles · Phone pocket', details: 'Ergonomic waist belt with two 250ml water bottles. Water-resistant neoprene zip pouch for phones.' },
          { id: 'i32', name: 'GPS Sport Smartwatch', price: 14500, image: '⌚', desc: 'Heart rate monitor · Waterproof', details: 'Track pace, distance, and routes with built-in GPS. Up to 7 days battery life in smartwatch mode.' },
        ],
      },
    ],
  },
};

// ─── DOM Elements ─── //
const screens = {
  prompt:   document.getElementById('screen-prompt'),
  clarify:  document.getElementById('screen-clarify'),
  swipe:    document.getElementById('screen-swipe'),
};

const UI = {
  categoryCards:      document.querySelectorAll('.category-card'),
  mainPrompt:         document.getElementById('main-prompt'),
  btnSubmitPrompt:    document.getElementById('btn-submit-prompt'),
  clarifyQuestions:   document.getElementById('clarify-questions'),
  roadmapTracks:      document.getElementById('roadmap-tracks'),
  btnStartSwiping:    document.getElementById('btn-start-swiping'),
  categoryTabs:       document.getElementById('category-tabs'),
  cardStack:          document.getElementById('card-stack'),
  swipeTitle:         document.getElementById('swipe-title'),
  btnSwipeLeft:       document.getElementById('btn-swipe-left'),
  btnSwipeRight:      document.getElementById('btn-swipe-right'),
  btnSwipeDone:       document.getElementById('btn-swipe-done'),
  btnSkipTopic:       document.getElementById('btn-skip-topic'),
  cartIcon:           document.getElementById('cart-icon'),
  cartBadge:          document.getElementById('cart-badge'),
  
  // Theme Switcher & Overlay Elements
  themeToggle:        document.getElementById('theme-toggle'),
  paymentOverlay:     document.getElementById('payment-overlay'),
  paymentLoader:      document.getElementById('payment-loader'),
  paymentSuccessCard: document.getElementById('payment-success-card'),
  paymentStatusText:  document.getElementById('payment-status-text'),
  successPaidAmount:  document.getElementById('success-paid-amount'),
  btnSuccessClose:    document.getElementById('btn-success-close'),
};

// ─── App ─── //
const app = {
  init() {
    this.initTheme();
    this.bindEvents();
    this.showScreen('prompt');
  },

  initTheme() {
    const savedProfile = localStorage.getItem('theme-profile');
    const nameEl = document.getElementById('theme-profile-name');
    if (savedProfile === 'espresso') {
      document.documentElement.classList.add('espresso-theme');
      if (nameEl) nameEl.innerText = 'ESPRESSO';
    } else {
      document.documentElement.classList.remove('espresso-theme');
      if (nameEl) nameEl.innerText = 'OLIVE';
    }
  },

  bindEvents() {
    // Theme profile toggle button click
    UI.themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const html = document.documentElement;
      const isEspresso = html.classList.toggle('espresso-theme');
      localStorage.setItem('theme-profile', isEspresso ? 'espresso' : 'olive');
      
      const nameEl = document.getElementById('theme-profile-name');
      if (nameEl) nameEl.innerText = isEspresso ? 'ESPRESSO' : 'OLIVE';
    });

    // Category card clicks
    UI.categoryCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectCategory(card.dataset.category);
      });
    });

    // Next/Submit Prompt button click
    UI.btnSubmitPrompt.addEventListener('click', (e) => {
      e.preventDefault();
      this.submitCategory();
    });

    // Start swiping from clarify screen
    UI.btnStartSwiping.addEventListener('click', (e) => {
      e.preventDefault();
      if (!UI.btnStartSwiping.hasAttribute('disabled')) {
        this.startSwiping();
      }
    });

    UI.btnSwipeLeft.addEventListener('click', (e) => {
      e.preventDefault();
      this.swipe('left');
    });

    UI.btnSwipeRight.addEventListener('click', (e) => {
      e.preventDefault();
      this.swipe('right');
    });

    UI.btnSkipTopic.addEventListener('click', (e) => {
      e.preventDefault();
      state.currentCategoryIndex++;
      state.currentCardIndex = 0;
      this.renderTabs();
      this.renderCards();
    });

    // Done Swiping button click -> shows Proceed Popup
    UI.btnSwipeDone.addEventListener('click', (e) => {
      e.preventDefault();
      this.showProceedPopup();
    });

    UI.cartIcon.addEventListener('click', (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-swipe-done');
      if (btn && !btn.hasAttribute('disabled')) {
        this.showProceedPopup();
      }
    });

    const btnCancelProceed = document.getElementById('btn-cancel-proceed');
    if (btnCancelProceed) {
      btnCancelProceed.addEventListener('click', (e) => {
        e.preventDefault();
        const popup = document.getElementById('proceed-popup');
        if (popup) {
          popup.classList.add('hidden');
          popup.classList.remove('flex');
        }
      });
    }

    const btnConfirmProceed = document.getElementById('btn-confirm-proceed');
    if (btnConfirmProceed) {
      btnConfirmProceed.addEventListener('click', (e) => {
        e.preventDefault();
        const popup = document.getElementById('proceed-popup');
        if (popup) {
          popup.classList.add('hidden');
          popup.classList.remove('flex');
        }
        this.handleCheckout();
      });
    }

    UI.btnSuccessClose.addEventListener('click', (e) => {
      e.preventDefault();
      UI.paymentOverlay.classList.add('hidden');
      UI.paymentOverlay.classList.remove('flex');
      this.resetToHome();
    });

    // Keyboard shortcuts on swipe screen
    document.addEventListener('keydown', (e) => {
      if (state.currentScreen !== 'swipe') return;
      if (e.key === 'ArrowLeft') this.swipe('left');
      if (e.key === 'ArrowRight') this.swipe('right');
    });
  },

  showScreen(id) {
    Object.values(screens).forEach(s => {
      if (s) {
        s.classList.remove('active');
        s.style.display = 'none';
      }
    });
    
    const target = screens[id];
    if (target) {
      target.style.display = 'flex';
      setTimeout(() => target.classList.add('active'), 50);
    }
    state.currentScreen = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ─── Screen 1: Category Select ─── //
  selectCategory(key) {
    state.selectedCategory = key;
    const data = MOCK_DATA[key];

    // Highlight selected card (using accent color border)
    UI.categoryCards.forEach(c => {
      if (c.dataset.category === key) {
        c.classList.add('!border-accent', '!bg-card-bg');
      } else {
        c.classList.remove('!border-accent', '!bg-card-bg');
      }
    });

    // Prefill input box
    if (UI.mainPrompt) {
      UI.mainPrompt.value = (data.promptValue || data.label).toUpperCase();
    }

    // Enable next button
    if (UI.btnSubmitPrompt) {
      UI.btnSubmitPrompt.removeAttribute('disabled');
    }
  },

  submitCategory() {
    if (!state.selectedCategory) return;
    this.renderPrefilled(MOCK_DATA[state.selectedCategory].prefilled);
    
    // Generate roadmap tracks automatically alongside preferences
    state.roadmapTracks = JSON.parse(JSON.stringify(MOCK_DATA[state.selectedCategory].categories));
    this.renderRoadmapTracks();
    
    this.showScreen('clarify');
  },

  // ─── Screen 2: Prefilled Clarification ─── //
  renderPrefilled(items) {
    UI.clarifyQuestions.innerHTML = '';
    items.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'animate-fade-up flex items-center justify-between py-2 border-b border-border-col last:border-b-0 gap-4';
      el.style.animationDelay = `${idx * 0.08}s`;

      const optionsHTML = item.options.map(opt => {
        const selected = opt === item.answer ? 'selected' : '';
        return `<option value="${opt}" ${selected}>${opt.toUpperCase()}</option>`;
      }).join('');

      el.innerHTML = `
        <span class="text-xs font-bold text-text/70 font-mono tracking-wider">${item.question.toUpperCase()}</span>
        <select class="question-select text-xs font-bold text-text bg-bg border border-border-col px-3.5 py-2.5 rounded-none outline-none focus:border-accent cursor-pointer" data-idx="${idx}">
          ${optionsHTML}
        </select>
      `;

      const select = el.querySelector('.question-select');
      select.addEventListener('change', (e) => {
        item.answer = e.target.value;
      });

      UI.clarifyQuestions.appendChild(el);
    });
  },

  // ─── Render Roadmap Tracks ─── //
  renderRoadmapTracks() {
    UI.roadmapTracks.innerHTML = '';

    if (state.roadmapTracks.length === 0) {
      UI.roadmapTracks.innerHTML = `
        <div class="text-center text-text/60 py-12 bg-card-bg border border-dashed border-border-col font-mono text-xs uppercase">
          <p class="font-bold">No tracks remaining</p>
          <p class="text-[10px] mt-1">Please reset category</p>
        </div>`;
      UI.btnStartSwiping.setAttribute('disabled', 'true');
      UI.btnStartSwiping.classList.add('opacity-30', 'cursor-not-allowed');
      return;
    }

    UI.btnStartSwiping.removeAttribute('disabled');
    UI.btnStartSwiping.classList.remove('opacity-30', 'cursor-not-allowed');

    state.roadmapTracks.forEach((track, idx) => {
      const el = document.createElement('div');
      el.className = 'animate-fade-up flex items-center justify-between p-4 bg-card-bg border border-border-col shadow-sm transition-all';
      el.style.animationDelay = `${idx * 0.05}s`;
      el.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-bg border border-border-col rounded-none flex items-center justify-center text-2xl">${track.icon}</div>
          <div>
            <h4 class="font-bold text-text text-sm font-['Oswald'] uppercase tracking-wider">${track.title}</h4>
            <p class="text-[10px] text-text/60 font-mono tracking-wider">${track.desc.toUpperCase()}</p>
          </div>
        </div>
        <button type="button" class="remove-track-btn w-10 h-10 bg-bg hover:bg-rose-950/20 border border-border-col text-text/60 hover:text-rose-600 transition-all flex items-center justify-center" data-track-index="${idx}" title="Remove track">
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      `;
      UI.roadmapTracks.appendChild(el);
    });

    UI.roadmapTracks.querySelectorAll('.remove-track-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.dataset.trackIndex);
        state.roadmapTracks.splice(idx, 1);
        this.renderRoadmapTracks();
      });
    });
  },

  startSwiping() {
    if (state.roadmapTracks.length === 0) return;
    state.categories = JSON.parse(JSON.stringify(state.roadmapTracks));
    state.currentCategoryIndex = 0;
    state.currentCardIndex = 0;
    this.renderTabs();
    this.renderCards();
    this.updateMiniCart();
    this.updateProceedButton();
    this.showScreen('swipe');
  },

  // ─── Screen 4: Swipe ─── //
  renderTabs() {
    UI.categoryTabs.innerHTML = '';
    const cat = state.categories[state.currentCategoryIndex];
    UI.swipeTitle.innerText = cat ? `${cat.title}` : 'ALL DONE!';

    state.categories.forEach((c, idx) => {
      const isActive = idx === state.currentCategoryIndex;
      const isDone = idx < state.currentCategoryIndex;

      const tab = document.createElement('div');
      tab.className = `px-4 py-1.5 border border-border-col text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
        isActive ? 'bg-accent text-bg border-accent' :
        isDone   ? 'bg-card-bg text-text/50 line-through' :
                   'bg-bg text-text/30 hover:bg-card-bg'
      }`;
      tab.innerHTML = isDone ? `<i class="fa-solid fa-check mr-1"></i>${c.title}` : c.title;
      
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        state.currentCategoryIndex = idx;
        state.currentCardIndex = 0;
        this.renderTabs();
        this.renderCards();
      });

      UI.categoryTabs.appendChild(tab);
    });
  },

  renderCards() {
    UI.cardStack.querySelectorAll('.swipe-card').forEach(c => c.remove());

    const category = state.categories[state.currentCategoryIndex];
    if (!category) {
      setTimeout(() => {
        const btn = document.getElementById('btn-swipe-done');
        if (btn && !btn.hasAttribute('disabled')) {
          this.showProceedPopup();
        }
      }, 400);
      return;
    }

    state.currentCardIndex = 0;
    const items = [...category.items].reverse();

    items.forEach((item, idx) => {
      const isTop = idx === items.length - 1;
      const depth = items.length - 1 - idx;
      const offset = depth * 8;
      const scale = 1 - depth * 0.035;

      const card = document.createElement('div');
      card.className = 'swipe-card border-t-8 border-t-accent border-x border-b border-border-col p-6 sm:p-8 flex flex-col bg-card-bg rounded-none shadow-none overflow-hidden';
      card.style.transform = `translateY(${offset}px) scale(${scale})`;
      card.style.zIndex = idx;
      card.dataset.index = items.length - 1 - idx;

      card.innerHTML = `
        <div class="like-overlay">KEEP</div>
        <div class="nope-overlay">SKIP</div>
        
        <!-- Info Trigger Button -->
        <button type="button" class="info-trigger-btn absolute top-8 left-8 w-10 h-10 bg-accent text-bg border border-border-col flex items-center justify-center transition-all z-20 hover:scale-105 active:scale-95" title="More Info">
          <i class="fa-solid fa-info text-sm"></i>
        </button>

        <!-- Main Card Content -->
        <div class="flex-1 flex flex-col pt-3">
          <div class="h-64 sm:h-80 bg-bg mb-5 flex items-center justify-center text-8xl sm:text-9xl border border-border-col rounded-none">
            ${item.image}
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold mb-2 text-text leading-tight font-['Oswald'] uppercase tracking-wider">${item.name}</h3>
          <p class="text-text/70 text-sm sm:text-base mb-auto font-sans leading-relaxed">${item.desc}</p>
          <div class="mt-6 flex items-center justify-between border-t border-border-col pt-4">
            <span class="text-2xl sm:text-3xl font-bold text-accent font-mono">${formatINR(item.price)}</span>
            <span class="text-[10px] text-text bg-bg border border-border-col px-4 py-1.5 font-bold tracking-widest font-mono">${category.title.toUpperCase()}</span>
          </div>
        </div>

        <!-- Sliding Info Drawer (Brutalist style) -->
        <div class="info-drawer absolute inset-x-0 bottom-0 bg-card-bg border-t border-border-col p-6 sm:p-8 transform translate-y-full transition-transform duration-300 z-30 flex flex-col justify-between h-[65%] shadow-none">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h4 class="text-lg font-bold text-text font-['Oswald'] tracking-wide">SPECIFICATIONS</h4>
              <button type="button" class="info-close-btn text-rose-500 hover:text-rose-600 w-8 h-8 bg-bg border border-border-col flex items-center justify-center transition-all">
                <i class="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>
            <p class="text-sm text-text/80 leading-relaxed font-sans">${item.details || 'No additional specifications provided.'}</p>
          </div>
          <div class="border-t border-border-col pt-4">
            <span class="text-[10px] text-accent font-bold uppercase tracking-widest font-mono block mb-2">HIGHLIGHTS</span>
            <div class="grid grid-cols-2 gap-2 text-[10px] text-text/75 font-mono">
              <div><i class="fa-solid fa-check text-[9px] text-accent mr-1"></i> VERIFIED QUALITY</div>
              <div><i class="fa-solid fa-truck text-[9px] text-accent mr-1"></i> FAST SHIPPING</div>
              <div><i class="fa-solid fa-rotate-left text-[9px] text-accent mr-1"></i> EASY RETURNS</div>
              <div><i class="fa-solid fa-box text-[9px] text-accent mr-1"></i> SECURE PACKAGING</div>
            </div>
          </div>
        </div>
      `;

      UI.cardStack.appendChild(card);
      if (isTop) this.initDrag(card);

      const infoBtn = card.querySelector('.info-trigger-btn');
      const closeBtn = card.querySelector('.info-close-btn');
      const drawer = card.querySelector('.info-drawer');

      if (infoBtn && closeBtn && drawer) {
        infoBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          drawer.classList.remove('translate-y-full');
          drawer.classList.add('translate-y-0');
        });

        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          drawer.classList.remove('translate-y-0');
          drawer.classList.add('translate-y-full');
        });
      }
    });
  },

  initDrag(card) {
    let dragging = false, startX = 0, dx = 0;
    const likeOverlay = card.querySelector('.like-overlay');
    const nopeOverlay = card.querySelector('.nope-overlay');
    const drawer = card.querySelector('.info-drawer');

    const onMove = (e) => {
      if (!dragging) return;
      if (drawer && drawer.classList.contains('translate-y-0')) return;

      dx = (e.clientX || e.touches[0].clientX) - startX;
      const rot = dx * 0.06;
      card.style.transition = 'none';
      card.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;

      const progress = Math.min(Math.abs(dx) / 100, 1);
      if (dx > 0) {
        likeOverlay.style.opacity = progress;
        nopeOverlay.style.opacity = 0;
      } else {
        nopeOverlay.style.opacity = progress;
        likeOverlay.style.opacity = 0;
      }
    };

    const onEnd = () => {
      if (!dragging) return;
      dragging = false;
      card.style.transition = 'transform 0.35s cubic-bezier(.4,.0,.2,1), opacity 0.35s ease';
      likeOverlay.style.opacity = 0;
      nopeOverlay.style.opacity = 0;

      if (dx > 100) this.swipe('right', card);
      else if (dx < -100) this.swipe('left', card);
      else card.style.transform = 'translateY(0) scale(1)';

      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
    };

    const onStart = (e) => {
      if (e.target.closest('.info-trigger-btn') || e.target.closest('.info-close-btn')) return;
      if (drawer && drawer.classList.contains('translate-y-0') && e.target.closest('.info-drawer')) return;

      dragging = true;
      startX = e.clientX || e.touches[0].clientX;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
      document.addEventListener('mouseup', onEnd);
      document.addEventListener('touchend', onEnd);
    };

    card.addEventListener('mousedown', onStart);
    card.addEventListener('touchstart', onStart, { passive: true });
  },

  swipe(direction, topCardEl = null) {
    const category = state.categories[state.currentCategoryIndex];
    if (!category) return;
    const item = category.items[state.currentCardIndex];
    if (!item) return;

    const cards = UI.cardStack.querySelectorAll('.swipe-card');
    const topCard = topCardEl || Array.from(cards).find(c => +c.dataset.index === state.currentCardIndex);
    if (!topCard) return;

    if (direction === 'right') {
      topCard.classList.add('swipe-right');
      this.addToCart(item);
    } else {
      topCard.classList.add('swipe-left');
    }

    state.currentCardIndex++;

    setTimeout(() => {
      topCard.remove();
      const next = Array.from(UI.cardStack.querySelectorAll('.swipe-card'))
        .find(c => +c.dataset.index === state.currentCardIndex);

      if (next) {
        next.style.transform = 'translateY(0) scale(1)';
        this.initDrag(next);
      } else {
        state.currentCategoryIndex++;
        this.renderTabs();
        this.renderCards();
      }
    }, 350);
  },

  addToCart(item) {
    const existing = state.cart.find(c => c.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }
    this.updateCartBadge();
  },

  removeFromCart(index) {
    state.cart.splice(index, 1);
    this.updateCartBadge();
  },

  updateCartBadge() {
    const n = state.cart.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
    if (n > 0) {
      UI.cartBadge.innerText = n;
      UI.cartBadge.classList.remove('hidden');
    } else {
      UI.cartBadge.classList.add('hidden');
    }
    this.updateMiniCart();
    this.updateProceedButton();
  },

  updateMiniCart() {
    const itemsContainer = document.getElementById('mini-cart-items');
    const countEl = document.getElementById('mini-cart-count');
    const totalEl = document.getElementById('mini-cart-total');
    if (!itemsContainer) return;

    itemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = '<div class="text-center text-text/50 py-10 font-mono text-xs">Swipe right to add items</div>';
    } else {
      state.cart.forEach(item => {
        total += item.price * item.quantity;
        count += item.quantity;
        
        const row = document.createElement('div');
        row.className = 'flex items-center gap-3 bg-bg border border-border-col p-2 animate-fade-up';
        row.innerHTML = `
          <div class="w-8 h-8 bg-card-bg border border-border-col flex items-center justify-center shrink-0 text-lg">${item.image}</div>
          <div class="flex-1 min-w-0">
            <h5 class="text-[10px] font-bold text-text truncate uppercase font-['Oswald'] tracking-wide">${item.name}</h5>
            <div class="flex justify-between mt-0.5">
              <span class="text-[9px] text-text/60 font-mono">x${item.quantity}</span>
              <span class="text-[10px] text-accent font-bold font-mono">${formatINR(item.price * item.quantity)}</span>
            </div>
          </div>
        `;
        itemsContainer.appendChild(row);
      });
    }

    if (countEl) countEl.innerText = `${count} ITEM${count !== 1 ? 'S' : ''}`;
    if (totalEl) totalEl.innerText = formatINR(total);
  },

  updateProceedButton() {
    if (!state.categories || state.categories.length === 0) return;
    
    let allCategoriesSatisfied = true;
    for (const cat of state.categories) {
      const hasItem = state.cart.some(cartItem => cat.items.some(catItem => catItem.id === cartItem.id));
      if (!hasItem) {
        allCategoriesSatisfied = false;
        break;
      }
    }

    const btn = document.getElementById('btn-swipe-done');
    if (btn) {
      if (allCategoriesSatisfied) {
        btn.removeAttribute('disabled');
        btn.classList.remove('opacity-30', 'cursor-not-allowed');
      } else {
        btn.setAttribute('disabled', 'true');
        btn.classList.add('opacity-30', 'cursor-not-allowed');
      }
    }
  },

  // ─── Payment Popup logic ─── //
  showProceedPopup() {
    let total = 0;
    state.cart.forEach(item => {
      total += item.price * item.quantity;
    });
    
    const popupTotal = document.getElementById('popup-total');
    if (popupTotal) {
      popupTotal.innerText = formatINR(total);
    }
    
    const popup = document.getElementById('proceed-popup');
    if (popup) {
      popup.classList.remove('hidden');
      popup.classList.add('flex');
    }
  },

  handleCheckout() {
    if (state.cart.length === 0) return;
    
    let subtotal = 0;
    state.cart.forEach(c => subtotal += c.price * c.quantity);
    const tax = Math.round(subtotal * 0.18);
    const grandTotal = subtotal + tax;

    UI.paymentOverlay.classList.remove('hidden');
    UI.paymentOverlay.classList.add('flex');
    UI.paymentLoader.classList.remove('hidden');
    UI.paymentSuccessCard.classList.add('hidden');
    
    const statuses = [
      'INITIALIZING PRAVA SECURE CHANNEL...',
      'AUTHORIZING PRAVA SMART CONTRACT...',
      'CONFIRMING PRAVA BLOCKCHAIN SETTLEMENT...'
    ];

    setTimeout(() => {
      UI.paymentStatusText.innerText = statuses[1];
    }, 900);

    setTimeout(() => {
      UI.paymentStatusText.innerText = statuses[2];
    }, 1800);

    setTimeout(() => {
      UI.paymentLoader.classList.add('hidden');
      UI.paymentSuccessCard.classList.remove('hidden');
      UI.paymentSuccessCard.classList.add('flex');
      
      UI.successPaidAmount.innerText = formatINR(grandTotal);
      triggerConfetti();
    }, 2700);
  },

  resetToHome() {
    state.cart = [];
    state.categories = [];
    state.roadmapTracks = [];
    state.selectedCategory = null;
    state.currentCategoryIndex = 0;
    state.currentCardIndex = 0;
    this.updateCartBadge();

    UI.categoryCards.forEach(c => {
      c.classList.remove('!border-accent', '!bg-card-bg');
    });

    if (UI.mainPrompt) {
      UI.mainPrompt.value = '';
    }

    if (UI.btnSubmitPrompt) {
      UI.btnSubmitPrompt.setAttribute('disabled', 'true');
    }
    
    this.updateMiniCart();
    this.updateProceedButton();

    this.showScreen('prompt');
  },
};

// ─── Boot ─── //
document.addEventListener('DOMContentLoaded', () => app.init());
