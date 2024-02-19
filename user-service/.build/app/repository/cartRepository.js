"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const dbOperation_1 = require("./dbOperation");
class CartRepository extends dbOperation_1.DBOperation {
    constructor() {
        super();
    }
    findShoppingCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "SELECT cart_id, user_id FROM shopping_carts WHERE user_id=$1";
            const values = [userId];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    createShoppingCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "INSERT INTO shopping_carts(user_id) VALUES($1) RETURNING *";
            const values = [userId];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    findCartItemById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    findCartItemByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "SELECT product_id, price, item_qty FROM cart_items WHERE product_id = $1";
            const values = [productId];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    findCartItems(userId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    findCartItemsByCartId(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "SELECT name, image_url, price, item_qty FROM cart_items WHERE cart_id = $1";
            const values = [cartId];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    createCartItem({ cart_id, product_id, name, image_url, price, item_qty }) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = 'INSERT INTO cart_items(cart_id, product_id, name, image_url, price, item_qty) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [cart_id, product_id, name, image_url, price, item_qty];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    updateCartItemById(itemId, qty) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateCartItemByProductId(productId, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "UPDATE cart_items SET item_qty=$1 WHERE product_id=$2 RETURNING *";
            const values = [qty, productId];
            const result = yield this.executeOuery(queryString, values);
            return result.rowCount > 0 ? result.rows[0] : false;
        });
    }
    deleteCartItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.CartRepository = CartRepository;
//# sourceMappingURL=cartRepository.js.map