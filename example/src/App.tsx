import * as React from 'react';
import { ExampleComponent } from 'upload-and-crop-image';
import 'upload-and-crop-image/dist/index.css';

const App: React.FunctionComponent = () => {
  return <ExampleComponent image={{ height: 200, width: 500 }} preview={{ width: 400 }} />;
};

export default App;
