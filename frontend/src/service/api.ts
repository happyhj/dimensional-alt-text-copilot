import axios from 'axios';

const API_PORT = '8000';
const API_URL = `http://localhost:${API_PORT}/api`; // replace <port> with your desired port number

export type AnalysisResult = Record<string, any>;

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1];
        axios.post(`${API_URL}/analyze/`, { image: base64 }, { headers: { 'Content-Type': 'application/json' } })
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      };
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export type GenerationResult = {
  overview: string;
  foreground?: string;
  middleground?: string;
  background?: string;
}

export const generateCaption = async (analysisResult: AnalysisResult, context: string): Promise<GenerationResult> => {
  try {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/generate_caption/`, { 'analysis_result': analysisResult, 'context': { context } }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {        
        console.log(response.data.image_caption);
        const generationResult: GenerationResult = JSON.parse('{' + response.data.image_caption.split('{')[1]);
        resolve(generationResult)
      })
      .catch((error) => reject(error));
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};