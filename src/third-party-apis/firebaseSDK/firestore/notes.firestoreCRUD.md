# Firebase

## Firestore CRUD Operations

### CREATE / ADD

1. `db.collection().add()` - adds RANDOM ID and saves the doc in target collection

   ```JS
   await db.collection("users").add({
        name: "sivananda reddy",
        mail: "reddysivananda@gmail.com",
        role: "student",
   });
   ```

2. `db.collection().doc().set()` - allows us to add CUSTOM ID and saves the doc in target collection.

   ```JS
   await db.collection("users").doc("user1").set({
        name: "sivananda reddy",
        mail: "reddysivananda@gmail.com",
        role: "student",
   })
   // NOTE: if the ID already exists then its content will be overridden. So, it's better to check before adding doc using "set method"

   // ** 201 is HTTP standard for resource created
   ```

### READ / GET - single & multiple docs

1. `db.collection().doc().get()` - returns a snapshot of given doc id in the collection.

   - `.exists` : checks if doc exists and return Boolean
   - `.data()` : returns the doc data as JS Object
   - `.id` : returns the doc id

   ```JS
   let doc = await db.collection("users").doc("234e1a33b5").get();

   doc.exists //  a boolean
   doc.data() // returns the doc data as a JS Object (without doc id)
   doc.id // returns the doc id
   ```

2. `db.collection().get()` - returns a snapshot of entire collection.

   - `.empty` : check if docs exist, returns a boolean
   - `.size` : returns the total number of documents
   - `.docs`: returns the array of all documents

   ```JS
   let snapshot = await db.collections("users").get();

   snapshot.empty // returns boolean
   snap.size // returns number of documents
   snap.docs // returns list of documents
   ```

### UPDATE

1. `db.collection().doc().update({...newFields})` - updates or adds new fields in the target document.

2. throws ERROR when target document doesn't exist.

   ```JS
   await db.collection("users").doc("234e1a33b5").update({...newFields})
   ```

### DELETE

1. `db.collection().doc().delete()` - deletes a specific resource.

2. It doesn't throw error if doc doesn't exist

   ```JS
   await db.collection("users").doc("234e1a33b5").delete()
   ```
