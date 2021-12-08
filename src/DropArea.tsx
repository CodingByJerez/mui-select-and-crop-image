import MoreVertIcon from '@mui/icons-material/MoreVert';
import { alpha, Box, CircularProgress, Divider, Fab, Menu, MenuItem, styled } from '@mui/material';
import React, { forwardRef, ForwardRefRenderFunction, MouseEvent, ReactNode, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import useDropImage, { IFileImage } from './useDropzone';
import useStore from './useStore';

// ---------------------------------------------------------------------

const CardMediaStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  border: 0,
  borderStyle: 'dotted',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius, //theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.72),
}));

const CoverStyle = styled('img')(({ theme }) => ({
  zIndex: 10,
  top: 0,
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover',
  position: 'absolute',
  width: '100%',
  height: '100%',
}));

// ---------------------------------------------------------------------

type IDropAreaProps = {
  backgroundType?: 'solid' | 'checkerboard';
  backgroundColor?: string;
  isLoading?: boolean;
  hideMenuButton?: boolean;
  width: string | number;
  aspect: number;
  image?: string;
  minWidth: number;
  minHeight: number;
  drop?: boolean;
  onDrop: (file: IFileImage) => void;
  onDelete?: VoidFunction;
  children: ReactNode;
};

type IDropAreaRef = {
  open: VoidFunction;
};

type IDropAreaRooms = ForwardRefRenderFunction<IDropAreaRef, IDropAreaProps>;

// ---------------------------------------------------------------------

const DropArea: IDropAreaRooms = (
  {
    width,
    aspect,
    isLoading,
    hideMenuButton,
    onDelete,
    onDrop,
    minWidth,
    minHeight,
    children,
    backgroundColor,
    backgroundType,
    ...props
  }: IDropAreaProps /* Temp wait up microbundle for comp eslint 8 */,
  ref,
) => {
  const { trans, colors } = useStore();

  const [image, setImage] = useState<null | string>(props.image || null);
  const [anchorOption, setAnchorOption] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (props.image !== image) {
      setImage(props.image || null);
    }
  }, [props.image]);

  const { getRootProps, open, getInputProps } = useDropImage({ onDrop, minWidth, minHeight });

  useImperativeHandle(ref, () => ({
    open,
  }));

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorOption(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorOption(null);
  };

  const handleClickDelete = (): void => {
    onDelete!();
    setAnchorOption(null);
  };

  const handleClickEdit = (): void => {
    setAnchorOption(null);
    open();
  };

  const sxCard = useMemo(() => {
    const sx: Record<string, string | undefined> = { paddingTop: `calc(100% * ${aspect})` };
    if (backgroundType === 'checkerboard') {
      sx.backgroundColor = '#FFFFFF';
      sx.backgroundImage = 'linear-gradient(45deg, #EEE 25%, transparent 25%, transparent 75%, #EEE 75%), linear-gradient(45deg, #EEE 25%, transparent 25%, transparent 75%, #EEE 75%)';
      sx.backgroundSize = '10px 10px';
      sx.backgroundPosition = '0 0, 5px 5px';
    } else {
      sx.backgroundColor = backgroundColor || colors.backgroundColor;
    }
    return sx;
  }, [backgroundType, backgroundColor, colors.backgroundColor]);

  const enDelete: boolean = !!onDelete && !!image;
  return (
    <Box sx={{ width }}>
      <CardMediaStyle {...getRootProps()} sx={sxCard}>
        <Box display={'flex'} position={'absolute'} top={0} bottom={0} left={0} right={0} justifyContent={'center'} alignItems={'center'}>
          {image && <CoverStyle alt="Preview Image" src={image} />}
          {children && (
            <Box width={'100%'} height={'100%'} position={'relative'} borderRadius={1}>
              {children}
            </Box>
          )}
          {isLoading && (
            <Box display={'flex'} position={'absolute'} top={0} bottom={0} left={0} right={0} zIndex={10} justifyContent={'center'} alignItems={'center'}>
              <CircularProgress color="info" sx={{ color: colors.loader }} />
            </Box>
          )}
          {!hideMenuButton && (
            <Box position="absolute" top={0} right={0} m={1} zIndex={11}>
              <Fab size="small" color="default" onClick={handleClick}>
                <MoreVertIcon />
              </Fab>
              <Menu anchorEl={anchorOption} open={!!anchorOption} onClose={handleClose}>
                <MenuItem onClick={handleClickEdit}>{trans.editImage}</MenuItem>
                {enDelete && <Divider />}
                {enDelete && (
                  <MenuItem color="error" onClick={handleClickDelete}>
                    {trans.delete}
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
          <input {...getInputProps()} />
        </Box>
      </CardMediaStyle>
    </Box>
  );
};

export type { IDropAreaRef };
export default forwardRef<IDropAreaRef, IDropAreaProps>(DropArea);
