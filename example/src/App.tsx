import React, { useState } from 'react';
import { ExampleComponent } from 'upload-and-crop-image';
import 'upload-and-crop-image/dist/index.css';

const App: React.FunctionComponent = () => {
  const [currentImage, setCurrentImage] = useState<undefined | string>();

  const handleResult = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return <ExampleComponent image={{ height: 200, width: 500 }} preview={{ width: 400, url: currentImage }} onResult={handleResult} />;
};

export default App;
