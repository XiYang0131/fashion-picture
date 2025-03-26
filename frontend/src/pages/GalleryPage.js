import React from 'react';
import '../styles/GalleryPage.css';

const GalleryPage = () => {
  // 模拟画廊数据
  const galleryItems = [
    {
      id: 1,
      title: '时尚人像抠像',
      category: '抠像',
      image: '/assets/gallery/gallery1.jpg',
      author: '张设计师'
    },
    {
      id: 2,
      title: '产品完美展示',
      category: '抠像',
      image: '/assets/gallery/gallery2.jpg',
      author: '李摄影'
    },
    {
      id: 3,
      title: '风景修复',
      category: 'AI消除',
      image: '/assets/gallery/gallery3.jpg',
      author: '王编辑'
    },
    {
      id: 4,
      title: '人像美化',
      category: 'AI消除',
      image: '/assets/gallery/gallery4.jpg',
      author: '赵艺术家'
    },
    {
      id: 5,
      title: '建筑抠像',
      category: '抠像',
      image: '/assets/gallery/gallery5.jpg',
      author: '刘建筑师'
    },
    {
      id: 6,
      title: '宠物照片修复',
      category: 'AI消除',
      image: '/assets/gallery/gallery6.jpg',
      author: '陈摄影师'
    }
  ];

  return (
    <div className="gallery-page">
      <div className="container">
        <div className="gallery-header">
          <h1>作品集</h1>
          <p>探索使用我们AI工具创作的精彩作品</p>
        </div>
        
        <div className="gallery-filters">
          <button className="filter-btn active">全部</button>
          <button className="filter-btn">抠像</button>
          <button className="filter-btn">AI消除</button>
        </div>
        
        <div className="gallery-grid">
          {galleryItems.map(item => (
            <div className="gallery-item" key={item.id}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <span className="gallery-category">{item.category}</span>
                </div>
              </div>
              <div className="gallery-info">
                <h3>{item.title}</h3>
                <p>作者: {item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage; 