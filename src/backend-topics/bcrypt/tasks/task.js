const bcrypt = require("bcrypt");

const pass = "sivananda123";
// TASK 1
const hashAndCompare = async (pass) => {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(pass, salt);

  console.log("Hash: ", hashedPassword);
  let isSame = await bcrypt.compare(pass, hashedPassword);
  console.log("Match result: ", isSame);
};

hashAndCompare(pass);

// TASK 2
const passwordStrengthValidator = async (pass, salt) => {
  console.log("Salt Rounds: ", salt);

  console.time("Time");
  let genSalt = await bcrypt.genSalt(salt);
  let hash = await bcrypt.hash(pass, genSalt);
  console.timeEnd("Time");

  console.log("Hash: ", hash);
};

(async () => {
  await passwordStrengthValidator(pass, 5);
  await passwordStrengthValidator(pass, 10);
  await passwordStrengthValidator(pass, 15);
})();

// Task3
const task3DB = [];
const createUser = async (email, pass) => {
  let salt = await bcrypt.genSalt(5);
  let hash = await bcrypt.hash(pass, salt);

  task3DB.push({
    email,
    pass: hash,
  });
  console.log(email, "added");
};

const logDB = () => console.log(task3DB);

const login = async (email, pass) => {
  let target = task3DB.find((user) => user.email === email);

  if (!target) {
    console.log("Invalid email or password");
    return;
  }

  const isOwner = await bcrypt.compare(pass, target.pass);
  if (!isOwner) {
    console.log("Invalid email or password");
    return;
  }
  console.log("Login successful:", email);
};

(async () => {
  await createUser("reddysivananda@gmail.com", "sivananda123");
  await createUser("tiGor@gmail.com", "tiGor123");
  //   logDB()
  await login("reddysivananda@gmail.com", "sivananda123");
  await login("tiGor@gmail.com", "bhAAi123");
})();
