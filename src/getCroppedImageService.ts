import { Area } from '../node_modules/react-easy-crop/types';
import { IFileImage } from './useDropzone';

// ---------------------------------------------------------------------

type IFileReader = (fileImage: IFileImage) => Promise<FileReader>;
type ICreateImage = (fileReaderResult: string) => Promise<HTMLImageElement>;
type IImageLoaded = (image: HTMLImageElement, pixelCrop: Area) => HTMLCanvasElement;

type IGetCroppedImageService = (fileImage: IFileImage, pixelCrop: Area, returnType?: 'blob' | 'base64') => Promise<string>;

// ---------------------------------------------------------------------

const _fileReader: IFileReader = fileImage => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => resolve(fileReader));
    fileReader.addEventListener('error', error => reject(error));
    fileReader.readAsDataURL(fileImage);
  });
};

const _createImage: ICreateImage = fileReaderResult => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = fileReaderResult;
  });
};

const _imageLoaded: IImageLoaded = (image, pixelCrop) => {
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  if (ctx === null) {
    throw new Error('');
  }

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);

  return canvas;
};

// ---------------------------------------------------------------------

const getCroppedImageService: IGetCroppedImageService = async (fileImage, pixelCrop, returnType) => {
  const fileReader = await _fileReader(fileImage);
  const image = await _createImage(fileReader.result as string);
  const canvas = _imageLoaded(image, pixelCrop);

  if (returnType === 'base64') {
    return canvas.toDataURL(fileImage.type);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      if (file === null) {
        return reject();
      }
      resolve(URL.createObjectURL(file));
    }, fileImage.type);
  });
};

export default getCroppedImageService;
