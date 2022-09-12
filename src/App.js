
import './App.css';
import Home from './components/Home';
import Category from './components/Category'
import Navlink from './components/Navlink';
import {Routes, Route} from 'react-router-dom';
import Search from './components/Search';
import Bookmark from './components/Bookmark';
function App() {
  return (
    <div className="App">
      <Navlink/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/category' element={<Category/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path= '/bookmark' element={<Bookmark/>}></Route>
      </Routes>      
    </div>
  );
}

export default App;
