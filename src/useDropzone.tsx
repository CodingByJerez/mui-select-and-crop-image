import { DropEvent, DropzoneState, FileError, useDropzone } from 'react-dropzone';

// ---------------------------------------------------------------------

type IFileImage = File & {
  height: number;
  width: number;
  preview: string;
};

interface IProps {
  onDrop: (file: IFileImage) => void;
  minWidth?: number;
  minHeight?: number;
}

// ---------------------------------------------------------------------

const _customFileAddWidthAndHeight = async (event: DropEvent): Promise<IFileImage[]> => {
  const fileList = 'dataTransfer' in event ? event.dataTransfer?.files : (event.target as any)?.files;
  const promises: Promise<IFileImage>[] = [];
  for (let i = 0; i < fileList.length; i++) {
    const file: IFileImage = fileList.item(i);
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    const promise = new Promise<IFileImage>(resolve => {
      const image = new Image();
      image.onload = function () {
        file.width = image.width;
        file.height = image.height;
        resolve(file);
      };
      const url = URL.createObjectURL(file);
      image.src = url;
    });
    promises.push(promise);
  }
  return Promise.all(promises);
};

const _validatorImage = (file: IFileImage, minWidth?: number, minHeight?: number): FileError | null => {
  if ((minWidth || 0) > file.width || (minHeight || 0) > file.width) {
    return {
      code: 'small-width',
      message: `Image width must be greater than w:${minWidth}, h:${minHeight}`,
    };
  }
  return null;
};

const _onDrop =
  (onDrop: IProps['onDrop']) =>
  (acceptedFiles: IFileImage[]): void => {
    const file = acceptedFiles[0];
    if (file) {
      onDrop(file);
    }
  };

// ---------------------------------------------------------------------

const useDropImage = ({ onDrop, minWidth, minHeight }: IProps): DropzoneState => {
  return useDropzone({
    accept: 'image/*',
    multiple: false,
    noClick: true,
    noKeyboard: true,
    onDrop: _onDrop(onDrop) as any,
    validator: file => _validatorImage(file as unknown as IFileImage, minWidth, minHeight),
    getFilesFromEvent: _customFileAddWidthAndHeight,
  });
};

export type { IFileImage };
export default useDropImage;
