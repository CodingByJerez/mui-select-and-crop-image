import SelectAndCropImage, { SelectAndCropImageProvider, SELECT_AND_CROP_IMAGE_RETURN_TYPE } from 'mui-select-and-crop-image';
import React, { useState } from 'react';

const App: React.FunctionComponent = () => {
  const [currentImage, setCurrentImage] = useState<undefined | string>();

  const handleResult = (newImage: string) => {
    console.log('newImage:', newImage);
    setCurrentImage(newImage);
  };

  return (
    <SelectAndCropImageProvider
      trans={{
        title: "Editer l'image",
        editImage: 'Editer image',
        save: 'Enregistrer',
        delete: 'Supprimer',
        close: 'Fermer',
      }}
      colors={{
        loader: '#FFFFFF',
      }}
    >
      <SelectAndCropImage image={{ height: 200, width: 700, returnType: SELECT_AND_CROP_IMAGE_RETURN_TYPE.BASE64 }} preview={{ width: 400, url: currentImage }} onResult={handleResult}>
        sdsd
      </SelectAndCropImage>
    </SelectAndCropImageProvider>
  );
};

export default App;
