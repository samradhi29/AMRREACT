import { Routes, Route } from 'react-router-dom';
import Additems from './components/additems';
import ItemList from './components/Itemlist';

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