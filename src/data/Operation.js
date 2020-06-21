import Entity from './Entity';
import User from './User';
import Account from './Account';
import Category from './Category';

class Operation extends Entity {
  date = String;
  amount = Number;
  transactionCurrencyAmount = Number;
  type = String;
  note = String;
  user = User;
  account = Account;
  category = Category;
}

export default Operation;
