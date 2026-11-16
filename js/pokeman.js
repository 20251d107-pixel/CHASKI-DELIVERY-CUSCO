const POKEMAN_PRODUCTS = [
  { id: "maki-12-piezas", category: "combo", name: "MAKI 12 PIEZAS", price: 25, description: "1 sabor a elección + gaseosa de 355 ml + 4 unidades de alitas.", image: "img/pokeman/maki-12-piezas.jpg", flavors: 1 },
  { id: "acevichado-2-furay", category: "combo", name: "ACEVICHADO 2.0 + FURAY", price: 28.9, description: "Descripción pendiente de confirmación por POKEMAN SUSHI.", image: "img/pokeman/acevichado-2-furay.jpg" },
  { id: "makis-24-piezas", category: "combo", name: "MAKIS 24 PIEZAS", price: 30, description: "2 sabores a elección + gaseosa de 355 ml.", image: "img/pokeman/makis-24-piezas.jpg", flavors: 2 },
  { id: "makis-36-piezas", category: "combo", name: "MAKIS 36 PIEZAS", price: 43, description: "3 sabores a elección + gaseosa de 355 ml + 2 unidades de alitas o acevichado de 6 piezas.", image: "img/pokeman/makis-36-piezas.jpg", flavors: 3, choice: ["2 unidades de alitas", "Acevichado de 6 piezas"] },
  { id: "makis-48-piezas", category: "combo", name: "MAKIS 48 PIEZAS", price: 55, description: "4 sabores a elección + gaseosa de 355 ml + 4 unidades de alitas o acevichado de 12 piezas.", image: "img/pokeman/makis-48-piezas.jpg", flavors: 4, choice: ["4 unidades de alitas", "Acevichado de 12 piezas"] },
  { id: "makis-60-piezas", category: "combo", name: "MAKIS 60 PIEZAS", price: 65, description: "5 sabores a elección + gaseosa de 355 ml + 4 unidades de alitas o acevichado de 12 piezas.", image: "img/pokeman/makis-60-piezas.jpg", flavors: 5, choice: ["4 unidades de alitas", "Acevichado de 12 piezas"] },
  { id: "acevichado-2-0", category: "maki", name: "ACEVICHADO 2.0", price: 20, description: "Pescado fresco, palta, cubierto de pesca del día, coronado con cebollín e hilos de camote frito.", image: "img/pokeman/acevichado-2-0.jpg" },
  { id: "pulpo-acevichado", category: "maki", name: "PULPO ACEVICHADO", price: 20, description: "Pulpo, palta, cubierto de ajonjolí, coronado con tartar de pulpo en salsa acevichada.", image: "img/pokeman/pulpo-acevichado.jpg" },
  { id: "pulpo-al-olivo", category: "maki", name: "PULPO AL OLIVO", price: 20, description: "Pulpo, palta, queso crema, cebollín, topping de láminas de palta, coronado con pulpo en salsa de olivo.", image: "img/pokeman/pulpo-al-olivo.jpg" },
  { id: "california-roll", category: "maki", name: "CALIFORNIA ROLL", price: 20, description: "Queso crema, pepino y cortes frescos de trucha salmonada, cubierto con ajonjolí.", image: "img/pokeman/california-roll.jpg" },
  { id: "philadelphia-roll", category: "maki", name: "PHILADELPHIA ROLL", price: 20, description: "Queso crema, cortes frescos de trucha salmonada, cubierto de ajonjolí.", image: "img/pokeman/philadelphia-roll.jpg" },
  { id: "king-kong-roll", category: "maki", name: "KING KONG ROLL", price: 20, description: "Queso crema, pollo empanizado, cubierto de ajonjolí con láminas de plátano frito, bañado con salsa maracuyá.", image: "img/pokeman/king-kong-roll.jpg" },
  { id: "furay-frito", category: "maki", name: "FURAY (FRITO)", price: 20, description: "Queso crema, palta, cortes frescos de trucha salmonada, cubierto de ajonjolí.", image: "img/pokeman/furay-frito.jpg" },
  { id: "furay-acevichado", category: "maki", name: "FURAY ACEVICHADO (FRITO)", price: 20, description: "Relleno de pescado acevichado.", image: "img/pokeman/furay-acevichado.jpg" },
  { id: "guacamole-frito", category: "maki", name: "GUACAMOLE (FRITO)", price: 20, description: "Queso crema, pollo empanizado con topping de guacamole y crocante de nachos.", image: "img/pokeman/guacamole-frito.jpg" },
  { id: "spicy-baby", category: "maki", name: "SPICY BABY", price: 20, description: "Palta, queso crema y pescado fresco de trucha salmonada, salsa spicy flameada, coronado con cebollín.", image: "img/pokeman/spicy-baby.jpg" },
  { id: "parrillero", category: "maki", name: "PARRILLERO", price: 20, description: "Queso crema, cebollín, carne especial a la parrilla, cubierta de ajonjolí, bañado con chimichurri de la casa.", image: "img/pokeman/parrillero.jpg" },
  { id: "dragon-roll", category: "maki", name: "DRAGÓN ROLL", price: 20, description: "Palta, pescado fresco, queso crema, cubierto de ajonjolí, bañado con salsa spicy.", image: "img/pokeman/dragon-roll.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
  const storeDialog = document.getElementById("pokemanDialog");
  const openStoreButton = document.getElementById("openPokemanStore");
  const comboProducts = document.getElementById("pokemanComboProducts");
  const makiProducts = document.getElementById("pokemanMakiProducts");
  const cartItems = document.getElementById("pokemanCartItems");
  const cartCount = document.getElementById("pokemanCartCount");
  const totalOutput = document.getElementById("pokemanTotal");
  const checkoutForm = document.getElementById("pokemanCheckout");
  const checkoutMessage = document.getElementById("pokemanCheckoutMessage");
  const checkoutButton = document.getElementById("pokemanWhatsAppOrder");
  const deliveryAddress = document.getElementById("pokemanDeliveryAddress");
  const locationLink = document.getElementById("pokemanLocationLink");
  const checkout = new Map();
  const availableImages = new Set();
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

  function optionControls(product) {
    const flavorFields = Array.from({ length: product.flavors || 0 }, (_, index) => `
      <label class="pokeman-option-group">
        <span>Sabor ${index + 1} <b>(escribe tu elección)</b></span>
        <input type="text" data-flavor-index="${index}" required maxlength="80" placeholder="Escribe el sabor">
      </label>
    `).join("");
    const choice = product.choice ? `
      <label class="pokeman-option-group">
        <span>Elige el complemento incluido</span>
        <select data-combo-choice required>
          <option value="">Selecciona una opción</option>
          ${product.choice.map(value => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}
        </select>
      </label>
    ` : "";
    return `${flavorFields}${choice}`;
  }

  function productCard(product, index) {
    return `
      <article class="pokeman-product-card" data-product-card="${product.id}">
        <div class="pokeman-product-photo">
          <span class="pokeman-product-number">${String(index + 1).padStart(2, "0")} / 18</span>
          <span class="pokeman-photo-placeholder" data-photo-placeholder>
            <span class="pokeman-photo-mark" aria-hidden="true">PS</span>
            <strong>${escapeHtml(product.name)}</strong>
            <code>${escapeHtml(product.image)}</code>
          </span>
          <img data-product-image data-image-path="${escapeHtml(product.image)}" alt="${escapeHtml(`Fotografía de ${product.name} de POKEMAN SUSHI`)}" loading="lazy">
        </div>
        <div class="pokeman-product-info">
          <span class="pokeman-product-type">${product.category === "combo" ? "Combo POKEMAN" : "Maki y roll"}</span>
          <div class="pokeman-product-title-row"><h3>${escapeHtml(product.name)}</h3><span class="pokeman-product-price">${formatPrice(product.price)}</span></div>
          <p class="pokeman-product-description">${escapeHtml(product.description)}</p>
          <div class="pokeman-product-controls">
            ${optionControls(product)}
            <div class="pokeman-quantity-row">
              <label class="pokeman-quantity-label">Cantidad<input type="number" min="1" step="1" value="1" inputmode="numeric" data-product-quantity></label>
              <button class="pokeman-add-button" type="button" data-add-product="${product.id}">Agregar al pedido</button>
            </div>
            <div class="pokeman-product-subtotal" data-product-subtotal aria-live="polite">Subtotal: ${formatPrice(product.price)}</div>
          </div>
        </div>
      </article>
    `;
  }

  function attachProductImages(root) {
    root.querySelectorAll("[data-product-image]").forEach(async image => {
      const path = image.dataset.imagePath;
      if (!availableImages.has(path)) {
        try {
          const response = await fetch(path, { method: "HEAD" });
          if (!response.ok) return;
          availableImages.add(path);
        } catch (error) {
          console.error(`No se pudo comprobar la fotografía ${path}:`, error);
          return;
        }
      }
      image.addEventListener("load", () => {
        image.closest(".pokeman-product-photo").classList.add("has-image");
        image.closest(".pokeman-product-photo").querySelector("[data-photo-placeholder]").hidden = true;
      }, { once: true });
      image.addEventListener("error", () => {
        image.removeAttribute("src");
        console.error(`No se pudo cargar la fotografía ${path}. Se mantiene el marcador de posición.`);
      }, { once: true });
      image.src = path;
    });
  }

  function loadBanner() {
    const path = "img/pokeman/banner-pokeman.jpg";
    const image = document.getElementById("pokemanBannerImage");
    image.addEventListener("load", () => {
      image.closest(".pokeman-banner").classList.add("has-image");
      document.getElementById("pokemanBannerPlaceholder").hidden = true;
    }, { once: true });
    image.addEventListener("error", () => {
      image.removeAttribute("src");
      console.error(`No se pudo cargar la fotografía ${path}. Se mantiene el marcador de posición.`);
    }, { once: true });
    image.src = path;
  }

  function productSubtotal(card, product) {
    const quantity = Math.max(1, Math.floor(Number(card.querySelector("[data-product-quantity]").value) || 1));
    card.querySelector("[data-product-quantity]").value = String(quantity);
    card.querySelector("[data-product-subtotal]").textContent = `Subtotal: ${formatPrice(product.price * quantity)}`;
    return quantity;
  }

  function optionValues(card) {
    const flavors = [...card.querySelectorAll("[data-flavor-index]")].map(input => input.value.trim());
    const choice = card.querySelector("[data-combo-choice]")?.value || "";
    return { flavors, choice };
  }

  function cartKey(product, options) {
    return `${product.id}:${JSON.stringify(options)}`;
  }

  function renderCart() {
    const entries = [...checkout.values()];
    const totalQuantity = entries.reduce((sum, entry) => sum + entry.quantity, 0);
    const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
    cartCount.textContent = String(totalQuantity);
    totalOutput.textContent = formatPrice(total);
    checkoutButton.disabled = entries.length === 0;
    if (!entries.length) {
      cartItems.innerHTML = '<p class="pokeman-empty-cart">Aún no agregas productos al pedido.</p>';
      return;
    }

    cartItems.innerHTML = entries.map(entry => {
      const options = [
        ...entry.options.flavors.map((flavor, index) => `Sabor ${index + 1}: ${escapeHtml(flavor)}`),
        entry.options.choice ? `Complemento: ${escapeHtml(entry.options.choice)}` : ""
      ].filter(Boolean).join(" · ");
      return `
        <article class="pokeman-cart-item">
          <div>
            <h4>${escapeHtml(entry.product.name)} × ${entry.quantity}</h4>
            <p>${escapeHtml(entry.product.description)}</p>
            ${options ? `<p>${options}</p>` : ""}
            <div class="pokeman-cart-actions" aria-label="${escapeHtml(`Cambiar cantidad de ${entry.product.name}`)}">
              <button type="button" data-cart-action="decrease" data-cart-key="${escapeHtml(entry.key)}" aria-label="Reducir cantidad" ${entry.quantity <= 1 ? "disabled" : ""}>−</button>
              <span>${entry.quantity}</span>
              <button type="button" data-cart-action="increase" data-cart-key="${escapeHtml(entry.key)}" aria-label="Aumentar cantidad">+</button>
              <button type="button" class="pokeman-remove-button" data-cart-action="remove" data-cart-key="${escapeHtml(entry.key)}">Retirar</button>
            </div>
          </div>
          <strong class="pokeman-cart-item-price">${formatPrice(entry.product.price * entry.quantity)}</strong>
        </article>
      `;
    }).join("");
  }

  function addProduct(button) {
    const product = POKEMAN_PRODUCTS.find(item => item.id === button.dataset.addProduct);
    const card = button.closest("[data-product-card]");
    if (!product || !card) return;
    const optionFields = [...card.querySelectorAll("[data-flavor-index], [data-combo-choice]")];
    const invalidField = optionFields.find(field => !field.value.trim());
    if (invalidField) {
      invalidField.setCustomValidity(invalidField.matches("[data-flavor-index]")
        ? "Escribe el sabor que deseas. POKEMAN aún no ha proporcionado una lista de sabores."
        : "Selecciona una de las opciones incluidas.");
      invalidField.reportValidity();
      invalidField.addEventListener("input", () => invalidField.setCustomValidity(""), { once: true });
      invalidField.addEventListener("change", () => invalidField.setCustomValidity(""), { once: true });
      invalidField.focus();
      return;
    }

    const quantity = productSubtotal(card, product);
    const options = optionValues(card);
    const key = cartKey(product, options);
    const existing = checkout.get(key);
    checkout.set(key, { key, product, options, quantity: quantity + (existing?.quantity || 0) });
    renderCart();
    checkoutMessage.textContent = `${product.name} se agregó al resumen.`;
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

  function closeStore() {
    if (storeDialog.open) storeDialog.close();
    openStoreButton.focus({ preventScroll: true });
  }

  comboProducts.innerHTML = POKEMAN_PRODUCTS.filter(product => product.category === "combo")
    .map((product, index) => productCard(product, index)).join("");
  makiProducts.innerHTML = POKEMAN_PRODUCTS.filter(product => product.category === "maki")
    .map((product, index) => productCard(product, index + 6)).join("");
  attachProductImages(storeDialog);
  loadBanner();
  renderCart();

  openStoreButton.addEventListener("click", () => {
    if (!deliveryAddress.value.trim()) {
      const formAddress = document.getElementById("destino");
      deliveryAddress.value = formAddress.value;
      deliveryCoordinates = document.getElementById("destinoCoordenadas").value;
      deliveryMapUrl = document.getElementById("destinoMapa").value;
      updateLocationLink();
    }
    storeDialog.showModal();
    document.getElementById("pokemanTitle").focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-pokeman-close]").forEach(button => button.addEventListener("click", closeStore));
  document.getElementById("pokemanTitle").setAttribute("tabindex", "-1");

  storeDialog.addEventListener("click", event => {
    if (event.target === storeDialog) closeStore();
  });
  storeDialog.addEventListener("close", () => {
    checkoutMessage.textContent = "";
    checkoutMessage.classList.remove("is-visible");
  });

  storeDialog.addEventListener("input", event => {
    const quantityField = event.target.closest("[data-product-quantity]");
    if (!quantityField) return;
    const card = quantityField.closest("[data-product-card]");
    const product = POKEMAN_PRODUCTS.find(item => item.id === card.dataset.productCard);
    if (product) productSubtotal(card, product);
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

  document.getElementById("pokemanChooseAddress").addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("chaski:open-location", { detail: { fieldId: "destino" } }));
  });

  deliveryAddress.addEventListener("input", () => {
    deliveryCoordinates = "";
    deliveryMapUrl = "";
    updateLocationLink();
    const formAddress = document.getElementById("destino");
    if (formAddress.value !== deliveryAddress.value) {
      formAddress.value = deliveryAddress.value;
      formAddress.dispatchEvent(new Event("input", { bubbles: true }));
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
    const number = window.CHASKI_WHATSAPP_NUMBER || "51935244968";
    if (!/^\d{10,15}$/.test(number)) {
      checkoutMessage.textContent = "WhatsApp aún no está configurado. Configura el número comercial de CHASKI DELIVERY.";
      checkoutMessage.classList.add("is-visible");
      return;
    }
    const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
    const lines = [
      "Hola, CHASKI DELIVERY. Quiero coordinar este pedido:",
      "",
      "Tienda: POKEMAN SUSHI",
      document.getElementById("pokemanCustomerName").value.trim() ? `Nombre: ${document.getElementById("pokemanCustomerName").value.trim()}` : "",
      document.getElementById("pokemanCustomerPhone").value.trim() ? `Teléfono: ${document.getElementById("pokemanCustomerPhone").value.trim()}` : "",
      "",
      ...entries.flatMap(entry => [
        `${entry.product.name} × ${entry.quantity}`,
        `Descripción: ${entry.product.description}`,
        ...entry.options.flavors.map((flavor, index) => `Sabor ${index + 1}: ${flavor}`),
        entry.options.choice ? `Complemento incluido elegido: ${entry.options.choice}` : "",
        `Precio unitario: ${formatPrice(entry.product.price)}`,
        `Subtotal: ${formatPrice(entry.product.price * entry.quantity)}`,
        ""
      ]),
      `Total general: ${formatPrice(total)}`,
      deliveryAddress.value.trim() ? `Dirección de entrega: ${deliveryAddress.value.trim()}` : "",
      document.getElementById("pokemanDeliveryReference").value.trim()
        ? `Referencia: ${document.getElementById("pokemanDeliveryReference").value.trim()}`
        : "",
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

  window.addEventListener("chaski:open-pokeman", () => openStoreButton.click());
});
