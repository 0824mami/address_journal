import React, { useState } from 'react'
import '../css/Main.css'
import MvGood from '../img/timeCapsule.jpg'; // GOODモード用の画像
import MvBad from '../img/SereneWaterLily_inTranquilPond_softlyPeaceful.png';
import JournalList from './JournalList';

const Main = ({ mode }) => {
// mode に応じた背景色を指定（GOOD: ピンク、BAD: 青）
    const cardStyle = {
      backgroundColor: mode === 'good' ? '#DE8D8D' : '#F0E7DE',
      // 例として、テキスト色もモードに合わせて変更
      color: mode === 'good' ? '#fff' : '#333'
    };
  // mode に応じた画像を切り替え
  const imageSource = mode === 'good' ? MvGood : MvBad;
  const [showList, setShowList] = useState(false);

  const welcomeTextH1 = mode === 
  'good' ? 'ようこそ! 今日のあなた' : 'おつかれさま、今日のあなた。';
  const welcomeTextP = mode === 
  'good' ? 'このページは、「未来の自分」に向けた手紙を書くための空間です。叶っていない夢、挑戦してみたいこと、ちょっと先の笑顔の自分を、先に描いてみませんか？' 
  : 'おつかれさま、今日のあなた。';
  

  return (
    <main>
      <div className='mainWrapper'>
        <div className='main_visual'>
              <img src={imageSource} alt="" width="100%" />
        </div>
          <div className='card' style={cardStyle}>
              <h1>{ welcomeTextH1 }</h1>
              <p>{ welcomeTextP }</p>
         
          {/* <h1>Welcome, today's you.</h1>
          <p>This space is for writing letters to your future self.

            A dream you haven't reached yet, a challenge you'd like to try—  
            what if you sketched out your smiling self a little ahead of time?
            </p> */}
        </div>
        <button className='toggleJournalBtn'
            onClick={() => setShowList(!showList)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2, // 画像より前面に表示
            }}>
              {showList ? '📕 閉じる' : '📓 過去のジャーナルを見る'}
            </button>
            {showList && (
              <JournalList />
            )} 
      </div>
    </main>
  )
}

export default Main