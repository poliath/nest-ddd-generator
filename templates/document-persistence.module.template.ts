import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { {{ModuleName}}Schema, {{ModuleName}} } from './entities/{{moduleName}}.schema';
import { {{ModuleName}}Repository } from './{{moduleName}}.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: {{ModuleName}}.name, schema: {{ModuleName}}Schema }]),
  ],
  providers: [{{ModuleName}}Repository],
  exports: [{{ModuleName}}Repository],
})
export class {{ModuleName}}PersistenceModule {}
