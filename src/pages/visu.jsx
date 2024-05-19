import Visu1 from "./visu1";
import Visu2 from "./visu2";
import Visu3 from "./visu3";
import Visu4 from "./visu4";
import Visu5 from "./visu5";
import Visu6 from "./visu6";
import Visu7 from "./visu7";
import Visu8 from "./visu8";
import Visu9 from "./visu9";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function Visu() {
  return (
    <Routes>
      <Route index element={<Visu1 />} />
      <Route path="/Visu2" element={<Visu2 />} />
      <Route path="/Visu3" element={<Visu3 />} />
      <Route path="/Visu4" element={<Visu4 />} />
      <Route path="/Visu5" element={<Visu5 />} />
      <Route path="/Visu6" element={<Visu6 />} />
      <Route path="/Visu7" element={<Visu7 />} />
      <Route path="/Visu8" element={<Visu8 />} />
      <Route path="/Visu9" element={<Visu9 />} />
    </Routes>
  );
}

export default Visu;
