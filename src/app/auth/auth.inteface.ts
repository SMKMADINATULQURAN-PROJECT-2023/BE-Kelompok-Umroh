export interface jwtPayload {
  id: number;
  username: string;
  email: string;
  telephone?: string;
  alamat?: string;
  tanggal_lahir?: Date;
  role_id?: any;
}
