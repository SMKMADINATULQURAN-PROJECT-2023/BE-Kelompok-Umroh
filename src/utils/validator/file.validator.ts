import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'custom', async: true })
export class ThumbnailNotEmptyValidator
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const req = args.object as { thumbnail: any }; // Ambil req dari object args
    console.log(req);
    if (!req.thumbnail) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Thumbnail tidak boleh kosong';
  }
}
