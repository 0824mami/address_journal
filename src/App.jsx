import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Section from './components/Section';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import About from './pages/About';



const App = () => {
  // modeの状態を定義（初期は 'good'）
  const [mode, setMode] = useState('good');
  // render
  return (
    <div className='app'>
      <Router>
        {/* 各コンポーネントにmodeとsetModeを渡す */}
        <Header mode={mode} setMode={setMode} />
        <Main mode={mode} />
        <Section mode={mode} />
        <Routes>
          <Route path="/contact" element={<Contact mode={mode} />} />
          <Route path="/about" element={<About mode={mode} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App