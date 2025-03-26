import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <h3>LUXE AI</h3>
          <p>高级影像编辑工具</p>
        </div>
        <div className="footer-links">
          <div className="footer-links-column">
            <h4>功能</h4>
            <ul>
              <li><a href="/editor">抠像工具</a></li>
              <li><a href="/editor">AI消除</a></li>
              <li><a href="/gallery">作品集</a></li>
            </ul>
          </div>
          <div className="footer-links-column">
            <h4>关于我们</h4>
            <ul>
              <li><a href="#">公司介绍</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">隐私政策</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-newsletter">
          <h4>订阅我们的通讯</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="输入您的邮箱" />
            <button className="btn btn-accent">订阅</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} LUXE AI. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 