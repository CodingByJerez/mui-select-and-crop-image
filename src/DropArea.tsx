import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, Box, CircularProgress, Divider, Fab, Menu, MenuItem, styled } from '@mui/material';
import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import useDropImage, { IFileImage } from './useDropzone';
import useStore from './useStore';

// ---------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  border: 0,
  borderStyle: 'dotted',
  alignItems: 'center',
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
  isLoading?: boolean;
  width: string | number;
  aspect: number;
  image?: string;
  minWidth: number;
  minHeight: number;
  drop?: boolean;
  onDrop: (file: IFileImage) => void;
  onDelete?: VoidFunction;
};

// ---------------------------------------------------------------------

const DropArea: FunctionComponent<IDropAreaProps> = ({ width, aspect, isLoading, onDelete, onDrop, minWidth, minHeight, ...props }) => {
  const { trans } = useStore();

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
        <Box display={'flex'} position={'absolute'} top={0} bottom={0} left={0} right={0} justifyContent={'center'} alignItems={'center'}>
          {!isLoading && <CircularProgress color="info" />}
          {image && <CoverStyle alt="Preview Image" src={image} />}
          <Box position="absolute" top={0} right={0} m={1} zIndex={11}>
            <Fab size="small" color="default" onClick={handleClick}>
              <MoreVertIcon />
            </Fab>
            <Menu anchorEl={anchorOption} open={!!anchorOption} onClose={handleClose}>
              <MenuItem onClick={handleClickEdit}>{trans.edit}</MenuItem>
              {onDelete && image && (
                <React.Fragment>
                  <Divider />
                  <MenuItem color="error" onClick={handleClose}>
                    {trans.delete}
                  </MenuItem>
                </React.Fragment>
              )}
            </Menu>
          </Box>
          <input {...getInputProps()} />
        </Box>
      </CardMediaStyle>
    </Box>
  );
};

export default DropArea;
