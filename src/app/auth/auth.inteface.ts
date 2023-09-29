export interface jwtPayload {
  id: number;
  username: string;
  email: string;
  telephone?: string;
  tempat_lahir?: string;
  tanggal_lahir?: Date;
  role_id?: any;
}
