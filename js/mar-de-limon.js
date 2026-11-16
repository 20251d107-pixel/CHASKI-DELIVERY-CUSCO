const MAR_MAKI_FLAVORS = [
  "Acevichado", "Acevichado Ahumado", "Acevichado Parrillero", "Avocado Rolls",
  "Banana Rolls", "California", "Caribbean Rolls", "Carretillero", "Crab Rolls",
  "Crispy Rolls", "Chalaquita Rolls", "Filadelfia", "Fruti Fruti", "Kazan Maki",
  "Lomo Roll", "Mancora Rolls", "Mar de Limón Rolls", "Olivo", "Pulpo Parrillero",
  "Spicy Crab", "Tartar Maki", "Tropical Rolls", "Trucha Tataki", "Volcán Rolls"
];

const MAR_CATEGORIES = [
  { id: "compartir", name: "Para compartir", folder: "para-compartir", products: [
    ["choritos-a-la-chalaca", "Choritos a la Chalaca", 30],
    ["pulpo-al-olivo", "Pulpo al Olivo", 38],
    ["yuquitas-a-la-huancaina", "Yuquitas a la Huancaína", 15],
    ["festin-mar-de-limon", "Festín Mar de Limón", 90]
  ] },
  { id: "leches", name: "Leches", folder: "leches", products: [
    ["leche-de-tigre-clasica", "Leche de Tigre Clásica", 18],
    ["leche-carretillera", "Leche Carretillera", 23],
    ["leche-mar-de-limon", "Leche Mar de Limón", 27],
    ["leche-de-pantera", "Leche de Pantera", 28]
  ] },
  { id: "causas", name: "Causas", folder: "causas", products: [
    ["causa-acevichada", "Causa Acevichada", 30],
    ["causa-de-langostinos", "Causa de Langostinos", 26],
    ["causa-de-atun", "Causa de Atún", 25],
    ["causa-de-pollo", "Causa de Pollo", 20]
  ] },
  { id: "ceviches", name: "Ceviches", folder: "ceviches", products: [
    ["ceviche-clasico", "Ceviche Clásico", 38]
  ] },
  { id: "arroces", name: "Arroces", folder: "arroces", products: [
    ["arroz-con-mariscos", "Arroz con Mariscos", 38],
    ["chaufa-de-mariscos", "Chaufa de Mariscos", 38],
    ["chaufa-de-pescado", "Chaufa de Pescado", 38],
    ["chaufa-de-pollo", "Chaufa de Pollo", 35],
    ["chaufa-veggie", "Chaufa Veggie", 35]
  ] },
  { id: "marinos", name: "Marinos", folder: "marinos", products: [
    ["picante-de-mariscos", "Picante de Mariscos", 38],
    ["fetuccini-langostinos-panko", "Fetuccini con Langostinos al Panko", 39],
    ["pulpo-a-la-parrilla", "Pulpo a la Parrilla", 60]
  ] },
  { id: "chicharrones", name: "Chicharrones y jaleas", folder: "chicharrones-jaleas", products: [
    ["chicharron-de-pota", "Chicharrón de Pota", 36],
    ["chicharron-de-pescado", "Chicharrón de Pescado", 38],
    ["chicharron-de-pejerrey", "Chicharrón de Pejerrey", 38],
    ["chicharron-de-trucha", "Chicharrón de Trucha", 36],
    ["chicharron-de-mixto", "Chicharrón de Mixto", 40],
    ["chicharron-de-calamar", "Chicharrón de Calamar", 42],
    ["chicharron-de-langostinos", "Chicharrón de Langostinos", 42],
    ["jalea-real", "Jalea Real", 48]
  ] },
  { id: "sopas", name: "Sopas y concentrados", folder: "sopas-y-concentrados", products: [
    ["chilcano-especial", "Chilcano Especial", 25],
    ["chupe-de-camarones", "Chupe de Camarones", 45],
    ["chupe-de-pescado", "Chupe de Pescado", 42],
    ["parihuela-de-pescado", "Parihuela de Pescado", 42],
    ["sudado-de-pescado", "Sudado de Pescado", 40],
    ["sudado-mixto", "Sudado Mixto", 42]
  ] },
  { id: "criollazos", name: "Criollazos", folder: "criollazos", products: [
    ["lomo-saltado", "Lomo Saltado", 39],
    ["fetuccini-con-lomo", "Fetuccini con Lomo", 39],
    ["seco-de-cabrito", "Seco de Cabrito", 38],
    ["milanesa-de-pescado", "Milanesa de Pescado", 38],
    ["milanesa-de-pollo", "Milanesa de Pollo", 36],
    ["pollo-a-la-plancha", "Pollo a la Plancha", 35]
  ] },
  { id: "pescas", name: "Pescas del día", folder: "pescas-del-dia", products: [
    ["pescado-frito-o-plancha", "Pescado Frito o a la Plancha", 38, "fish-upgrade"],
    ["pescado-a-lo-macho", "Pescado a lo Macho", 45, "fish-upgrade"],
    ["pescado-a-la-menier", "Pescado a la Menier", 38, "fish-upgrade"],
    ["pescado-al-ajo", "Pescado al Ajo", 38, "fish-upgrade"],
    ["pescado-salsa-langostinos", "Pescado en Salsa de Langostinos", 45, "fish-upgrade"]
  ] },
  { id: "duos-trios", name: "Dúos y tríos", folder: "duos-trios", products: [
    ["duo-clasico", "Dúo Clásico", 40, "note"],
    ["duo-al-gusto", "Dúo al Gusto", 45, "note"],
    ["trio-clasico", "Trío Clásico", 50, "note"],
    ["trio-al-gusto", "Trío al Gusto", 55, "note"]
  ] },
  { id: "kids", name: "Menú Kids", folder: "menu-kids", products: [
    ["menu-kids", "Menú Kids", 25, "kids"]
  ] },
  { id: "guarniciones", name: "Guarniciones", folder: "guarniciones", products: [
    ["yuca-o-papa-frita", "Yuca o Papa Frita", 6, "choice", ["Yuca", "Papa frita"]],
    ["yuca-o-camote-cocido", "Yuca o Camote Cocido", 6, "choice", ["Yuca", "Camote cocido"]],
    ["choclo", "Choclo", 5],
    ["arroz-blanco", "Arroz Blanco", 5],
    ["porcion-de-chaufa", "Porción de Chaufa", 10]
  ] },
  { id: "makis", name: "Zona Nikkei — Makis", folder: "makis", makis: true }
];

