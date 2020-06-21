import { connect, Document } from 'camo';
import _ from 'lodash';

connect('nedb://store')
  .catch(e => console.log('NEDB connect error:', e));

class Entity extends Document {};

export default Entity;
