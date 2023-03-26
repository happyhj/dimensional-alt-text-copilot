import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { generateCaption, AnalysisResult, GenerationResult } from '../../service/api';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CachedIcon from '@mui/icons-material/Cached';
import Grid from '@mui/material/Unstable_Grid2';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type AuthoringDialogProps = {
  show: boolean;
  onClose: () => void;
  imageUrl: string | null;
  analysisResult: null| AnalysisResult;
};

export default function AuthoringDialog({ show, onClose, imageUrl, analysisResult }: AuthoringDialogProps) {
  const [loading, setLoading] = useState(false);
  const [userProvidedContext, setUserProvidedContext] = useState('');
  const [userGenerationCnt, setUserGenerationCnt] = useState(0);
  const [generatedCaption, setGeneratedCaption] = useState<GenerationResult | null>(null);

  useEffect(() => {
    if (analysisResult && !loading) {
      const doSubmit = async () => {
        setLoading(true);
        try {
          setGeneratedCaption(await generateCaption(analysisResult, userProvidedContext));
        } catch (error) {
          // Handle error
        } finally {
          setLoading(false);
        }
      };
      
      doSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisResult, userGenerationCnt]);

  function handleOnClose() {
    setGeneratedCaption(null);
    setUserProvidedContext('');
    onClose();
  }

  function handleOnRegenerate() {
    setUserGenerationCnt(userGenerationCnt+1);
  }
  console.log("render", generatedCaption)
  return (
    <div>
      <Dialog
        open={show}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleOnClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: "100%",
            margin: 0,
            height: "100%",
            maxHeight: "100%",
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'right',
        }}>
          <IconButton onClick={handleOnClose} color="primary" aria-label="Close" component="label">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {imageUrl && 
            <Box sx={{ 
              textAlign: 'center',
              marginBottom: '40px',
            }}>
              <img src={imageUrl} height="400px"/>
            </Box>
          }
          {loading && <Grid xs display="flex" justifyContent="center" alignItems="center"><CircularProgress /></Grid>}
          {generatedCaption?.overview && (<>
            <Typography variant="h6">Overview</Typography>
            <Typography>{generatedCaption.overview}</Typography>
            <br/>
          </>)}
          {generatedCaption?.foreground && (<>
            <Typography variant="h6">Foreground</Typography>
            <Typography>{generatedCaption.foreground}</Typography>
            <br/>
          </>)}
          {generatedCaption?.middleground && (<>
            <Typography variant="h6">Middleground</Typography>
            <Typography>{generatedCaption.middleground}</Typography>
            <br/>
          </>)}
          {generatedCaption?.background && (<>
            <Typography variant="h6">Background</Typography>
            <Typography>{generatedCaption.background}</Typography>
          </>)}
          <br/>
          <br/>
          <TextField
            id="outlined-multiline-flexible"
            label="Context"
            multiline
            maxRows={4}
            value={userProvidedContext}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserProvidedContext(event.target.value);
            }}
            sx={{width: '100%'}}
            InputProps={{endAdornment: <IconButton onClick={handleOnRegenerate} color="primary" aria-label="Close" component="label">
            <CachedIcon />
          </IconButton>}}
          />
          
        </DialogContent>
      </Dialog>
    </div>
  );
}