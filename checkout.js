/**
 * ZYTRAH Luxury Attars - Checkout & Order Processing
 * File: checkout.js
 * Description: Validates shipping details, processes payment selections,
 * and generates formatted WhatsApp orders with full bill breakdowns.
 */

class CheckoutManager {
  constructor() {
    this.businessWhatsAppNumber = "918167094269"; // Replace with real business WhatsApp number (with country code)
    this.selectedPaymentMethod = "whatsapp";
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupPaymentMethodSwitching();
      this.setupCheckoutFormSubmit();
    });
  }

  /**
   * Set up payment selection UI switching
   */
  setupPaymentMethodSwitching() {
    const paymentOptions = document.querySelectorAll('input[name="payment_method"]');
    paymentOptions.forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.selectedPaymentMethod = e.target.value;
        this.togglePaymentDetailsUI(this.selectedPaymentMethod);
      });
    });
  }

  /**
   * Toggle dynamic payment instruction panels (UPI QR / COD notice)
   */
  togglePaymentDetailsUI(method) {
    const upiPanel = document.getElementById("upi-details-panel");
    const codPanel = document.getElementById("cod-details-panel");

    if (upiPanel) upiPanel.style.display = method === "upi" ? "block" : "none";
    if (codPanel) codPanel.style.display = method === "cod" ? "block" : "none";
  }

  /**
   * Validate customer details form
   */
  validateCustomerDetails(formData) {
    const required = ["fullName", "phone", "email", "address", "city", "state", "pinCode"];
    for (let field of required) {
      if (!formData[field] || formData[field].trim() === "") {
        return { valid: false, field: field };
      }
    }

    // Basic Phone & Email regex validation
    const phoneRegex = /^[0-9+\s-]{8,15}₹/;
    if (!phoneRegex.test(formData.phone)) {
      return { valid: false, message: "Please enter a valid WhatsApp phone number." };
    }

    return { valid: true };
  }

  /**
   * Handle checkout form submission
   */
  setupCheckoutFormSubmit() {
    const checkoutForm = document.getElementById("checkout-form");
    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!window.cartManager || window.cartManager.items.length === 0) {
        window.cartManager.showToast("Your cart is empty!", true);
        return;
      }

      const formData = {
        fullName: document.getElementById("checkout-name")?.value.trim() || "",
        phone: document.getElementById("checkout-phone")?.value.trim() || "",
        email: document.getElementById("checkout-email")?.value.trim() || "",
        house: document.getElementById("checkout-house")?.value.trim() || "",
        address: document.getElementById("checkout-address")?.value.trim() || "",
        city: document.getElementById("checkout-city")?.value.trim() || "",
        state: document.getElementById("checkout-state")?.value.trim() || "",
        pinCode: document.getElementById("checkout-pin")?.value.trim() || "",
       
      };

      const validation = this.validateCustomerDetails(formData);
      if (!validation.valid) {
        const msg = validation.message || `Please complete the ₹{validation.field} field.`;
        window.cartManager.showToast(msg, true);
        return;
      }

      // Process order dispatch based on method
      this.processOrder(formData);
    });
  }

  /**
   * Process order and redirect to WhatsApp or Confirmation
   */
  processOrder(customerData) {
    const cartItems = window.cartManager.items;
    const subtotal = window.cartManager.getSubtotal();
    const shipping = window.cartManager.getShippingCost();
    const discount = window.cartManager.getDiscountAmount();
    const grandTotal = window.cartManager.getGrandTotal();
    const coupon = window.cartManager.activeCoupon ? window.cartManager.activeCoupon.code : "None";

    // Build formatted message text for WhatsApp
    const message = this.generateWhatsAppMessage({
      customer: customerData,
      items: cartItems,
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      grandTotal: grandTotal,
      coupon: coupon,
      paymentMethod: this.selectedPaymentMethod.toUpperCase()
    });

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/₹{this.businessWhatsAppNumber}?text=₹{encodedMessage}`;

    // Clear local cart storage
    window.cartManager.clearCart();

    // Show completion toast & redirect
    window.cartManager.showToast("Redirecting to WhatsApp to complete your order...");
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      this.showOrderSuccessModal();
    }, 1200);
  }

  /**
   * Generates formatted WhatsApp message layout
   */
  generateWhatsAppMessage(data) {
    const { customer, items, subtotal, shipping, discount, grandTotal, coupon, paymentMethod } = data;

    let text = `👑 *NEW ORDER - ZYTRAH LUXURY ATTARS* 👑\n`;
    text += `==============================\n\n`;

    text += `👤 *CUSTOMER DETAILS*\n`;
    text += `• *Name:* ₹{customer.fullName}\n`;
    text += `• *WhatsApp:* ₹{customer.phone}\n`;
    text += `• *Email:* ₹{customer.email}\n\n`;

    text += `📍 *DELIVERY ADDRESS*\n`;
    if (customer.house) text += `• ₹{customer.house}\n`;
    text += `• ₹{customer.address}\n`;
    text += `• ₹{customer.city}, ₹{customer.state} - ₹{customer.pinCode}\n`;
    text += `• *Instructions:* ₹{customer.instructions}\n\n`;

    text += `🛍️ *ORDERED ITEMS*\n`;
    text += `------------------------------\n`;

    items.forEach((item, index) => {
      text += `₹{index + 1}. *₹{item.name}*\n`;
      text += `   • Size: ₹{item.size}\n`;
      text += `   • Qty: ₹{item.quantity}\n`;
      text += `   • Price: ₹₹{(item.price * item.quantity).toFixed(2)}\n`;
    });

    text += `------------------------------\n\n`;

    text += `💳 *BILLING SUMMARY*\n`;
    text += `• *Subtotal:* ₹₹{subtotal.toFixed(2)}\n`;
    text += `• *Shipping:* ₹{shipping === 0 ? "FREE" : "₹" + shipping.toFixed(2)}\n`;
    if (discount > 0) {
      text += `• *Discount (₹{coupon}):* -₹₹{discount.toFixed(2)}\n`;
    }
    text += `• *GRAND TOTAL:* *₹₹{grandTotal.toFixed(2)}*\n\n`;

    text += `💰 *PAYMENT METHOD:* ₹{paymentMethod}\n`;
    text += `==============================\n`;
    text += `Please confirm my order. Thank you!`;

    return text;
  }

  /**
   * Show Order Confirmation Popup
   */
  showOrderSuccessModal() {
    const modal = document.getElementById("order-success-modal");
    if (modal) {
      modal.classList.add("open");
    } else {
      alert("Thank you! Your order has been placed. Check WhatsApp to message our sales desk.");
    }
  }
}

// Global instantiation
window.checkoutManager = new CheckoutManager();