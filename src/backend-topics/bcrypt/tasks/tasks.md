# Bcrypt Tasks

## Task 1: Hash and Compare Passwords
Create a function that:
- Takes a plain text password as input
- Hashes it using bcrypt with 10 salt rounds
- Compares the hashed password with the original password
- Returns true if they match, false otherwise

**Expected Output:**
```
Hash: $2b$10$...
Match Result: true
```

---

## Task 2: Password Strength Validator
Create a function that:
- Takes a password as input
- Hashes it with different salt rounds (5, 10, 15)
- Measures and logs the time taken for each hashing
- Displays the hash and time comparison
- Explains why higher salt rounds take longer

**Expected Output:**
```
Salt Rounds: 5, Time: XXms, Hash: $2b$05$...
Salt Rounds: 10, Time: XXms, Hash: $2b$10$...
Salt Rounds: 15, Time: XXms, Hash: $2b$15$...
```

---

## Task 3: Authentication Simulation
Create a simple authentication system that:
- Stores multiple user credentials (email and hashed password)
- Implements a login function that takes email and plain password
- Verifies the password using bcrypt.compare()
- Returns success/failure messages
- Demonstrates failed login attempts with wrong passwords

**Expected Output:**
```
Login successful: user@example.com
Invalid email or password
Login successful: john@example.com
Invalid email or password
```
