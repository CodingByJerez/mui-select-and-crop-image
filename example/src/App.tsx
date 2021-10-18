import SelectAndCropImage from 'mui-select-and-crop-image';
import React, { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [currentImage, setCurrentImage] = useState<undefined | string>();

  const handleResult = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return <SelectAndCropImage image={{ height: 200, width: 500 }} preview={{ width: 400, url: currentImage }} onResult={handleResult} />;
};

export default App;
