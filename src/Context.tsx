import React, { createContext, FunctionComponent } from 'react';

type IContext = {
  trans: {
    title: string;
    edit: string;
    close: string;
    save: string;
    delete: string;
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
};

const Context = createContext<IContext>(defaultValues);

const Provider: FunctionComponent<IContext> = ({ trans, children }) => {
  return <Context.Provider value={{ trans }}>{children}</Context.Provider>;
};

export { Context, Provider };
