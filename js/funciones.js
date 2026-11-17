// Configura aquí el número comercial con código de país, solo dígitos.
const WHATSAPP_NUMBER = "51935244968";
const CUSCO_CENTER = { lat: -13.528232553071263, lng: -71.95925082543936 };
const COVERAGE_VERTICES = [
  { lat: -13.499822502381026, lng: -72.02106539180312 },
  { lat: -13.51092586999747, lng: -71.94661015076782 },
  { lat: -13.502851059638862, lng: -71.92090154824378 },
  { lat: -13.558537193205963, lng: -71.85144227800303 },
  { lat: -13.557496052603963, lng: -71.89509912445635 },
  { lat: -13.557503261645845, lng: -71.99256506652331 },
  { lat: -13.51071100005267, lng: -72.01177818756682 }
];
const COVERAGE_MESSAGES = {
  inside: "¡Excelente! Tu ubicación se encuentra dentro de nuestra zona de cobertura de CHASKI DELIVERY.",
  outside: "Lo sentimos, esta ubicación se encuentra fuera de nuestra zona de cobertura. Por el momento, CHASKI DELIVERY todavía no llega hasta esa zona."
};
window.CHASKI_WHATSAPP_NUMBER = WHATSAPP_NUMBER;

function isLocationInCoverage(latitude, longitude) {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
  const point = { x: longitude, y: latitude };
  const vertices = COVERAGE_VERTICES.map(vertex => ({ x: vertex.lng, y: vertex.lat }));
  let inside = false;

  for (let index = 0, previous = vertices.length - 1; index < vertices.length; previous = index, index += 1) {
    const start = vertices[previous];
    const end = vertices[index];
    const cross = (point.y - start.y) * (end.x - start.x) - (point.x - start.x) * (end.y - start.y);
    const onSegment = Math.abs(cross) <= 1e-10
      && point.x >= Math.min(start.x, end.x) - 1e-10
      && point.x <= Math.max(start.x, end.x) + 1e-10
      && point.y >= Math.min(start.y, end.y) - 1e-10
      && point.y <= Math.max(start.y, end.y) + 1e-10;
    if (onSegment) return true;

    const crossesLatitude = (start.y > point.y) !== (end.y > point.y);
    if (crossesLatitude && point.x < ((end.x - start.x) * (point.y - start.y)) / (end.y - start.y) + start.x) {
      inside = !inside;
    }
  }

  return inside;
}

