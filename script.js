/**
 * ZYTRAH Luxury Attars - Main UI & Interactive Logic
 * File: script.js
 * Description: Renders products, controls live search, filtering, sorting,
 * bottle size selection, and general navigation state.
 */

// Active State Storage
let currentSelectedCategory = "All";
let currentSearchTerm = "";
let currentPriceLimit = 400;
let currentSizeFilter = "All";
let currentSortOption = "featured";
let currentAvailabilityFilter = "all";

// Selected sizes state per product card { productId: "3ml" }
const selectedBottleSizes = {};

// Initialize application when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeSizeDefaults();
  renderFeaturedProducts();
  renderAllProducts();
  setupEventListeners();
  populateCategoryDropdown();
  updatePriceDisplay(currentPriceLimit);
});

/**
 * Set initial default size (6ml) for all products
 */
function initializeSizeDefaults() {
  products.forEach(product => {
    selectedBottleSizes[product.id] = "6ml";
  });
}

/**
 * Setup DOM event listeners for search, filters, and mobile menu
 */
function setupEventListeners() {
  // Live Search Input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value.trim().toLowerCase();
      applyFiltersAndRender();
    });
  }

  // Price Range Filter Input
  const priceRange = document.getElementById("price-range");
  if (priceRange) {
    priceRange.addEventListener("input", (e) => {
      currentPriceLimit = parseFloat(e.target.value);
      updatePriceDisplay(currentPriceLimit);
      applyFiltersAndRender();
    });
  }

  // Size Filter Select
  const sizeFilter = document.getElementById("size-filter");
  if (sizeFilter) {
    sizeFilter.addEventListener("change", (e) => {
      currentSizeFilter = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Sort Select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSortOption = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Availability Filter Select
  const availabilityFilter = document.getElementById("availability-filter");
  if (availabilityFilter) {
    availabilityFilter.addEventListener("change", (e) => {
      currentAvailabilityFilter = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Mobile Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("open");
    });
  }
}

/**
 * Populate Category Filter buttons/dropdown dynamically
 */
function populateCategoryDropdown() {
  const categoryContainer = document.getElementById("category-pills");
  if (!categoryContainer) return;

  const categories = ["All", ...new Set(products.map(p => p.category))];
  categoryContainer.innerHTML = "";

  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = `category-pill ${category === currentSelectedCategory ? 'active' : ''}`;
    btn.textContent = category;
    btn.onclick = () => filterByCategory(category);
    categoryContainer.appendChild(btn);
  });
}

/**
 * Set category filter from UI click
 */
function filterByCategory(category) {
  currentSelectedCategory = category;

  // Update active pill styling
  const pills = document.querySelectorAll(".category-pill");
  pills.forEach(pill => {
    if (pill.textContent === category) {
      pill.classList.add("active");
    } else {
      pill.classList.remove("active");
    }
  });

  applyFiltersAndRender();
}

/**
 * Updates UI price display label
 */
function updatePriceDisplay(val) {
  const priceDisplay = document.getElementById("price-display");
  if (priceDisplay) {
    priceDisplay.textContent = `₹${val}`;
  }
}

/**
 * Applies search, filters, and sorting to product master list
 */
function applyFiltersAndRender() {
  let filtered = [...products];

  // 1. Filter by Category
  if (currentSelectedCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentSelectedCategory);
  }

  // 2. Filter by Search Keyword
  if (currentSearchTerm !== "") {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(currentSearchTerm) ||
      p.description.toLowerCase().includes(currentSearchTerm) ||
      p.category.toLowerCase().includes(currentSearchTerm)
    );
  }

  // 3. Filter by Price (evaluated against currently selected size or default 6ml)
  filtered = filtered.filter(p => {
    const selectedSize = selectedBottleSizes[p.id] || "6ml";
    return p.prices[selectedSize] <= currentPriceLimit;
  });

  // 4. Filter by Bestseller / Availability
  if (currentAvailabilityFilter === "bestsellers") {
    filtered = filtered.filter(p => p.bestseller);
  }

  // 5. Sort products
  filtered = sortProducts(filtered, currentSortOption);

  renderProductGrid("product-grid", filtered);
}

/**
 * Sorts array of products based on selected criteria
 */
