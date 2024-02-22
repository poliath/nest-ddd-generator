import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type {{ModuleName}}SchemaDocument = HydratedDocument<{{ModuleName}}>;

@Schema({
  collection: '{{moduleNamePlural}}',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class {{ModuleName}} extends Document {

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;

  @Prop()
  branch?: string;

  @Prop()
  area?: string;
}

export const {{ModuleName}}Schema = SchemaFactory.createForClass({{ModuleName}});
