import './App.css';
import ImageSlider from './ImageSlider';
function App() {
  return (
    <div className="App">
<ImageSlider
limit={10}
url={"https://picsum.photos/v2/list"}
></ImageSlider>
    </div>
  );
}

export default App;
