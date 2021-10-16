import { Dialog } from '@mui/material';
import React, { FunctionComponent, useMemo } from 'react';
import Crop from './Crop';
import DropArea from './DropArea';
import { IFileImage } from './useDropzone';

// ---------------------------------------------------------------------

type IPreview = { url?: string } & ({ width: number } | { fullWidth: true });
type IImage = { width: number; height: number };

interface IProps {
  preview: IPreview;
  image: IImage;
  onDelete?: VoidFunction;
}

// ---------------------------------------------------------------------

export const ExampleComponent: FunctionComponent<IProps> = ({ preview, image, onDelete }) => {
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

  return (
    <React.Fragment>
      <DropArea {...previewProps} image={preview.url} onDrop={setFile} onDelete={onDelete} />
      <Dialog open={!!file} onClose={handleDialogClose}>
        {file && <Crop image={file} width={image.width} height={image.height} onClose={handleDialogClose} />}
      </Dialog>
    </React.Fragment>
  );
};
