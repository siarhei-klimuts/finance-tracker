import Entity from './Entity';
import User from './User';

class Category extends Entity {
  name = String;
  user = User;
  type = String;

  static collectionName() {
    return 'categories';
  }
}

export default Category;