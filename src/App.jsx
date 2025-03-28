import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Section from './components/Section';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import About from './pages/About';
import TestAnimation from './components/TestAnimation'
import './css/index.css'


const App = () => {
  // modeの状態を定義（初期は 'good'）
  const [mode, setMode] = useState('good');
  
  return (
    <div className='app'>
        {/* 各コンポーネントにmodeとsetModeを渡す */}
        <Header mode={mode} setMode={setMode} />
        <TestAnimation />
          <Main mode={mode} />
            <Section mode={mode} />
            <Routes>
              <Route path="/contact" element={<Contact mode={mode} />} />
              <Route path="/about" element={<About mode={mode} />} />
            </Routes>
        <Footer />
    </div>
  )
}

export default App