import './App.css';
import Mainfile from './component/Mainfile';
import LoadingBar from 'react-top-loading-bar';
import {useState} from 'react'

function App() {
const [progress, setProgress] = useState(0);

   return (
    <>
    <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
    <Mainfile setProgress={setProgress}/>
    </>
  );
}

export default App;
