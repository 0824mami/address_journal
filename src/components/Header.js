import React from 'react';
import { Link } from 'react-router-dom'
import Menu from './svg/bars-solid.svg'
import Close from './svg/times-solid.svg'
import MoonIcon from './svg/cloud-moon-solid.svg'
import SunIcon from './svg/sun-solid.svg'
import '../css/Header.css'


const Header = ({ mode, setMode }) => {
    // 月アイコンがクリックされたら背景色を変更する関数
    // const handleMoonClick = () => {
    //     setMode('bad');
    // };

    // const handleSunClick = () => {
    //     setMode('good');
    // };

    // modeに基づいて背景色を設定
    const bgColor = mode === 'good' ? '#F3EBDE' : '#CEDEDE';

    // モード切替のトグル関数
    const toggleMode = () => {
        setMode(mode === 'good' ? 'bad' : 'good');
    };

    return (
        // インラインスタイルで背景色を適用
        <header style={{ background: bgColor }}>
            <div className='menu'>
                <img src={Menu} alt="" width="20" />
            </div>
            <div className="logo">
                <h1><Link to='/'>Address</Link></h1>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/service">Service</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/logon">Login</Link></li>
                    <li className="close">
                        <img src={Close} alt="" width="22" />
                    </li>
                    <li className="nav_toggle">
                        <span>0</span>
                        {/* 月アイコンにクリックイベントを追加 */}
                        <button onClick={toggleMode}>
                            {mode === 'good' ? (
                                <img src={MoonIcon} alt="Switch to Bad Mode" width="20" />
                            ) : (
                                <img src={SunIcon} alt="Switch to Good Mode" width="20" />
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>

    )
}

export default Header