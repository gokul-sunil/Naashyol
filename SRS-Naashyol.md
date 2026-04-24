## Naashyol Marketplace Platform – Software Requirements Specification (SRS)

### 1. Introduction

#### 1.1 Purpose  
This document defines the complete Software Requirements Specification (SRS) for the **Naashyol marketplace platform**.  
Naashyol is an e-commerce platform similar to major online marketplaces where customers can browse and purchase products.  
Unlike traditional marketplaces, **vendors cannot list products directly**. Products are created and managed only by administrators. Vendors act as suppliers who provide stock quantities and vendor pricing for products.

#### 1.2 Scope  
The system will support multiple product industries including (but not limited to):
- Electronics
- Clothing
- Furniture
- Beauty products
- Toys
- Other retail product categories

End users will be able to:
- Browse and search products and categories
- Select product variants
- Apply coupons and offers
- Purchase products via supported payment methods
- Share affiliate links and receive/redeem rewards

The platform consists of:
- `Global-premium/client`: Next.js web client used by customers, affiliates, vendors (where applicable) and admins.
- `Global-premium/Backend`: Node.js/Express REST API and business logic layer that powers the platform and back-office operations.

#### 1.3 Definitions, Acronyms, and Abbreviations
- **Affiliate**: A user who shares a product link and earns rewards when purchases occur via that link.  
- **Vendor**: A supplier responsible for providing stock and supply price (vendor price) for product variants. Vendors do not directly control the product listing.  
- **Variant**: A specific product option created through attribute combinations (e.g., color, size, RAM, storage).  
- **CRM**: Customer Relationship Management tools used by administrators to manage customer data, communication, and engagement.

---

### 2. Overall System Description

#### 2.1 Product Perspective  
Naashyol will use a **headless architecture**:
- **Client Layer**: Next.js frontend (`Global-premium/client`)
- **API Layer**: Node.js/Express REST API (`Global-premium/Backend`)
- **Business Logic Layer**: Services implementing product, order, affiliate, coupon, and inventory rules (primarily in `Backend`)
- **Data Layer**: Database(s) and caching

The frontend consumes the backend REST APIs and does not access the database directly.

#### 2.2 User Roles
- **Customer**
  - Browse and search products
  - Add items to cart and place orders
  - Manage addresses and view order history
  - Submit reviews and ratings
- **Affiliate**
  - Share product referral links
  - View referral performance and rewards
- **Vendor**
  - Provide and update stock quantities and vendor prices for variants (via admin- or vendor-facing tools as defined in admin policies)
- **Admin**
  - Full control over products, categories, attributes, vendors, orders, CRM, analytics, marketing, and system configuration

#### 2.3 Operating Environment
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL or MongoDB (final choice to be confirmed during implementation)
- **Search Engine**: Elasticsearch
- **Caching**: Redis
- **Deployment**: Cloud infrastructure such as AWS or Vercel

---

### 3. System Architecture (High-Level)

- **Client Layer (`client`)**
  - Next.js application for:
    - Customer storefront
    - Affiliate referral flows
    - Admin panel UI (can be separate app or secured routes)

- **API Layer (`Backend`)**
  - RESTful endpoints for:
    - Authentication & authorization
    - Product catalog, categories, attributes, variants
    - Cart and checkout
    - Orders and payments
    - Vendors and inventory
    - Coupons and affiliate logic
    - CRM and notifications

- **Business Logic Layer**
  - Services for:
    - Product/variant management
    - Vendor supply and inventory syncing
    - Order lifecycle and payment handling
    - Coupon validation & application
    - Affiliate tracking and reward allocation
    - Analytics aggregation

- **Data Layer**
  - Primary database (PostgreSQL or MongoDB)
  - Redis cache for sessions, frequently accessed data, and rate limiting
  - Elasticsearch for search and product discovery queries

- **External Services**
  - Payment gateways (Razorpay, Stripe, PayU)
  - Email/SMS services
  - Push notification services

---

### 4. Product Catalog System

The platform supports a **universal catalog structure** capable of managing products from multiple industries.

#### 4.1 Category Hierarchy
- Main Category → Subcategory → Child Category → Product

