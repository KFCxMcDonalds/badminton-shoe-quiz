import React, { useState, useRef, useEffect } from 'react';

// 科技词典
const techDictionary = {
  'Power Cushion': { name: 'Power Cushion 动力垫', brand: 'YONEX', desc: 'YONEX核心缓震科技，特殊弹性材料受冲击后快速恢复，将能量转化为回弹动力。官方演示：7米落蛋不破还能弹起4米。' },
  'Power Cushion+': { name: 'Power Cushion+ 动力垫Plus', brand: 'YONEX', desc: '动力垫升级版，添加特殊弹性树脂+网格凹槽设计，冲击吸收+28%，回弹+62%。' },
  'Feather Bounce Form': { name: 'Feather Bounce Form', brand: 'YONEX', desc: '2024年新科技，比上代轻8%、回弹提升20%，兼顾轻量与弹性的新一代中底材料。' },
  'Feather Light X': { name: 'Feather Light X', brand: 'YONEX', desc: '史上最轻中底材料，比传统材料轻12%，专为Aerus系列打造的极致轻量科技。' },
  'Lateral Shell': { name: 'Lateral Shell 侧向支撑壳', brand: 'YONEX', desc: '鞋侧硬质支撑结构，防止横向移动时能量损失和侧翻，增强稳定性。' },
  'BOA': { name: 'BOA旋钮系统', brand: '通用', desc: '来自滑雪装备的精密调节系统，旋钮可毫米级调节松紧度，单手操作，包裹精准。' },
  'NitroLite': { name: 'NitroLite 氮气发泡', brand: 'VICTOR', desc: 'VICTOR核心科技，超临界氮气注入EVA实现均匀发泡，同时达成轻量+高回弹+耐久，对标Nike ZoomX。' },
  'ENERGYMAX': { name: 'ENERGYMAX 能量垫', brand: 'VICTOR', desc: 'VICTOR经典缓震科技，3.0版本比传统EVA回弹+62%，耐久性和保形性出色。' },
  'HYPEREVA': { name: 'HYPEREVA', brand: 'VICTOR', desc: '高性能轻量EVA材料，软弹脚感与避震回弹兼具，常与NitroLite搭配使用。' },
  'VSR': { name: 'VSR止滑橡胶', brand: 'VICTOR', desc: '特殊配方橡胶大底，不受灰尘汗水影响，PU地面防滑提升21%。' },
  '䨻': { name: '䨻(bèng)科技', brand: '李宁', desc: '李宁王牌科技！PEBAX超临界发泡，密度仅0.11g/cm³，能量反馈80%+，-40℃仍保持高弹，对标Nike ZoomX。' },
  '䨻丝': { name: '䨻丝2.0', brand: '李宁', desc: '2025年新科技，ETPU纱线编织鞋面，轻韧透气一体化，比传统鞋面更轻更贴合。' },
  '李宁云': { name: '李宁云 Cushion', brand: '李宁', desc: '李宁基础缓震科技，高分子材料柔软吸震，常用于后掌缓震区，脚感舒适。' },
  'Bounce+': { name: 'Bounce+ 回弹科技', brand: '李宁', desc: '前掌专用回弹材料，垂直回弹性能出色，助力蹬地发力和快速启动。' },
  'PROBAR LOC': { name: 'PROBAR LOC', brand: '李宁', desc: '李宁足弓稳定系统，碳纤维板+TPU组合，提供强力抗扭支撑，防止崴脚。' },
  'Light Foam': { name: 'Light Foam', brand: '李宁', desc: '轻量发泡材料，比传统EVA更轻更弹，常与䨻科技搭配实现分区缓震。' },
  'GCU': { name: 'GCU大底', brand: '李宁', desc: '2025年新科技，户外级耐磨防滑橡胶，抓地力和耐久性大幅提升。' },
  '碳板': { name: '碳纤维稳定片', brand: '通用', desc: '足弓处碳纤维板，提供抗扭支撑和能量传递，是中高端球鞋标配，防崴脚神器。' },
  'TPU': { name: 'TPU支撑', brand: '通用', desc: '热塑性聚氨酯材料，用于后跟固定、侧向支撑、足弓抗扭，硬度可调性能稳定。' },
};

// 九大维度定义
const dimensions = [
  { key: 'grip', name: '抓地力', short: '抓地' },
  { key: 'stability', name: '稳定性', short: '稳定' },
  { key: 'cushioning', name: '缓震性', short: '缓震' },
  { key: 'support', name: '支撑性', short: '支撑' },
  { key: 'wrapping', name: '包裹性', short: '包裹' },
  { key: 'flexibility', name: '灵活性', short: '灵活' },
  { key: 'lightweight', name: '轻量化', short: '轻量' },
  { key: 'breathability', name: '透气性', short: '透气' },
  { key: 'durability', name: '耐磨性', short: '耐磨' },
];

// 科技标签组件 - 点击弹出解释
const TechTag = ({ tech, onShowTech }) => {
  const findTech = (techString) => {
    for (const key of Object.keys(techDictionary)) {
      if (techString.includes(key)) {
        return { key, ...techDictionary[key] };
      }
    }
    return null;
  };

  const matchedTech = findTech(tech);
  
  if (matchedTech) {
    return (
      <span 
        onClick={() => onShowTech(matchedTech)}
        className="cursor-pointer underline decoration-dotted hover:text-white transition-colors"
      >
        {tech}
      </span>
    );
  }
  return <span>{tech}</span>;
};

// 科技解释弹窗
const TechModal = ({ tech, onClose }) => {
  if (!tech) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🔬</span>
          <h3 className="text-xl font-bold text-white">{tech.name}</h3>
        </div>
        <span className="inline-block px-2 py-1 bg-blue-500/30 text-blue-300 text-xs rounded-full mb-3">
          {tech.brand}
        </span>
        <p className="text-gray-300 leading-relaxed">{tech.desc}</p>
        <button 
          onClick={onClose}
          className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          知道了
        </button>
      </div>
    </div>
  );
};

