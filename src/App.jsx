import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Section from './components/Section';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import About from './pages/About';
import { signInAnonymously, getCurrentUser } from './modules/auth.repository';
import './css/index.css'


const App = () => {
  // modeの状態を定義（初期は 'good'）
  const [mode, setMode] = useState('good');

  useEffect(() => {
    const login = async () => {
      const user = await getCurrentUser(); // 🔍 セッション確認

      if (!user) {
        try {
          const newUser = await signInAnonymously();
          console.log('匿名ログイン成功:', newUser);
        } catch (error) {
          console.error('匿名ログイン失敗:', error.message);
        }
      } else {
        console.log('既存ユーザー:', user);
      }
    };

    login();
  }, []);
  
  
  return (
    <div className='app'>
        {/* 各コンポーネントにmodeとsetModeを渡す */}
        <Header mode={mode} setMode={setMode} />
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