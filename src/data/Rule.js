import Entity from './Entity';
import User from './User';
import Category from './Category';

class Rule extends Entity {
  value = String;
  user = User;
  category = Category;
}

export default Rule;