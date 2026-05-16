import {
  IsString,
  IsNumber,
  IsDateString,
  IsPositive,
  Equals,
} from 'class-validator';

export class BookingCompletedDto {
  @Equals('BookingCompleted')
  event!: string;

  @IsString()
  bookingId!: string;

  @IsString()
  userId!: string;

  @IsDateString()
  scheduledEnd!: string;

  @IsDateString()
  actualEnd!: string;

  @IsNumber()
  includedUnits!: number;

  @IsNumber()
  actualUnits!: number;

  @IsPositive()
  baseFareCents!: number;

  @IsString()
  preAuthId!: string;

  @IsPositive()
  preAuthAmountCents!: number;
}
