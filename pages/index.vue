<template>
  <div class="page-wrapper">
    <section class="container">
      <h2>Виды воздуха</h2>
      <div class="columns">
        <div
          class="column items is-three-quarters-fullhd is-three-quarters-widescreen is-three-quarters-desktop is-three-quarters-tablet is-mobile"
        >
          <div id="app" class="columns is-multiline is-mobile">
            <div
              v-for="(product, index) in apiProducts"
              :key="'product-id-' + product.id"
              class="column item is-one-quarter-fullhd is-one-quarter-widescreen is-one-quarter-desktop is-one-third-tablet is-half-mobile"
            >
              <div class="wraper">
                <figure class="image item__image is-128x128">
                  <img src="https://bulma.io/images/placeholders/128x128.png" alt>
                  <span class="special-placeholder">
                    <span v-if="product.tags.is_sale" class="special sale">Sale!</span>
                    <span v-if="!isProductAvaliable(product)" class="special disabled">Не доступен</span>
                    <span v-if="product.tags.is_new" class="special new">New!</span>
                  </span>
                </figure>
                <div class="item__text-wraper">
                  <h3 class="media-left">{{product.name}}</h3>
                  <span>{{product.description}}</span>
                </div>
                <div>{{product.price}}</div>
                <button v-on:click="addToCart(product, index)" v-if="isProductAvaliable(product)" class="button media-conent">Добавить</button>
                <button v-on:click="addToCart(product, index)" v-else disabled class="button media-conent">Добавить</button>
              </div>
            </div>
          </div>
        </div>
        <div
          id="basket"
          class="column basket is-one-quarter-fullhd is-one-quarter-widescreen is-one-quarter-desktop is-one-quarter-tablet is-mobile"
        >
          <div class="wraper">
            <h2 class="basket-name">Корзина</h2>
            <a v-on:click="clearCart()" class="basket-clearing button is-danger">Очистить корзину</a>

            <div
              class="item-in-basket"
              v-for="(selectedProduct, index) in cart"
              :key="'cart-product-id-'+selectedProduct.id"
            >
              <span class="icon close-btn">
                <i v-on:click="removeSelectedProduct(index)" class="fa fa-close"></i>
              </span>
              <figure class="image item__image is-96x96">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt>
                <span class="special-placeholder">
                  <span v-if="selectedProduct.tags.is_sale" class="special sale">Sale!</span>
                  <span
                    v-if="!isProductAvaliable(selectedProduct)"
                    class="special disabled"
                  >Не доступен</span>
                  <span v-if="selectedProduct.tags.is_new" class="special new">New!</span>
                </span>
              </figure>
              <div class="item__about">
                <h3 class="media-left">{{selectedProduct.name}}</h3>
                <span>Количество: {{selectedProduct.quantity}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  components: {},
  data() {
    return {
      products: [
        // {
        //   id: 1,
        //   name: "name1",
        //   description: "test",
        //   price: 123.2,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 0
        // },
        // {
        //   id: 2,
        //   name: "name2",
        //   description: "test",
        //   price: 0,
        //   tags: {
        //     is_sale: false,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 3,
        //   name: "name3",
        //   description: "test",
        //   price: 173.5,
        //   tags: {
        //     is_sale: true,
        //     is_new: true
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 4,
        //   name: "name4",
        //   description: "test",
        //   price: 999.9,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 5,
        //   name: "name5",
        //   description: "test",
        //   price: 1000,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 6,
        //   name: "name6",
        //   description: "test",
        //   price: 50.8,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 7,
        //   name: "name7",
        //   description: "test",
        //   price: 148.8,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 8,
        //   name: "name8",
        //   description: "test",
        //   price: 212.9,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 9,
        //   name: "name9",
        //   description: "test",
        //   price: 77.7,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 10,
        //   name: "name10",
        //   description: "test",
        //   price: 42.5,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 11,
        //   name: "name11",
        //   description: "test",
        //   price: 635.5,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 12,
        //   name: "name12",
        //   description: "test",
        //   price: 112.3,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // },
        // {
        //   id: 13,
        //   name: "name13",
        //   description: "test",
        //   price: 42.7,
        //   tags: {
        //     is_sale: true,
        //     is_new: false
        //   },
        //   is_active: true,
        //   stock: 10
        // }
      ],
      apiProducts: [],
      cart: [
        {
          id: 1,
          name: "name1",
          description: "test",
          price: 123.2,
          tags: {
            is_sale: true,
            is_new: false
          },
          is_active: true,
          stock: 0,
          quantity: 0
        },
        {
          id: 2,
          name: "name2",
          description: "test",
          price: 0,
          tags: {
            is_sale: false,
            is_new: false
          },
          is_active: true,
          stock: 10,
          quantity: 0
        }
      ]
    };
  },
  created() {
    axios
      .get('http://backend.air-sales-api.mt125.mt-pc.ru/product/index')
      .then(response => {this.apiProducts = response; console.log(response);});
  },
  methods: {
    isProductAvaliable: function(product) {
      if (product.stock > 0 && product.price > 0) return true;
    },
    addToCart: function(product) {
      let isAdded = false;
      this.cart.forEach((element, index) => {
        if (product.id === element.id) {
          element.quantity++;
          isAdded = true;
        }
      });
      if (!isAdded) {
        this.cart.push(Object.assign({}, product, {quantity: 1}));
      }
    },
    removeSelectedProduct: function(index) {
      console.log("index :", index);
      this.cart.splice(index, 1);
    },
    clearCart: function() {
      this.cart = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 0 15px;
}
.title {
  color: $primary;
}

h2 {
  margin-bottom: 15px;
}

.button {
  background-color: #000;
  color: #fff;
  display: block;
}

.button[disabled] {
  color: black;
}

.item h3 {
  align-self: flex-start;
  font-size: 26px;
}

.item__image {
  display: inline-block;
  position: relative;
  max-width: 100%;
}

.special-placeholder {
  position: absolute;
  top: 5px;
}

.special:first-child {
  border-radius: 0 3px 3px 0;
}

.special {
  border-radius: 3px;
  color: #000;
  margin-right: 5px;
  padding: 3px;
}

.sale {
  background-color: yellow;
}

.new {
  background-color: aqua;
}

.disabled {
  background-color: grey;
  display: inline-flex;
  font-size: 12px;
}

.item__text-wraper {
  font-size: 12px;
  padding: 0 20px 0 20px;
}

.wraper {
  align-items: center;
  border: 2px solid aqua;
  max-width: 100%;
  padding: 5px;
}

.items .wraper {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.button {
  margin-top: 5px;
  width: 100px;
}

.basket-name {
  display: inline-block;
}

.basket-clearing {
  display: inline-block;
  float: right;
  font-size: 12px;
  width: 120px;
}

.item-in-basket {
  border-bottom: 1px solid gray;
  display: flex;
  margin-bottom: 5px;
  padding-bottom: 5px;
  position: relative;
}

.item-in-basket:last-child {
  border: none;
}

.close-btn {
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 5px;
}

.item__about {
  margin-left: 10px;
}

@media screen and (max-width: 425px) {
  .column.is-half-mobile {
    flex: none;
    width: 100%;
  }

  .item .wraper {
    width: 100%;
  }
}
</style>
