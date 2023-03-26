import { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import { AnalysisResult } from './service/api'
// import ImageAnalysis from './components/ImageAnalysis/ImageAnalysis';
import AuthoringDialog from './components/Authoring/AuthoringDialog';

function App() {
  const [imagePreview, setImagePreview] = useState<null| string>(null);
  const [analysisResult, setAnalysisResult] = useState<null| AnalysisResult>(null);
  const [showAuthoringDialog, setShowAuthoringDialog] = useState<boolean>(false);

  return (
    <div>
      <FileUpload 
        onImageUrlChange={(imageUrl: null| string) => {
          setImagePreview(imageUrl)
        }} 
        onAnalysisResultChange={(analysisResult: null| AnalysisResult) => {
          setAnalysisResult(analysisResult);
        }}
        analysisResult={analysisResult}
        onShowAuthoingViewChange={() => {
          setShowAuthoringDialog(true)
        }}
      />
      <AuthoringDialog analysisResult={analysisResult} show={showAuthoringDialog} imageUrl={imagePreview} onClose={() => {
        setShowAuthoringDialog(false);
        setImagePreview(null);
        setAnalysisResult(null);
      }}/>
    </div>
  );
}

export default App;