// 热度标签
const HotTag = ({ tag }) => {
  const tagStyles = {
    'hot': { text: '🔥爆款', bg: 'bg-red-500/80' },
    'value': { text: '💎性价比', bg: 'bg-green-500/80' },
    'new': { text: '✨新品', bg: 'bg-purple-500/80' },
    'pro': { text: '🏆国手同款', bg: 'bg-yellow-500/80' },
    'niche': { text: '🎯小众宝藏', bg: 'bg-cyan-500/80' },
  };
  
  const style = tagStyles[tag];
  if (!style) return null;
  
  return (
    <span className={`${style.bg} text-white text-xs px-2 py-0.5 rounded-full`}>
      {style.text}
    </span>
  );
};

// 适配人群标签
const FitTag = ({ fit }) => {
  const fitStyles = {
    'unisex': null,
    'men': { text: '👨 男款', bg: 'bg-blue-500/50' },
    'women': { text: '👩 女款', bg: 'bg-pink-500/50' },
    'junior': { text: '🧒 青少年', bg: 'bg-teal-500/50' },
    'wide': { text: '📐 宽楦', bg: 'bg-amber-500/50' },
  };
  
  const style = fitStyles[fit];
  if (!style) return null;
  
  return (
    <span className={`${style.bg} text-white text-xs px-2 py-0.5 rounded-full`}>
      {style.text}
    </span>
  );
};

