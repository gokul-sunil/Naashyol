# User-side API (Frontend + Backend)

Base URL: `http://localhost:5000` (set `NEXT_PUBLIC_API_URL` in client).

## Auth
- `POST /api/auth/register` — body: `{ name, email, password }` → `{ _id, name, email, role, token }`
- `POST /api/auth/login` — body: `{ email, password }` → `{ _id, name, email, role, token }`
- `GET /api/auth/me` — **Auth** → current user

## Homepage
- `GET /api/banners` — list active banners (image, title, subtitle, link, linkText)
- `GET /api/categories` — list categories with subcategories
- `GET /api/products/featured?limit=12` — featured products
- `GET /api/products/offers?limit=12` — products with offerPrice

## Products
- `GET /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=` — listing with filters
- `GET /api/products/:id` — product by ID

## Cart (Auth required)
- `GET /api/cart` — get cart (items, subtotal, count)
- `POST /api/cart` — body: `{ productId, quantity }`
- `PUT /api/cart` — body: `{ productId, quantity }`
- `DELETE /api/cart/:productId` — remove item

## Checkout
- `GET /api/coupons/validate?code=&subtotal=` — validate coupon → `{ valid, discountAmount, finalAmount }`
- `POST /api/orders` — **Auth** — body: `{ addressId?, address?, couponCode? }` → create order, clear cart

## User profile (Auth required)
- `GET /api/orders` — my orders
- `GET /api/orders/:id` — order details
- `PATCH /api/orders/:id/cancel` — cancel order
- `GET /api/addresses` — list addresses
- `POST /api/addresses` — body: `{ fullName, phone, street, city, state, pincode, isDefault? }`
- `PUT /api/addresses/:id` — update address
- `DELETE /api/addresses/:id` — delete address
- `GET /api/wishlist` — list wishlist products
- `POST /api/wishlist` — body: `{ productId }`
- `DELETE /api/wishlist/:productId` — remove from wishlist

Send JWT in header: `Authorization: Bearer <token>`.
