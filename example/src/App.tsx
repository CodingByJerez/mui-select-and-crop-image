import SelectAndCropImage, { SelectAndCropImageProvider } from 'mui-select-and-crop-image';
import React, { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [currentImage, setCurrentImage] = useState<undefined | string>();

  const handleResult = (newImage: string) => {
    setCurrentImage(newImage);
  };

  return (
    <SelectAndCropImageProvider
      trans={{
        title: "Editer l'image",
        edit: 'Editer',
        save: 'Enregistrer',
        delete: 'Supprimer',
        close: 'Fermer',
      }}
    >
      <SelectAndCropImage image={{ height: 200, width: 700 }} preview={{ width: 400, url: currentImage }} onResult={handleResult} />;
    </SelectAndCropImageProvider>
  );
};

export default App;
