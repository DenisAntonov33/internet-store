import Product from "~/components/Product";
import Cart from "~/components/Cart";
import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    state: {
      products: [],
      cart: []
    },
    mutations: {
      UPDATE_PRODUCTS(state, response) {
        state.products = response;
      },
      ADD_PRODUCTS_TO_CART(state, product) {
        let isAdded = false;
        state.cart.forEach((element, index) => {
          if (product.id === element.id) {
            element.quantity++;
            isAdded = true;
          }
        });
        if (!isAdded) {
          state.cart.push(Object.assign({}, product, { quantity: 1 }));
        }
      },
      CLEAR_CART(state, response) {
        state.cart = [];
      },
      REMOVE_SELECTED_PRODUCT(state, index) {
        state.cart.splice(index, 1);
      },
    },
    actions: {
      GET_PRODUCTS(context) {
        axios
          .get("http://api.air-sales-api.mt125.mt-pc.ru/v1/product/all")
          .then(response => context.commit("UPDATE_PRODUCTS", response.data))
          .catch(error => {
            console.log("error :", error);
          });
      },
      ADD_PRODUCTS_TO_CART(context, product) {
        context.commit("ADD_PRODUCTS_TO_CART", product);
      },
      CLEAR_CART(context) {
        context.commit("CLEAR_CART");
      },
      REMOVE_SELECTED_PRODUCT(context, index) {
        context.commit("REMOVE_SELECTED_PRODUCT", index);
        console.log(index)
      }
    }
  });
};

export default store;
