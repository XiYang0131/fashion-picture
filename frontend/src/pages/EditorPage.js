import React, { useState, useRef } from 'react';
import '../styles/EditorPage.css';

const EditorPage = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('remove-bg');
  const [eraseMode, setEraseMode] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBackground = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    
    try {
      // 这里会调用后端API进行抠像处理
      const formData = new FormData();
      const blob = await fetch(image).then(r => r.blob());
      formData.append('image', blob);
      
      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setProcessedImage(data.processedImage);
      } else {
        console.error('处理失败');
      }
    } catch (error) {
      console.error('处理出错:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAIRemove = async () => {
    if (!image) return;
    setIsProcessing(true);
    
    // 模拟AI消除处理
    setTimeout(() => {
      setProcessedImage(image); // 实际应用中这里会是处理后的图片
      setIsProcessing(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (processedImage) {
      const a = document.createElement('a');
      a.href = processedImage;
      a.download = 'luxe-ai-edited-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="editor-page">
      <div className="container">
        <div className="editor-header">
          <h1>高级影像编辑</h1>
          <p>使用我们的AI技术，轻松抠像和消除不需要的元素</p>
        </div>
        
        <div className="editor-tabs">
          <button 
            className={`tab-btn ${activeTab === 'remove-bg' ? 'active' : ''}`}
            onClick={() => setActiveTab('remove-bg')}
          >
            抠像
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ai-remove' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai-remove')}
          >
            AI消除
          </button>
        </div>
        
        <div className="editor-content">
          <div className="upload-section">
            {!image ? (
              <div className="upload-box" onClick={() => fileInputRef.current.click()}>
                <i className="fas fa-cloud-upload-alt"></i>
                <p>点击或拖拽上传图片</p>
                <span>支持 JPG, PNG 格式</span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
              </div>
            ) : (
              <div className="image-preview">
                <img src={image} alt="原图" />
                {activeTab === 'ai-remove' && (
                  <div className="erase-tools">
                    <button 
                      className={`erase-btn ${eraseMode ? 'active' : ''}`}
                      onClick={() => setEraseMode(!eraseMode)}
                    >
                      <i className="fas fa-eraser"></i> 擦除模式
                    </button>
                    <div className="brush-size">
                      <span>笔刷大小:</span>
                      <input type="range" min="5" max="50" defaultValue="20" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="actions-section">
            {image && (
              <>
                {activeTab === 'remove-bg' ? (
                  <button 
                    className="btn btn-accent action-btn" 
                    onClick={handleRemoveBackground}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '处理中...' : '抠像'}
                  </button>
                ) : (
                  <button 
                    className="btn btn-accent action-btn" 
                    onClick={handleAIRemove}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '处理中...' : '应用AI消除'}
                  </button>
                )}
                <button className="btn action-btn" onClick={() => setImage(null)}>
                  重新上传
                </button>
              </>
            )}
          </div>
          
          {processedImage && (
            <div className="result-section">
              <h3>处理结果</h3>
              <div className="result-image">
                <img src={processedImage} alt="处理后的图片" />
              </div>
              <button className="btn btn-accent" onClick={handleDownload}>
                <i className="fas fa-download"></i> 下载图片
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage; 