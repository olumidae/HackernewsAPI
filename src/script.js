const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const allLinks = await prisma.link.findMany();
  console.log('ALL LINKS', allLinks)

  const newLink = await prisma.link.create({
    data: {
      description: 'Fullstack tutorial for graphql',
      url: 'www.howtograhql.com',
    }
  })
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main().catch((e) => {
  throw e
}).finally(async () => await prisma.$disconnect())