import { Dialog } from '@mui/material';
import React, { FunctionComponent, RefObject, useMemo } from 'react';
import { Provider } from './Context';
import Crop from './Crop';
import DropArea, { IDropAreaRef } from './DropArea';
import { RETURN_TYPE } from './getCroppedImageService';
import { IFileImage } from './useDropzone';

// ---------------------------------------------------------------------

type IPreview = { url?: string; backgroundColor?: string } & ({ width: number } | { fullWidth: true });
type IImage<T extends RETURN_TYPE | undefined> = { width: number; height: number; returnType?: T };

type IProps = {
  onRef?: RefObject<IDropAreaRef>;
  preview: IPreview;
  isLoading?: boolean;
  hideMenuButton?: boolean;
  onDelete?: VoidFunction;
} & (
  | {
      image: IImage<RETURN_TYPE.BLOD | undefined>;
      onResult(image: { url: string; blob: Blob }): void;
    }
  | {
      image: IImage<RETURN_TYPE.BASE64>;
      onResult(image: string): void;
    }
);

// ---------------------------------------------------------------------

const SelectAndCropImage: FunctionComponent<IProps> = ({ onRef, preview, image, hideMenuButton, isLoading, onResult, onDelete, children }) => {
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

  const handleResult = (image: Parameters<IProps['onResult']>[0]): void => {
    onResult(image as any);
    setFile(null);
  };

  return (
    <React.Fragment>
      <DropArea
        ref={onRef}
        {...previewProps}
        isLoading={isLoading}
        hideMenuButton={hideMenuButton}
        minHeight={image.height}
        minWidth={image.width}
        backgroundColor={preview?.backgroundColor}
        image={preview.url}
        onDrop={setFile}
        onDelete={onDelete}
      >
        {children}
      </DropArea>
      <Dialog open={!!file} onClose={handleDialogClose} maxWidth={false}>
        {file && <Crop image={file} width={image.width} height={image.height} returnType={image.returnType} onResult={handleResult} onClose={handleDialogClose} />}
      </Dialog>
    </React.Fragment>
  );
};
export type { IDropAreaRef as ISelectAndCropImageDropAreaRef };
export { SelectAndCropImage, Provider as SelectAndCropImageProvider, RETURN_TYPE as SELECT_AND_CROP_IMAGE_RETURN_TYPE };
export default SelectAndCropImage;
