/*---------------------------- Global Variables ----------------------------*/
let productsInCart = [];

$(function () {
  /*------------------------------ Data load -------------------------------*/

  $.ajax({
    url: "json/products.json",
    dataType: "JSON",
  }).done((data) => {
    productLoad = data;
  });

  productsInCart = JSON.parse(localStorage.getItem("cart")) || [];

  /*------------------------------------------------------------------------*/

  /*-------------------------------------------------------------------------*/
});

setTimeout(() => {
  //////////////////////////////// HOME PAGE ///////////////////////////////

  /*---------------------------- Variables S-B ---------------------------*/

  /*----------------------------------------------------------------------*/

  /*------------------------------ Functions -----------------------------*/

  /* Promo button event */

  $("#promo").click(function (e) {
    /*--------------------------- Variables S-B --------------------------*/

    /*--------------------------------------------------------------------*/

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
    /*--------------------------- Variables S-B --------------------------*/

    /*--------------------------------------------------------------------*/

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

    /*--------------------------------------------------------------------*/
  });

  ///////////////////////////// BAR-MENU PAGE //////////////////////////////

  /*----------------------------- Functions ------------------------------*/

  /* Evento de seleccion de item */

  $(".services__item").click(function (e) {
    /*--------------------------- Variables S-B --------------------------*/
    const buttonID = $(this).attr("id");
    const selectedArray = productLoad.filter((item) => item.type === buttonID);

    /*--------------------------------------------------------------------*/

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

    pageTitle(buttonID);

    $(window).resize(function () {
      width = $(this).width();
      height = $(this).height();
    });

    function screen() {
      let width = $(window).width();
      let height = $(window).height();
      console.log(width);

      return {
        width,
        height,
      };
    }

    let screener = screen();
    let width = screener.width,
      height = screener.height;

    function boxing() {
      let itemsPerRow;
      let rows;

      if (width < 400) {
        itemsPerRow = 1;
      } else if (width >= 400 && width < 560) {
        itemsPerRow = 2;
      } else if (width >= 560 && width < 710) {
        itemsPerRow = 3;
      } else if (width >= 710 && width < 860) {
        itemsPerRow = 4;
      } else if (width >= 860 && width < 1280) {
        itemsPerRow = 5;
      }

      if (height < 480) {
        rows = 1;
      } else if (height >= 480 && height < 960) {
        rows = 2;
      } else if (height >= 960 && height < 1280) {
        rows = 3;
      } else if (height >= 1280) {
        rows = 4;
      }
      return {
        itemsPerRow,
        rows,
      };
    }

    let boxer = boxing();
    let rows = boxer.rows,
      itemsPerRow = boxer.itemsPerRow;

    displayElements(selectedArray);

    function displayElements(array) {
      let currentPage = 1;
      let itemsPerPage = itemsPerRow * rows;
      console.log(itemsPerPage);
      let totalItems = array.length;
      console.log(totalItems);
      let pages = Math.ceil(totalItems / itemsPerPage);
      console.log(pages);

      paginator(array, pages, itemsPerPage);
      displayer(array, itemsPerPage);
    }

    $(".card-v").click(addProduct);
    /*  $(".card-v").click(deleteProduct);
    $(".card-v").click(emptyCart); */
  });

  function paginator(array, pages, itemsPerPage) {
    $(".pagination").empty();

    for (let i = 1; i <= pages; i++) {
      $(".pagination").append(`<a href="#" class="pagination__btn">${i}</a>`);
    }

    let currentPage = $(".pagination__btn:contains('1')").addClass("active");
    let currentPageValue = currentPage.text();
    let button = $(".pagination__btn");

    button.click(function (e) {
      e.preventDefault();

      let selectedButton = $(e.target);

      let selectedButtonValue = selectedButton.text();
      console.log(selectedButtonValue);

      let selectedQ = selectedButton.hasClass("active");

      if (selectedQ == false) {
        let activeButton = $(".pagination").find(".active");
        console.log($(activeButton).text());
        activeButton.removeClass("active");
        $(selectedButton).addClass("active");

        var activatedButton = $(".pagination").find(".active");
        activatedButtonValue = activatedButton.text();
        console.log($(activatedButton).text());
      }

      displayer(array, itemsPerPage);

      $(".card-v").click(addProduct);
    });
  }

  function displayer(array, itemsPerPage) {
    $(".productsContainer").empty();

    let page = $(".pagination").find(".active").text();
    console.log(page);
    page--;
    let start = itemsPerPage * page;
    let end = start + itemsPerPage;
    let paginatedItems = array.slice(start, end);

    paginatedItems.forEach((item) => {
      $(".productsContainer").append(
        `
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
  `
      );
    });
  }

  /* Titulador de pagina */

  function pageTitle(buttonID) {
    if (buttonID == "beer") {
      $("#products > .texts > .texts__title").text("Cervezas");
    } else if (buttonID == "food") {
      $("#products > .texts > .texts__title").text("Comidas");
    } else if (buttonID == "drinks") {
      $("#products > .texts > .texts__title").text("Tragos");
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

  /*-------------------------------------------------------------------------*/

  /////////////////////////////// PRODUCTS PAGE ///////////////////////////////

  /*------------------------------- Functions -------------------------------*/

  $("#promotions > .buttons.cancel").click(function (e) {
    e.preventDefault();

    $("#promotions").hide(500);
  });
  /*-------------------------------------------------------------------------*/

  /////////////////////////////// PRODUCTS PAGE ///////////////////////////////

  /*------------------------------- Functions -------------------------------*/

  setInCart();

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

  function deleteProduct(e) {
    e.preventDefault();
  }

  function getProductData(product) {
    const addedProduct = {
      id: product.find(".id").text(),
      name: product.find(".title").text(),
      description: product.find(".description").text(),
      image: product.find("img").attr("src"),
      price: product.find(".price").text(),
    };

    console.log(addedProduct);

    const exists = productsInCart.some(
      (product) => product.id === addedProduct.id
    );

    console.log(exists);

    if (exists === false) {
      productsInCart = [...productsInCart, addedProduct];
    }

    console.log(productsInCart);

    setInCart();
  }

  function setInCart() {
    deleteItem();

    productsInCart.forEach((item) => {
      $(".cartContainer").append(`
        <div class="card-h">
              <img src="${item.image}" class="card-h__img">
              <div class="card-h__texts">
                  <div class="title">${item.name}</div>
                  <div class="description">${item.description}</div>
                  <div class="id">ID: ${item.id}</div>
                  <div class="price"> ${item.price}</div>
              </div>
        
        </div>  
        `);
    });

    /* productsInCart.forEach((item) => {
      $(".");
    }); */

    saveInStorage();
  }

  function saveInStorage() {
    localStorage.setItem("cart", JSON.stringify(productsInCart));
  }

  function deleteItem() {}

  /* Search filter */

  /* Cancel button event */

  $("#products > .buttons.cancel").click(function (e) {
    e.preventDefault();

    $("#products").hide(500);
  });

  ///////////////////////////////// CART PAGE /////////////////////////////////

  /*------------------------------- Functions -------------------------------*/

  /* Cancel button event */

  $("#cart > .buttons.cancel").click(function (e) {
    e.preventDefault();

    $("#cart").hide(500);
  });

  /*-------------------------------------------------------------------------*/
}, 10);
