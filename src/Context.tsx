import React, { createContext, FunctionComponent } from 'react';

type IContext = {
  trans: {
    title: string;
    edit: string;
    close: string;
    save: string;
    delete: string;
  };
  colors: {
    loader: string;
  };
};

const defaultValues: IContext = {
  trans: {
    title: 'Crop Image',
    edit: 'Edit',
    close: 'Close',
    save: 'Save',
    delete: 'Delete',
  },
  colors: {
    loader: 'info',
  },
};

const Context = createContext<IContext>(defaultValues);

const Provider: FunctionComponent<IContext> = ({ children, ...value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
