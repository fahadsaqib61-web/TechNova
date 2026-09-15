
/* =========================================================
   TECHSTORE — FINAL JAVASCRIPT
   ========================================================= */


/* =========================================================
   01. PREMIUM PAGE LOADER
   ========================================================= */

(function () {

    const loader = document.getElementById("page-loader");
    const progressBar = document.getElementById("loader-progress-bar");
    const percentText = document.getElementById("loader-percent");
    const statusText = document.getElementById("loader-status");

    if (!loader) {
        return;
    }

    let progress = 0;
    let finished = false;

    const messages = [
        "INITIALIZING",
        "LOADING SYSTEM",
        "CALIBRATING EXPERIENCE",
        "PREPARING STORE",
        "CONNECTING PRODUCTS",
        "EXPERIENCE READY"
    ];


    function updateLoader() {

        progress = Math.min(progress, 100);

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (percentText) {
            percentText.textContent =
                String(progress).padStart(2, "0") + "%";
        }

        if (statusText) {

            const messageIndex = Math.min(
                Math.floor(progress / 17),
                messages.length - 1
            );

            statusText.textContent =
                messages[messageIndex];
        }
    }


    /* Smooth progress */

    const progressTimer = setInterval(function () {

        if (progress < 90) {

            progress += Math.floor(
                Math.random() * 4
            ) + 1;

            updateLoader();
        }

    }, 100);


    /* Finish loader */

    function finishLoader() {

        if (finished) {
            return;
        }

        finished = true;

        clearInterval(progressTimer);

        progress = 100;

        updateLoader();

        if (statusText) {
            statusText.textContent =
                "EXPERIENCE READY";
        }


        /* Fade out */

        setTimeout(function () {

            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";

        }, 500);


        /* Remove completely */

        setTimeout(function () {

            if (loader && loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }

        }, 1400);

    }


    /*
     * Loader will wait for the browser's load event,
     * but it has a guaranteed fallback so it can NEVER
     * remain stuck forever.
     */

    let pageLoaded = false;


    function onPageLoaded() {

        pageLoaded = true;

        /*
         * Give the animation enough time to feel premium.
         */

        setTimeout(function () {

            finishLoader();

        }, 2200);

    }


    if (document.readyState === "complete") {

        onPageLoaded();

    } else {

        window.addEventListener(
            "load",
            onPageLoaded,
            { once: true }
        );


        /*
         * Emergency fallback.
         * If something blocks window.load,
         * the loader still disappears.
         */

        setTimeout(function () {

            if (!pageLoaded) {
                finishLoader();
            }

        }, 6000);

    }

})();



/* =========================================================
   02. DEAL COUNTDOWN
   ========================================================= */

(function () {

    const daysElement =
        document.getElementById("deal-days");

    const hoursElement =
        document.getElementById("deal-hours");

    const minutesElement =
        document.getElementById("deal-minutes");

    const secondsElement =
        document.getElementById("deal-seconds");


    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }


    let dealEnd =
        Number(
            localStorage.getItem(
                "techstoreDealEnd"
            )
        );


    if (
        !dealEnd ||
        dealEnd <= Date.now()
    ) {

        dealEnd =
            Date.now() +
            (7 * 24 * 60 * 60 * 1000);

        localStorage.setItem(
            "techstoreDealEnd",
            dealEnd
        );

    }


    function updateCountdown() {

        let difference =
            dealEnd - Date.now();


        if (difference < 0) {
            difference = 0;
        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60)) /
                1000
            );


        daysElement.textContent =
            String(days).padStart(2, "0");

        hoursElement.textContent =
            String(hours).padStart(2, "0");

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );

})();



/* =========================================================
   03. NAVBAR SCROLL EFFECT
   ========================================================= */

