const Geraldoshop = [
  { name: "shooty turret", price: 250, itemType: "defense", quantity: 4, description: "A permanent, hand-crafted dart shooting turret.." },
  { name: "shooty turret MK2", price: 300, itemType: "defense", quantity: 4, description: "A permanent, hand-crafted dart shooting turret. Upgraded! Fires faster and does more damage." },
  { name: "stack of old nails", price: 50, itemType: "defense", quantity: 10, description: "Yes it's just a stack of old nails but put them anywhere on the track and they'll handily pop those stray Bloons." },
  { name: "stack of old nails MK2", price: 100, itemType: "defense", quantity: 10, description: "Yes it's just a very large stack of old nails but put them anywhere on the track and they'll handily pop those stray Bloons." },
  { name: "stack of old nails MK3", price: 150, itemType: "defense", quantity: 10, description: "Yes it's just a GIANT NAIL MINE but put it anywhere on the track and they'll handily pop those stray Bloons." },
  { name: "creepy idol", price: 120, itemType: "debuff", quantity: 4, description: "Place this spooky looking idol near the track to scare some Bloons (even MOABs!) back where they came from." },
  { name: "jar of pickles", price: 150, itemType: "buff", quantity: 4, description: "Try these pickles on one of your Monkey Towers and it will hit harder, but shoot slower for a while." },
  { name: "Rare Quincy Action Figures", price: 750, itemType: "economy", quantity: 1, description: "Limited edition, mint condition original Quincy, Son of Quincy action figure! This is only going to go up in value so buy it now!" },
  { name: "see invisibility potion", price: 200, itemType: "buff", quantity: 2, description: "Whatever Monkey you gift with this extremely eficacious elixir will be able to see Camo Bloons with ease! Effects will wear off." },
  { name: "see invisibility potion Plus", price: 300, itemType: "buff", quantity: 2, description: "Whatever Monkey you gift with this extremely eficacious elixir will be able to see Camo Bloons with ease and do more damage to them! Effects will wear off." },
  { name: "Tube of Amaz-o-Glue", price: 150, itemType: "debuff", quantity: 3, description: "Truly amazing! Apply a tube of this modern marvel anywhere on the track and watch the next bunch of Bloons and even MOABs slow right down." },
  { name: "Sharpening Stone", price: 200, itemType: "buff", quantity: 3, description: "Sharpen those darts, friend! Apply this to your darts and blades and they'll be sharper than ever before. Runs out after 10 uses." },
  { name: "Sharpening Stone Plus", price: 250, itemType: "buff", quantity: 3, description: "Sharpen those darts, friend! Apply this to your darts and blades and they'll be sharper than ever before." },
  { name: "Worn Hero's Cape", price: 1750, itemType: "buff", quantity: 3, description: "All heroes wear capes! Give this to one of your Dart Monkeys and watch the transformation! Slightly used condition, only minor tiers, er, I mean tears." },
  { name: "Blade Trap", price: 650, itemType: "defense", quantity: 4, description: "Place this on the track and watch the first Bloons to touch it get shredded by the great whirling blades!" },
  { name: "Blade Trap MK2", price: 800, itemType: "defense", quantity: 4, description: "Place this on the track and watch the first Bloons to touch it get shredded by the great whirling blades! Newer more powerful model!" },
  { name: "Bottle of 'Gerry's Fire' Hot Sauce", price: 650, itemType: "attackers", quantity: 3, description: "2.8 million Bloonville units. Whoever tastes this special sauce will be spewing fire for a while! *May have unforeseen benefits." },
  { name: "Bottle of 'Gerry's Fire' Hot Sauce Plus", price: 800, itemType: "attackers", quantity: 3, description: "2.8 million Bloonville units. Whoever tastes this special sauce will be spewing fire for a while! Now with extra burny-ness." },
  { name: "Fertilizer", price: 300, itemType: "economy", quantity: 4, description: "Does that farm of yours have bananas? Want even more bananas? Sprinkle this extra-strength magical fertilizer directly on that farm and get more banana now!" },
  { name: "Pet Rabbit [RENT ONLY]", price: 1750, itemType: "defense", quantity: 1, description: "Sometimes all you need is a super cute wee bunny pet! Or several!" },
  { name: "Rejuv Potion", price: 2000, itemType: "misc", quantity: 2, description: "Drop this delicious drink anywhere and watch its rejuvenating powers restore lost lives and reset ability cooldowns." },
  { name: "Genie Bottle", price: 2500, itemType: "attackers", quantity: 2, description: "Summon a Genie Monkey from this brilliant blue bottle but beware, it won't last forever! (no wishes included with purchase)." },
  { name: "Genie Bottle Plus", price: 3000, itemType: "attackers", quantity: 2, description: "Summon a Genie Monkey from this brilliant gold bottle but beware, it won't last forever! (no wishes included with purchase). Extra attack now included." },
  { name: "Paragon Power Totem", price: 26000, itemType: "misc", quantity: 2, description: "Boost your next Paragon's powers with this mystical artifact..." },
];

