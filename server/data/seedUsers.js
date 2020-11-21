const faker = require('faker');

const db = require('../src/db/mongoose');
const User = require('../src/models/user');

const seedUsers = async () => {
  await db.connect();

  const numUsers = 100;
  const totalPokemon = 988;
  
  for (let i = 0; i < numUsers; i++) {
    const randomUserName = faker.internet.userName();
    
    const randomPokedexId = Math.floor(Math.random() * totalPokemon) + 1;
    const randomImageUrl = `https://www.serebii.net/pokemon/art/${String(randomPokedexId).padStart(3, '0')}.png`;

    const user = new User({
      userName: randomUserName,
      imageUrl: randomImageUrl
    });
    await user.save();

    console.log(`Saving user #${i+1}  - ${randomUserName}`);
  }
  
  db.disconnect();
}

seedUsers();