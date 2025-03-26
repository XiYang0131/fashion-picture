import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">LUXE AI</Link>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">首页</Link></li>
            <li><Link to="/editor">编辑器</Link></li>
            <li><Link to="/gallery">作品集</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="btn btn-login">登录</button>
          <button className="btn btn-accent">注册</button>
        </div>
      </div>
    </header>
  );
};

export default Header; 