// 购物链接生成器
const ShoppingLinks = ({ shoeName, brand }) => {
  const searchQuery = encodeURIComponent(`${brand} ${shoeName} 羽毛球鞋`);
  
  const platforms = [
    { name: '京东', icon: '🔴', url: `https://search.jd.com/Search?keyword=${searchQuery}`, color: 'bg-red-600 hover:bg-red-700' },
    { name: '淘宝', icon: '🟠', url: `https://s.taobao.com/search?q=${searchQuery}`, color: 'bg-orange-500 hover:bg-orange-600' },
    { name: 'PDD', icon: '🟡', url: `https://mobile.yangkeduo.com/search_result.html?search_key=${searchQuery}`, color: 'bg-amber-500 hover:bg-amber-600' },
    { name: '得物', icon: '⚫', url: `https://m.dewu.com/search/result?keyword=${searchQuery}`, color: 'bg-gray-700 hover:bg-gray-800' },
  ];

  return (
    <div className="flex gap-1.5 mt-3 flex-wrap">
      {platforms.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${p.color} text-white text-xs px-2 py-1 rounded-full transition-all flex items-center gap-1`}
        >
          <span>{p.icon}</span>
          <span>{p.name}</span>
        </a>
      ))}
    </div>
  );
};

// 雷达图组件
// 雷达图组件 - 支持高亮显示
const RadarChart = ({ shoes, activeShoe }) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;
  
  // 品牌颜色映射
  const brandColors = {
    'YONEX': { stroke: '#ef4444', fill: 'rgba(239, 68, 68, 0.15)', name: 'YONEX' },
    'VICTOR': { stroke: '#3b82f6', fill: 'rgba(59, 130, 246, 0.15)', name: 'VICTOR' },
    '李宁': { stroke: '#f97316', fill: 'rgba(249, 115, 22, 0.15)', name: '李宁' },
  };
  
  // 为每双鞋分配不同的线型
  const lineStyles = [
    { dasharray: 'none', width: 2.5 },
    { dasharray: '8,4', width: 2 },
  ];
  
  // 计算多边形顶点
  const getPoint = (index, value, total) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = (value / 10) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };
  
  // 生成多边形路径
  const getPolygonPath = (stats) => {
    const points = dimensions.map((_, i) => {
      const value = stats[dimensions[i].key] || 5;
      return getPoint(i, value, dimensions.length);
    });
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  };
  
  // 生成背景网格
  const renderGrid = () => {
    const grids = [];
    for (let level = 1; level <= levels; level++) {
      const points = dimensions.map((_, i) => {
        return getPoint(i, (level / levels) * 10, dimensions.length);
      });
      const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
      grids.push(
        <path key={`grid-${level}`} d={path} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      );
    }
    dimensions.forEach((_, i) => {
      const point = getPoint(i, 10, dimensions.length);
      grids.push(
        <line key={`line-${i}`} x1={center} y1={center} x2={point.x} y2={point.y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      );
    });
    return grids;
  };
  
  // 渲染维度标签
  const renderLabels = () => {
    return dimensions.map((dim, i) => {
      const point = getPoint(i, 11.5, dimensions.length);
      return (
        <text
          key={`label-${i}`} x={point.x} y={point.y} textAnchor="middle" dominantBaseline="middle"
          className="fill-gray-300 text-xs font-medium" style={{ fontSize: '11px' }}
        >
          {dim.short}
        </text>
      );
    });
  };
  
  // 按品牌分组鞋子
  const groupedShoes = {};
  shoes.forEach((shoe, idx) => {
    if (!groupedShoes[shoe.brand]) {
      groupedShoes[shoe.brand] = [];
    }
    groupedShoes[shoe.brand].push({ ...shoe, originalIndex: idx });
  });
  
  return (
    <div className="bg-white/5 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-bold text-white mb-2 text-center">📊 推荐球鞋性能雷达图</h3>
      <p className="text-center text-gray-400 text-xs mb-4">💡 鼠标悬停/点击下方卡片可高亮对应数据</p>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        <svg width={size} height={size} className="flex-shrink-0">
          {renderGrid()}
          
          {/* 渲染每双鞋的多边形 */}
          {Object.entries(groupedShoes).map(([brand, brandShoes]) => {
            const colors = brandColors[brand];
            return brandShoes.map((shoe, idx) => {
              const style = lineStyles[idx % lineStyles.length];
              // 高亮逻辑
              const isActive = activeShoe === shoe.name;
              const isDimmed = activeShoe && !isActive; // 如果有选中的，且不是当前这双，就变暗
              
              const currentStrokeWidth = isActive ? 4 : style.width;
              const currentStrokeOpacity = isDimmed ? 0.1 : 1;
              const currentFillOpacity = isActive ? 0.4 : (isDimmed ? 0.05 : colors.fill);
              const zIndex = isActive ? 10 : 1; // 逻辑上的层级，实际靠渲染顺序

              return (
                <g key={`${brand}-${shoe.name}`} style={{ opacity: isDimmed ? 0.3 : 1, transition: 'all 0.3s ease' }}>
                  <path
                    d={getPolygonPath(shoe.stats)}
                    fill={colors.stroke} // 使用stroke颜色做底色，通过opacity控制
                    fillOpacity={isActive ? 0.3 : 0} // 默认不填充，选中才填充
                    stroke={colors.stroke}
                    strokeWidth={currentStrokeWidth}
                    strokeOpacity={currentStrokeOpacity}
                    strokeDasharray={isActive ? 'none' : style.dasharray} // 选中时变为实线
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  {/* 顶点圆点 - 仅在未变暗时显示 */}
                  {!isDimmed && dimensions.map((dim, i) => {
                    const value = shoe.stats[dim.key] || 5;
                    const point = getPoint(i, value, dimensions.length);
                    return (
                      <circle
                        key={`point-${brand}-${shoe.name}-${i}`}
                        cx={point.x} cy={point.y} r={isActive ? 4 : 2}
                        fill={colors.stroke} className="opacity-80 transition-all duration-300"
                      />
                    );
                  })}
                </g>
              );
            });
          })}
          
          {renderLabels()}
        </svg>
        
        {/* 图例 */}
        <div className="flex flex-col gap-3 min-w-[200px]">
          <div className="text-sm text-gray-400 mb-2">图例说明：</div>
          {Object.entries(groupedShoes).map(([brand, brandShoes]) => {
            const colors = brandColors[brand];
            return (
              <div key={brand} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.stroke }} />
                  <span className="text-white font-medium text-sm">{brand}</span>
                </div>
                {brandShoes.map((shoe, idx) => {
                  const style = lineStyles[idx % lineStyles.length];
                  const isActive = activeShoe === shoe.name;
                  const isDimmed = activeShoe && !isActive;
                  
                  return (
                    <div 
                      key={shoe.name} 
                      className={`flex items-center gap-2 pl-6 transition-all duration-300 ${isActive ? 'scale-105 font-bold' : ''} ${isDimmed ? 'opacity-30' : ''}`}
                    >
                      <svg width="24" height="12">
                        <line
                          x1="0" y1="6" x2="24" y2="6"
                          stroke={colors.stroke}
                          strokeWidth={isActive ? 3 : style.width}
                          strokeDasharray={isActive ? 'none' : style.dasharray}
                        />
                      </svg>
                      <span className={`${isActive ? 'text-white' : 'text-gray-300'} text-xs`}>{shoe.name}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const questions = [
  {
    id: 'weight',
    title: '🏋️ 体重档位',
    subtitle: '落地时前脚掌承受数倍体重压力，这是选鞋最关键的因素',
    options: [
      { value: 'light', label: '60kg以下', emoji: '🪶', desc: '轻盈派，速度是你的武器' },
      { value: 'medium', label: '60-80kg', emoji: '⚖️', desc: '均衡区间，选择最多' },
      { value: 'heavy', label: '80kg以上', emoji: '🛡️', desc: '保护优先，缓震必须拉满' },
    ]
  },
  {
    id: 'style',
    title: '⚔️ 打法风格',
    subtitle: '你在场上是什么类型的球员？',
    options: [
      { value: 'attack', label: '进攻型', emoji: '💥', desc: '暴力杀球，起跳扣杀是我的快乐' },
      { value: 'defense', label: '防守型', emoji: '🧱', desc: '稳如磐石，跑不死拉不死' },
      { value: 'allround', label: '全面型', emoji: '🎯', desc: '攻防兼备，随机应变' },
      { value: 'doubles', label: '双打专精', emoji: '🤝', desc: '网前封网，快速反应' },
    ]
  },
  {
    id: 'foot',
    title: '🦶 脚型特征',
    subtitle: '脚长÷脚宽：<2.5宽脚，>2.6窄脚',
    options: [
      { value: 'wide', label: '宽脚/厚脚背', emoji: '🐘', desc: '需要3.0宽楦，国产品牌更友好' },
      { value: 'normal', label: '标准脚型', emoji: '👟', desc: '大部分鞋都能穿' },
      { value: 'narrow', label: '窄脚/瘦长', emoji: '🦩', desc: 'YONEX日版楦型是你的朋友' },
    ]
  },
  {
    id: 'injury',
    title: '🏥 伤病情况',
    subtitle: '有伤病史的部位需要额外保护',
    options: [
      { value: 'none', label: '无伤病', emoji: '✨', desc: '身体倍儿棒，放心冲' },
      { value: 'knee', label: '膝盖问题', emoji: '🦵', desc: '缓震性能必须拉满' },
      { value: 'ankle', label: '脚踝易扭', emoji: '🦶', desc: '侧向稳定和抗扭是刚需' },
      { value: 'plantar', label: '足底筋膜炎', emoji: '🩹', desc: '足弓支撑要到位' },
    ]
  },
  {
    id: 'budget',
    title: '💰 预算区间',
    subtitle: '不必盲目追求顶配，合适最重要',
    options: [
      { value: 'entry', label: '¥200-400', emoji: '🌱', desc: '入门够用，性价比之选' },
      { value: 'mid', label: '¥400-800', emoji: '🌿', desc: '中端甜点，科技加持' },
      { value: 'high', label: '¥800-1200', emoji: '🌳', desc: '高端享受，全面保护' },
      { value: 'pro', label: '¥1200+', emoji: '👑', desc: '旗舰顶配，极致体验' },
    ]
  },
];

// 球鞋数据库 - 带九维评分
// 评分标准：1-10分，基于重要性排序：抓地力 > 稳定性 > 缓震性 > 支撑性 > 包裹性 > 灵活性 > 轻量化 > 透气性 > 耐磨性
const shoeDatabase = {
  yonex: {
    speed: [
      { 
        name: 'Aerus Z2', price: '¥1080-1300', weight: '240g', 
        tech: 'Feather Light X + Power Cushion', 
        highlight: '史上最轻，速度之王', tier: 'pro', hotTag: 'pro', fit: 'unisex',
        stats: { grip: 8, stability: 6, cushioning: 6, support: 6, wrapping: 8, flexibility: 10, lightweight: 10, breathability: 10, durability: 6 }
      },
      { 
        name: '65 Z4', price: '¥1050-1300', weight: '290g', 
        tech: 'Feather Bounce Form', 
        highlight: '全能旗舰，冠军之选', tier: 'pro', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 9, stability: 8, cushioning: 8, support: 8, wrapping: 9, flexibility: 8, lightweight: 8, breathability: 8, durability: 8 }
      },
      { 
        name: 'SHB39EX', price: '¥300-400', weight: '280g', 
        tech: '轻量透气网面 + Power Cushion', 
        highlight: '中端轻量，透气舒适', tier: 'mid', hotTag: null, fit: 'unisex',
        stats: { grip: 7, stability: 6, cushioning: 6, support: 6, wrapping: 7, flexibility: 8, lightweight: 8, breathability: 8, durability: 6 }
      },
    ],
    stable: [
      { 
        name: 'Eclipsion Z3', price: '¥1080', weight: '320g', 
        tech: 'Lateral Shell + Power Cushion+', 
        highlight: '稳定保护，复杂步法首选', tier: 'pro', hotTag: null, fit: 'wide',
        stats: { grip: 9, stability: 10, cushioning: 9, support: 9, wrapping: 9, flexibility: 6, lightweight: 6, breathability: 7, durability: 9 }
      },
      { 
        name: 'Comfort Z3', price: '¥980', weight: '330g', 
        tech: 'Power Cushion+ 全掌覆盖', 
        highlight: '极致缓震，大体重福音', tier: 'high', hotTag: 'pro', fit: 'unisex',
        stats: { grip: 8, stability: 9, cushioning: 10, support: 9, wrapping: 8, flexibility: 6, lightweight: 5, breathability: 7, durability: 8 }
      },
      { 
        name: 'CFZ3', price: '¥700-900', weight: '310g', 
        tech: 'Power Cushion+ + 碳板', 
        highlight: '林丹同款，综合保护', tier: 'high', hotTag: 'pro', fit: 'unisex',
        stats: { grip: 8, stability: 9, cushioning: 9, support: 9, wrapping: 8, flexibility: 7, lightweight: 6, breathability: 7, durability: 8 }
      },
    ],
    allround: [
      { 
        name: '65 Z4', price: '¥1050-1300', weight: '290g', 
        tech: 'Feather Bounce Form', 
        highlight: '均衡全能，世界冠军同款', tier: 'pro', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 9, stability: 8, cushioning: 8, support: 8, wrapping: 9, flexibility: 8, lightweight: 8, breathability: 8, durability: 8 }
      },
      { 
        name: '88 Dial 3', price: '¥1200', weight: '300g', 
        tech: 'BOA旋钮 + Power Cushion+', 
        highlight: '精准包裹，双打利器', tier: 'pro', hotTag: 'new', fit: 'unisex',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 8, wrapping: 10, flexibility: 7, lightweight: 7, breathability: 7, durability: 8 }
      },
      { 
        name: '65X VA', price: '¥600-800', weight: '295g', 
        tech: 'Power Cushion + TPU抗扭', 
        highlight: '中端全能，性价比之选', tier: 'high', hotTag: 'value', fit: 'unisex',
        stats: { grip: 8, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 7 }
      },
      { 
        name: 'SHB210CR', price: '¥260-350', weight: '300g', 
        tech: 'Power Cushion + 透气网面', 
        highlight: '进阶入门，多配色可选', tier: 'mid', hotTag: null, fit: 'unisex',
        stats: { grip: 7, stability: 6, cushioning: 6, support: 6, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 7, durability: 6 }
      },
    ],
    budget: [
      { 
        name: 'Cascade Accel', price: '¥580-720', weight: '310g', 
        tech: 'Power Cushion基础版', 
        highlight: '中端首选，大厂品质', tier: 'mid', hotTag: null, fit: 'unisex',
        stats: { grip: 7, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 6, breathability: 7, durability: 7 }
      },
      { 
        name: 'SHB101CR', price: '¥180-260', weight: '295g', 
        tech: 'Power Cushion + EVA', 
        highlight: '入门神鞋，动力垫加持', tier: 'entry', hotTag: 'value', fit: 'unisex',
        stats: { grip: 6, stability: 6, cushioning: 5, support: 5, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 6, durability: 6 }
      },
      { 
        name: 'SHB220CR', price: '¥200-300', weight: '290g', 
        tech: 'Power Cushion + 橡胶底', 
        highlight: '亲子款可选，高性价比', tier: 'entry', hotTag: null, fit: 'junior',
        stats: { grip: 6, stability: 6, cushioning: 5, support: 5, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 6, durability: 6 }
      },
    ]
  },
  victor: {
    speed: [
      { 
        name: 'S99 Elite', price: '¥1100+', weight: '250g', 
        tech: 'HYPEREVA + 碳板', 
        highlight: 'Victor最轻，极速启动', tier: 'pro', hotTag: 'niche', fit: 'unisex',
        stats: { grip: 8, stability: 6, cushioning: 6, support: 7, wrapping: 8, flexibility: 10, lightweight: 10, breathability: 9, durability: 6 }
      },
      { 
        name: 'A970 NitroLite', price: '¥1380', weight: '280g', 
        tech: 'NitroLite氮气发泡 + 碳板', 
        highlight: '六边形战士，李梓嘉同款', tier: 'pro', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 9, stability: 8, cushioning: 9, support: 8, wrapping: 8, flexibility: 8, lightweight: 8, breathability: 8, durability: 8 }
      },
      { 
        name: 'S82III', price: '¥800-1000', weight: '265g', 
        tech: 'HYPEREVA + 碳板', 
        highlight: '中高端速度鞋', tier: 'high', hotTag: null, fit: 'unisex',
        stats: { grip: 8, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 9, lightweight: 9, breathability: 8, durability: 7 }
      },
    ],
    stable: [
      { 
        name: 'P9200 TTY NL', price: '¥1498', weight: '330g', 
        tech: 'NitroLite + 270° TPU', 
        highlight: '戴资颖签名款，稳定巅峰', tier: 'pro', hotTag: 'pro', fit: 'women',
        stats: { grip: 9, stability: 10, cushioning: 9, support: 10, wrapping: 9, flexibility: 6, lightweight: 5, breathability: 7, durability: 9 }
      },
      { 
        name: 'C90 NitroLite', price: '¥1200', weight: '340g', 
        tech: 'NitroLite 23mm加厚中底', 
        highlight: '大体重专属，缓震拉满', tier: 'pro', hotTag: 'niche', fit: 'wide',
        stats: { grip: 8, stability: 9, cushioning: 10, support: 9, wrapping: 8, flexibility: 5, lightweight: 4, breathability: 6, durability: 9 }
      },
      { 
        name: 'P8500II', price: '¥700-900', weight: '320g', 
        tech: 'ENERGYMAX 3.0 + 碳板', 
        highlight: '中高端稳定，口碑之选', tier: 'high', hotTag: 'value', fit: 'unisex',
        stats: { grip: 8, stability: 9, cushioning: 8, support: 8, wrapping: 8, flexibility: 6, lightweight: 6, breathability: 7, durability: 8 }
      },
      { 
        name: 'P9200 TD', price: '¥270-400', weight: '320g', 
        tech: 'ENERGYMAX 3.0 + TPU', 
        highlight: '300元神鞋，缓震越级', tier: 'mid', hotTag: 'hot', fit: 'wide',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 7, wrapping: 7, flexibility: 6, lightweight: 6, breathability: 6, durability: 7 }
      },
      { 
        name: 'P8500TD', price: '¥300-450', weight: '315g', 
        tech: 'ENERGYMAX + 尼龙稳定片', 
        highlight: '入门稳定，U3.0宽楦', tier: 'mid', hotTag: 'value', fit: 'wide',
        stats: { grip: 7, stability: 8, cushioning: 7, support: 7, wrapping: 7, flexibility: 6, lightweight: 6, breathability: 6, durability: 7 }
      },
    ],
    allround: [
      { 
        name: 'A970 NitroLite', price: '¥1380', weight: '280g', 
        tech: 'NitroLite + 双碳板', 
        highlight: '全面均衡，安东森同款', tier: 'pro', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 9, stability: 8, cushioning: 9, support: 8, wrapping: 8, flexibility: 8, lightweight: 8, breathability: 8, durability: 8 }
      },
      { 
        name: 'VG2 NitroLite', price: '¥1100-1300', weight: '290g', 
        tech: 'NitroLite 可拆卸中底', 
        highlight: '革命性模块化设计', tier: 'pro', hotTag: 'new', fit: 'unisex',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 8, wrapping: 8, flexibility: 8, lightweight: 8, breathability: 7, durability: 8 }
      },
      { 
        name: 'A970 ACE', price: '¥768-900', weight: '295g', 
        tech: 'HYPEREVA + E-TPU + 碳板', 
        highlight: '千元内性价比王', tier: 'high', hotTag: 'value', fit: 'unisex',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 8, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 7 }
      },
      { 
        name: 'VG11', price: '¥500-650', weight: '300g', 
        tech: 'HYPEREVA + TPU抗扭', 
        highlight: '中端全面，宽楦友好', tier: 'mid', hotTag: null, fit: 'wide',
        stats: { grip: 7, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 7 }
      },
      { 
        name: 'A362III', price: '¥350-450', weight: '305g', 
        tech: 'EVA + TPU支撑', 
        highlight: '进阶全能，性能均衡', tier: 'mid', hotTag: null, fit: 'unisex',
        stats: { grip: 7, stability: 7, cushioning: 6, support: 6, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 7, durability: 7 }
      },
    ],
    budget: [
      { 
        name: 'A311', price: '¥250-320', weight: '300g', 
        tech: 'ENERGYMAX + 透气网布', 
        highlight: '入门进阶，透气舒适', tier: 'entry', hotTag: null, fit: 'unisex',
        stats: { grip: 6, stability: 6, cushioning: 6, support: 6, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 8, durability: 6 }
      },
      { 
        name: 'A170II', price: '¥160-220', weight: '290g', 
        tech: 'EVA + 橡胶底', 
        highlight: '百元神鞋，入门首选', tier: 'entry', hotTag: 'value', fit: 'unisex',
        stats: { grip: 6, stability: 5, cushioning: 5, support: 5, wrapping: 5, flexibility: 7, lightweight: 7, breathability: 6, durability: 6 }
      },
      { 
        name: 'A170IIJR', price: '¥150-200', weight: '260g', 
        tech: 'EVA + 橡胶底', 
        highlight: '青少年专属，轻便耐穿', tier: 'entry', hotTag: null, fit: 'junior',
        stats: { grip: 6, stability: 5, cushioning: 5, support: 5, wrapping: 5, flexibility: 7, lightweight: 8, breathability: 6, durability: 6 }
      },
    ]
  },
  lining: {
    speed: [
      { 
        name: '疾风 Pro', price: '¥1399', weight: '260g', 
        tech: '3D碳板 + 䨻', 
        highlight: '极速启动专家', tier: 'pro', hotTag: 'pro', fit: 'unisex',
        stats: { grip: 8, stability: 7, cushioning: 8, support: 8, wrapping: 8, flexibility: 10, lightweight: 9, breathability: 8, durability: 7 }
      },
      { 
        name: '影速 Pro', price: '¥600-800', weight: '265g', 
        tech: '䨻 + Light Foam + 碳板', 
        highlight: '轻量透气，保护兼顾', tier: 'high', hotTag: 'new', fit: 'unisex',
        stats: { grip: 8, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 9, lightweight: 9, breathability: 9, durability: 7 }
      },
      { 
        name: '鹘鹰5', price: '¥600-800', weight: '270g', 
        tech: '全掌䨻 + PEBAX支架', 
        highlight: '速度与缓震平衡', tier: 'high', hotTag: 'hot', fit: 'women',
        stats: { grip: 8, stability: 7, cushioning: 8, support: 7, wrapping: 8, flexibility: 9, lightweight: 8, breathability: 8, durability: 7 }
      },
      { 
        name: '突袭4', price: '¥450-550', weight: '275g', 
        tech: '李宁云+Light Foam+䨻 + PEBAX', 
        highlight: '中端速度王，颜值担当', tier: 'mid', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 7, stability: 6, cushioning: 7, support: 6, wrapping: 7, flexibility: 8, lightweight: 8, breathability: 8, durability: 6 }
      },
      { 
        name: '疾风 SE', price: '¥500-699', weight: '270g', 
        tech: 'Light Foam轻量化', 
        highlight: '入门速度鞋', tier: 'mid', hotTag: null, fit: 'unisex',
        stats: { grip: 7, stability: 6, cushioning: 6, support: 6, wrapping: 6, flexibility: 8, lightweight: 8, breathability: 7, durability: 6 }
      },
    ],
    stable: [
      { 
        name: '贴地飞行3 Pro', price: '¥1499+', weight: '340g', 
        tech: '全掌䨻 + 䨻丝 + GCU', 
        highlight: '2025最强保护旗舰', tier: 'pro', hotTag: 'new', fit: 'wide',
        stats: { grip: 10, stability: 10, cushioning: 10, support: 10, wrapping: 9, flexibility: 5, lightweight: 4, breathability: 7, durability: 10 }
      },
      { 
        name: '贴地飞行II MAX', price: '¥1299', weight: '335g', 
        tech: '䨻 + BOA双旋钮', 
        highlight: '包裹巅峰，大体重首选', tier: 'pro', hotTag: 'pro', fit: 'wide',
        stats: { grip: 9, stability: 10, cushioning: 10, support: 9, wrapping: 10, flexibility: 5, lightweight: 4, breathability: 6, durability: 9 }
      },
      { 
        name: '雷霆 Pro', price: '¥999-1299', weight: '330g', 
        tech: '䨻 + PROBAR LOC', 
        highlight: '专业保护，EG脚型', tier: 'high', hotTag: null, fit: 'unisex',
        stats: { grip: 9, stability: 9, cushioning: 9, support: 9, wrapping: 8, flexibility: 6, lightweight: 5, breathability: 7, durability: 8 }
      },
      { 
        name: '雲霆', price: '¥699-899', weight: '325g', 
        tech: '李宁云 + 碳板 + TPU', 
        highlight: '中端稳定，RG脚型', tier: 'high', hotTag: 'value', fit: 'unisex',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 8, wrapping: 8, flexibility: 6, lightweight: 5, breathability: 7, durability: 8 }
      },
      { 
        name: '贴地飞行 LITE', price: '¥500-650', weight: '315g', 
        tech: '李宁云 + TPU抗扭', 
        highlight: '入门保护，性价比高', tier: 'mid', hotTag: 'value', fit: 'unisex',
        stats: { grip: 7, stability: 8, cushioning: 7, support: 7, wrapping: 7, flexibility: 6, lightweight: 6, breathability: 6, durability: 7 }
      },
    ],
    allround: [
      { 
        name: '刀锋 Pro', price: '¥1099-1299', weight: '295g', 
        tech: '䨻 + 碳板 + TPU', 
        highlight: '旗舰全能，性能拉满', tier: 'pro', hotTag: null, fit: 'unisex',
        stats: { grip: 9, stability: 8, cushioning: 9, support: 8, wrapping: 8, flexibility: 8, lightweight: 7, breathability: 8, durability: 8 }
      },
      { 
        name: '刀锋 MAX', price: '¥699-899', weight: '300g', 
        tech: '䨻 + 李宁云 + 碳板', 
        highlight: '均衡全能，高性价比', tier: 'high', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 8, stability: 8, cushioning: 8, support: 8, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 8 }
      },
      { 
        name: '变色龙6', price: '¥600-799', weight: '305g', 
        tech: '仿生大底 + 李宁云', 
        highlight: '抓地防滑标杆', tier: 'high', hotTag: null, fit: 'unisex',
        stats: { grip: 10, stability: 8, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 8 }
      },
      { 
        name: '无敌号 ACE', price: '¥500-699', weight: '300g', 
        tech: 'Bounce+ + 李宁云', 
        highlight: '石宇奇同款，雪地迷彩爆款', tier: 'mid', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 7, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 7, breathability: 7, durability: 7 }
      },
      { 
        name: '战戟3 Lite', price: '¥300-450', weight: '295g', 
        tech: '䨻 + 碳板', 
        highlight: '入门䨻科技，超高性价比', tier: 'mid', hotTag: 'value', fit: 'unisex',
        stats: { grip: 7, stability: 7, cushioning: 7, support: 7, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 6, durability: 6 }
      },
    ],
    budget: [
      { 
        name: '音爆 OP', price: '¥400-599', weight: '310g', 
        tech: 'Bounce+ + Cushion + 碳板', 
        highlight: '性价比神鞋，全面保护', tier: 'mid', hotTag: 'hot', fit: 'unisex',
        stats: { grip: 7, stability: 7, cushioning: 7, support: 7, wrapping: 7, flexibility: 7, lightweight: 6, breathability: 7, durability: 7 }
      },
      { 
        name: '越影', price: '¥200-300', weight: '295g', 
        tech: '李宁云 + TPU后跟', 
        highlight: '入门进阶，稳定够用', tier: 'entry', hotTag: null, fit: 'unisex',
        stats: { grip: 6, stability: 6, cushioning: 6, support: 6, wrapping: 6, flexibility: 7, lightweight: 7, breathability: 6, durability: 6 }
      },
      { 
        name: '火箭鞋2.0', price: '¥180-250', weight: '280g', 
        tech: 'Light Foam + 宽楦', 
        highlight: '新手入门，轻快舒适', tier: 'entry', hotTag: 'value', fit: 'wide',
        stats: { grip: 6, stability: 5, cushioning: 5, support: 5, wrapping: 6, flexibility: 8, lightweight: 8, breathability: 7, durability: 5 }
      },
      { 
        name: '小羽飞跃JR', price: '¥150-220', weight: '250g', 
        tech: 'EVA + 透气网面', 
        highlight: '青少年专属，轻便灵活', tier: 'entry', hotTag: null, fit: 'junior',
        stats: { grip: 5, stability: 5, cushioning: 5, support: 5, wrapping: 5, flexibility: 8, lightweight: 9, breathability: 8, durability: 5 }
      },
    ]
  }
};

// 推荐逻辑
function getRecommendation(answers) {
  let shoeType = 'allround';
  let priority = [];
  let warnings = [];
  let tips = [];

  // 体重决定基调
  if (answers.weight === 'heavy') {
    shoeType = 'stable';
    priority.push('缓震性能');
    priority.push('稳定支撑');
    warnings.push('⚠️ 避免选择超轻型/速度型球鞋，保护材料不足');
    tips.push('选择后跟缓震厚实的款式，搭配专业运动鞋垫效果更佳');
  } else if (answers.weight === 'light') {
    shoeType = 'speed';
    priority.push('轻量化');
    priority.push('启动速度');
    tips.push('轻体重的优势是可以享受极致轻量带来的速度加成');
  }

  // 打法调整
  if (answers.style === 'attack') {
    if (answers.weight !== 'light') shoeType = 'stable';
    priority.push('回弹性能');
    tips.push('频繁起跳杀球对膝盖冲击大，后跟缓震要够厚');
  } else if (answers.style === 'defense' || answers.style === 'doubles') {
    if (answers.weight === 'light') shoeType = 'speed';
    priority.push('灵活性');
    priority.push('透气性');
  }

  // 伤病史覆盖一切
  if (answers.injury === 'knee') {
    shoeType = 'stable';
    priority = ['缓震性能', '稳定支撑'];
    warnings.push('🦵 膝盖问题必须选缓震顶配，避免薄底超轻款');
    tips.push('推荐搭配专业运动鞋垫，控制打球强度');
  } else if (answers.injury === 'ankle') {
    shoeType = 'stable';
    priority.push('侧向稳定');
    priority.push('抗扭设计');
    warnings.push('🦶 脚踝易扭要选带TPU侧片和碳板抗扭的款式');
    tips.push('鞋带系到最顶端扣眼，可搭配护踝使用');
  } else if (answers.injury === 'plantar') {
    priority.push('足弓支撑');
    tips.push('选择足弓支撑好的款式，考虑定制矫形鞋垫');
  }

  // 根据预算筛选
  const getBudgetTiers = (budget) => {
    switch(budget) {
      case 'entry': return ['entry'];
      case 'mid': return ['entry', 'mid'];
      case 'high': return ['mid', 'high'];
      case 'pro': return ['high', 'pro'];
      default: return ['mid', 'high'];
    }
  };
  
  const allowedTiers = getBudgetTiers(answers.budget);

  // 脚型提示
  if (answers.foot === 'wide') {
    tips.push('宽脚推荐：Victor U3.0楦、李宁EG3.0楦，YONEX选Wide版');
  } else if (answers.foot === 'narrow') {
    tips.push('窄脚推荐：YONEX日版2E楦型最友好');
  }

  // 获取具体推荐 - 按预算和类型筛选
  const getShoes = (brand, type, tiers) => {
    const db = shoeDatabase[brand];
    let shoes = (db[type] || db.allround).filter(s => tiers.includes(s.tier));
    if (shoes.length < 2 && db.budget) {
      const budgetShoes = db.budget.filter(s => tiers.includes(s.tier));
      shoes = [...shoes, ...budgetShoes].slice(0, 2);
    }
    if (shoes.length < 1) {
      shoes = (db[type] || db.allround).slice(0, 2);
    }
    return shoes.slice(0, 2);
  };

  const recommendations = {
    yonex: getShoes('yonex', shoeType, allowedTiers),
    victor: getShoes('victor', shoeType, allowedTiers),
    lining: getShoes('lining', shoeType, allowedTiers),
  };

  // 类型标签
  const typeLabels = {
    speed: { name: '速度型', emoji: '⚡', color: 'from-yellow-400 to-orange-500' },
    stable: { name: '稳定型', emoji: '🛡️', color: 'from-blue-400 to-indigo-500' },
    allround: { name: '全能型', emoji: '🎯', color: 'from-green-400 to-teal-500' },
  };

  return {
    type: typeLabels[shoeType],
    priority: [...new Set(priority)].slice(0, 3),
    warnings,
    tips,
    recommendations,
  };
}


export default function BadmintonShoeQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showTechModal, setShowTechModal] = useState(null);
  const [showPoster, setShowPoster] = useState(false);
  const resultRef = useRef(null);
  const handleSelect = (value) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = { ...answers, [questions[currentQ].id]: selectedOption };
    setAnswers(newAnswers);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(answers[questions[currentQ + 1]?.id] || null);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelectedOption(answers[questions[currentQ - 1].id] || null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setSelectedOption(null);
  };

  // 结果页面
  if (showResult) {
    const result = getRecommendation(answers);
    
    // 准备雷达图数据
    const radarShoes = [
      ...result.recommendations.yonex.map(s => ({ ...s, brand: 'YONEX' })),
      ...result.recommendations.victor.map(s => ({ ...s, brand: 'VICTOR' })),
      ...result.recommendations.lining.map(s => ({ ...s, brand: '李宁' })),
    ];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
        <TechModal tech={showTechModal} onClose={() => setShowTechModal(null)} />
        
        <div className="max-w-4xl mx-auto" ref={resultRef}>
          {/* 结果头部 */}
          <div className={`bg-gradient-to-r ${result.type.color} rounded-3xl p-6 md:p-8 mb-6 text-white`}>
            <div className="text-center">
              <span className="text-5xl mb-4 block">{result.type.emoji}</span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                你的专属类型：{result.type.name}球鞋
              </h1>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {result.priority.map((p, i) => (
                  <span key={i} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 警告提示 */}
          {result.warnings.length > 0 && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-6">
              {result.warnings.map((w, i) => (
                <p key={i} className="text-red-200">{w}</p>
              ))}
            </div>
          )}

          {/* 雷达图 */}
          <RadarChart shoes={radarShoes} />

          {/* YONEX */}
          <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-2xl p-6 mb-4 border border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔴</span>
              <h3 className="text-xl font-bold text-white">YONEX</h3>
              <span className="text-sm text-red-300">Power Cushion科技领军</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.yonex.map((shoe, i) => (
                <div key={i} className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-lg">{shoe.name}</h4>
                      {shoe.hotTag && <HotTag tag={shoe.hotTag} />}
                      {shoe.fit && <FitTag fit={shoe.fit} />}
                    </div>
                    <span className="text-red-300 font-medium whitespace-nowrap">{shoe.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    <TechTag tech={shoe.tech} onShowTech={setShowTechModal} />
                  </p>
                  <p className="text-red-200 text-sm">✨ {shoe.highlight}</p>
                  <p className="text-gray-500 text-xs mt-2">重量: {shoe.weight}</p>
                  <ShoppingLinks shoeName={shoe.name} brand="YONEX 尤尼克斯" />
                </div>
              ))}
            </div>
          </div>

          {/* VICTOR */}
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl p-6 mb-4 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔵</span>
              <h3 className="text-xl font-bold text-white">VICTOR</h3>
              <span className="text-sm text-blue-300">NitroLite氮气科技</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.victor.map((shoe, i) => (
                <div key={i} className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-lg">{shoe.name}</h4>
                      {shoe.hotTag && <HotTag tag={shoe.hotTag} />}
                      {shoe.fit && <FitTag fit={shoe.fit} />}
                    </div>
                    <span className="text-blue-300 font-medium whitespace-nowrap">{shoe.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    <TechTag tech={shoe.tech} onShowTech={setShowTechModal} />
                  </p>
                  <p className="text-blue-200 text-sm">✨ {shoe.highlight}</p>
                  <p className="text-gray-500 text-xs mt-2">重量: {shoe.weight}</p>
                  <ShoppingLinks shoeName={shoe.name} brand="VICTOR 胜利" />
                </div>
              ))}
            </div>
          </div>

          {/* 李宁 */}
          <div className="bg-gradient-to-r from-orange-600/20 to-orange-800/20 rounded-2xl p-6 mb-4 border border-orange-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🟠</span>
              <h3 className="text-xl font-bold text-white">李宁 Li-Ning</h3>
              <span className="text-sm text-orange-300">䨻科技国产之光</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.lining.map((shoe, i) => (
                <div key={i} className="bg-black/30 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-lg">{shoe.name}</h4>
                      {shoe.hotTag && <HotTag tag={shoe.hotTag} />}
                      {shoe.fit && <FitTag fit={shoe.fit} />}
                    </div>
                    <span className="text-orange-300 font-medium whitespace-nowrap">{shoe.price}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    <TechTag tech={shoe.tech} onShowTech={setShowTechModal} />
                  </p>
                  <p className="text-orange-200 text-sm">✨ {shoe.highlight}</p>
                  <p className="text-gray-500 text-xs mt-2">重量: {shoe.weight}</p>
                  <ShoppingLinks shoeName={shoe.name} brand="李宁" />
                </div>
              ))}
            </div>
          </div>

          {/* 小贴士 */}
          {result.tips.length > 0 && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 mt-6">
              <h2 className="text-xl font-bold text-green-300 mb-3">💡 选购小贴士</h2>
              <ul className="space-y-2">
                {result.tips.map((t, i) => (
                  <li key={i} className="text-green-200 flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 通用建议 */}
          <div className="bg-white/5 rounded-2xl p-6 mt-6">
            <h2 className="text-xl font-bold text-white mb-4">📋 试穿检查清单</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>下午/晚上试穿（脚会略微肿胀）</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>穿运动厚袜试鞋</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>脚趾顶住鞋头，后跟能塞入一小指</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>原地蹦跳测试缓震感受</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>左右横向移动测试稳定性</span>
              </div>
              <div className="flex items-start gap-2">
                <span>✓</span>
                <span>前掌弯折测试灵活度</span>
              </div>
            </div>
          </div>

          {/* 重新测试按钮 */}
          <div className="text-center mt-8">
            <button
              onClick={handleRestart}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white rounded-full font-bold transition-all"
            >
              🔄 重新测试
            </button>
          </div>
        </div>
      </div>
    );
  }
  // 问题页面
  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            🏸 羽毛球鞋灵魂匹配测试
          </h1>
          <p className="text-gray-400">5道题找到你的专属战靴</p>
        </div>

        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>问题 {currentQ + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 问题卡片 */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{question.title}</h2>
          <p className="text-gray-400 mb-6">{question.subtitle}</p>
          
          <div className="space-y-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full p-4 rounded-2xl text-left transition-all ${
                  selectedOption === opt.value
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-[1.02]'
                    : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{opt.emoji}</span>
                  <div>
                    <div className="font-bold text-lg">{opt.label}</div>
                    <div className={`text-sm ${selectedOption === opt.value ? 'text-white/80' : 'text-gray-400'}`}>
                      {opt.desc}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex gap-4">
          {currentQ > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all"
            >
              ← 上一题
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex-1 py-4 rounded-full font-bold text-lg transition-all ${
              selectedOption === null
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            {currentQ === questions.length - 1 ? '查看结果 🎉' : '下一题 →'}
          </button>
        </div>
      </div>
    </div>
  );
}
