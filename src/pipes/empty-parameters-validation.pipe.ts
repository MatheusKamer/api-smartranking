/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class EmptyParametersValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new Error(`Value of field  ${metadata.data}`);
    }

    return value;
  }
}
