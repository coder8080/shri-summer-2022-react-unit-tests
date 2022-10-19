import { faker } from '@faker-js/faker/locale/ru'

export const getBouquetList = () =>
  Array(Number(faker.random.numeric(2)))
    .fill(undefined)
    .map(() => ({
      bouquetHeight: faker.datatype.number({ min: 30, max: 100 }),
      bouquetWidth: faker.datatype.number({ min: 30, max: 100 }),
      currentPrice: faker.commerce.price(0, 99999, 0),
      flowersCount: faker.datatype.number({ min: 1, max: 1000 }),
      id: faker.datatype.uuid(),
      imageUrl: faker.image.imageUrl(400, 400, 'nature', true),
      isFavorite: faker.datatype.boolean(),
      isHit: faker.datatype.boolean(),
      isSale: faker.datatype.boolean(),
      oldPrice: faker.datatype.boolean()
        ? faker.commerce.price(0, 99999, 0)
        : undefined,
      title: faker.commerce.productName(),
    }))
