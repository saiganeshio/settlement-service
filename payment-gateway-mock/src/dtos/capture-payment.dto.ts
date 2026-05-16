import {
    IsString,
    IsPositive,
} from 'class-validator';

export class CapturePaymentDto {

    @IsString()
    preAuthId!: string;

    @IsPositive()
    amountCents!: number;

    @IsString()
    idempotencyKey!: string;
}