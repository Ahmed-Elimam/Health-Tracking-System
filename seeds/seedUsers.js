const {createUser} = require("../factories/userFactory");
const dbConnect = require("../config/dbConnection"); // Your DB connection logic

async function seed() {
  await dbConnect();
  for (let i = 0; i < 40; i++) {
    await createUser();
  }
  console.log("Users seeded!");
  process.exit();
}

seed();
