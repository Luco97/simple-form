import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSampleDto {
  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsNumber()
  puntajeDados: number;

  @IsNumber()
  puntajeRaspe: number;

  @IsString()
  @IsNotEmpty()
  nombreEmpresa: string;
}
