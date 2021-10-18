import SelectAndCropImage, { SelectAndCropImageProvider, SELECT_AND_CROP_IMAGE_RETURN_TYPE } from 'mui-select-and-crop-image';
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
      <SelectAndCropImage image={{ height: 200, width: 700, returnType: SELECT_AND_CROP_IMAGE_RETURN_TYPE.BASE64 }} preview={{ width: 400, url: currentImage }} onResult={handleResult} />
    </SelectAndCropImageProvider>
  );
};

export default App;
