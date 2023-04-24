import {Entity, Column, Index, PrimaryColumn} from 'typeorm';

@Entity({name: 'pcz-poc'})
export class PczPoc {
  @PrimaryColumn({type: String})
  sku!: string;

  @Index()
  @Column({type: String})
  style!: string;

  @Column({type: Number})
  price!: number;

  @Column({name: 'diff', default: true, type: Boolean})
  diff!: boolean;
}
