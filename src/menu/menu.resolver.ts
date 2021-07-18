import { Resolver, Query } from '@nestjs/graphql';
import { Menu } from './models/menu.model';

@Resolver(() => Menu)
export class MenusResolver {
  @Query(() => [Menu])
  async recipe(): Promise<Menu[]> {
    return [
      {
        id: 'id',
        title: 'title',
        description: 'description',
        price: 12.5,
      },
      {
        id: 'id2',
        title: 'title123',
        description: 'description123',
        price: 14.5,
      },
    ];
  }
}
