import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, Box, Divider, Fab, Menu, MenuItem, styled } from '@mui/material';
import React, { FunctionComponent, useEffect, useState } from 'react';
import useDropImage, { IFileImage } from './useDropzone';
import Util from './util';

// ---------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  paddingTop: 'calc(100% * 9 / 32)',
  '&:before': {
    top: 0,
    zIndex: 2,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    borderRadius: theme.shape.borderRadius,

    backgroundColor: alpha(theme.palette.primary.dark, 0.72),
  },
}));

const CoverStyle = styled('img')(() => ({
  zIndex: 10,
  top: 8,
  borderRadius: 1,
  objectFit: 'cover',
  position: 'absolute',
  width: 'calc(100% - 16px)',
  height: 'calc(100% - 16px)',
}));

// ---------------------------------------------------------------------

type IPreviewProps = {
  width: string | number;
  aspect: number;
  image?: string;
  minWidth?: number;
  minHeight?: number;
  drop?: boolean;
  onDrop: (file: IFileImage) => void;
  onDelete?: VoidFunction;
};

// ---------------------------------------------------------------------

const Preview: FunctionComponent<IPreviewProps> = ({ width, aspect, onDelete, onDrop, minWidth, minHeight, ...props }) => {
  const [image, setImage] = useState<null | string>(props.image || null);
  const [anchorOption, setAnchorOption] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (props.image !== image) {
      setImage(props.image || null);
    }
  }, [props.image]);

  const { getRootProps, open, getInputProps } = useDropImage({ onDrop, minWidth, minHeight });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorOption(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorOption(null);
  };

  const handleClickEdit = (): void => {
    setAnchorOption(null);
    open();
  };

  return (
    <Box width={width}>
      <CardMediaStyle sx={{ paddingTop: `calc(100% * ${aspect})` }} {...getRootProps({ className: 'dropzone' })}>
        {image && <CoverStyle alt="image preview" src={Util.isString(image) ? image : (image as any).preview} />}
        <Box position="absolute" top={0} right={0} m={1} zIndex={11}>
          <Fab size="small" color="default" onClick={handleClick}>
            <MoreVertIcon />
          </Fab>
          <Menu anchorEl={anchorOption} open={!!anchorOption} onClose={handleClose}>
            <MenuItem onClick={handleClickEdit}>Edit</MenuItem>
            {onDelete && image && (
              <React.Fragment>
                <Divider />
                <MenuItem color="error" onClick={handleClose}>
                  delete
                </MenuItem>
              </React.Fragment>
            )}
          </Menu>
        </Box>
        <input {...getInputProps()} />
      </CardMediaStyle>
    </Box>
  );
};

export default Preview;
