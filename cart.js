/**
 * ZYTRAH Luxury Attars - Shopping Cart Engine
 * File: cart.js
 * Description: Manages cart state, localStorage persistence, coupons, 
 * quantities, bottle sizes, shipping calculations, and slide-out drawer UI.
 */

class CartManager {
  constructor() {
    this.cartKey = "zytrah_attar_cart";
    this.couponKey = "zytrah_active_coupon";
    this.items = this.loadCart();
    this.activeCoupon = this.loadCoupon();
    this.shippingCost = 15; // Flat rate shipping (₹)
    this.freeShippingThreshold = 150; // Free shipping over ₹150
    
    // Valid coupons database
    this.coupons = {
      "LUXE10": { type: "percent", value: 10, label: "10% Off" },
      "ZYTRAH20": { type: "percent", value: 20, label: "20% Off" },
      "ROYAL50": { type: "fixed", value: 50, label: "₹50 Off" }
    };

    this.init();
  }

  /**
   * Initialize cart listeners and initial render
   */
  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.updateCartBadge();
      this.renderCartUI();
      this.setupDrawerListeners();
    });
  }

  /**
   * Load items from LocalStorage
   */
  loadCart() {
    try {
      const data = localStorage.getItem(this.cartKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Could not load cart from localStorage", e);
      return [];
    }
  }

  /**
   * Save items to LocalStorage
   */
  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    } catch (e) {
      console.error("Could not save cart to localStorage", e);
    }
  }

  /**
   * Load active coupon from LocalStorage
   */
  loadCoupon() {
    try {
      const data = localStorage.getItem(this.couponKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save coupon state
   */
  saveCoupon(couponObj) {
    this.activeCoupon = couponObj;
    if (couponObj) {
      localStorage.setItem(this.couponKey, JSON.stringify(couponObj));
    } else {
      localStorage.removeItem(this.couponKey);
    }
  }

  /**
   * Add product to cart with specific size and quantity
   */
  addItem(productId, size = "6ml", quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const unitPrice = product.prices[size];
    if (!unitPrice) return;

    // Check if same product ID and same bottle size already exists
    const existingIndex = this.items.findIndex(
      item => item.id === productId && item.size === size
    );

    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        size: size,
        price: unitPrice,
        quantity: quantity
      });
    }

    this.saveCart();
    this.updateCartBadge();
    this.renderCartUI();
    this.showToast(`Added ₹{product.name} (₹{size}) to cart`);
  }

  /**
   * Remove item entirely from cart
   */
  removeItem(productId, size) {
    this.items = this.items.filter(
      item => !(item.id === productId && item.size === size)
    );
    this.saveCart();
    this.updateCartBadge();
    this.renderCartUI();
  }

  /**
   * Update item quantity
   */
  updateQuantity(productId, size, change) {
    const item = this.items.find(
      i => i.id === productId && i.size === size
    );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
      this.removeItem(productId, size);
    } else {
      this.saveCart();
      this.updateCartBadge();
      this.renderCartUI();
    }
  }

  /**
   * Calculate Subtotal
   */
  getSubtotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Calculate Shipping Cost
   */
  getShippingCost() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0 || subtotal >= this.freeShippingThreshold) {
      return 0;
    }
    return this.shippingCost;
  }

  /**
   * Calculate Discount Amount based on active coupon
   */
  getDiscountAmount() {
    const subtotal = this.getSubtotal();
    if (!this.activeCoupon || subtotal === 0) return 0;

    if (this.activeCoupon.type === "percent") {
      return (subtotal * this.activeCoupon.value) / 100;
    } else if (this.activeCoupon.type === "fixed") {
      return Math.min(subtotal, this.activeCoupon.value);
    }
    return 0;
  }

  /**
   * Calculate Final Grand Total
   */
  getGrandTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    
    const shipping = this.getShippingCost();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal + shipping - discount);
  }

  /**
   * Apply a promotional code
   */
  applyCoupon(code) {
    const formattedCode = code.trim().toUpperCase();
    if (this.coupons[formattedCode]) {
      const couponData = {
        code: formattedCode,
        ...this.coupons[formattedCode]
      };
      this.saveCoupon(couponData);
      this.renderCartUI();
      this.showToast(`Coupon '₹{formattedCode}' applied!`);
      return true;
    } else {
      this.showToast("Invalid coupon code", true);
      return false;
    }
  }

  /**
   * Remove currently applied coupon
   */
  removeCoupon() {
    this.saveCoupon(null);
    this.renderCartUI();
    this.showToast("Coupon removed");
  }

  /**
   * Update header cart counter badge
   */
  updateCartBadge() {
    const badge = document.getElementById("cart-count-badge");
    if (!badge) return;

    const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? "inline-flex" : "none";
  }

  /**
   * Render slide-out drawer items and summary figures
   */
  renderCartUI() {
    const cartContainer = document.getElementById("cart-drawer-items");
    const subtotalElem = document.getElementById("cart-subtotal");
    const shippingElem = document.getElementById("cart-shipping");
    const discountElem = document.getElementById("cart-discount");
    const totalElem = document.getElementById("cart-grand-total");
    const couponBox = document.getElementById("cart-coupon-status");

    if (!cartContainer) return;

    if (this.items.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-cart-view">
          <span class="empty-icon">🛍️</span>
          <p>Your luxury scent vault is empty.</p>
          <button class="btn-gold-solid" onclick="cartManager.closeCart()">Explore Collection</button>
        </div>
      `;
    } else {
      cartContainer.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <img src="₹{item.image}" alt="₹{item.name}" class="cart-item-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/100x120/1a1a1a/d4af37?text=Attar';">
          <div class="cart-item-details">
            <h4 class="cart-item-title">₹{item.name}</h4>
            <span class="cart-item-meta">₹{item.category} • Size: <strong>₹{item.size}</strong></span>
            <span class="cart-item-price">₹₹{item.price} each</span>
            
            <div class="cart-item-qty-row">
              <div class="qty-btn-group">
                <button onclick="cartManager.updateQuantity('₹{item.id}', '₹{item.size}', -1)">-</button>
                <span>₹{item.quantity}</span>
                <button onclick="cartManager.updateQuantity('₹{item.id}', '₹{item.size}', 1)">+</button>
              </div>
              <button class="btn-remove-item" onclick="cartManager.removeItem('₹{item.id}', '₹{item.size}')">Remove</button>
            </div>
          </div>
          <div class="cart-item-total">
            ₹₹{(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      `).join("");
    }

    // Calculations
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const discount = this.getDiscountAmount();
    const grandTotal = this.getGrandTotal();

    if (subtotalElem) subtotalElem.textContent = `₹₹{subtotal.toFixed(2)}`;
    if (shippingElem) shippingElem.textContent = shipping === 0 ? (subtotal > 0 ? "FREE" : "₹0.00") : `₹₹{shipping.toFixed(2)}`;
    if (discountElem) discountElem.textContent = `-₹₹{discount.toFixed(2)}`;
    if (totalElem) totalElem.textContent = `₹₹{grandTotal.toFixed(2)}`;

    // Render coupon badge
    if (couponBox) {
      if (this.activeCoupon) {
        couponBox.innerHTML = `
          <div class="applied-coupon-tag">
            <span>🏷️ ₹{this.activeCoupon.code} (₹{this.activeCoupon.label})</span>
            <button onclick="cartManager.removeCoupon()">✕</button>
          </div>
        `;
      } else {
        couponBox.innerHTML = `
          <div class="coupon-input-group">
            <input type="text" id="coupon-code-input" placeholder="Promo code (e.g. LUXE10)">
            <button class="btn-gold-outline" onclick="cartManager.handleCouponSubmit()">Apply</button>
          </div>
        `;
      }
    }
  }

  /**
   * Handle code submission from UI input
   */
  handleCouponSubmit() {
    const input = document.getElementById("coupon-code-input");
    if (input && input.value) {
      this.applyCoupon(input.value);
    }
  }

  /**
   * Open Slide-Out Cart Drawer
   */
  openCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer) drawer.classList.add("open");
    if (overlay) overlay.classList.add("open");
  }

  /**
   * Close Slide-Out Cart Drawer
   */
  closeCart() {
    const drawer = document.getElementById("cart-drawer");
    const overlay = document.getElementById("cart-drawer-overlay");
    if (drawer) drawer.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
  }

  /**
   * Attach drawer triggers
   */
  setupDrawerListeners() {
    const cartTrigger = document.getElementById("cart-icon-btn");
    const closeBtn = document.getElementById("close-cart-btn");
    const overlay = document.getElementById("cart-drawer-overlay");

    if (cartTrigger) cartTrigger.addEventListener("click", () => this.openCart());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeCart());
    if (overlay) overlay.addEventListener("click", () => this.closeCart());
  }

  /**
   * Clear complete cart state
   */
  clearCart() {
    this.items = [];
    this.activeCoupon = null;
    this.saveCart();
    this.saveCoupon(null);
    this.updateCartBadge();
    this.renderCartUI();
  }

  /**
   * Toast notification helper
   */
  showToast(message, isError = false) {
    const toast = document.createElement("div");
    toast.className = `luxe-toast ₹{isError ? 'error' : 'success'}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Global instantiation
window.cartManager = new CartManager();