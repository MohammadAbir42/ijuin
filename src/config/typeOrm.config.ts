import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'TUSAR@142442',
    database: 'ijuin',
    entities: [User],
    synchronize: true
}