const sortButtons = document.querySelectorAll(".sort-btn");
const shopItems = Array.from(document.querySelectorAll(".card"));

// Clear any previously saved stock from earlier versions and start fresh each reload
localStorage.removeItem("geraldo_emporium_stock_v1");

let stock = Geraldoshop.map((shopItem, idx) => {
  const cardStockAttr = shopItems[idx]?.dataset.stock;
  return typeof shopItem.quantity === "number"
    ? shopItem.quantity
    : Number(cardStockAttr ?? 0);
});

let cart = [];
let cartVisible = false;

function getStockByIndex(index) {
  return stock[index] ?? 0;
}

function getInCartQty(index) {
  return cart.find((item) => item.index === index)?.quantity || 0;
}

// Attach card index, category, stock label, and description element once
shopItems.forEach((card, index) => {
  const shopItem = Geraldoshop[index];
  if (!shopItem) return;

  card.dataset.index = index;
  card.dataset.category = shopItem.itemType;
  card.dataset.stock = getStockByIndex(index);

  let descEl = card.querySelector(".card-desc");
  if (!descEl) {
    descEl = document.createElement("p");
    descEl.className = "card-desc";
    descEl.textContent = shopItem.description;
    card.querySelector(".card-price")?.insertAdjacentElement("afterend", descEl);
  }

  let stockEl = card.querySelector(".card-stock");
  if (!stockEl) {
    stockEl = document.createElement("p");
    stockEl.className = "card-stock";
    card.insertBefore(stockEl, card.querySelector(".card-btn") || null);
  }
});

function renderStockDisplay() {
  shopItems.forEach((card, index) => {
    const shopItem = Geraldoshop[index];
    if (!shopItem) return;

    const remaining = getStockByIndex(index);
    const inCart = getInCartQty(index);
    const available = Math.max(0, remaining - inCart);

    card.dataset.stock = available;

    const stockEl = card.querySelector(".card-stock");
    const btn = card.querySelector(".card-btn");

    if (stockEl) {
      stockEl.classList.remove("low-stock", "out-of-stock");

      if (available <= 0) {
        stockEl.textContent = remaining <= 0 ? "Out of Stock" : "None left (all in cart)";
        stockEl.classList.add("out-of-stock");
      } else if (available === 1) {
        stockEl.textContent = "Only 1 left in stock!";
        stockEl.classList.add("low-stock");
      } else {
        stockEl.textContent = `In Stock: ${available}`;
      }
    }

    if (btn) {
      if (remaining <= 0) {
        btn.disabled = true;
        btn.textContent = "Sold Out";
      } else if (available <= 0) {
        btn.disabled = true;
        btn.textContent = "Max in Cart";
      } else {
        btn.disabled = false;
        btn.textContent = "Add To Cart";
      }
    }
  });
}

function filterShopItems(filter = "All") {
  const normalizedFilter = (filter || "All").toLowerCase();

  shopItems.forEach((card, index) => {
    const category = (
      card.dataset.category ||
      Geraldoshop[index]?.itemType ||
      ""
    ).toLowerCase();

    const matches = normalizedFilter === "all" || category === normalizedFilter;
    card.style.display = matches ? "" : "none";
  });
}

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.sort || "All";

    sortButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    filterShopItems(filter);
  });
});

const activeBtn = document.querySelector(".sort-btn.active");
if (activeBtn) {
  filterShopItems(activeBtn.dataset.sort);
}

