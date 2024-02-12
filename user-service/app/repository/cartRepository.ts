import { DBClient } from "./../utility/databaseClient";
import { UserModel } from "./../models/UserModel";
import { DBOperation } from "./dbOperation";
import { ProfileInput } from "./../models/dto/AddressInput";
import { AddressModel } from "./../models/AddressModel";
import { ShoppingCartModel } from "./../models/ShoppingCartModel";

export class CartRepository extends DBOperation{
    constructor() {
      super();
    }

    async findShoppingCart(userId: number) {
      const queryString = "SELECT cart_id, user_id FROM shopping_carts WHERE user_id=$1";
      const values = [userId];
      const result = await this.executeOuery(queryString, values);
      return result.rowCount > 0 ? (result.rows[0] as ShoppingCartModel)
    }

    async createShoppingCart(userId: number){

    }

    async findCartItemById(cartId: number){

    }

    async findCartItemByProductId(productId: string){

    }

    async findCartItems(userId: number) {

    }

    async createCartItem() {

    }

    async updateCartItemById(itemId: number, qty: number) {

    }

    async updateCartItemByProductId(productId: string, qty: number) {

    }

    async deleteCartItem(id: number) {

    }
}