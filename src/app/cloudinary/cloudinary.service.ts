import { v2 } from 'cloudinary';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ public_id: string; url: string }> {
    const { secure_url, public_id } = await v2.uploader.upload(file?.path, {
      folder: `/umrah/${folder}`,
      use_filename: true,
    });
    return { url: secure_url, public_id };
  }

  async deleteImage(id: string) {
    return new Promise((resolve, reject) => {
      v2.uploader
        .destroy(id)
        .then((res) => resolve(res))
        .catch((er) => reject(er));
    });
  }

  async uploadVideo(file: Express.Multer.File, folder: string) {
    const { secure_url, public_id } = await v2.uploader.upload(file.path, {
      folder: `/umrah/${folder}`,
      use_filename: true,
      resource_type: 'video',
    });
    return { url: secure_url, public_id };
  }
}
