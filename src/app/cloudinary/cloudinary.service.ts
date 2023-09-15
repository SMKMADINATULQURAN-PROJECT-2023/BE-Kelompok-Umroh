import { v2 } from 'cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ public_id: string; url: string }> {
    const { secure_url, public_id } = await v2.uploader.upload(file.path, {
      folder: `/umrah/${folder}`,
      use_filename: true,
    });
    return { url: secure_url, public_id };
  }
}
