const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate random data
const civilizations = ['Abbasid Dynasty', 'Chinese', 'Delhi Sultanate', 'English', 'French', 'Holy Roman Empire', 'Mongols', 'Rus', 'Ottomans', 'Malians'];
const types = ['Pro Build', 'Beginner Build', 'Any Elo', 'LSC BROs'];
const descriptions = ['Build order for a fast castle', 'Rush build order', 'Fast imperial build order', 'Boom build order', 'Tower rush build order', 'Dark age build order'];
const builds = [
  'This build order is designed to get you to Castle Age quickly, while also having a strong economy and a decent military presence. You will start with standard Dark Age resources, and aim to get to Feudal Age as soon as possible. From there, you will focus on building your economy and military, while keeping an eye on your opponent.',
  'The goal of this build order is to launch a devastating rush on your opponent in the early game. You will start with a few villagers and a scout, and use them to gather resources and build up your military. Your goal is to hit your opponent early, before they have a chance to build up their own defenses.',
  'This build order is designed to get you to Imperial Age as quickly as possible, while also having a strong economy and military. You will start with standard Dark Age resources, and aim to get to Feudal Age quickly. From there, you will focus on building your economy and military, while keeping an eye on your opponent.',
  'This build order is all about building up your economy and military quickly, with an eye towards booming in the late game. You will start with standard Dark Age resources, and aim to get to Feudal Age as soon as possible. From there, you will focus on building up your economy and military, while keeping an eye on your opponent.',
  'The goal of this build order is to launch a surprise attack on your opponent with a few towers early in the game. You will start with a few villagers and a scout, and use them to gather resources and build up your military. Your goal is to hit your opponent with a tower rush, which can be difficult to defend against if they are not prepared.',
  'This build order is designed for players who prefer to play defensively in the early game. You will start with standard Dark Age resources, and aim to get to Feudal Age quickly. From there, you will focus on building up your economy and defenses, while keeping an eye on your opponent.',
];

// Create 10 random BuildOrders
const data = [];
for (let i = 0; i < 10; i++) {
  data.push({
    civilization: civilizations[Math.floor(Math.random() * civilizations.length)],
    typee: types[Math.floor(Math.random() * types.length)],
    desc: descriptions[Math.floor(Math.random() * descriptions.length)],
    build: builds[Math.floor(Math.random() * builds.length)]
  });
}

// Insert the data into the database
async function main() {
  for (const build of data) {
    const newBuildOrder = await prisma.buildOrder.create({
      data: build,
    });
    console.log(`Created build order with id: ${newBuildOrder.id}`);
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
