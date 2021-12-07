import React, { createContext, FunctionComponent } from 'react';

type IContext = {
  trans: {
    title: string;
    editImage: string;
    close: string;
    save: string;
    delete: string;
  };
  colors: {
    loader: string;
  };
  /*style: {
    PreviewBorderRadius;
  };*/
};

const defaultValues: IContext = {
  trans: {
    title: 'Crop Image',
    editImage: 'Edit image',
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