**Examples:**
- Electronics → Mobile Phones → Smartphones  
- Clothing → Men → T-Shirts  
- Furniture → Living Room → Sofas

#### 4.2 Product Data
Each product must contain at minimum:
- Product name
- Category and subcategory references
- Brand
- Description (short/long)
- Images and media gallery
- Specifications (structured metadata)
- Attributes and variants configuration
- SEO metadata (title, slug, meta description) – for future SEO optimization

---

### 5. Product Attribute and Variant System

Products use a **dynamic custom attribute system** controlled by admins.

#### 5.1 Attributes
Admins can create attributes such as:
- Color
- Size
- RAM
- Storage
- Material
- Fabric

Attributes are mapped to categories to ensure context-specific variant generation.

**Example – Electronics:**
- Attributes: Color, RAM, Storage

**Example – Clothing:**
- Attributes: Size, Color, Fabric

#### 5.2 Variant Generation
Variants are automatically generated from attribute combinations.

**Example:**
- Color: Black, Silver  
- RAM: 8GB, 16GB  

Generated variants:
- Black 8GB  
- Black 16GB  
- Silver 8GB  
- Silver 16GB  

#### 5.3 Variant Data
Each variant includes:
- SKU
- Selling price
- Vendor (supply) price
- Stock quantity
- Weight
- Primary image (optional override from product images)
- Barcode
- Status flags (active/inactive)

---

### 6. Vendor Supply System

Vendors do **not** sell products directly; they **supply inventory** for admin-defined variants.

#### 6.1 Vendor Responsibilities
- Provide stock quantity per variant
- Provide vendor price per variant
- Update availability (in stock / out of stock)

#### 6.2 Multiple Vendors per Variant
- Multiple vendors can supply the same product variant.
- The system must maintain separate stock and price records for each vendor-variant pair.
- The **admin selects which vendor** (or selection rule) will fulfill an order for a given variant (e.g., cheapest, closest, preferred).

---

### 7. Cart and Checkout System

#### 7.1 Cart Features
- Add product variant to cart
- Remove item from cart
- Update item quantity
- Persist cart per user (and optionally per device/guest session)
- Apply coupons
- View itemized totals (subtotal, discount, taxes, shipping, grand total)

#### 7.2 Checkout Flow
- Select or add shipping address
- Select shipping method (if multiple options)
- Select payment method
- Review order summary
- Confirm order and initiate payment

---

### 8. Payment Gateway Integration

#### 8.1 Supported Payment Methods
- Credit Card
- Debit Card
- UPI
- Net Banking
- Digital Wallets
- Cash on Delivery (COD)

#### 8.2 Recommended Gateways
- Razorpay
- Stripe
- PayU

The backend must provide a consistent abstraction over different gateways:
- Create payment intent/order
- Handle success/failure callbacks/webhooks
- Record payment transactions and status

---

### 9. Affiliate Marketing System

#### 9.1 Referral Links
- Users can share product links with referral codes.
- Example referral link:  
  `naashyol.com/product/{slug-or-id}?ref={USERID}`

#### 9.2 Referral Outcomes
- When a purchase is made through a valid referral link:
  - The buyer receives a discount coupon (configurable).
  - The referrer receives a reward (coupon or wallet credit).

#### 9.3 Admin Configuration
- Define referral reward rules (type, amount, conditions).
- Configure eligibility criteria and limits.
- View affiliate performance reports:
  - Number of clicks
  - Conversions (orders)
  - Rewards issued and redeemed

---

### 10. Coupon and Offer System

#### 10.1 Coupon Types
- Percentage discount (e.g., 10% off)
- Flat discount (e.g., ₹100 off)
- Free shipping
- Affiliate-specific coupons

#### 10.2 Coupon Rules
Admins can configure:
- Expiration dates and time windows
- Minimum order value
- Maximum discount cap (for percentage coupons)
- Category/brand/product inclusion or exclusion
- Per-user usage limits and global usage limits

---

### 11. Order Management

#### 11.1 Order Lifecycle
- Pending
- Confirmed
- Packed
- Shipped
- Out for Delivery
- Delivered
- Cancelled
- Returned