function sortProducts(items, option) {
  const list = [...items];
  switch (option) {
    case "price-low":
      return list.sort((a, b) => {
        const sizeA = selectedBottleSizes[a.id] || "6ml";
        const sizeB = selectedBottleSizes[b.id] || "6ml";
        return a.prices[sizeA] - b.prices[sizeB];
      });
    case "price-high":
      return list.sort((a, b) => {
        const sizeA = selectedBottleSizes[a.id] || "6ml";
        const sizeB = selectedBottleSizes[b.id] || "6ml";
        return b.prices[sizeB] - a.prices[sizeA];
      });
    case "alphabetical":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "bestseller":
      return list.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
    case "featured":
    default:
      return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}

/**
 * Render featured items in hero/home section
 */
function renderFeaturedProducts() {
  const featured = products.filter(p => p.featured).slice(0, 4);
  renderProductGrid("featured-grid", featured);
}

/**
 * Render all items into main collection grid
 */
function renderAllProducts() {
  renderProductGrid("product-grid", products);
}

/**
 * Generic product grid DOM generator
 */
function renderProductGrid(targetElementId, productList) {
  const container = document.getElementById(targetElementId);
  if (!container) return;

  if (productList.length === 0) {
    container.innerHTML = `
      <div class="no-products">
        <p>✨ No luxury attars match your criteria.</p>
        <button class="btn btn-gold-outline" onclick="resetAllFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = productList.map(product => createProductCardHTML(product)).join("");
}

/**
 * Generates card HTML for a single attar product
 */
function createProductCardHTML(product) {
  const currentSize = selectedBottleSizes[product.id] || "6ml";
  const currentPrice = product.prices[currentSize];

  return `
    <div class="product-card" id="card-${product.id}">
      ${product.bestseller ? `<span class="badge-bestseller">Best Seller</span>` : ''}
      <div class="card-image-wrapper">
        <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500/1a1a1a/d4af37?text=${encodeURIComponent(product.name)}';">
        <div class="card-overlay">
          <button class="btn-quickview" onclick="openProductModal('${product.id}')">Quick View</button>
        </div>
      </div>
      <div class="card-content">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.description}</p>
        
        <!-- Size Selector Pills -->
        <div class="size-selector-group">
          ${Object.keys(product.prices).map(size => `
            <button class="size-pill ${size === currentSize ? 'active' : ''}" 
                    onclick="changeProductSize('${product.id}', '${size}')">
              ${size}
            </button>
          `).join("")}
        </div>

        <div class="card-footer">
          <div class="price-box">
            <span class="price-amount" id="price-${product.id}">₹${currentPrice}</span>
            <span class="price-size-label" id="sizelabel-${product.id}">(${currentSize})</span>
          </div>
          <div class="card-actions">
            <button class="btn-icon-gold" title="Add to Cart" onclick="handleAddToCart('${product.id}')">
              🛒
            </button>
            <button class="btn-gold-solid" onclick="handleBuyNow('${product.id}')">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Handle changing size selection on a single product card
 */
function changeProductSize(productId, newSize) {
  selectedBottleSizes[productId] = newSize;
  const product = getProductById(productId);
  if (!product) return;

  const newPrice = product.prices[newSize];

  // Update DOM price and size label directly without re-rendering entire grid
  const priceElem = document.getElementById(`price-${productId}`);
  const sizeLabelElem = document.getElementById(`sizelabel-${productId}`);
  const cardElem = document.getElementById(`card-${productId}`);

  if (priceElem) priceElem.textContent = `₹${newPrice}`;
  if (sizeLabelElem) sizeLabelElem.textContent = `(${newSize})`;

  // Update size button states on this card
  if (cardElem) {
    const sizeButtons = cardElem.querySelectorAll(".size-pill");
    sizeButtons.forEach(btn => {
      if (btn.textContent.trim() === newSize) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }
}

/**
 * Action: Add item to cart with selected size
 */
function handleAddToCart(productId) {
  const size = selectedBottleSizes[productId] || "6ml";
  if (window.cartManager) {
    window.cartManager.addItem(productId, size, 1);
  }
}

/**
 * Action: Buy Now (Adds to cart and opens slide-out cart or checkout)
 */
function handleBuyNow(productId) {
  const size = selectedBottleSizes[productId] || "6ml";
  if (window.cartManager) {
    window.cartManager.addItem(productId, size, 1);
    window.cartManager.openCart();
  }
}

/**
 * Resets all search and filter UI inputs back to defaults
 */
function resetAllFilters() {
  currentSelectedCategory = "All";
  currentSearchTerm = "";
  currentPriceLimit = 400;
  currentSizeFilter = "All";
  currentSortOption = "featured";
  currentAvailabilityFilter = "all";

  const searchInput = document.getElementById("search-input");
  const priceRange = document.getElementById("price-range");
  const sortSelect = document.getElementById("sort-select");

  if (searchInput) searchInput.value = "";
  if (priceRange) priceRange.value = 400;
  if (sortSelect) sortSelect.value = "featured";

  updatePriceDisplay(400);
  populateCategoryDropdown();
  applyFiltersAndRender();
}

/**
 * Open Quick View Modal for a given product
 */
function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById("quickview-modal");
  const modalContent = document.getElementById("modal-body-content");
  if (!modal || !modalContent) return;

  const currentSize = selectedBottleSizes[productId] || "6ml";

  modalContent.innerHTML = `
    <div class="modal-product-detail">
      <div class="modal-img-col">
        <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/400x500/1a1a1a/d4af37?text=${encodeURIComponent(product.name)}';">
      </div>
      <div class="modal-info-col">
        <span class="modal-category">${product.category}</span>
        <h2>${product.name}</h2>
        <p class="modal-rating">⭐ ${product.rating} / 5.0</p>
        <p class="modal-desc">${product.description}</p>
        
        <div class="modal-size-box">
          <label>Select Bottle Volume:</label>
          <div class="modal-sizes">
            ${Object.keys(product.prices).map(sz => `
              <button class="size-pill ${sz === currentSize ? 'active' : ''}" 
                      onclick="changeModalSize('${product.id}', '${sz}')">
                ${sz} - ₹${product.prices[sz]}
              </button>
            `).join("")}
          </div>
        </div>

        <div class="modal-action-row">
          <span class="modal-price" id="modal-price-val">₹${product.prices[currentSize]}</span>
          <button class="btn-gold-solid" onclick="handleAddToCart('${product.id}'); closeModal();">Add To Cart</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
}

/**
 * Change bottle size selection inside Quick View Modal
 */
function changeModalSize(productId, size) {
  selectedBottleSizes[productId] = size;
  openProductModal(productId);
}

/**
 * Close Quick View Modal
 */
function closeModal() {
  const modal = document.getElementById("quickview-modal");
  if (modal) modal.classList.remove("open");
}