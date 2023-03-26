import { useState, useEffect } from 'react';
import { analyzeImage, AnalysisResult} from '../../service/api';
import UploadButton from './UploadButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../../ghost_writer.svg';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

type FileUploadProps = {
  onImageUrlChange: (imageUrl: string | null) => void;
  onAnalysisResultChange: (imageUrl: AnalysisResult | null) => void;
  analysisResult?: AnalysisResult | null;
  onShowAuthoingViewChange: () => void;
};

export default function FileUpload({ onImageUrlChange, onAnalysisResultChange, analysisResult, onShowAuthoingViewChange }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (file && !loading) {
      const doSubmit = async () => {
        setLoading(true);
        try {
          onAnalysisResultChange(await analyzeImage(file));
        } catch (error) {
          // Handle error
        } finally {
          setLoading(false);
        }
      };
      
      doSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      onImageUrlChange(null);
      onAnalysisResultChange(null);

      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      onImageUrlChange(imageUrl);
    } else {
      setFile(null);
      onImageUrlChange('');
      alert('Please select an image file');      
    }
  };

  return (
    <Grid xs display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: '100%', padding: '60px', maxWidth: 500, flexGrow: 1  }}>
        <Typography variant="h5" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="h5" gutterBottom>
          I’m your ghost writer, a chatbot who helps you write an alt text for your image in a minute.
        </Typography> 
        <Grid container minHeight={200}>
          <Grid xs display="flex" justifyContent="center" alignItems="center">
            <img src={logo} alt="ghost writer" />
          </Grid>
        </Grid>

        <Grid container minHeight={80}>
          {!loading && (
            <Grid xs display="flex" justifyContent="center" alignItems="center"><UploadButton onChange={handleFileChange} hint={
              !loading && analysisResult && "Image successfully uploaded"
            }/></Grid>
          )}
          {loading && <Grid xs display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Grid>}
          {loading && <Grid xs display="flex" justifyContent="center" alignItems="center"><Button variant="contained" component="label" onClick={() => {
            setFile(null);
            setLoading(false);
            onImageUrlChange(null);
            onAnalysisResultChange(null);
          }}>Cancel</Button></Grid>}
        </Grid>
        <Grid container minHeight={80}>
        {!loading && analysisResult && <Grid xs display="flex" justifyContent="center" alignItems="center">
            <Button variant="contained" component="label" onClick={onShowAuthoingViewChange}>Enter the chat</Button>
            </Grid>}
        </Grid>
      </Box>
    </Grid>
  );
}