#### 11.2 Admin Capabilities
- View and filter orders
- Update order status and shipment tracking
- Process refunds and returns
- Generate invoices and export order data
- Assign vendor for fulfillment (where multiple vendors exist)

---

### 12. Customer Relationship Management (CRM)

#### 12.1 CRM Features
- Customer profiles with:
  - Personal details
  - Addresses
  - Order and interaction history
- Support ticket management
- Email marketing campaigns
- SMS notifications
- Push notifications

Admins should be able to segment customers and trigger campaigns based on:
- Purchase behavior
- Inactivity
- Referral activity
- Coupon usage

---

### 13. Reviews and Ratings

#### 13.1 Review Features
- Star rating system (1–5 stars)
- Customer comments
- Optional image uploads

#### 13.2 Moderation
- Admins can:
  - Approve, hide, or delete reviews
  - Flag abusive content
  - Reply to customer reviews (optional)

---

### 14. Search and Product Discovery

Customers can discover products using:
- Keyword search (via Elasticsearch)
- Category navigation
- Brand filters
- Price range filters
- Attribute filters (color, size, RAM, etc.)
- Rating filters

Search should support:
- Auto-complete / suggestions
- Sorting (relevance, price, newest, popularity)

---

### 15. Analytics and Reporting

The admin dashboard should provide at least:
- Sales analytics (daily/weekly/monthly)
- Top selling products and categories
- Revenue reports (gross, net, by payment method)
- Affiliate performance metrics
- Coupon usage statistics
- Vendor supply and performance reports

Reports should be exportable (e.g., CSV) where feasible.

---

### 16. Admin Panel Modules

The admin panel (UI in `client`, APIs in `Backend`) should include modules for:
- Dashboard (overview, KPIs)
- Products
- Categories
- Brands
- Attributes
- Variants
- Inventory
- Orders
- Customers
- Vendors
- Coupons
- Affiliate management
- Marketing banners/content
- CRM tools
- Analytics & reports
- System settings (general config, payment, email/SMS, roles/permissions)

---

### 17. Database Entities (Conceptual)

At minimum, the system will maintain entities such as:
- Users
- Addresses
- Products
- Categories
- Brands
- Attributes
- Attribute Values
- Product Variants
- Variant Attributes
- Vendors
- Vendor Stock
- Cart
- Cart Items
- Orders
- Order Items
- Payments
- Coupons
- Affiliates
- Affiliate Transactions
- Reviews
- Notifications

The exact schema design will depend on the chosen database (PostgreSQL vs MongoDB) and will be detailed in a separate **Database Design Specification**.

---

### 18. Non-Functional Requirements

- **Performance**:  
  - Page load time (for primary storefront pages) should remain under **2 seconds** under normal load.
  - APIs should generally respond in under **500 ms** for typical queries (excluding external gateway calls).

- **Security**:  
  - All traffic over **HTTPS**.  
  - **JWT-based authentication** for APIs.  
  - **Role-based access control (RBAC)** for customer, affiliate, vendor, and admin roles.  
  - Sensitive data stored and transmitted securely following best practices.

- **Scalability**:  
  - The system should support **millions of products** and **thousands of concurrent users**.  
  - Horizontal scaling strategies for stateless services and database optimizations.

- **Availability**:  
  - Target uptime of **99.9%**.  
  - Backup and recovery strategies defined at infrastructure level.

- **Maintainability**:  
  - Modular architecture and clean coding practices.  
  - Separation of concerns between layers (client, API, business logic, data).

---

### 19. Technology Stack

- **Frontend**
  - Next.js
  - React
  - Tailwind CSS

- **Backend**
  - Node.js
  - Express.js

- **Database**
  - PostgreSQL or MongoDB (final decision to be made before implementation)

- **Infrastructure**
  - AWS or Vercel (and supporting services)

- **Search Engine**
  - Elasticsearch

- **Caching**
  - Redis

---

### 20. Future Enhancements

Potential future capabilities include:
- Mobile application development (Android, iOS)
- AI-based product recommendation engine
- Multi-language and multi-currency support
- Warehouse and logistics management integration
- Subscription-based products
- Loyalty and reward programs

These items are out of scope for the initial release but should be considered in architectural decisions to avoid blocking future implementation.