(function () {

    const navbar =
        document.querySelector(".navbar");


    if (!navbar) {
        return;
    }


    function updateNavbar() {

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(3,5,7,.88)";

            navbar.style.backdropFilter =
                "blur(18px)";

        } else {

            navbar.style.background =
                "linear-gradient(to bottom, rgba(3,5,7,.94), rgba(3,5,7,.72), transparent)";

            navbar.style.backdropFilter =
                "blur(14px)";

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();

})();



/* =========================================================
   04. MOBILE MENU
   ========================================================= */

(function () {

    const menuButton =
        document.querySelector(".nav-menu");

    const navLinks =
        document.querySelector(".nav-links");


    if (!menuButton || !navLinks) {
        return;
    }


    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                navLinks.classList.toggle(
                    "mobile-open"
                );


            if (isOpen) {

                navLinks.style.display =
                    "flex";

                navLinks.style.position =
                    "absolute";

                navLinks.style.top =
                    "72px";

                navLinks.style.left =
                    "15px";

                navLinks.style.right =
                    "15px";

                navLinks.style.margin =
                    "0";

                navLinks.style.padding =
                    "20px";

                navLinks.style.flexDirection =
                    "column";

                navLinks.style.alignItems =
                    "flex-start";

                navLinks.style.gap =
                    "18px";

                navLinks.style.border =
                    "1px solid rgba(255,255,255,.08)";

                navLinks.style.borderRadius =
                    "12px";

                navLinks.style.background =
                    "rgba(5,8,11,.96)";

                navLinks.style.backdropFilter =
                    "blur(20px)";

            } else {

                navLinks.removeAttribute(
                    "style"
                );

            }

        }
    );

})();



/* =========================================================
   05. PRODUCT BUTTON FEEDBACK
   ========================================================= */

(function () {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const originalText =
                    button.textContent;


                button.textContent =
                    "ADDED ✓";


                button.style.background =
                    "#62e7ff";

                button.style.color =
                    "#020507";


                setTimeout(function () {

                    button.textContent =
                        originalText;

                    button.style.background =
                        "";

                    button.style.color =
                        "";

                }, 1200);

            }
        );

    });

})();







/* =========================================================
   06. TECHSTORE DATA + SHOP + CART + PRODUCTS + ORDERS
   ========================================================= */

let products = [];
let categories = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================================================
   LOAD DATA.JSON
   ========================================================= */

async function loadTechStoreData() {

    try {

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Unable to load data.json");
        }

        const data = await response.json();

        products = data.products || [];
        categories = data.categories || [];


        /* HOME */

        displayHomeCategories();


        /* SHOP */

        displayShopFilters();


        const params = new URLSearchParams(
            window.location.search
        );

        const category =
            params.get("category");

        if (category) {

            displayProducts(
                products.filter(function (product) {
                    return product.category === category;
                })
            );

        } else {

            displayProducts(products);

        }


        /* DEALS */

        displayDeals();


        /* PRODUCT DETAILS */

        displayProductDetails();


        /* CART */

        updateCartCount();
        displayCart();
        updateCheckoutSummary();


        /* ORDERS */

        displayOrders();

    }

    catch (error) {

        console.error(
            "TechStore Data Error:",
            error
        );

    }

}


/* =========================================================
   HOME CATEGORIES
   ========================================================= */

