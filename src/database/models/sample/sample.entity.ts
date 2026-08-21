import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Sample {
  @ObjectIdColumn()
  id: ObjectId;

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
