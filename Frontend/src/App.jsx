import { Routes, Route } from 'react-router-dom';
import Additems from './components/additems.jsx';
import ItemList from './components/Itemlist.jsx';

export default function App() {
  return (
    <>
    <Routes>

      <Route path="/" element={<ItemList />} />
      <Route path="/add" element={<Additems />} />

    </Routes>



    </>
  );
}