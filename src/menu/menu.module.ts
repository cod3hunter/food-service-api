import { Module } from '@nestjs/common';
import { MenusResolver } from './menu.resolver';

@Module({
  providers: [MenusResolver],
})
export class MenusModule {}
