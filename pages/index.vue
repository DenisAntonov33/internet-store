<template>
  <div class="page-wrapper">
    <section class="container">
      <h2>Виды воздуха</h2>
      <div class="columns">
        <div
          class="column items is-three-quarters-fullhd is-three-quarters-widescreen is-three-quarters-desktop is-three-quarters-tablet is-mobile"
        >
          <div id="app" class="columns is-multiline is-mobile">
            <Product
              v-for="(product) in products"
              :key="'product-id-' + product.id"
              class="column item is-one-quarter-fullhd is-one-quarter-widescreen is-one-quarter-desktop is-one-third-tablet is-half-mobile"
              :product=product
            >
            </Product>
          </div>
        </div>

        <Cart
          id="basket"
          class="column basket is-one-quarter-fullhd is-one-quarter-widescreen is-one-quarter-desktop is-one-quarter-tablet is-mobile"
        ></Cart>
      </div>
    </section>
  </div>
</template>

<script>
import Product from "~/components/Product";
import Cart from "~/components/Cart";
import { mapState } from "vuex";

export default {
  components: {
    Product,
    Cart
  },
  data() {
    return {
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
  computed: {
    ...mapState(["products"])
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS');
  },
  methods: {
    isProductAvaliable: function(product) {
      if (product.stock > 0 && product.price > 0) return true;
    },
    removeSelectedProduct: function(index) {
      console.log("index :", index);
      this.cart.splice(index, 1);
    },
    clearCart: function() {
      this.cart = [];
    },
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

.item {
  height: 360px;
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