const MAR_PRODUCTS = MAR_CATEGORIES.flatMap(category =>
  (category.products || []).map(([id, name, price, option, choices]) => ({
    id,
    name,
    price,
    category: category.id,
    image: `img/mar-de-limon/${category.folder}/${id}.jpg`,
    option: option || "",
    choices: choices || []
  })).concat(category.makis ? [{
    id: "makis",
    name: "Makis — elige sabor y cortes",
    price: 14.9,
    category: category.id,
    image: "",
    option: "makis",
    choices: MAR_MAKI_FLAVORS
  }] : [])
);

let marImageLoadSequence = 0;

document.addEventListener("DOMContentLoaded", () => {
  const storeDialog = document.getElementById("marDialog");
  const openStoreButton = document.getElementById("openMarDeLimonStore");
  const categoryContainer = document.getElementById("marCategories");
  const searchInput = document.getElementById("marProductSearch");
  const cartItems = document.getElementById("marCartItems");
  const cartCount = document.getElementById("marCartCount");
  const cartShortcutCount = document.getElementById("marCartShortcutCount");
  const totalOutput = document.getElementById("marTotal");
  const checkoutForm = document.getElementById("marCheckout");
  const checkoutMessage = document.getElementById("marCheckoutMessage");
  const checkoutButton = document.getElementById("marWhatsAppOrder");
  const deliveryAddress = document.getElementById("marDeliveryAddress");
  const locationLink = document.getElementById("marLocationLink");
  const checkout = new Map();
  let deliveryCoordinates = "";
  let deliveryMapUrl = "";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  function formatPrice(value) {
    return `S/ ${Number(value).toFixed(2)}`;
  }

  function slugify(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function normalizeSearch(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  }

  function optionControls(product) {
    if (product.option === "fish-upgrade") {
      return `<label class="mar-option-group"><span>Tipo de pescado</span>
        <select data-product-option="fishUpgrade">
          <option value="filete">Filete (precio incluido)</option>
          <option value="pescado-de-pena">Pescado de peña (+ S/ 10.00)</option>
        </select>
        <small>Por S/ 10.00 adicionales, cambia el filete por pescado de peña.</small>
      </label>`;
    }
    if (product.option === "kids") {
      return `<label class="mar-option-group"><span>Plato principal</span>
          <select data-product-option="principal" required>
            <option value="">Selecciona el plato</option>
            <option>Pescado frito</option><option>Chicharrón de pescado</option><option>Chicharrón de pollo</option>
          </select>
        </label>
        <label class="mar-option-group"><span>Bebida incluida</span>
          <select data-product-option="bebida" required>
            <option value="">Selecciona la bebida</option>
            <option>Chicha</option><option>Limonada</option><option>Maracuyá</option>
          </select>
        </label>
        <p class="mar-includes-note">Incluye papas fritas, arroz y un vaso de bebida.</p>`;
    }
    if (product.option === "choice") {
      return `<label class="mar-option-group"><span>Elige una alternativa</span>
        <select data-product-option="alternativa" required>
          <option value="">Selecciona una opción</option>
          ${product.choices.map(value => `<option>${escapeHtml(value)}</option>`).join("")}
        </select>
      </label>`;
    }
    if (product.option === "note") {
      return `<label class="mar-option-group"><span>Observación <small>(opcional)</small></span>
        <textarea data-product-option="observacion" rows="2" maxlength="180" placeholder="Indica aquí tu preferencia o consulta"></textarea>
      </label>`;
    }
    if (product.option === "makis") {
      return `<label class="mar-option-group"><span>Sabor</span>
          <select data-product-option="sabor" required>
            <option value="">Selecciona el sabor</option>
            ${product.choices.map(value => `<option>${escapeHtml(value)}</option>`).join("")}
          </select>
        </label>
        <label class="mar-option-group"><span>Tamaño</span>
          <select data-product-option="tamano" required>
            <option value="">Selecciona los cortes</option>
            <option value="6">6 cortes — S/ 14.90</option>
            <option value="12">12 cortes — S/ 27.90</option>
          </select>
        </label>`;
    }
    return "";
  }

  function productCard(product, index) {
    const isMaki = product.option === "makis";
    const price = isMaki ? "S/ 14.90 / S/ 27.90" : formatPrice(product.price);
    const imagePaths = isMaki ? [
      "img/mar-de-limon/SELECCIONA-TU-MAKIS.jpg"
    ] : [
      `img/mar-de-limon/${product.id}.jpg`,
      product.image
    ];
    return `<article class="mar-product-card" data-product-card="${product.id}"
        data-search="${escapeHtml(normalizeSearch(`${product.name} ${product.choices.join(" ")}`))}">
        <div class="mar-product-photo">
          <span class="mar-product-photo-placeholder" data-photo-placeholder>
            <span class="mar-photo-mark" aria-hidden="true">ML</span>
            <strong>${escapeHtml(product.name)}</strong>
            <small>${isMaki ? "Selecciona un sabor para ver su fotografía" : "Fotografía propia pendiente"}</small>
          </span>
          <img data-product-image data-image-paths="${escapeHtml(JSON.stringify(imagePaths))}" ${isMaki ? 'data-maki-image data-flavor=""' : ""} alt="${isMaki ? "Imagen para elegir tus makis" : `Fotografía de ${escapeHtml(product.name)} de MAR DE LIMÓN`}" loading="lazy">
        </div>
        <div class="mar-product-info">
          <span class="mar-product-type">${escapeHtml(MAR_CATEGORIES.find(category => category.id === product.category).name)}</span>
          <div class="mar-product-title-row"><h3>${escapeHtml(product.name)}</h3>
            <span class="mar-product-price" data-price-output>${price}</span>
          </div>
          ${isMaki ? `<p class="mar-maki-price-note">6 cortes: S/ 14.90 · 12 cortes: S/ 27.90</p>` : ""}
          <div class="mar-product-controls">
            ${optionControls(product)}
            <div class="mar-quantity-row">
              <label>Cantidad<input type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity></label>
              <button class="mar-add-button" type="button" data-add-product="${product.id}">Agregar al carrito</button>
            </div>
            <div class="mar-product-subtotal" data-product-subtotal aria-live="polite">
              ${isMaki ? "Selecciona un sabor y tamaño" : `Subtotal: ${formatPrice(product.price)}`}
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderCatalog() {
    categoryContainer.innerHTML = MAR_CATEGORIES.map((category, index) => {
      const products = MAR_PRODUCTS.filter(product => product.category === category.id);
      return `<section class="mar-category" id="mar-${category.id}" aria-labelledby="mar-${category.id}-title">
        <div class="mar-section-heading"><div><span class="eyebrow">${String(index + 1).padStart(2, "0")} — MAR DE LIMÓN</span>
          <h2 id="mar-${category.id}-title">${escapeHtml(category.name)}</h2></div>
          <p>${category.makis
            ? "24 sabores disponibles. Elige uno y selecciona 6 o 12 cortes."
            : "Elige tus platos y personaliza las opciones disponibles."}</p>
        </div>
        <div class="mar-product-grid">${products.map((product, productIndex) => productCard(product, productIndex)).join("")}</div>
      </section>`;
    }).join("");

    categoryContainer.querySelectorAll("[data-product-image]").forEach(image => {
      image.addEventListener("load", () => {
        image.closest(".mar-product-photo").classList.add("has-image");
        image.closest(".mar-product-photo").querySelector("[data-photo-placeholder]").hidden = true;
      });
      image.addEventListener("error", () => {
        const paths = JSON.parse(image.dataset.imagePaths);
        const nextIndex = Number(image.dataset.imageCandidateIndex) + 1;
        if (nextIndex < paths.length) {
          loadProductImage(image, paths, nextIndex);
          return;
        }
        console.error(`No se pudo cargar la fotografía ${image.dataset.imagePath}. Se mantiene el marcador de posición.`);
        image.removeAttribute("src");
        image.closest(".mar-product-photo").classList.add("image-unavailable");
      });
      if (JSON.parse(image.dataset.imagePaths).length) {
        loadProductImage(image, JSON.parse(image.dataset.imagePaths));
      }
    });
  }

  function loadProductImage(image, paths, index = 0) {
    const sequence = String(++marImageLoadSequence);
    image.dataset.imageLoadSequence = sequence;
    image.dataset.imagePaths = JSON.stringify(paths);
    image.dataset.imageCandidateIndex = String(index);
    image.removeAttribute("src");
    const photo = image.closest(".mar-product-photo");
    photo.classList.remove("has-image", "image-unavailable");
    photo.querySelector("[data-photo-placeholder]").hidden = false;
    if (index >= paths.length) {
      image.dataset.imagePath = paths[paths.length - 1] || "";
      image.closest(".mar-product-photo").classList.add("image-unavailable");
      return;
    }

    image.dataset.imagePath = paths[index];
    image.dataset.imageCandidateIndex = String(index);
    image.src = paths[index];
  }

  function selectedOptions(card, product) {
    const options = {};
    card.querySelectorAll("[data-product-option]").forEach(field => {
      if (field.value.trim()) options[field.dataset.productOption] = field.value.trim();
    });
    if (product.option === "fish-upgrade" && options.fishUpgrade === "pescado-de-pena") {
      options.fishUpgrade = "Pescado de peña";
    }
    return options;
  }

  function unitPrice(product, options) {
    if (product.option === "fish-upgrade" && options.fishUpgrade === "Pescado de peña") return product.price + 10;
    if (product.option === "makis") return options.tamano === "12" ? 27.9 : 14.9;
    return product.price;
  }

  function updateProductCard(card) {
    const product = MAR_PRODUCTS.find(item => item.id === card.dataset.productCard);
    if (!product) return;
    const options = selectedOptions(card, product);
    const quantityField = card.querySelector("[data-product-quantity]");
    const quantity = Math.max(1, Math.floor(Number(quantityField.value) || 1));
    const priceOutput = card.querySelector("[data-price-output]");
    const subtotalOutput = card.querySelector("[data-product-subtotal]");
    if (product.option === "makis") {
      const selectedFlavor = options.sabor || "";
      const makiImage = card.querySelector("[data-maki-image]");
      if (makiImage.dataset.flavor !== selectedFlavor) {
        const photo = card.querySelector(".mar-product-photo");
        const placeholder = photo.querySelector("[data-photo-placeholder]");
        const placeholderTitle = placeholder.querySelector("strong");
        const placeholderHelp = placeholder.querySelector("small");
        photo.classList.remove("has-image", "image-unavailable");
        placeholder.hidden = false;
        placeholderTitle.textContent = selectedFlavor || product.name;
        placeholderHelp.textContent = selectedFlavor
          ? "Fotografía propia pendiente"
          : "Selecciona un sabor para ver su fotografía";
        makiImage.dataset.flavor = selectedFlavor;
        if (selectedFlavor) {
          makiImage.alt = `Fotografía de maki ${selectedFlavor} de MAR DE LIMÓN`;
          const filename = `${slugify(selectedFlavor)}.jpg`;
          loadProductImage(makiImage, [
            `img/mar-de-limon/${filename}`,
            `img/mar-de-limon/makis/${filename}`
          ]);
        } else {
          makiImage.dataset.imageLoadSequence = String(++marImageLoadSequence);
          makiImage.removeAttribute("src");
        }
      }
      const selectedPrice = options.tamano ? unitPrice(product, options) : 0;
      priceOutput.textContent = options.tamano ? formatPrice(selectedPrice) : "S/ 14.90 / S/ 27.90";
      subtotalOutput.textContent = options.tamano
        ? `Subtotal: ${formatPrice(selectedPrice * quantity)}`
        : "Selecciona un sabor y tamaño";
      return;
    }
    const price = unitPrice(product, options);
    priceOutput.textContent = formatPrice(price);
    subtotalOutput.textContent = `Subtotal: ${formatPrice(price * quantity)}`;
  }

  function cartKey(product, options) {
    return `${product.id}:${JSON.stringify(options)}`;
  }

  function cartOptionLabels(product, options) {
    const labels = [];
    if (options.fishUpgrade) labels.push(options.fishUpgrade === "Pescado de peña" ? "Pescado de peña (+ S/ 10.00)" : "Filete");
    if (options.principal) labels.push(`Plato: ${options.principal}`);
    if (options.bebida) labels.push(`Bebida: ${options.bebida}`);
    if (options.alternativa) labels.push(`Opción: ${options.alternativa}`);
    if (options.sabor) labels.push(`Sabor: ${options.sabor}`);
    if (options.tamano) labels.push(`${options.tamano} cortes`);
    if (options.observacion) labels.push(`Observación: ${options.observacion}`);
    return labels;
  }

  function renderCart() {
    const entries = [...checkout.values()];
    const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    const total = entries.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    cartCount.textContent = String(totalQuantity);
    cartShortcutCount.textContent = String(totalQuantity);
    totalOutput.textContent = formatPrice(total);
    checkoutButton.disabled = entries.length === 0;
    if (!entries.length) {
      cartItems.innerHTML = '<p class="mar-empty-cart">Aún no agregas productos al pedido.</p>';
      return;
    }

    cartItems.innerHTML = entries.map(entry => {
      const options = cartOptionLabels(entry.product, entry.options);
      return `<article class="mar-cart-item">
        <div class="mar-cart-item-copy">
          <h4>${escapeHtml(entry.product.name)} × ${entry.quantity}</h4>
          ${options.map(option => `<p>${escapeHtml(option)}</p>`).join("")}
          <div class="mar-cart-actions" aria-label="${escapeHtml(`Cambiar cantidad de ${entry.product.name}`)}">
            <button type="button" data-cart-action="decrease" data-cart-key="${escapeHtml(entry.key)}" aria-label="Reducir cantidad" ${entry.quantity <= 1 ? "disabled" : ""}>−</button>
            <span>${entry.quantity}</span>
            <button type="button" data-cart-action="increase" data-cart-key="${escapeHtml(entry.key)}" aria-label="Aumentar cantidad">+</button>
            <button type="button" class="mar-remove-button" data-cart-action="remove" data-cart-key="${escapeHtml(entry.key)}">Retirar</button>
          </div>
        </div>
        <strong class="mar-cart-item-price">${formatPrice(entry.price * entry.quantity)}</strong>
      </article>`;
    }).join("");
  }

  function addProduct(button) {
    const product = MAR_PRODUCTS.find(item => item.id === button.dataset.addProduct);
    const card = button.closest("[data-product-card]");
    if (!product || !card) return;

    const requiredFields = [...card.querySelectorAll("[data-product-option][required]")];
    const firstInvalidField = requiredFields.find(field => !field.value.trim());
    if (firstInvalidField) {
      firstInvalidField.setCustomValidity("Selecciona una opción para continuar.");
      firstInvalidField.reportValidity();
      firstInvalidField.addEventListener("change", () => firstInvalidField.setCustomValidity(""), { once: true });
      firstInvalidField.focus();
      return;
    }

    const options = selectedOptions(card, product);
    const price = unitPrice(product, options);
    if (product.option === "makis" && (!options.sabor || !options.tamano)) {
      const field = card.querySelector(`[data-product-option="${options.sabor ? "tamano" : "sabor"}"]`);
      field.setCustomValidity("Selecciona el sabor y el tamaño de tus makis.");
      field.reportValidity();
      field.addEventListener("change", () => field.setCustomValidity(""), { once: true });
      field.focus();
      return;
    }

    const quantityField = card.querySelector("[data-product-quantity]");
    const quantity = Math.max(1, Math.floor(Number(quantityField.value) || 1));
    quantityField.value = String(quantity);
    const key = cartKey(product, options);
    const existing = checkout.get(key);
    checkout.set(key, { key, product, options, price, quantity: quantity + (existing?.quantity || 0) });
    renderCart();
    checkoutMessage.textContent = `${product.name} se agregó al pedido.`;
    checkoutMessage.classList.add("is-visible");
  }

  function updateCart(action, key) {
    const entry = checkout.get(key);
    if (!entry) return;
    if (action === "remove") checkout.delete(key);
    if (action === "increase") entry.quantity += 1;
    if (action === "decrease" && entry.quantity > 1) entry.quantity -= 1;
    renderCart();
  }

  function updateLocationLink() {
    locationLink.replaceChildren();
    if (!deliveryCoordinates || !deliveryMapUrl) {
      locationLink.hidden = true;
      return;
    }
    const link = document.createElement("a");
    link.href = deliveryMapUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = `Abrir punto: ${deliveryCoordinates}`;
    locationLink.append(link);
    locationLink.hidden = false;
  }

  function closeStore() {
    if (storeDialog.open) storeDialog.close();
    openStoreButton.focus({ preventScroll: true });
  }

  function prefillDeliveryAddress() {
    const mainAddress = document.getElementById("destino");
    if (mainAddress.value.trim() && !deliveryAddress.value.trim()) {
      deliveryAddress.value = mainAddress.value;
      deliveryCoordinates = document.getElementById("destinoCoordenadas").value;
      deliveryMapUrl = document.getElementById("destinoMapa").value;
      document.getElementById("marDeliveryReference").value = document.getElementById("destinoReferencia").value;
      updateLocationLink();
    }
  }

  function showBanner() {
    const image = document.getElementById("marBannerImage");
    image.addEventListener("load", () => {
      image.closest(".mar-banner").classList.add("has-image");
      document.getElementById("marBannerPlaceholder").hidden = true;
    }, { once: true });
    image.addEventListener("error", () => image.removeAttribute("src"), { once: true });
    fetch("img/mar-de-limon/banner.jpg", { method: "HEAD" }).then(response => {
      if (response.ok) image.src = "img/mar-de-limon/banner.jpg";
    }).catch(error => console.error("No se pudo comprobar el banner de MAR DE LIMÓN:", error));
  }

  renderCatalog();
  showBanner();
  renderCart();
  document.getElementById("marTitle").setAttribute("tabindex", "-1");

  openStoreButton.addEventListener("click", () => {
    prefillDeliveryAddress();
    storeDialog.showModal();
    document.getElementById("marTitle").focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-mar-close]").forEach(button => button.addEventListener("click", closeStore));
  storeDialog.addEventListener("click", event => {
    if (event.target === storeDialog) closeStore();
  });
  storeDialog.addEventListener("close", () => {
    checkoutMessage.textContent = "";
    checkoutMessage.classList.remove("is-visible");
  });

  storeDialog.addEventListener("input", event => {
    const card = event.target.closest("[data-product-card]");
    if (card && (event.target.matches("[data-product-quantity]") || event.target.matches("[data-product-option]"))) {
      updateProductCard(card);
    }
  });
  storeDialog.addEventListener("change", event => {
    const card = event.target.closest("[data-product-card]");
    if (card && event.target.matches("[data-product-option]")) updateProductCard(card);
  });
  storeDialog.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");
    if (addButton) {
      addProduct(addButton);
      return;
    }
    const cartButton = event.target.closest("[data-cart-action]");
    if (cartButton) updateCart(cartButton.dataset.cartAction, cartButton.dataset.cartKey);
  });

  searchInput.addEventListener("input", () => {
    const query = normalizeSearch(searchInput.value.trim());
    MAR_CATEGORIES.forEach(category => {
      const section = document.getElementById(`mar-${category.id}`);
      let visibleCards = 0;
      section.querySelectorAll("[data-product-card]").forEach(card => {
        const visible = !query || card.dataset.search.includes(query);
        card.hidden = !visible;
        if (visible) visibleCards += 1;
      });
      section.hidden = visibleCards === 0;
    });
  });

  document.getElementById("marChooseAddress").addEventListener("click", () => {
    const mainAddress = document.getElementById("destino");
    mainAddress.value = deliveryAddress.value;
    mainAddress.dispatchEvent(new Event("input", { bubbles: true }));
    document.getElementById("destinoReferencia").value = document.getElementById("marDeliveryReference").value;
    window.dispatchEvent(new CustomEvent("chaski:open-location", { detail: { fieldId: "destino" } }));
  });

  deliveryAddress.addEventListener("input", () => {
    deliveryCoordinates = "";
    deliveryMapUrl = "";
    updateLocationLink();
    const mainAddress = document.getElementById("destino");
    if (mainAddress.value !== deliveryAddress.value) {
      mainAddress.value = deliveryAddress.value;
      mainAddress.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  window.addEventListener("chaski:location-selected", event => {
    if (event.detail?.fieldId !== "destino") return;
    deliveryAddress.value = event.detail.address || "";
    deliveryCoordinates = event.detail.coordinates || "";
    deliveryMapUrl = event.detail.mapUrl || "";
    updateLocationLink();
  });

  checkoutForm.addEventListener("submit", event => {
    event.preventDefault();
    const entries = [...checkout.values()];
    if (!entries.length) return;

    const [latitude, longitude] = deliveryCoordinates.split(",").map(Number);
    if (!deliveryCoordinates || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      checkoutMessage.textContent = "Selecciona la ubicación exacta de entrega en el mapa para comprobar la cobertura.";
      checkoutMessage.classList.add("is-visible");
      window.dispatchEvent(new CustomEvent("chaski:open-location", { detail: { fieldId: "destino" } }));
      return;
    }
    if (!window.CHASKI_IS_IN_COVERAGE?.(latitude, longitude)) {
      checkoutMessage.textContent = window.CHASKI_COVERAGE_MESSAGES?.outside
        || "No se pudo verificar la cobertura. Vuelve a seleccionar la ubicación de entrega.";
      checkoutMessage.classList.add("is-visible");
      window.dispatchEvent(new CustomEvent("chaski:open-location", { detail: { fieldId: "destino" } }));
      return;
    }

    const number = window.CHASKI_WHATSAPP_NUMBER;
    if (!/^\d{10,15}$/.test(number || "")) {
      checkoutMessage.textContent = "WhatsApp aún no está configurado. Configura el número comercial de CHASKI DELIVERY.";
      checkoutMessage.classList.add("is-visible");
      return;
    }

    const subtotal = entries.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
    const lines = [
      "Hola, CHASKI DELIVERY. Quiero coordinar este pedido:",
      "",
      "Tienda: MAR DE LIMÓN",
      document.getElementById("marCustomerName").value.trim()
        ? `Nombre: ${document.getElementById("marCustomerName").value.trim()}` : "",
      document.getElementById("marCustomerPhone").value.trim()
        ? `Teléfono: ${document.getElementById("marCustomerPhone").value.trim()}` : "",
      "",
      ...entries.flatMap(entry => [
        `${entry.product.name} × ${entry.quantity}`,
        ...cartOptionLabels(entry.product, entry.options),
        `Precio unitario: ${formatPrice(entry.price)}`,
        `Subtotal: ${formatPrice(entry.price * entry.quantity)}`,
        ""
      ]),
      `Subtotal de productos: ${formatPrice(subtotal)}`,
      "Delivery: por coordinar con CHASKI DELIVERY (no incluido en el subtotal).",
      deliveryAddress.value.trim() ? `Dirección de entrega: ${deliveryAddress.value.trim()}` : "",
      document.getElementById("marDeliveryReference").value.trim()
        ? `Referencia: ${document.getElementById("marDeliveryReference").value.trim()}` : "",
      deliveryMapUrl ? `Ubicación en el mapa: ${deliveryMapUrl}` : ""
    ].filter(Boolean);

    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
    const whatsappWindow = window.open(url, "_blank");
    if (!whatsappWindow) {
      checkoutMessage.textContent = "El navegador bloqueó la ventana de WhatsApp. Permite las ventanas emergentes y vuelve a intentarlo.";
      checkoutMessage.classList.add("is-visible");
      return;
    }
    whatsappWindow.opener = null;
    checkoutMessage.textContent = "WhatsApp se abrió con el pedido preparado. Revísalo y pulsa Enviar para que llegue a CHASKI DELIVERY.";
    checkoutMessage.classList.add("is-visible");
  });

  window.addEventListener("chaski:open-mar-de-limon", () => openStoreButton.click());
});
