import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ELoggerType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export enum ELoggerAction {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

@Entity()
export class SystemLogger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ELoggerType, default: ELoggerType.info })
  type: ELoggerType;

  @Column({ type: 'enum', enum: ELoggerAction })
  action: ELoggerAction;

  @Index()
  @Column({ type: 'varchar', length: 150, nullable: true })
  unique_id: string;

  @Index()
  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'jsonb', nullable: true })
  data: any;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_datetime: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_datetime: string;
}