function displayHomeCategories() {

    const container =
        document.querySelector(
            ".category-container"
        );

    if (!container || !categories.length) {
        return;
    }


    /*
     * Agar categories already HTML mein bani hui hain,
     * unko replace nahi karenge.
     */

    const existingCards =
        container.querySelectorAll(
            ".category-card"
        );

    if (existingCards.length > 0) {
        return;
    }


    categories.forEach(function (category) {

        const card =
            document.createElement("a");

        card.href =
            "shop.html?category=" +
            encodeURIComponent(
                category.name
            );

        card.className =
            "category-card";


        card.innerHTML = `

            <div class="category-image">

                <img
                    src="${category.image || ""}"
                    alt="${category.name}"
                >

            </div>

            <div class="category-info">

                <h3>
                    ${category.icon || ""} ${category.name}
                </h3>

                <p>
                    ${category.description || ""}
                </p>

            </div>

            <span class="category-arrow">
                →
            </span>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   SHOP FILTERS
   ========================================================= */

function displayShopFilters() {

    const container =
        document.querySelector(
            ".shop-filters"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    const allButton =
        document.createElement("button");

    allButton.className =
        "filter-pill active";

    allButton.dataset.category =
        "all";

    allButton.textContent =
        "All Products";


    container.appendChild(allButton);


    categories.forEach(function (category) {

        const button =
            document.createElement("button");

        button.className =
            "filter-pill";

        button.dataset.category =
            category.name;

        button.textContent =
            (category.icon || "") +
            " " +
            category.name;


        container.appendChild(button);

    });

}


/* =========================================================
   PRODUCT STARS
   ========================================================= */

function getStars(rating) {

    const value =
        Number(rating) || 0;

    return "★".repeat(value);

}


/* =========================================================
   DISPLAY PRODUCTS
   ========================================================= */

function displayProducts(productList = products) {

    const container =
        document.querySelector(
            ".product-container"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!productList.length) {

        container.innerHTML = `

            <div class="no-products">

                <h3>
                    No Products Found
                </h3>

                <p>
                    Try another category or search.
                </p>

            </div>

        `;

        return;
    }


    productList.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        let priceHTML = `
            <div class="price">
                $${product.price}
            </div>
        `;


        if (product.oldPrice) {

            priceHTML = `

                <div class="price-container">

                    <div class="price">
                        $${product.price}
                    </div>

                    <div class="old-price">
                        $${product.oldPrice}
                    </div>

                </div>

            `;

        }


        let badgeHTML = "";


        if (product.discount) {

            badgeHTML = `

                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>

            `;

        }


        card.innerHTML = `

            <div
                class="product-image"
                data-product-id="${product.id}"
                style="cursor:pointer;"
            >

                ${badgeHTML}

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-category">
                ${product.category}
            </div>


            <h3>
                ${product.name}
            </h3>


            <div class="rating">
                ${getStars(product.rating)}
            </div>


            <div class="product-bottom">

                ${priceHTML}

                <button
                    class="add-cart"
                    data-id="${product.id}"
                >
                    ADD TO CART
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   SEARCH
   ========================================================= */

function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) {
        return;
    }


    const searchValue =
        input.value
            .trim()
            .toLowerCase();


    if (!searchValue) {

        displayProducts(products);

        return;
    }


    const filtered =
        products.filter(function (product) {

            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    displayProducts(filtered);

}


/* Search button */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.closest(
                "#searchBtn"
            )
        ) {

            performSearch();

        }

    }
);


/* Search Enter */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            event.target.id ===
            "searchInput"
        ) {

            performSearch();

        }

    }
);


/* =========================================================
   SHOP FILTER CLICK
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const filter =
            event.target.closest(
                ".filter-pill"
            );

        if (!filter) {
            return;
        }


        document
            .querySelectorAll(
                ".filter-pill"
            )
            .forEach(function (button) {

                button.classList.remove(
                    "active"
                );

            });


        filter.classList.add(
            "active"
        );


        const category =
            filter.dataset.category;


        if (category === "all") {

            displayProducts(products);

        } else {

            displayProducts(
                products.filter(
                    function (product) {

                        return (
                            product.category ===
                            category
                        );

                    }
                )
            );

        }

    }
);


/* =========================================================
   CART COUNT
   ========================================================= */

