const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create regions
  const regions = await Promise.all([
    prisma.region.create({
      data: {
        code: 'AA',
        name: 'Addis Ababa',
      },
    }),
    prisma.region.create({
      data: {
        code: 'OR',
        name: 'Oromia',
      },
    }),
  ])

  // Create fuel companies
  const fuelCompanies = await Promise.all([
    prisma.fuelCompany.create({
      data: {
        code: 'TOTAL',
        name: 'Total Ethiopia',
      },
    }),
    prisma.fuelCompany.create({
      data: {
        code: 'NOC',
        name: 'National Oil Company',
      },
    }),
  ])

  // Create fuel stations
  await Promise.all([
    prisma.fuelStation.create({
      data: {
        merchantId: 'MER001',
        name: 'Total Bole',
        zone: 'Bole',
        woreda: 'Bole',
        kebele: '22',
        city: 'Addis Ababa',
        regionId: regions[0].id,
        fuelCompanyId: fuelCompanies[0].id,
        known_name: 'Total Bole Branch',
        latitude: 8.9806,
        longitude: 38.7578,
      },
    }),
    prisma.fuelStation.create({
      data: {
        merchantId: 'MER002',
        name: 'NOC Mexico',
        zone: 'Mexico',
        woreda: 'Mexico',
        kebele: '15',
        city: 'Addis Ababa',
        regionId: regions[0].id,
        fuelCompanyId: fuelCompanies[1].id,
        known_name: 'NOC Mexico Branch',
        latitude: 8.9956,
        longitude: 38.7894,
      },
    }),
  ])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 