import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { AnalysisResult } from '../../service/api';

interface Props {
  imagePreview: string;
  analysisResult: AnalysisResult | null;
}

const ImageAnalysis = ({ imagePreview, analysisResult }: Props) => {
  return (
    <Card 
      sx={{ maxWidth: 345 }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={imagePreview}
        title="place holder"
      />
      {analysisResult && (<CardContent>
        <Typography variant="body2" color="text.secondary">
          {analysisResult && (JSON.stringify(analysisResult, null, 2))}
        </Typography>
      </CardContent>)}
    </Card>
  );
}

export default ImageAnalysis;