function getPrice(card, index) {
  if (typeof Geraldoshop[index]?.price === "number") {
    return Geraldoshop[index].price;
  }
  const text = card.querySelector(".card-price")?.textContent || "0";
  return parseFloat(text.replace(/[^0-9.]/g, "")) || 0;
}

function addToCart(itemName, price, index) {
  const remaining = getStockByIndex(index);
  const found = cart.find((item) => item.index === index);
  const currentQty = found ? found.quantity : 0;

  if (remaining <= 0) {
    alert(`"${itemName}" is out of stock.`);
    return;
  }

  if (currentQty + 1 > remaining) {
    alert(`Only ${remaining} "${itemName}" available in stock.`);
    return;
  }

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({ index, name: itemName, price, quantity: 1 });
  }

  viewCart();
}

function removeFromCart(index) {
  const idx = cart.findIndex((item) => item.index === index);
  if (idx === -1) return;

  if (cart[idx].quantity > 1) {
    cart[idx].quantity -= 1;
  } else {
    cart.splice(idx, 1);
  }

  viewCart();
}

function viewCart() {
  const toggleBtn = document.getElementById("cart-toggle-btn");
  const panel = document.getElementById("cart-panel");

  const popupCount = document.getElementById("popup-cart-count");
  const popupItems = document.getElementById("popup-cart-items");
  const popupTotal = document.getElementById("popup-cart-total");

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (toggleBtn) {
    toggleBtn.textContent = `Cart (${totalQty})`;
  }
  if (popupCount) {
    popupCount.textContent = totalQty;
  }
  if (popupTotal) {
    popupTotal.textContent = totalCost;
  }

  const cartHtml =
    cart.length === 0
      ? "<p>Your cart is empty.</p>"
      : cart
          .map(
            (item) => `
            <div>
              <span>${item.quantity}x ${item.name} — $${item.price * item.quantity}</span>
              <button type="button" onclick="removeFromCart(${item.index})">Remove</button>
            </div>
          `
          )
          .join("");

  if (popupItems) {
    popupItems.innerHTML = cartHtml;
  }

  if (panel) {
    panel.innerHTML =
      cart.length === 0
        ? "<p>Your cart is empty.</p>"
        : `${cartHtml}<p>Total: $${totalCost}</p><button type="button" onclick="checkout()">Checkout</button>`;
  }

  renderStockDisplay();
}

function checkout() {
  if (cart.length === 0) return;

  for (const item of cart) {
    const remaining = getStockByIndex(item.index);
    if (item.quantity > remaining) {
      alert(`Not enough stock for ${item.name} (${remaining} left).`);
      return;
    }
  }

  for (const item of cart) {
    stock[item.index] = Math.max(0, getStockByIndex(item.index) - item.quantity);
  }

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cart = [];
  viewCart();
  alert(`Total amount: $${totalCost} — Stock updated!`);
}

shopItems.forEach((card, index) => {
  const name = (
    card.querySelector(".card-title")?.textContent ||
    Geraldoshop[index]?.name ||
    ""
  ).trim();
  const price = getPrice(card, index);
  const btn = card.querySelector(".card-btn");

  if (name && btn) {
    btn.addEventListener("click", () => addToCart(name, price, index));
  }
});

document.getElementById("cart-toggle-btn")?.addEventListener("click", () => {
  const panel = document.getElementById("cart-panel");
  if (!panel) return;
  cartVisible = !cartVisible;
  panel.style.display = cartVisible ? "block" : "none";
});

const shopPopupBtn = document.getElementById("shop-popup-btn");
const shopPopup = document.getElementById("shop-popup");
const closeShopPopupBtn = document.getElementById("close-shop-popup");

shopPopupBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!shopPopup) return;
  viewCart();
  const isOpen = shopPopup.style.display === "block";
  shopPopup.style.display = isOpen ? "none" : "block";
});

closeShopPopupBtn?.addEventListener("click", () => {
  if (shopPopup) shopPopup.style.display = "none";
});

document.addEventListener("click", (e) => {
  if (!shopPopup || shopPopup.style.display !== "block") return;
  if (!shopPopup.contains(e.target) && e.target !== shopPopupBtn) {
    shopPopup.style.display = "none";
  }
});

viewCart();