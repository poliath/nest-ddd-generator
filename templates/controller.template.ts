import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { {{ModuleName}}Service } from './{{moduleNamePlural}}.service';
import { Create{{ModuleName}}Dto } from './dto/create-{{moduleName}}.dto';
import { Update{{ModuleName}}Dto } from './dto/update-{{moduleName}}.dto';

@Controller('{{moduleNamePlural}}')
export class {{ModuleName}}Controller {
  constructor(private readonly {{moduleNamePlural}}Service: {{ModuleName}}Service) {}

  @Post()
  create(@Body() create{{ModuleName}}Dto: Create{{ModuleName}}Dto) {
    return this.{{moduleNamePlural}}Service.create(create{{ModuleName}}Dto);
  }

  @Get()
  findAll() {
    return this.{{moduleNamePlural}}Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.{{moduleNamePlural}}Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() update{{ModuleName}}Dto: Update{{ModuleName}}Dto) {
    return this.{{moduleNamePlural}}Service.update(+id, update{{ModuleName}}Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.{{moduleNamePlural}}Service.remove(+id);
  }
}
