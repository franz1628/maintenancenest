export class CreateUserDto {
    /*
     id               Int        @id @default(autoincrement())
  name             String     @db.VarChar(100)
  last_name        String     @db.VarChar(100)
  second_last_name String?    @db.VarChar(100)
  password         String     @db.VarChar(255)
  email            String     @unique(map: "email") @db.VarChar(100)
  birth_date       DateTime   @db.Date
  phone            String?    @db.VarChar(15)
  number_document  String     @unique(map: "number_document") @db.VarChar(50)
  id_type_document Int
  state            Int?       @default(1) @db.TinyInt
  created_at       DateTime?  @default(now()) @db.Timestamp(0)
  updated_at       DateTime?  @default(now()) @db.Timestamp(0)
  service          service[]
  vehicule         vehicule[]
    */

    name: string;
    last_name: string;
    second_last_name?: string;
    password: string;
    email: string;
    birth_date: Date;
    phone?: string;
    number_document: string;
    id_type_document: number;
    state?: number;
    created_at?: Date;
    updated_at?: Date;

}
