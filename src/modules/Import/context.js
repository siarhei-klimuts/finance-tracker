import { createContext, useContext, useState, useCallback } from 'react';
import _ from 'lodash';

const Context = createContext({
  state: {},
  actions: {},
});

function Provider(props) {
  const [operations, setOperations] = useState();

  const deleteOperation = useCallback((uuid) => {
    setOperations(_.filter(operations, (operation) => operation.uuid !== uuid));
  }, [operations, setOperations]);

  const value = {
    state: {
      operations,
    },
    actions: {
      deleteOperation,
      setOperations,
    },
  };

  return (
    <Context.Provider value={value} {...props} />
  );
}

const useActions = () => useContext(Context).actions;
const useOperations = () => useContext(Context).state.operations;

export default Provider;
export {
  useActions,
  useOperations,
};
