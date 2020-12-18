import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('user')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default User;