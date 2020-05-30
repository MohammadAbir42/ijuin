import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { UserData } from 'src/user-data/userData.entity'


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'TUSAR@142442',
    database: 'ijuin',
    entities: [User, UserData],
    synchronize: true
}