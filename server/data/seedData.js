const faker = require('faker');

const db = require('../src/db/mongoose');
const User = require('../src/models/user');
const Post = require('../src/models/post');
const { seed } = require('faker');

const seedData = async () => {
  await db.connect();

  await clearData();
  const users = await seedUsers();
  await seedPosts(users);

  db.disconnect();
}

const clearData = async () => {
  await User.deleteMany({});
  await Post.deleteMany({});
}

const seedUsers = async () => {

  const numUsers = 10;
  const totalPokemon = 988;

  const allUsers = [];
  
  console.log(`Start adding ${numUsers} users`);
  for (let i = 0; i < numUsers; i++) {
    const randomUserName = faker.internet.userName();
    
    const randomPokedexId = Math.floor(Math.random() * totalPokemon) + 1;
    const randomImageUrl = `https://www.serebii.net/pokemon/art/${String(randomPokedexId).padStart(3, '0')}.png`;

    const user = new User({
      userName: randomUserName,
      imageUrl: randomImageUrl
    });
    await user.save();
    allUsers.push(user);
  }
  console.log(`Finished adding ${numUsers} users`);
  
  return allUsers;
}

const seedPosts = async (users) => {
  const numPosts = 100;

  console.log(`Start adding ${numPosts} posts`);
  for (let i = 0; i < numPosts; i++) {
    randomUserIndex = Math.floor(Math.random() * users.length);
    randomUser = users[randomUserIndex];
  
    const post = new Post({
      author: randomUser._id,
      postText: faker.lorem.sentence()
    });

    await post.save();
  }

  console.log(`Finished adding ${numPosts} posts`);
}

seedData();