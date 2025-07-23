const API_URL = 'http://localhost:5000/api/cart';

export async function fetchCart(userId) {
  const res = await fetch(`${API_URL}/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  const data = await res.json();
  return data.cart.items.map(item => ({
    id: item.bookId._id,
    title: item.bookId.title,
    author: item.bookId.author,
    image: item.bookId.image,
    category: item.bookId.category,
    condition: item.bookId.condition,
    price: item.bookId.price,
    quantity: item.quantity,
  }));
}

export async function addToCart(userId, bookId, quantity = 1) {
  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, bookId, quantity }),
  });
  if (!res.ok) throw new Error('Failed to add to cart');
  return res.json();
}
