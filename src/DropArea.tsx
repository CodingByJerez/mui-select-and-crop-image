import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, Box, Divider, Fab, Menu, MenuItem, styled } from '@mui/material';
import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import useDropImage, { IFileImage } from './useDropzone';

// ---------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  border: 0,
  borderStyle: 'dotted',
  borderRadius: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.72),
}));

const CoverStyle = styled('img')(({ theme }) => ({
  zIndex: 10,
  top: 0,
  borderRadius: theme.spacing(1),
  objectFit: 'cover',
  position: 'absolute',
  width: '100%',
  height: '100%',
}));

// ---------------------------------------------------------------------

type IDropAreaProps = {
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

const DropArea: FunctionComponent<IDropAreaProps> = ({ width, aspect, onDelete, onDrop, minWidth, minHeight, ...props }) => {
  const [image, setImage] = useState<null | string>(props.image || null);
  const [anchorOption, setAnchorOption] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (props.image !== image) {
      setImage(props.image || null);
    }
  }, [props.image]);

  const { getRootProps, open, getInputProps } = useDropImage({ onDrop, minWidth, minHeight });

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
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
    <Box sx={{ width }}>
      <CardMediaStyle {...getRootProps()} sx={{ paddingTop: `calc(100% * ${aspect})` }}>
        {image && <CoverStyle alt="Preview Image" src={image} />}
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

export default DropArea;
