import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1>高级AI影像编辑</h1>
            <p>使用我们的人工智能技术，轻松抠像和消除不需要的元素，提升您的照片品质</p>
            <div className="hero-buttons">
              <Link to="/editor" className="btn btn-accent">开始编辑</Link>
              <Link to="/gallery" className="btn btn-outline">查看作品集</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/assets/hero-image.png" alt="AI编辑示例" />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>强大的编辑功能</h2>
            <p>我们的AI技术让影像编辑变得简单而专业</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cut"></i>
              </div>
              <h3>智能抠像</h3>
              <p>一键移除背景，保留完美边缘，适用于人像、产品等多种场景</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-magic"></i>
              </div>
              <h3>AI消除</h3>
              <p>智能消除不需要的物体、人物或瑕疵，保持画面自然和谐</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tint"></i>
              </div>
              <h3>色彩增强</h3>
              <p>智能调整色彩平衡和饱和度，使照片更加生动鲜明</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cloud-upload-alt"></i>
              </div>
              <h3>云端存储</h3>
              <p>安全存储您的原始和编辑后的照片，随时随地访问</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>如何使用</h2>
            <p>简单三步，轻松获得专业效果</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>上传图片</h3>
              <p>从您的设备上传照片或直接拖放到编辑区</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>选择功能</h3>
              <p>选择抠像或AI消除功能，根据需要调整参数</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>下载成果</h3>
              <p>处理完成后，预览并下载高质量的编辑结果</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>立即开始您的创作之旅</h2>
          <p>无需专业技能，让AI为您打造完美影像</p>
          <Link to="/editor" className="btn btn-accent">免费试用</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 