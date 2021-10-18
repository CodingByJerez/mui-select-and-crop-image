import { Dialog } from '@mui/material';
import React, { FunctionComponent, useMemo } from 'react';
import { Provider } from './Context';
import Crop from './Crop';
import DropArea from './DropArea';
import { RETURN_TYPE } from './getCroppedImageService';
import { IFileImage } from './useDropzone';

// ---------------------------------------------------------------------

type IPreview = { url?: string } & ({ width: number } | { fullWidth: true });
type IImage = { width: number; height: number; returnType?: RETURN_TYPE };

interface IProps {
  preview: IPreview;
  image: IImage;
  isLoading?: boolean;
  onResult(image: string): void;
  onDelete?: VoidFunction;
}

// ---------------------------------------------------------------------

const SelectAndCropImage: FunctionComponent<IProps> = ({ preview, image, isLoading, onResult, onDelete }) => {
  const [file, setFile] = React.useState<null | IFileImage>(null);

  const previewProps = useMemo(() => {
    if (image.height > image.width) {
      throw new Error('only for horizontal photo for the moment');
    }
    return {
      width: 'width' in preview ? preview.width : '100%',
      aspect: image.height / image.width,
    };
  }, []);

  const handleDialogClose = (): void => {
    setFile(null);
  };

  const handleResult = (image: string): void => {
    onResult(image);
    setFile(null);
  };

  return (
    <React.Fragment>
      <DropArea {...previewProps} isLoading={isLoading} minHeight={image.height} minWidth={image.width} image={preview.url} onDrop={setFile} onDelete={onDelete} />
      <Dialog open={!!file} onClose={handleDialogClose} maxWidth={false}>
        {file && <Crop image={file} width={image.width} height={image.height} onResult={handleResult} onClose={handleDialogClose} />}
      </Dialog>
    </React.Fragment>
  );
};

export { SelectAndCropImage, Provider as SelectAndCropImageProvider, RETURN_TYPE as SELECT_AND_CROP_IMAGE_RETURN_TYPE };
export default SelectAndCropImage;
