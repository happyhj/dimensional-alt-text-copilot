import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

type UploadButtonProps = {
  onChange: (imageUrl: any) => void;
  hint: string | null | undefined;
};

export default function UploadButton({ onChange, hint }: UploadButtonProps) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Button variant="contained" component="label">
        Upload a new image
        <input hidden accept="image/*" type="file" onChange={onChange} />
      </Button>
      <Typography variant="body1" gutterBottom sx={{ marginTop: '5px' }}>
          {hint}
      </Typography> 
    </Box>
      
  );
}