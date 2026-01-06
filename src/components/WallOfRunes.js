import React, { useState, useEffect } from 'react';
import { 
  BoltIcon, 
  SparklesIcon, 
  SwatchIcon as SwordIcon, 
  ShieldCheckIcon, 
  StarIcon, 
  MoonIcon, 
  FireIcon, 
  SparklesIcon as DiamondIcon, 
  CogIcon, 
  TagIcon as LeafIcon, 
  CloudIcon as SnowflakeIcon, 
  ArrowRightIcon as ArrowIcon,
  SunIcon
} from '@heroicons/react/24/outline';

const WallOfRunes = ({ onGameComplete }) => {
  const [foundDifferences, setFoundDifferences] = useState([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [showDoor, setShowDoor] = useState(false);
  const introText = "Find all differences to get the key";
  const totalDifferences = 2;
  
  // 定義兩組符文，包含多個不同之處
  const runeSet1 = [
    { id: 1, icon: "BoltIcon", position: "top-left", color: "text-yellow-400" },
    { id: 2, icon: "SparklesIcon", position: "top-center", color: "text-purple-400" },
    { id: 3, icon: "SwordIcon", position: "top-right", color: "text-gray-400" },
    { id: 4, icon: "ShieldCheckIcon", position: "middle-left", color: "text-blue-400" },
    { id: 5, icon: "StarIcon", position: "middle-center", color: "text-yellow-300" },
    { id: 6, icon: "MoonIcon", position: "middle-right", color: "text-indigo-400" },
    { id: 7, icon: "FireIcon", position: "bottom-left", color: "text-red-400" },
    { id: 8, icon: "DiamondIcon", position: "bottom-center", color: "text-cyan-400" },
    { id: 9, icon: "CogIcon", position: "bottom-right", color: "text-gray-300" },
    { id: 10, icon: "LeafIcon", position: "top-left-2", color: "text-green-400" },
    { id: 11, icon: "SnowflakeIcon", position: "top-center-2", color: "text-blue-300" },
    { id: 12, icon: "ArrowIcon", position: "top-right-2", color: "text-amber-400" },
  ];

  const runeSet2 = [
    { id: 1, icon: "BoltIcon", position: "top-left", color: "text-yellow-400" }, // Same
    { id: 2, icon: "SparklesIcon", position: "top-center", color: "text-purple-400" }, // Same
    { id: 3, icon: "SwordIcon", position: "top-right", color: "text-gray-400" }, // Same
    { id: 4, icon: "ShieldCheckIcon", position: "middle-left", color: "text-blue-400" }, // Same
    { id: 5, icon: "SunIcon", position: "middle-center", color: "text-yellow-300" }, // Different: StarIcon → SunIcon
    { id: 6, icon: "MoonIcon", position: "middle-right", color: "text-indigo-400" }, // Same
    { id: 7, icon: "FireIcon", position: "bottom-left", color: "text-orange-400" }, // Different: color red → orange
    { id: 8, icon: "DiamondIcon", position: "bottom-center", color: "text-cyan-400" }, // Same
    { id: 9, icon: "CogIcon", position: "bottom-right", color: "text-gray-300" }, // Same
    { id: 10, icon: "LeafIcon", position: "top-left-2", color: "text-green-400" }, // Same
    { id: 11, icon: "SnowflakeIcon", position: "top-center-2", color: "text-blue-300" }, // Same
    { id: 12, icon: "ArrowIcon", position: "top-right-2", color: "text-amber-400" }, // Same
  ];

  // 正確的不同位置
  const correctDifferences = [5, 7]; // middle-center (symbol change), bottom-left (color change)

  // 圖標渲染函數
  const renderIcon = (iconName) => {
    const iconMap = {
      BoltIcon: BoltIcon,
      SparklesIcon: SparklesIcon,
      SwordIcon: SwordIcon,
      ShieldCheckIcon: ShieldCheckIcon,
      StarIcon: StarIcon,
      MoonIcon: MoonIcon,
      FireIcon: FireIcon,
      DiamondIcon: DiamondIcon,
      CogIcon: CogIcon,
      LeafIcon: LeafIcon,
      SnowflakeIcon: SnowflakeIcon,
      ArrowIcon: ArrowIcon,
      SunIcon: SunIcon
    };
    
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };


  const handleRuneClick = (position) => {
    if (gameComplete) return;
    
    const isCorrect = correctDifferences.includes(
      runeSet1.findIndex(rune => rune.position === position) + 1
    );
    
    if (isCorrect && !foundDifferences.includes(position)) {
      setFoundDifferences(prev => [...prev, position]);
      
      if (foundDifferences.length + 1 === totalDifferences) {
        setGameComplete(true);
        setTimeout(() => {
          setShowDoor(true);
        }, 1000);
      }
    }
  };

  const renderRuneGrid = (runeSet, side) => (
    <div className="grid grid-cols-4 gap-3 p-6 bg-gray-800/50 rounded-xl border border-green-400/20">
      {runeSet.map((rune) => (
        <div
          key={rune.id}
          className={`
            w-12 h-12 flex items-center justify-center cursor-pointer
            transition-all duration-300 hover:scale-110 rounded-lg
            ${rune.color}
            ${foundDifferences.includes(rune.position) ? 'ring-4 ring-green-400 bg-green-400/20' : ''}
            ${gameComplete ? 'animate-pulse' : ''}
          `}
          onClick={() => handleRuneClick(rune.position)}
        >
          {renderIcon(rune.icon)}
        </div>
      ))}
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16">
        {/* 標題和說明 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4">
            The Wall of Runes
          </h1>
          <div className="h-20 flex items-center justify-center">
            <div className="text-sm md:text-base text-green-300 max-w-2xl">
              {introText}
            </div>
          </div>
          <div className="text-sm text-green-300/70">
            Core Trait: Attention to Detail
          </div>
        </div>

        {/* 進度顯示 */}
        <div className="text-center mb-8">
          <div className="text-green-400 text-lg">
            Found: {foundDifferences.length} / {totalDifferences}
          </div>
        </div>

        {/* 符文對比區域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl text-green-400 mb-4">Ancient Runes - Set A</h3>
            {renderRuneGrid(runeSet1, 'left')}
          </div>
          <div className="text-center">
            <h3 className="text-xl text-green-400 mb-4">Ancient Runes - Set B</h3>
            {renderRuneGrid(runeSet2, 'right')}
          </div>
        </div>

        {/* 石門 */}
        {showDoor && (
          <div className="text-center animate-fade-in-up">
            <div className="text-6xl mb-4">🚪</div>
            <div className="text-2xl text-green-400 mb-4">The Ancient Door Opens!</div>
            <div className="text-lg text-green-300 mb-6">
              Your keen eye for detail has unlocked the path forward.
            </div>
            <button
              onClick={onGameComplete}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-gradient-to-r from-green-400 to-green-600 rounded-full hover:from-green-500 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                Continue Journey
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default WallOfRunes;
