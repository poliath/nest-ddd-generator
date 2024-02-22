import { Module } from '@nestjs/common';
import { {{ModuleName}}Service } from './{{moduleNamePlural}}.service';
import { {{ModuleName}}Controller } from './{{moduleNamePlural}}.controller';

@Module({
  controllers: [{{ModuleName}}Controller],
  providers: [{{ModuleName}}Service],
})
export class {{ModuleName}}Module {}
