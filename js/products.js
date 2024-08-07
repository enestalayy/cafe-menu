// // Card
// var swiper = new Swiper('.product-slider', {
//   spaceBetween: 30,
//   effect: 'fade',
//   loop: true,
//   mousewheel: {
//     invert: false,
//   },
//   // autoHeight: true,
//   pagination: {
//     el: '.product-slider__pagination',
//     clickable: true,
//   }
// });
// // Product Video
// const video = document.querySelectorAll("#bgvid");
// const playbtn = document.querySelectorAll(".product-video-container");
// for(let i=0; i<playbtn.length; i++){
//   playbtn[i].addEventListener("click",function(e){
//       video[i].play();
//       e.preventDefault();
//   });
// };
document.addEventListener("DOMContentLoaded", function () {
  // URL parametrelerini almak için
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  const subcategory = urlParams.get("subcategory");

  // JSON dosyasından ürünleri almak
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      // Dinamik olarak veri alma
      const products = data[category][subcategory];
      if (!products) {
        console.error("No products found for the given category.");
        return;
      }

      const wrapper = document.getElementById("products-wrapper");
      products.forEach((product) => {
        // Her ürün için bir slider div'i oluştur
        const productSlider = document.createElement("div");
        productSlider.className = "product-slider";

        // Slider içerisindeki wrapper div'i oluştur
        const wrapperDiv = document.createElement("div");
        wrapperDiv.className = "product-slider__wrp swiper-wrapper";

        // Resimleri ekle

        // Eğer video varsa, videoyu ekle
        if (product.video && product.video.length) {
          const productItem = document.createElement("div");
          productItem.className = "product-slider__item swiper-slide";
          const productVideo = document.createElement("div");
          productVideo.className = "product-slider__item swiper-slide";

          productVideo.innerHTML = `
            <div class="product-slider__img"></div>
            <div class="product-video-container">
              <video playsinline muted loop no-controls class="bgvid">
                <source src="media/products/${category}/${subcategory}/${product.video}" type="video/mp4" />
              </video>
            </div>
            <div class="product-slider__content">
              <div class="product-slider__title">${product.title}</div>
              <div class="product-slider__text">${product.description}</div>
              <button class="product-slider__button">${product.price} €</button> <!-- Static price example -->
            </div>
            `;

          wrapperDiv.appendChild(productVideo);
        }
        product.images.forEach((image) => {
          const productItem = document.createElement("div");
          productItem.className = "product-slider__item swiper-slide";
          productItem.innerHTML = `
            <div class="product-slider__img">
              <img src="media/products/${category}/${subcategory}/${image}" alt="${product.title}" />
            </div>
            
            <div class="product-slider__content">
              <div class="product-slider__title">${product.title}</div>
              <div class="product-slider__text">${product.description}</div>
              <button class="product-slider__button">${product.price} €</button>
            </div>`;

          wrapperDiv.appendChild(productItem);
        });

        // Pagination ekleme
        productSlider.innerHTML += `<div class="product-slider__pagination"></div>`;

        productSlider.appendChild(wrapperDiv);
        wrapper.appendChild(productSlider);

        // Swiper'ı başlat
        new Swiper(productSlider, {
          spaceBetween: 30,
          effect: "fade",
          loop: true,
          mousewheel: {
            invert: false,
          },
          pagination: {
            el: ".product-slider__pagination",
            clickable: true,
          },
        });

        // Video oynatma fonksiyonu
        const videos = document.querySelectorAll(".bgvid");
        const playButtons = document.querySelectorAll(
          ".product-video-container"
        );
        product.images.length
          ? (videos[0].autoplay = true)
          : (videos[1].autoplay = true);

        playButtons.forEach((btn, index) => {
          btn.addEventListener("click", function (e) {
            videos[index].play();
            e.preventDefault();
          });
        });
      });
    })
    .catch((error) => console.error("Error loading products:", error));
});
