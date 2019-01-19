<template>
  <div>
    <div class="wraper">
      <figure class="image item__image is-128x128">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt>
        <!-- <span class="special-placeholder">
          <span v-if="product.tags.is_sale" class="special sale">Sale!</span>
          <span v-if="!isProductAvaliable(product)" class="special disabled">Не доступен</span>
          <span v-if="product.tags.is_new" class="special new">New!</span>
        </span>-->
      </figure>
      <div class="item__text-wraper">
        <h3 class="media-left">{{product.name}}</h3>
        <div class="item__description">{{product.description}} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus, culpa veniam doloribus possimus. Magnam beatae vero minima, blanditiis voluptates excepturi eligendi at iure maxime quas. Voluptate iusto beatae excepturi aliquid?</div>
      </div>
      <div>{{product.price}}</div>
      <button
        v-on:click="addToCart(product)"
        v-if="isProductAvaliable(product)"
        class="button media-conent"
      >Добавить</button>
      <button v-on:click="addToCart(product)" v-else disabled class="button media-conent">Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    isProductAvaliable: function(product) {
      if (product.stock > 0 && product.price > 0) return true;
    },
    addToCart(product) {
      this.$store.dispatch("ADD_PRODUCTS_TO_CART", product);
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  background-color: #000;
  color: #fff;
  display: flex;
  margin-top: 5px;
  width: 100px;
}

.button[disabled] {
  color: black;
}

.item h3 {
  align-self: flex-start;
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
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

.item__description {
  height: 55px;
  overflow: hidden;
}

.wraper {
  align-items: center;
  border: 2px solid aqua;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  height: 100%;
  justify-content: space-around;
  max-width: 100%;
  padding: 5px;
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