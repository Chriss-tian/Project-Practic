import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [isModelLoading, setIsModelLoading]=useState(false) // pentru afisarea Loading
  const [model, setModel]=useState(null)  //model - state null
  const [imageURL, setImageURL] = useState(null);
  const [results, setResults] = useState([])

  const imageRef = useRef()

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setIsModelLoading(false);
    } catch (error) {
      console.log("Error loading model:", error);
      setIsModelLoading(false);
    }
  };
  

const uploadImage = (e) => {
  const { files } = e.target
  if (files.length > 0) {
const url = URL.createObjectURL(files[0]) 
setImageURL(url)
  }else {
    setImageURL(null)
  }
}

const identify = async () => {
  if (model) {
    const results = await model.classify(imageRef.current);
    setResults(results)
  } else {
    console.log("Model is not loaded yet");
  }
}


useEffect(() =>{
   loadModel()
},[])

if (isModelLoading){
  return <h2>Model Loading . . .</h2>
}

console.log(results)


  return (
    <div className="App">
      <h1 className='header'>Image Identification</h1>
      <div className='inputHolder'>
        <input type='file' accept='image/*' capture='camera' className='uploadInput'
        onChange={uploadImage}/>
      </div>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
            {imageURL && <img src={imageURL} alt="Upload Preview"
            crossOrigin="anonymous" ref={imageRef} />}
          </div>
          {results.length > 0 && <div className='resultsHolder'>
            {results.map((result, index) => {
              return (
                <div className='result' key={result.className}>
                   <span className='name'>{result.className}</span>
                   <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
            </div>
            )
            })}
          </div>}
        </div>
        {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
      </div>
    </div>
  );
}

export default App;
