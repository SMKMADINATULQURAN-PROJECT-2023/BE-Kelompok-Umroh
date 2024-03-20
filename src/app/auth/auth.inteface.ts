export interface jwtPayload {
  id: number;
  avatar?: string;
  username: string;
  email: string;
  email_verified?: boolean;
  telephone?: string;
  alamat?: string;
  tanggal_lahir?: Date;
  jenis_kelamin?: string;
  role_id?: any;
  refresh_token?: string;
}
