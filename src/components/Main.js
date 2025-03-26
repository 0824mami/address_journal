import React from 'react'
import '../css/Main.css'
import MvGood from '../img/timeCapsule.jpg'; // GOODモード用の画像
import MvBad from '../img/SereneWaterLily_inTranquilPond_softlyPeaceful.png'; // BADモード用の画像

const Main = ({ mode }) => {
// mode に応じた背景色を指定（GOOD: ピンク、BAD: 青）
    const cardStyle = {
      backgroundColor: mode === 'good' ? '#DE8D8D' : '#F0E7DE',
      // 例として、テキスト色もモードに合わせて変更
      color: mode === 'good' ? '#fff' : '#333'
    };
  // mode に応じた画像を切り替え
  const imageSource = mode === 'good' ? MvGood : MvBad;


  return (
    <main>
      {/* <div className='mainWrapper'> */}
        <div div className='card' style={cardStyle}>
          <h1>What is Lorem Ipsum?</h1>
          </div>
          <div className='main_visual'>
          <img src={imageSource} alt="" width="100%" />
          </div>
      {/* </div> */}
      
    </main>
  )
}

export default Main