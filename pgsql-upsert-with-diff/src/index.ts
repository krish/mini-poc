import {createConnection} from 'typeorm';
import {PczPoc} from './entities/pcz-poc.entity';
import {PczPocRepository} from './repositories/pcz-poc.repository';

async function runQuery() {
  const connection = await createConnection({
    type: 'postgres',
    host: 'rapid-qa-postgres.crwhdtsi08lm.ap-southeast-1.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'pi!&s3*6HiS1',
    database: 'product_data',
    entities: [PczPoc],
    synchronize: true,
  });

  const repository = connection.getCustomRepository(PczPocRepository);

  const records: Partial<PczPoc>[] = [
    {style: 'st001', sku: 'sku001', price: 100},
    {style: 'st001', sku: 'sku002', price: 101},
    {style: 'st001', sku: 'sku003', price: 102},
    //5000 more
  ];

  await repository.bulkInsert(records);

  await connection.close();
}

runQuery();
