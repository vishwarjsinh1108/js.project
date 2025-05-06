const products = [
    { id: 1, name: "LD01 LOUNGE CHAIR", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JGUBEqrL8IZBK3jXo6Igu5tGt81lEIF6Og&s" },
    { id: 2, name: "LD02 LOUNGE CHAIR", price: 320, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaIrnnRBlQ1_LEX1t4hMhuut1ZI_RK8_FavA&s" },
    { id: 3, name: "LD03 LOUNGE CHAIR", price: 280, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPa2mDAyu9hApmRT9LHJVFIDNN-HzmCzLwOw&s" },
    { id: 4, name: "LD04 LOUNGE CHAIR", price: 300, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJYel17XkYl8PgAvO08T6BH_wwdwkqIhxO7A&s" },
    { id: 5, name: "LD05 LOUNGE CHAIR", price: 210, image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/o/p/1/9-wonder-6-lancer-grey-original-imagr2cfub9be37p.jpeg?q=90&crop=false" },
    { id: 6, name: "LD06 LOUNGE CHAIR", price: 190, image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/26921218/2024/1/15/65e5b70f-d8b5-47bb-8480-2654bdad96e01705258222006HerisHemlyMenGreyMeshRunningShoes1.jpg" },
    { id: 7, name: "LD07 LOUNGE CHAIR", price: 230, image: "https://img.tatacliq.com/images/i21//437Wx649H/MP000000024768423_437Wx649H_202412201821041.jpeg" },
    { id: 8, name: "LD08 LOUNGE CHAIR", price: 220, image: "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/27462412/2024/9/26/1e397323-1acf-47d6-948b-d71afc2ee4681727354498635-Red-Tape-Men-Perforations-Lace-Up-Sneakers-1411727354498430-1.jpg" }
  ];

  let cart = [];

  function renderProducts() {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
    products.forEach(product => {
      container.innerHTML += `
        <div class="col-md-3">
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h6 class="mt-2">${product.name}</h6>
            <p>$${product.price}</p>
            <button class="btn btn-dark btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
        </div>
      `;
    });
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    renderCart();
  }

  function changeQty(productId, delta) {
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== productId);
      }
    }
    renderCart();
  }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    function clearCart() {
        cart = [];
        renderCart();
    }

  function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;
      container.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" />
          <div class="flex-grow-1">
            <div>${item.name}</div>
            <small>$${item.price} × ${item.qty}</small>
          </div>
          <button class="btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
          <button class="btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      `;
    });

    document.getElementById("cart-total").textContent = total.toFixed(2);
    document.getElementById("cart-count").textContent = count;
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    container.innerHTML = "";
    cart.forEach(item => {
      container.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" />
          <div>
            <div>${item.name}</div>
            <div>$${item.price} × ${item.qty} = $${item.price * item.qty}</div>
          </div>
          <button onclick="removeFromCart(${item.id})" style="margin-left:auto; background-color: #28a745; border-radius: 10px; padding: 5px 5px; font-size: 17px; font-weight: bold;">Remove</button>
        </div>
      `;
    });
  }

  renderProducts();