function updateCartCount() {

    const elements =
        document.querySelectorAll(
            ".cart-count"
        );


    const totalItems =
        cart.reduce(
            function (total, item) {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );


    elements.forEach(function (element) {

        element.textContent =
            totalItems;

    });

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(productId, quantity = 1) {

    const product =
        products.find(function (item) {

            return String(item.id) ===
                String(productId);

        });


    if (!product) {
        return;
    }


    const existing =
        cart.find(function (item) {

            return String(item.id) ===
                String(productId);

        });


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


/* =========================================================
   CART CLICK HANDLER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".add-cart"
            );


        if (!button) {
            return;
        }


        const productId =
            button.dataset.id;


        addToCart(productId);


        const original =
            button.textContent;


        button.textContent =
            "ADDED ✓";


        setTimeout(function () {

            button.textContent =
                original;

        }, 1200);

    }
);


/* =========================================================
   DISPLAY CART
   ========================================================= */

function displayCart() {

    const container =
        document.querySelector(
            ".cart-container"
        );

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your Cart Is Empty
                </h2>

                <p>
                    Add some products to get started.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Continue Shopping →
                </a>

            </div>

        `;


        updateCartTotals();

        return;

    }


    cart.forEach(function (item) {

        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <span>
                    ${item.category}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <strong>
                    $${item.price}
                </strong>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-minus"
                    data-id="${item.id}"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    class="quantity-plus"
                    data-id="${item.id}"
                >
                    +
                </button>

            </div>


            <button
                class="remove-cart"
                data-id="${item.id}"
            >
                Remove
            </button>

        `;


        container.appendChild(cartItem);

    });


    updateCartTotals();

}


/* =========================================================
   CART TOTALS
   ========================================================= */

function updateCartTotals() {

    const totalItems =
        cart.reduce(
            function (total, item) {

                return total +
                    Number(item.quantity);

            },
            0
        );


    const totalPrice =
        cart.reduce(
            function (total, item) {

                return total +
                    (
                        Number(item.price) *
                        Number(item.quantity)
                    );

            },
            0
        );


    document
        .querySelectorAll(".total-items")
        .forEach(function (element) {

            element.textContent =
                totalItems;

        });


    document
        .querySelectorAll(".total-price")
        .forEach(function (element) {

            element.textContent =
                totalPrice.toFixed(2);

        });


    const checkout =
        document.querySelector(
            ".checkout-button-container"
        );


    if (checkout) {

        checkout.innerHTML =
            cart.length
                ? `
                    <a
                        href="checkout.html"
                        class="btn btn-primary"
                    >
                        Proceed to Checkout →
                    </a>
                `
                : "";

    }

}


/* =========================================================
   QUANTITY CONTROLS
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const plus =
            event.target.closest(
                ".quantity-plus"
            );

        const minus =
            event.target.closest(
                ".quantity-minus"
            );


        if (plus) {

            const item =
                cart.find(function (product) {

                    return String(product.id) ===
                        String(plus.dataset.id);

                });


            if (item) {
                item.quantity++;
            }

        }


        if (minus) {

            const item =
                cart.find(function (product) {

                    return String(product.id) ===
                        String(minus.dataset.id);

                });


            if (item && item.quantity > 1) {
                item.quantity--;
            }

        }


        if (plus || minus) {

            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );

            updateCartCount();
            displayCart();

        }

    }
);


/* =========================================================
   REMOVE CART ITEM
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".remove-cart"
            );


        if (!button) {
            return;
        }


        cart =
            cart.filter(function (item) {

                return String(item.id) !==
                    String(button.dataset.id);

            });


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();
        displayCart();

    }
);


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

function displayProductDetails() {

    const nameElement =
        document.getElementById(
            "productDetailsName"
        );


    if (!nameElement) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        params.get("id");


    if (!productId) {
        return;
    }


    const product =
        products.find(function (item) {

            return String(item.id) ===
                String(productId);

        });


    if (!product) {
        return;
    }


    const image =
        document.getElementById(
            "productDetailsImage"
        );


    const category =
        document.getElementById(
            "productDetailsCategory"
        );


    const rating =
        document.getElementById(
            "productDetailsRating"
        );


    const price =
        document.getElementById(
            "productDetailsPrice"
        );


    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }


    if (category) {
        category.textContent =
            product.category;
    }


    nameElement.textContent =
        product.name;


    if (rating) {
        rating.textContent =
            getStars(product.rating);
    }


    if (price) {

        price.innerHTML = `
            <strong>
                $${product.price}
            </strong>
            ${
                product.oldPrice
                    ? `
                        <del>
                            $${product.oldPrice}
                        </del>
                    `
                    : ""
            }
        `;

    }


    setupProductDetailsButtons(
        product
    );

}


/* =========================================================
   PRODUCT DETAILS BUTTONS
   ========================================================= */

function setupProductDetailsButtons(product) {

    const quantityElement =
        document.getElementById(
            "detailsQuantity"
        );

    const minusButton =
        document.getElementById(
            "detailsMinus"
        );

    const plusButton =
        document.getElementById(
            "detailsPlus"
        );

    const addButton =
        document.getElementById(
            "detailsAddCart"
        );

    const buyButton =
        document.getElementById(
            "buyNowBtn"
        );


    let quantity = 1;


    function updateQuantity() {

        if (quantityElement) {

            quantityElement.textContent =
                quantity;

        }

    }


    if (minusButton) {

        minusButton.onclick =
            function () {

                if (quantity > 1) {
                    quantity--;
                }

                updateQuantity();

            };

    }


    if (plusButton) {

        plusButton.onclick =
            function () {

                quantity++;

                updateQuantity();

            };

    }


    if (addButton) {

        addButton.onclick =
            function () {

                addToCart(
                    product.id,
                    quantity
                );

                addButton.textContent =
                    "ADDED ✓";

            };

    }


    if (buyButton) {

        buyButton.onclick =
            function () {

                addToCart(
                    product.id,
                    quantity
                );

                window.location.href =
                    "checkout.html";

            };

    }

}


/* =========================================================
   PRODUCT CARD → PRODUCT.HTML
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const image =
            event.target.closest(
                ".product-image"
            );


        if (!image) {
            return;
        }


        const id =
            image.dataset.productId;


        if (!id) {
            return;
        }


        window.location.href =
            "product.html?id=" +
            encodeURIComponent(id);

    }
);


/* =========================================================
   DEAL PRODUCTS
   ========================================================= */

function displayDeals() {

    const container =
        document.querySelector(
            ".deals-section .product-container"
        );


    if (!container) {
        return;
    }


    const dealProducts =
        products.filter(function (product) {

            return (
                product.discount &&
                Number(product.discount) > 0
            );

        });


    displayProductsIntoContainer(
        dealProducts,
        container
    );

}


/* =========================================================
   DISPLAY PRODUCTS INTO SPECIFIC CONTAINER
   ========================================================= */

function displayProductsIntoContainer(
    productList,
    container
) {

    container.innerHTML = "";


    if (!productList.length) {

        container.innerHTML = `

            <div class="no-products">

                <h3>
                    No Deals Available
                </h3>

            </div>

        `;

        return;

    }


    productList.forEach(function (product) {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        card.innerHTML = `

            <div
                class="product-image"
                data-product-id="${product.id}"
                style="cursor:pointer;"
            >

                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-category">
                ${product.category}
            </div>


            <h3>
                ${product.name}
            </h3>


            <div class="rating">
                ${getStars(product.rating)}
            </div>


            <div class="product-bottom">

                <div class="price-container">

                    <div class="price">
                        $${product.price}
                    </div>

                    ${
                        product.oldPrice
                            ? `
                                <div class="old-price">
                                    $${product.oldPrice}
                                </div>
                            `
                            : ""
                    }

                </div>


                <button
                    class="add-cart"
                    data-id="${product.id}"
                >
                    ADD TO CART
                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =========================================================
   CHECKOUT SUMMARY
   ========================================================= */

function updateCheckoutSummary() {

    const checkout =
        document.querySelector(
            ".checkout-container"
        );


    if (!checkout) {
        return;
    }


    updateCartTotals();

}


/* =========================================================
   PLACE ORDER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".place-order-btn"
            );


        if (!button) {
            return;
        }


        if (!cart.length) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        const fields = [

            "fullName",
            "email",
            "phone",
            "address",
            "city",
            "postalCode"

        ];


        let valid = true;


        fields.forEach(function (id) {

            const input =
                document.getElementById(id);


            if (!input) {
                return;
            }


            if (!input.value.trim()) {

                input.classList.add(
                    "input-error"
                );

                valid = false;

            } else {

                input.classList.remove(
                    "input-error"
                );

            }

        });


        if (!valid) {

            alert(
                "Please fill all required fields."
            );

            return;

        }


        const order = {

            id:
                "TS-" +
                Date.now(),

            items:
                [...cart],

            total:
                cart.reduce(
                    function (sum, item) {

                        return sum +
                            (
                                Number(item.price) *
                                Number(item.quantity)
                            );

                    },
                    0
                ),

            date:
                new Date().toLocaleString(),

            status:
                "Order Placed"

        };


        const orders =
            JSON.parse(
                localStorage.getItem(
                    "orders"
                )
            ) || [];


        orders.push(order);


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        cart = [];


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        updateCartCount();


        alert(
            "Order placed successfully! ✅"
        );


        window.location.href =
            "orders.html";

    }
);


/* =========================================================
   DISPLAY ORDERS
   ========================================================= */

function displayOrders() {

    const container =
        document.querySelector(
            ".orders-container"
        );


    if (!container) {
        return;
    }


    const orders =
        JSON.parse(
            localStorage.getItem(
                "orders"
            )
        ) || [];


    container.innerHTML = "";


    if (!orders.length) {

        container.innerHTML = `

            <div class="empty-orders">

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    Your placed orders will appear here.
                </p>

                <a
                    href="shop.html"
                    class="btn btn-primary"
                >
                    Start Shopping →
                </a>

            </div>

        `;

        return;

    }


    orders
        .slice()
        .reverse()
        .forEach(function (order) {

            const card =
                document.createElement("div");

            card.className =
                "order-card";


            const itemsHTML =
                order.items.map(
                    function (item) {

                        return `

                            <div class="order-product">

                                <img
                                    src="${item.image}"
                                    alt="${item.name}"
                                >

                                <div>

                                    <h4>
                                        ${item.name}
                                    </h4>

                                    <p>
                                        Qty:
                                        ${item.quantity}
                                    </p>

                                    <strong>
                                        $${item.price}
                                    </strong>

                                </div>

                            </div>

                        `;

                    }
                ).join("");


            card.innerHTML = `

                <div class="order-header">

                    <div>

                        <span>
                            Order ID
                        </span>

                        <strong>
                            ${order.id}
                        </strong>

                    </div>

                    <div>

                        <span>
                            Date
                        </span>

                        <strong>
                            ${order.date}
                        </strong>

                    </div>

                </div>


                <div class="order-status">
                    ${order.status || "Order Placed"} ✅
                </div>


                <div class="order-products">

                    ${itemsHTML}

                </div>


                <div class="order-footer">

                    <strong>
                        Total:
                        $${Number(order.total).toFixed(2)}
                    </strong>

                    <button
                        class="cancel-order-btn"
                        data-order-id="${order.id}"
                    >
                        Cancel Order
                    </button>

                </div>

            `;


            container.appendChild(card);

        });

}


/* =========================================================
   CANCEL ORDER
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                ".cancel-order-btn"
            );


        if (!button) {
            return;
        }


        const orderId =
            button.dataset.orderId;


        const confirmCancel =
            confirm(
                "Are you sure you want to cancel this order?"
            );


        if (!confirmCancel) {
            return;
        }


        let orders =
            JSON.parse(
                localStorage.getItem(
                    "orders"
                )
            ) || [];


        orders =
            orders.filter(
                function (order) {

                    return order.id !==
                        orderId;

                }
            );


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        displayOrders();

    }
);


/* =========================================================
   INITIALIZE TECHSTORE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTechStoreData();

        updateCartCount();

        displayCart();

        updateCheckoutSummary();

        displayOrders();

    }
);






/* =========================================
   MOBILE NAVBAR MENU
========================================= */

const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelector(".nav-links");

if (navMenu && navLinks) {

    navMenu.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

        navMenu.classList.toggle("menu-active");

    });

}