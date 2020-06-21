import Entity from './Entity';
import User from './User';

class Account extends Entity {
  name = String;
  user = User;
}

export default Account;