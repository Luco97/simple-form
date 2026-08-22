import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Sample {
  @ObjectIdColumn()
  id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  marca: string;

  @Column()
  correo: string;

  @Column()
  nombre: string;

  @Column()
  cargo: string;

  @Column()
  puntajeDados: number;

  @Column()
  puntajeRaspe: number;

  @Column()
  nombreEmpresa: string;
}