window.CHASKI_IS_IN_COVERAGE = isLocationInCoverage;
window.CHASKI_COVERAGE_MESSAGES = COVERAGE_MESSAGES;

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const careersLink = document.getElementById("careersLink");
  const serviceSelect = document.getElementById("serviceSelect");
  const orderForm = document.getElementById("orderForm");
  const formMessage = document.getElementById("formMessage");
  const orderSection = document.getElementById("pedido");

  document.getElementById("year").textContent = new Date().getFullYear();

  if (/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    const message = "Hola, CHASKI DELIVERY. Me gustaría unirme a su equipo y conocer las oportunidades para trabajar.";
    careersLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  } else {
    careersLink.removeAttribute("target");
    careersLink.href = "#contacto";
    console.error("No se pudo configurar el enlace de oportunidades laborales: revisa WHATSAPP_NUMBER.");
  }

  function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (navMenu.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.querySelectorAll(".service-select").forEach(button => {
    button.addEventListener("click", () => {
      serviceSelect.value = button.dataset.service;
      orderSection.scrollIntoView({ behavior: "smooth" });
      serviceSelect.focus({ preventScroll: true });
    });
  });

  serviceSelect.addEventListener("change", () => {
    if (serviceSelect.value === "POKEMAN SUSHI") {
      window.dispatchEvent(new CustomEvent("chaski:open-pokeman"));
    }
    if (serviceSelect.value === "MAR DE LIMÓN") {
      window.dispatchEvent(new CustomEvent("chaski:open-mar-de-limon"));
    }
  });

  function showFormMessage(message) {
    formMessage.textContent = message;
    formMessage.classList.add("is-visible");
    formMessage.focus({ preventScroll: true });
  }

  function setLocationStatus(fieldId, message, isError = false) {
    const status = document.getElementById(`${fieldId}LocationStatus`);
    status.textContent = message;
    status.classList.toggle("is-error", isError);
  }

  function findGoogleMapsLink(value) {
    const match = value.match(/https?:\/\/(?:maps\.app\.goo\.gl\/|goo\.gl\/maps\/|(?:www\.)?google\.[a-z.]+\/maps(?:[/?#]|$)|maps\.google\.[a-z.]+\/)[^\s]*/i);
    return match ? match[0].replace(/[),.;]+$/, "") : "";
  }

  const locationDialog = document.getElementById("locationDialog");
  const mapSearchInput = document.getElementById("mapSearchInput");
  const mapSearchButton = document.getElementById("mapSearchButton");
  const mapSearchResults = document.getElementById("mapSearchResults");
  const mapStatus = document.getElementById("mapStatus");
  const confirmMapLocation = document.getElementById("confirmMapLocation");
  const mapCoordinatesPreview = document.getElementById("mapCoordinatesPreview");
  let activeLocationField = "";
  let locationMap = null;
  let locationMarker = null;
  let coveragePolygon = null;
  let mapSelectionReady = false;
  let selectedSearchLabel = "";

  function setMapStatus(message, isError = false) {
    mapStatus.textContent = message;
    mapStatus.classList.toggle("is-error", isError);
  }

  function getSelectedPosition() {
    const position = locationMarker?.getLatLng();
    return position ? { lat: position.lat, lng: position.lng } : null;
  }

  function setMapCoordinatesPreview() {
    const position = getSelectedPosition();
    if (!locationMap || !mapSelectionReady || !position) {
      mapCoordinatesPreview.textContent = "Busca un lugar, usa GPS o toca el mapa.";
      confirmMapLocation.disabled = true;
      return;
    }

    mapCoordinatesPreview.textContent = `${position.lat.toFixed(7)}, ${position.lng.toFixed(7)}`;
    confirmMapLocation.disabled = false;
  }

  function updateMapSelection(position, address = "") {
    locationMarker.setLatLng(position).setOpacity(1);
    mapSelectionReady = true;
    selectedSearchLabel = address;
    setMapCoordinatesPreview();
    const isInCoverage = isLocationInCoverage(position.lat, position.lng);
    if (activeLocationField === "destino") {
      setMapStatus(isInCoverage ? COVERAGE_MESSAGES.inside : COVERAGE_MESSAGES.outside, !isInCoverage);
    } else {
      setMapStatus("Punto de recojo marcado. Puedes ajustar el marcador y confirmar.");
    }
  }

  function initializeLocationMap() {
    if (locationMap) return;

    locationMap = L.map("locationMap").setView([CUSCO_CENTER.lat, CUSCO_CENTER.lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'
    }).addTo(locationMap);
    locationMarker = L.marker([CUSCO_CENTER.lat, CUSCO_CENTER.lng], { draggable: true, opacity: 0 }).addTo(locationMap);
    coveragePolygon = L.polygon(COVERAGE_VERTICES.map(vertex => [vertex.lat, vertex.lng]), {
      color: "#E10600",
      weight: 3,
      fillColor: "#E10600",
      fillOpacity: 0.2
    }).addTo(locationMap);

    locationMap.on("click", event => {
      updateMapSelection(event.latlng);
    });
    locationMarker.on("dragend", event => {
      updateMapSelection(event.target.getLatLng());
    });
  }

  async function openLocationMap(fieldId) {
    activeLocationField = fieldId;
    const addressInput = document.getElementById(fieldId);
    const coordinates = document.getElementById(`${fieldId}Coordenadas`).value;
    const fieldLabel = fieldId === "origen" ? "punto de recojo" : "punto de destino";
    document.getElementById("locationDialogTitle").textContent = `Elegir ${fieldLabel}`;
    document.getElementById("locationDialogFieldLabel").textContent = `Selecciona el ${fieldLabel} sin salir del formulario.`;
    mapSearchInput.value = addressInput.value.startsWith("Ubicación GPS: ") ? "" : addressInput.value;
    mapSearchResults.replaceChildren();
    mapSearchResults.hidden = true;
    selectedSearchLabel = "";
    mapSelectionReady = false;
    locationDialog.showModal();
    setMapStatus("Cargando Google Maps…");

    try {
      await initializeLocationMap();
    } catch (error) {
      setMapStatus(error.message || "No se pudo cargar Google Maps. Revisa la configuración y vuelve a intentarlo.", true);
      console.error("Error al inicializar Google Maps:", error);
      return;
    }

    if (coordinates) {
      const [lat, lng] = coordinates.split(",").map(Number);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        locationMap.setView([lat, lng], 17);
        locationMarker.setLatLng([lat, lng]).setOpacity(1);
        mapSelectionReady = true;
      }
    } else {
      locationMap.fitBounds(coveragePolygon.getBounds(), { padding: [36, 36] });
      locationMarker.setOpacity(0);
    }

    const position = getSelectedPosition();
    setMapStatus(mapSelectionReady
      ? activeLocationField === "destino"
        ? (isLocationInCoverage(position.lat, position.lng) ? COVERAGE_MESSAGES.inside : COVERAGE_MESSAGES.outside)
        : "Punto de recojo guardado. Puedes ajustar el marcador o confirmarlo."
      : "Busca una dirección, usa tu ubicación o toca el mapa para colocar el marcador.");
    setMapCoordinatesPreview();
    requestAnimationFrame(() => locationMap.invalidateSize());
  }

  document.querySelectorAll("[data-map-open]").forEach(button => {
    button.addEventListener("click", () => openLocationMap(button.dataset.mapOpen));
  });

  window.addEventListener("chaski:open-location", event => {
    const fieldId = event.detail?.fieldId;
    if (fieldId === "origen" || fieldId === "destino") openLocationMap(fieldId);
  });

  document.querySelectorAll("[data-location-dialog-close]").forEach(button => {
    button.addEventListener("click", () => locationDialog.close());
  });

  mapSearchButton.addEventListener("click", async () => {
    const query = mapSearchInput.value.trim();
    if (!query) {
      setMapStatus("Escribe una dirección o un lugar para buscar.", true);
      mapSearchInput.focus();
      return;
    }

    mapSearchButton.disabled = true;
    mapSearchResults.hidden = true;
    mapSearchResults.replaceChildren();
    setMapStatus("Buscando direcciones y lugares…");
    try {
      const params = new URLSearchParams({ format: "jsonv2", addressdetails: "1", limit: "5", countrycodes: "pe", q: query });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { headers: { "Accept-Language": "es" } });
      if (!response.ok) throw new Error("El servicio de búsqueda no está disponible.");
      const results = await response.json();
      if (!results.length) {
        setMapStatus("No encontramos resultados. Prueba con otra dirección o mueve el mapa manualmente.", true);
        return;
      }

      results.forEach(result => {
        const item = document.createElement("li");
        const option = document.createElement("button");
        option.type = "button";
        const label = result.display_name;
        option.textContent = label;
        option.addEventListener("click", () => {
          const position = { lat: Number(result.lat), lng: Number(result.lon) };
          locationMap.setView([position.lat, position.lng], 17);
          updateMapSelection(position, label);
          mapSearchInput.value = label;
          mapSearchResults.hidden = true;
        });
        item.append(option);
        mapSearchResults.append(item);
      });
      mapSearchResults.hidden = false;
      setMapStatus(`Selecciona uno de los ${mapSearchResults.children.length} resultados.`);
    } catch (error) {
      setMapStatus(error.message || "No se pudo completar la búsqueda. Comprueba tu conexión e inténtalo de nuevo.", true);
      console.error("Error de búsqueda de direcciones:", error);
    } finally {
      mapSearchButton.disabled = false;
    }
  });

  mapSearchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      mapSearchButton.click();
    }
  });

  document.getElementById("mapUseCurrentLocation").addEventListener("click", event => {
    const button = event.currentTarget;
    if (window.isSecureContext === false || !navigator.geolocation) {
      setMapStatus("No se pudo obtener la ubicación. El GPS requiere permiso y HTTPS o localhost; también puedes buscar o tocar el mapa.", true);
      return;
    }

    button.disabled = true;
    setMapStatus("Obteniendo ubicación…");
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const selectedPosition = { lat: latitude, lng: longitude };
      locationMap.setView([selectedPosition.lat, selectedPosition.lng], 17);
      updateMapSelection(selectedPosition);
      button.disabled = false;
    }, error => {
      const messages = {
        1: "No se pudo obtener la ubicación; puedes buscarla manualmente. Se denegó el permiso de GPS.",
        2: "No se pudo determinar la ubicación; puedes buscarla o mover el mapa manualmente.",
        3: "La solicitud GPS tardó demasiado. Puedes buscar la dirección o mover el mapa manualmente."
      };
      setMapStatus(messages[error.code] || "No se pudo obtener la ubicación; puedes buscarla manualmente.", true);
      button.disabled = false;
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  });

  async function reverseGeocode(latitude, longitude) {
    const params = new URLSearchParams({ format: "jsonv2", lat: String(latitude), lon: String(longitude), zoom: "18" });
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, { headers: { "Accept-Language": "es" } });
    if (!response.ok) throw new Error("El servicio de direcciones no está disponible.");
    const result = await response.json();
    return result.display_name || "";
  }

  function updateSelectedLocationCard(fieldId) {
    const address = document.getElementById(fieldId).value.trim();
    const coordinates = document.getElementById(`${fieldId}Coordenadas`).value;
    const reference = document.getElementById(`${fieldId}Referencia`).value.trim();
    const card = document.getElementById(`${fieldId}SelectedCard`);
    document.getElementById(`${fieldId}SelectedAddress`).textContent = address;
    document.getElementById(`${fieldId}SelectedDetails`).textContent = [
      coordinates ? `Coordenadas: ${coordinates}` : "",
      reference ? `Referencia: ${reference}` : ""
    ].filter(Boolean).join(" · ");
    card.hidden = false;
  }

  confirmMapLocation.addEventListener("click", async () => {
    const position = getSelectedPosition();
    if (!activeLocationField || !locationMap || !mapSelectionReady || !position) {
      setMapStatus("Busca una dirección, usa tu ubicación o toca el mapa antes de confirmar.", true);
      return;
    }

    const isInCoverage = isLocationInCoverage(position.lat, position.lng);
    if (activeLocationField === "destino" && !isInCoverage) {
      setMapStatus(COVERAGE_MESSAGES.outside, true);
      return;
    }

    confirmMapLocation.disabled = true;
    setMapStatus("Guardando el punto y consultando su dirección…");
    const latitude = Number(position.lat.toFixed(7));
    const longitude = Number(position.lng.toFixed(7));
    const coordinates = `${latitude.toFixed(7)}, ${longitude.toFixed(7)}`;
    let address = selectedSearchLabel;

    if (!address) {
      try {
        address = await reverseGeocode(latitude, longitude);
      } catch (error) {
        setMapStatus("No se pudo determinar la dirección. Vuelve a seleccionar el punto o intenta de nuevo.", true);
        console.error("Error al consultar la dirección del punto:", error);
        setMapCoordinatesPreview();
        return;
      }
    }

    if (!address) {
      setMapStatus("No se pudo determinar la dirección de este punto. Selecciona de nuevo o prueba otro lugar.", true);
      setMapCoordinatesPreview();
      return;
    }

    const addressInput = document.getElementById(activeLocationField);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    addressInput.value = address;
    addressInput.dataset.confirmed = "true";
    document.getElementById(`${activeLocationField}Coordenadas`).value = coordinates;
    document.getElementById(`${activeLocationField}Mapa`).value = mapUrl;
    updateSelectedLocationCard(activeLocationField);
    setLocationStatus(activeLocationField, activeLocationField === "destino"
      ? COVERAGE_MESSAGES.inside
      : `Ubicación guardada correctamente: ${address}`);
    window.dispatchEvent(new CustomEvent("chaski:location-selected", {
      detail: { fieldId: activeLocationField, address, coordinates, mapUrl }
    }));
    locationDialog.close();
    addressInput.focus({ preventScroll: true });
    setMapCoordinatesPreview();
  });

  document.querySelectorAll("[data-selected-location-action]").forEach(button => {
    button.addEventListener("click", () => {
      const fieldId = button.dataset.locationField;
      if (button.dataset.selectedLocationAction === "change") {
        openLocationMap(fieldId);
        return;
      }

      document.getElementById(fieldId).value = "";
      document.getElementById(`${fieldId}Referencia`).value = "";
      document.getElementById(`${fieldId}Coordenadas`).value = "";
      document.getElementById(`${fieldId}Mapa`).value = "";
      document.getElementById(`${fieldId}SelectedCard`).hidden = true;
      document.getElementById(fieldId).dataset.confirmed = "false";
      setLocationStatus(fieldId, "Ubicación eliminada. Puedes escribir una dirección o elegir otra en el mapa.");
      document.getElementById(fieldId).focus({ preventScroll: true });
    });
  });

  ["origen", "destino"].forEach(fieldId => {
    const addressInput = document.getElementById(fieldId);
    addressInput.addEventListener("input", () => {
      const coordinates = document.getElementById(`${fieldId}Coordenadas`);
      const mapsUrl = document.getElementById(`${fieldId}Mapa`);
      const hadSelection = Boolean(coordinates.value || mapsUrl.value || addressInput.dataset.confirmed === "true");
      coordinates.value = "";
      mapsUrl.value = "";
      addressInput.dataset.confirmed = "false";
      document.getElementById(`${fieldId}SelectedCard`).hidden = true;
      if (hadSelection) setLocationStatus(fieldId, "Dirección editada. La selección anterior se quitó; el otro punto del pedido permanece intacto.");
    });

    document.getElementById(`${fieldId}Referencia`).addEventListener("input", () => {
      if (addressInput.dataset.confirmed === "true") updateSelectedLocationCard(fieldId);
    });
  });

  function openWhatsApp(message) {
    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      showFormMessage("WhatsApp aún no está configurado. Agrega el número comercial real en la variable WHATSAPP_NUMBER de js/funciones.js.");
      orderSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(url, "_blank");
    if (!whatsappWindow) {
      showFormMessage("El navegador bloqueó la ventana de WhatsApp. Permite las ventanas emergentes y vuelve a intentarlo.");
      return;
    }
    whatsappWindow.opener = null;
    showFormMessage("WhatsApp se abrió con el mensaje preparado. Solo llegará a CHASKI cuando pulses Enviar en WhatsApp; esta página no lo envía, confirma ni guarda.");
  }

  document.getElementById("contactWhatsApp").addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp("Hola, CHASKI DELIVERY. Quisiera consultar sobre sus servicios de recojo y entrega.");
  });

  orderForm.addEventListener("submit", event => {
    event.preventDefault();
    formMessage.textContent = "";
    formMessage.classList.remove("is-visible");
    const requiredFields = ["nombre", "telefono", "origen", "destino", "servicio", "descripcion"];
    let firstInvalidField = null;

    requiredFields.forEach(name => {
      const field = orderForm.elements.namedItem(name);
      field.setCustomValidity(field.value.trim() ? "" : "Completa este campo para preparar la solicitud.");
      if (!field.validity.valid && !firstInvalidField) firstInvalidField = field;
    });

    if (firstInvalidField) {
      firstInvalidField.reportValidity();
      firstInvalidField.focus();
      return;
    }

    const destinationCoordinates = document.getElementById("destinoCoordenadas").value.trim();
    const [destinationLatitude, destinationLongitude] = destinationCoordinates.split(",").map(Number);
    if (!destinationCoordinates
      || !Number.isFinite(destinationLatitude)
      || !Number.isFinite(destinationLongitude)) {
      showFormMessage("Selecciona el punto exacto de entrega en el mapa para comprobar la cobertura.");
      setLocationStatus("destino", "Elige la ubicación de entrega en el mapa para verificar que esté dentro de cobertura.", true);
      openLocationMap("destino");
      return;
    }

    if (!isLocationInCoverage(destinationLatitude, destinationLongitude)) {
      showFormMessage(COVERAGE_MESSAGES.outside);
      setLocationStatus("destino", COVERAGE_MESSAGES.outside, true);
      openLocationMap("destino");
      return;
    }

    const data = new FormData(orderForm);
    const fields = {
      nombre: data.get("nombre").trim(),
      telefono: data.get("telefono").trim(),
      origen: data.get("origen").trim(),
      origenReferencia: data.get("origenReferencia").trim(),
      origenCoordenadas: data.get("origenCoordenadas").trim(),
      origenMapa: data.get("origenMapa").trim(),
      destino: data.get("destino").trim(),
      destinoReferencia: data.get("destinoReferencia").trim(),
      destinoCoordenadas: data.get("destinoCoordenadas").trim(),
      destinoMapa: data.get("destinoMapa").trim(),
      servicio: data.get("servicio"),
      descripcion: data.get("descripcion").trim(),
      indicaciones: data.get("indicaciones").trim()
    };

    const locationMessage = (label, address, reference, mapsUrl) => {
      const sharedMapLink = findGoogleMapsLink(address);
      return [
        `${label}: ${address}`,
        reference ? `${label} - referencia: ${reference}` : "",
        mapsUrl ? `${label} - abrir en el mapa: ${mapsUrl}` : sharedMapLink ? `${label} - enlace compartido de Google Maps: ${sharedMapLink}` : ""
      ].filter(Boolean);
    };

    const message = [
      "Hola, CHASKI DELIVERY. Quiero coordinar un envío:",
      "",
      `Nombre completo: ${fields.nombre}`,
      `Teléfono: ${fields.telefono}`,
      `Servicio: ${fields.servicio}`,
      `Descripción del paquete o encargo: ${fields.descripcion}`,
      ...locationMessage("Punto de recojo", fields.origen, fields.origenReferencia, fields.origenMapa),
      ...locationMessage("Destino", fields.destino, fields.destinoReferencia, fields.destinoMapa),
      fields.indicaciones ? `Indicaciones adicionales: ${fields.indicaciones}` : ""
    ].filter(Boolean).join("\n");

    openWhatsApp(message);
  });

  document.querySelectorAll(".media-frame img").forEach(image => {
    const mediaFrame = image.closest(".media-frame");
    const markLoaded = () => mediaFrame.classList.add("is-loaded");
    image.addEventListener("load", markLoaded, { once: true });
    image.addEventListener("error", () => mediaFrame.classList.remove("is-loaded"), { once: true });
    if (image.complete && image.naturalWidth > 0) markLoaded();
  });

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("js-ready");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }
});