import React, { useState, useRef } from 'react';
import '../styles/EditorPage.css';

const API_URL = 'https://luxe-ai-backend.448749018.workers.dev';

const EditorPage = () => {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('remove-bg');
  const [eraseMode, setEraseMode] = useState(false);
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
      // 从 base64 数据 URL 创建 Blob
      const blob = await fetch(image).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, 'image.png');
      
      // 调用后端 API
      const response = await fetch(`${API_URL}/api/remove-background`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProcessedImage(data.processedImage);
        } else {
          console.error('处理失败:', data.message);
        }
      } else {
        console.error('API 请求失败');
      }
    } catch (error) {
      console.error('处理出错:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const createMaskFromEraseMode = async () => {
    // 创建一个简单的黑色掩码图像（在实际应用中，这应该基于用户的擦除操作）
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 获取原始图像的尺寸
    const img = new Image();
    img.src = image;
    await new Promise(resolve => {
      img.onload = resolve;
    });
    
    canvas.width = img.width;
    canvas.height = img.height;
    
    // 创建黑色背景（表示不擦除的区域）
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 在中心位置绘制一个白色圆形（表示要擦除的区域）
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // 将 canvas 转换为 blob
    return new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png');
    });
  };

  const handleAIRemove = async () => {
    if (!image) return;
    setIsProcessing(true);
    
    try {
      // 从 base64 数据 URL 创建 Blob
      const blob = await fetch(image).then(r => r.blob());
      
      // 创建掩码数据 (在实际应用中，这应该是用户绘制的掩码)
      const maskBlob = await createMaskFromEraseMode();
      
      const formData = new FormData();
      formData.append('file', blob, 'image.png');
      formData.append('mask', maskBlob, 'mask.png');
      
      // 调用后端 API
      const response = await fetch(`${API_URL}/api/remove-object`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProcessedImage(data.processedImage);
        } else {
          console.error('处理失败:', data.message);
        }
      } else {
        console.error('API 请求失败');
      }
    } catch (error) {
      console.error('处理出错:', error);
    } finally {
      setIsProcessing(false);
    }
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