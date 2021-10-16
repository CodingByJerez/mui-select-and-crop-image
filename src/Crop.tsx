import CloseIcon from '@mui/icons-material/Close';
import PanoramaIcon from '@mui/icons-material/Panorama';
//import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum'; <-- for future up img vertical
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, Slider, Stack } from '@mui/material';
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import Cropper from 'react-easy-crop';
import { IFileImage } from './useDropzone';
import Util from './util';

// ---------------------------------------------------------------------

type IProps = {
  image: IFileImage;
  width: number;
  height: number;
  onClose: VoidFunction;
};

// ---------------------------------------------------------------------

const Crop: FunctionComponent<IProps> = ({ image, width, height, onClose }) => {
  const { minZoom, maxZoom } = useMemo(() => {
    if (height > width) {
      throw new Error('only for horizontal photo for the moment');
    }

    if (image.height < height || image.width < width) {
      throw new Error(`Insufficient image size. image:{ h:${image.height}, w:${image.width} } require:{ h:${height}, w:${width} }`);
    }

    const aspectBox = image.height / image.width;
    let minZoom: number;
    if (image.width > image.height) {
      minZoom = aspectBox / (height / width);
    } else {
      minZoom = aspectBox * (width / height);
    }

    return {
      minZoom: Util.roundDecimal(minZoom, 2),
      maxZoom: Util.roundDecimal((image.width / width) * minZoom, 2),
    };
  }, [image]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(minZoom);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);

  const handleChangeZoom = (_: Event, value: number | number[]) => {
    setZoom(typeof value === 'number' ? value : value[0]);
  };

  const handleSave = () => {
    //
  };

  return (
    <Card>
      <CardHeader
        title={'Crop Image'}
        action={
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Stack width={width} height={height} position={'relative'}>
          <Cropper
            cropSize={{ width, height }}
            showGrid={false}
            minZoom={minZoom}
            maxZoom={maxZoom}
            image={image.preview}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Stack spacing={2} width={'100%'}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <PanoramaIcon />
            <Slider step={0.01} min={minZoom} max={maxZoom} value={zoom} onChange={handleChangeZoom} />
            <PanoramaIcon />
          </Stack>

          <Button onClick={handleSave}>Save</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default Crop;
