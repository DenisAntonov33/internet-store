<template>
  <div class="wrapper">
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
        <!-- <span class="special-placeholder">
          <span v-if="selectedProduct.tags.is_sale" class="special sale">Sale!</span>
          <span
            v-if="!isProductAvaliable(selectedProduct)"
            class="special disabled"
          >Не доступен</span>
          <span v-if="selectedProduct.tags.is_new" class="special new">New!</span>
        </span> -->
      </figure>
      <div class="item__about">
        <h3 class="media-left">{{selectedProduct.name}}</h3>
        <span>Количество: {{selectedProduct.quantity}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(["cart"])
  },
  methods: {
    isProductAvaliable: function(product) {
      if (product.stock > 0 && product.price > 0) return true;
    },
    removeSelectedProduct: function(index) {
      // this.$store.state.cart.splice(index, 1);
      this.$store.dispatch("REMOVE_SELECTED_PRODUCT", index);
    },
    clearCart: function() {
      this.$store.dispatch("CLEAR_CART");
    }
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  border: 2px solid aqua;
  display: flex;
  height: 100%;
  max-width: 100%;
  padding: 5px;
}

.basket-name {
  display: inline-block;
  margin-bottom: 10px;
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