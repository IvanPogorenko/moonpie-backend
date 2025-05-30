import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CustomSizeDto {
  @ApiProperty({ description: 'Обхват бедер', example: 92, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Обхват - число' })
  hip?: number;

  @ApiProperty({ description: 'Обхват груди', example: 92, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Обхват - число' })
  chest?: number;

  @ApiProperty({ description: 'Обхват талии', example: 92, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Обхват - число' })
  waist?: number;
}
