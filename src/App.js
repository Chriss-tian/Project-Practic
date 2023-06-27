import {useState, useEffect}from 'react';
//import * as mobilenet from "@tensorflow-models/mobilenet";

function App() {
  const [isModelLoading, setIsModelLoading]=useState(false) // pentru afisarea Loadingului
  const [model, setModel]=useState(null)  //model - state null
  const [imageURL, setImageURL] = useState(null);

  const loadModel = async () => {
    setIsModelLoading(true);
    // Simulează încărcarea modelului
    setTimeout(() => {
      setIsModelLoading(false);
    }, 2000); // După 2 secunde, se oprește afișarea "Model Loading..."
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


useEffect(() =>{
   loadModel()
},[])

if (isModelLoading){
  return <h2>Model Loaging . . .</h2>
}

console. log(imageURL)


  return (
    <div className="App">
      <h1 className='header'>Image Identification</h1>
      <div className='inputHolder'>
        <input type='file' accept='image/*' capture='camera' className='uploadInput'
        onChange={uploadImage}/>
      </div>
      
    </div>
  );
}

export default App;
