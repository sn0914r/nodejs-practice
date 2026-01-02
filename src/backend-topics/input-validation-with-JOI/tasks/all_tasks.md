# Three Tasks: Basic to Next Level

## Task 1: Basic Product Creation (POST /products)
**Objective:** Create a single product with full validation

**Endpoint:** `POST http://localhost:3000/products`

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 999.99,
  "quantity": 5,
  "category": "electronics",
  "discount": 10
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 1704067200000,
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "quantity": 5,
    "category": "electronics",
    "discount": 10,
    "createdAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Test Cases to Try:**
- ✅ Valid product with all fields
- ❌ Missing required field (name)
- ❌ Invalid category (not in: electronics, clothing, food, books)
- ❌ Negative price
- ❌ Non-integer quantity
- ❌ Discount > 100

---

## Task 2: Product Update (PUT /products/:id)
**Objective:** Update a product with partial data (all fields optional)

**Endpoint:** `PUT http://localhost:3000/products/1`

**Request Body (partial update):**
```json
{
  "price": 799.99
}
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "price": 799.99,
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
}
```

**Test Cases to Try:**
- ✅ Update single field (price)
- ✅ Update multiple fields (price + discount)
- ✅ Update with empty body (all optional)
- ❌ Invalid price value
- ❌ Invalid category value

---

## Task 3: Bulk Product Creation (POST /products/bulk)
**Objective:** Create multiple products at once with array validation

**Endpoint:** `POST http://localhost:3000/products/bulk`

**Request Body (array of products):**
```json
[
  {
    "name": "Laptop",
    "description": "High performance laptop",
    "price": 999.99,
    "quantity": 5,
    "category": "electronics",
    "discount": 10
  },
  {
    "name": "T-Shirt",
    "description": "Cotton t-shirt",
    "price": 29.99,
    "quantity": 50,
    "category": "clothing",
    "discount": 5
  },
  {
    "name": "Novel",
    "price": 19.99,
    "quantity": 100,
    "category": "books"
  }
]
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1704067200000,
      "name": "Laptop",
      "description": "High performance laptop",
      "price": 999.99,
      "quantity": 5,
      "category": "electronics",
      "discount": 10,
      "createdAt": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": 1704067200001,
      "name": "T-Shirt",
      "description": "Cotton t-shirt",
      "price": 29.99,
      "quantity": 50,
      "category": "clothing",
      "discount": 5,
      "createdAt": "2026-01-01T00:00:00.000Z"
    },
    {
      "id": 1704067200002,
      "name": "Novel",
      "price": 19.99,
      "quantity": 100,
      "category": "books",
      "createdAt": "2026-01-01T00:00:00.000Z"
    }
  ],
  "count": 3
}
```

**Test Cases to Try:**
- ✅ Valid bulk creation with 3 products
- ❌ Bulk with one invalid product (should fail entire batch)
- ❌ Empty array
- ❌ Duplicate products

---

## How to Test in Postman

### Setup:
1. Start the server: `npm start` (from project root)
2. Server will run on `http://localhost:3000`

### For Each Task:
1. Create new request in Postman
2. Set method (POST/PUT)
3. Enter URL
4. Go to **Body** tab → Select **raw** → Choose **JSON**
5. Paste the request body
6. Click **Send**
7. Check response status and body

### Expected Validation Errors (400 status):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "\"name\" must be at least 3 characters long",
    "\"price\" must be greater than 0"
  ]
}
```

---

## Progression Level
- **Task 1:** Basic - Single object validation
- **Task 2:** Intermediate - Optional fields, partial updates
- **Task 3:** Advanced - Array validation, bulk operations
