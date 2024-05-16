import { useEffect, useState } from "react";
import BotCart from "./components/botCart";
import HeaderCart from "./components/headerCart";
import ProductCart from "./components/productCart";
import { getCart, removeFromCart } from "../../api/cartApi";
type Item = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  price: number;
  images: string;
  productId: number;
};

function CartPage() {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCart();
        setCartItems(data);
        setSelectedItems(new Array(data.length).fill(false));
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSelectItem = (index: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[index] = !newSelectedItems[index];
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectedItems.every((item) => item)) {
      setSelectedItems(new Array(cartItems.length).fill(false));
    } else {
      setSelectedItems(new Array(cartItems.length).fill(true));
    }
  };

  const getTotalCost = () => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (selectedItems[i]) {
        total += cartItems[i].price * cartItems[i].quantity;
      }
    }
    return total;
  };

  const handleDelete = async (productId: number) => {
    try {
      const index = cartItems.findIndex((item) => item.productId === productId);
      if (index === -1) {
        console.error("Error: Product not found in cart");
        return;
      }
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(index, 1);

      setCartItems(updatedCartItems);
      setSelectedItems(new Array(updatedCartItems.length).fill(false));
      await removeFromCart(productId);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="container">
      <div className="overflow-auto">
        <div className="min-w-[1000px]">
          <HeaderCart />

          <ProductCart
            cartItems={cartItems}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            onDeleteItem={handleDelete}
          />
        </div>
      </div>
      <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow">
        <BotCart
          selectedItems={selectedItems}
          onSelectAll={handleSelectAll}
          totalCost={getTotalCost()}
        />
      </div>
    </div>
  );
}

export default CartPage;
