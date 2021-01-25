$(function () {
  /*------------------------------- Data load -------------------------------*/

  $.ajax({
    url: "json/products.json",
    dataType: "JSON",
  }).done((data) => {
    productLoad = data;
  });

  /*-------------------------------------------------------------------------*/

  setTimeout(() => {
    ///////////////////////////////// HOME PAGE /////////////////////////////////

    /*------------------------------- Variables -------------------------------*/

    /*------------------------------- Functions -------------------------------*/

    /* Promo button event */

    $("#promo").click(function (e) {
      e.preventDefault();

      $("#promotions").show({
        start: function () {
          $(this).css("display", "grid");
          $(this).css("height", "100vh");
          $(this).css("position", "fixed");
          $(this).css("top", "0");
          $(this).css("left", "0");
        },
      });
    });

    /* Order button event */

    $("#order").click(function (e) {
      e.preventDefault();

      $("#bar-menu").show({
        start: function () {
          $(this).css("display", "grid");
          $(this).css("height", "100vh");
          $(this).css("position", "fixed");
          $(this).css("top", "0");
          $(this).css("left", "0");
        },
      });

      /*-------------------------------------------------------------------------*/
    });

    /////////////////////////////// BAR-MENU PAGE ///////////////////////////////

    /*------------------------------- Variables -------------------------------*/
    let currentPage = 1;
    let rows = 2;

    /*------------------------------- Functions -------------------------------*/
    /* Evento de seleccion de item */

    $(".services__item").click(function (e) {
      e.preventDefault();

      $("#products").show({
        start: function () {
          $(this).css("display", "grid");
          $(this).css("height", "100vh");
          $(this).css("position", "fixed");
          $(this).css("top", "0");
          $(this).css("left", "0");
        },
      });

      /* Variables */

      const buttonID = $(this).attr("id");
      const selectedArray = productLoad.filter(
        (item) => item.type === buttonID
      );
      let screen = $(window).width();

      /* Funciones */

      pageTitle(buttonID);
      mediaDisplay(screen, selectedArray);

      /* Adaptador responsivo */

      /*   $(window).on("resize", function () {
        mediaDisplay(screen, selectedArray);
      }); */

      $(".card-v").click(addProduct);
    });

    /* Paginador de seccion */

    function gridPaginator(productArray, rows, itemsPerRow) {
      $(".pagination").empty();

      const items = productArray.length;
      let gridRows = rows;
      let gridItemsPerRow = itemsPerRow;
      let itemsPerPage = gridRows * gridItemsPerRow;
      let paginatorPages = Math.ceil(items / itemsPerPage);

      for (let i = 1; i <= paginatorPages; i++) {
        $(".pagination").append(`<a href="#" class="pagination__btn">${i}</a>`);
      }
    }

    function displayProducts(productArray, rows, itemsPerRow, page) {
      $(".productsContainer").empty();
      page--;

      let itemsPerPage = rows * itemsPerRow;
      let start = itemsPerPage * page;

      let end = start + itemsPerPage;
      let paginatedItems = productArray.slice(start, end);

      paginatedItems.forEach((item) => {
        $(".productsContainer").append(`
          <div class="card-v">
                <img src="${item.image}" class="card-v__img">
                <div class="product-status">
                <div class="promotion"></div>
                <div class="delete"></div>
                </div>
                <div class="card-v__texts">
                    <div class="title">${item.name}</div>
                    <div class="description">${item.description}</div>
                    <div class="id">ID: ${item.id}</div>
                    <div class="price">$ ${item.price}</div>
                </div>
          
          </div>  
          `);
      });
    }

    /* Botones del paginador */

    function paginatorButton(page, items) {
      let button = $(".pagination__btn");
      button.text() = page;

      if (currentPage == page) button.addClass("active");

      $(".pagination__btn").click(function () {
        currentPage = page;

        displayProducts(productArray, currentPage);

        let currentBtn = $(".pagination__btn.active");
        currentBtn.removeClass("active");

        button.addClass("active");
      });

      return button;
    }

    /* Titulador de pagina */

    function pageTitle(buttonIdentifier) {
      let buttonID = buttonIdentifier;

      if (buttonID == "beer") {
        $("#products > .texts > .texts__title").text("Cervezas");
      } else if (buttonID == "food") {
        $("#products > .texts > .texts__title").text("Comidas");
      } else if (buttonID == "drinks") {
        $("#products > .texts > .texts__title").text("Tragos");
      }
    }

    /* Responsive grid display */

    function mediaDisplay(width, array) {
      let actualscreen = width;
      let selectedArray = array;

      console.log(actualscreen);

      $(window).on("resize", function () {
        resizedscreen = $(this).width();

        console.log(resizedscreen);
      });

      displayElements(actualscreen);

      function displayElements(width) {
        let screen = width;

        if (screen < 400) {
          gridPaginator(selectedArray, 2, 1);
          displayProducts(selectedArray, 2, 1, currentPage);

          $(".pagination__btn").click(function (e) {
            e.preventDefault();
            let target = $(e.target);

            currentPage = target.text();

            displayProducts(selectedArray, 2, 1, currentPage);
          });
        } else if (screen >= 400 && screen < 560) {
          gridPaginator(selectedArray, 2, 2);
          displayProducts(selectedArray, 2, 2, currentPage);

          $(".pagination__btn").click(function (e) {
            e.preventDefault();
            let target = $(e.target);

            currentPage = target.text();

            displayProducts(selectedArray, 2, 2, currentPage);
          });
        } else if (screen >= 560 && screen < 710) {
          gridPaginator(selectedArray, 2, 3);
          displayProducts(selectedArray, 2, 3, currentPage);

          $(".pagination__btn").click(function (e) {
            e.preventDefault();
            let target = $(e.target);

            currentPage = target.text();

            displayProducts(selectedArray, 2, 3, currentPage);
          });
        } else if (screen >= 710 && screen < 860) {
          gridPaginator(selectedArray, 2, 4);
          displayProducts(selectedArray, 2, 4, currentPage);

          $(".pagination__btn").click(function (e) {
            e.preventDefault();
            let target = $(e.target);

            currentPage = target.text();

            displayProducts(selectedArray, 2, 4, currentPage);
          });
        } else if (screen >= 860 && screen < 1280) {
          gridPaginator(selectedArray, 2, 5);
          displayProducts(selectedArray, 2, 5, currentPage);

          $(".pagination__btn").click(function (e) {
            e.preventDefault();
            let target = $(e.target);

            currentPage = target.text();

            displayProducts(selectedArray, 2, 5, currentPage);
          });
        }
      }
    }

    /* Cancel button event */

    $("#bar-menu > .buttons.cancel").click(function (e) {
      e.preventDefault();

      $("#bar-menu").hide(500);
      $("#home").show(600);
      $("#footer").show(600);
    });

    /* Cart button event */

    $("#bar-menu > .buttons.cart").click(function (e) {
      e.preventDefault();

      $("#cart").show({
        start: function () {
          $(this).css("display", "grid");
          $(this).css("height", "100vh");
          $(this).css("position", "fixed");
          $(this).css("top", "0");
          $(this).css("left", "0");
        },
      });
    });

    /* Adaptador responsivo */

    /*  let screenWidth = $(window).width();

    $(window).on("resize", function () {
      if ($(this).width() !== screenWidth) {
        screenWidth = $(this).width();
        console.log(screenWidth);
      }
      
    }); */

    /*-------------------------------------------------------------------------*/

    /////////////////////////////// PRODUCTS PAGE ///////////////////////////////

    /*------------------------------- Variables -------------------------------*/

    /*------------------------------- Functions -------------------------------*/
    $("#promotions > .buttons.cancel").click(function (e) {
      e.preventDefault();

      $("#promotions").hide(500);
    });
    /*-------------------------------------------------------------------------*/

    /////////////////////////////// PRODUCTS PAGE ///////////////////////////////

    /*------------------------------- Variables -------------------------------*/

    let productsInCart = [];

    productsInCart = JSON.parse(localStorage.getItem("shopCart")) || [];

    /*------------------------------- Functions -------------------------------*/

    /* insertCart(); */

    function emptyCart() {
      deleteItem();
      productsInCart = [];
      saveInStorage();
    }

    function addProduct(e) {
      e.preventDefault();

      if ($(this).hasClass("card-v")) {
        const selectedProduct = $(this);

        getProductData(selectedProduct);
      }
    }

    function getProductData(product) {
      const addedProduct = {
        id: product.find(".id").text(),
        name: product.find(".title").text(),
        description: product.find(".description").text(),
        image: product.find("img").attr("src"),
        price: product.find(".price").text(),
      };

      const exists = productsInCart.some(
        (product) => product.id === addedProduct.id
      );

      if (exists) {
        return productsInCart;
      } else {
        productsInCart = [...productsInCart, addedProduct];
      }

      console.log(addedProduct);
      console.log(productsInCart);

      setInCart();
    }

    function setInCart() {
      productsInCart.forEach((product) => {
        $(".cartContainer").append(`
          <div class="card-v">
                <img src="${item.image}" class="card-v__img">
                <div class="product-status">
                <div class="promotion"></div>
                <div class="delete"></div>
                </div>
                <div class="card-v__texts">
                    <div class="title">${item.name}</div>
                    <div class="description">${item.description}</div>
                    <div class="id">ID: ${item.id}</div>
                    <div class="price">$ ${item.price}</div>
                </div>
          
          </div>  
          `);
      });
    }

    function deleteProduct(e) {
      e.preventDefault();
    }

    /* Add-to cart event */

    /* function addToCartFunction() {
      const inCartItem = {
        name: $(".title").text(),
        description: $(".description").text(),
        image: $("img").attr("src"),
        price: $(".price").text(),
      };

      console.log(inCartItem);
    } */

    /* Search filter */

    /* Cancel button event */

    $("#products > .buttons.cancel").click(function (e) {
      e.preventDefault();

      $("#products").hide(500);
    });

    ///////////////////////////////// CART PAGE /////////////////////////////////

    /*------------------------------- Variables -------------------------------*/

    /*------------------------------- Functions -------------------------------*/

    /* Cancel button event */

    $("#cart > .buttons.cancel").click(function (e) {
      e.preventDefault();

      $("#cart").hide(500);
    });

    /*-------------------------------------------------------------------------*/
  }, 10);

  /*-------------------------------------------------------------------------*/
});
