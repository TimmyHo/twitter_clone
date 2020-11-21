const faker = require('faker');

const db = require('../src/db/mongoose');
const User = require('../src/models/user');
const Post = require('../src/models/post');
const Follow = require('../src/models/follow');

const seedData = async () => {
  await db.connect();

  await clearData();
  const users = await seedUsers();
  await seedPosts(users);
  await seedFollows(users);

  db.disconnect();
}

const clearData = async () => {
  console.log('Start clearing data');
  await User.deleteMany({});
  await Post.deleteMany({});
  await Follow.deleteMany({});
  console.log('Finish clearing data\n');
}

const seedUsers = async () => {
  const numUsers = 20;
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
  console.log(`Finish adding ${numUsers} users\n`);
  
  return allUsers;
}

const seedPosts = async (users) => {
  const numPosts = 150;

  console.log(`Start adding ${numPosts} posts`);
  for (let i = 0; i < numPosts; i++) {
    randomUserIndex = Math.floor(Math.random() * users.length);
    randomUser = users[randomUserIndex];
  
    const post = new Post({
      author: randomUser._id,
      postText: faker.lorem.sentence(),
      createdAt: new Date(faker.date.past())
    });

    await post.save();
  }

  console.log(`Finish adding ${numPosts} posts\n`);
}

const seedFollows = async (users) => {
  const maxNumFollows = 5;

  console.log(`Start adding follows`);

  await Promise.all(
    users.map(async (user) => {
      const numFollows = Math.floor(Math.random() * maxNumFollows) + 1
      for (let i = 0; i < numFollows; i++) {
        const followingUserIndex = Math.floor(Math.random() * users.length);
        
        const follow = new Follow({
          follower: user,
          following: users[followingUserIndex]
        });

        await follow.save();
      }
    })
  );
  
  console.log(`Finish adding follows\n`);
}

seedData();