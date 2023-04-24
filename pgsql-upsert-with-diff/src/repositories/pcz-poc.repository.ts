import {EntityRepository, Repository} from 'typeorm';
import {PczPoc} from '../entities/pcz-poc.entity';

@EntityRepository(PczPoc)
export class PczPocRepository extends Repository<PczPoc> {
  bulkInsert(records: Partial<PczPoc>[]): Promise<void> {
    console.log(records);
    const values = records
      .map((r) => {
        return `('${r.style}', '${r.sku}', ${r.price}, ${r.diff})`;
      })
      .join(', ');
    console.log(values);
    const sql = `
            INSERT INTO pcz_poc (style, sku, price, diff)
            VALUES ${values}
            ON CONFLICT (style, sku)
            DO UPDATE SET
                price = EXCLUDED.price,
                diff = pcz_poc.price <> EXCLUDED.price
        `;
    const sql2 = `INSERT INTO public."pcz-poc"( style, sku, price, diff)
     VALUES ('st001', 'sku003', 102, case when exists (select 1 from public."pcz-poc" where style='st001' and sku='sku003') then (select price <> 102 from public."pcz-poc" where style='st001' and sku='sku003') else TRUE end ) on conflict (style,sku) do update set price=excluded.price,diff=excluded.price<> public."pcz-poc".price ;`;
    return this.query(sql);
  }
}
