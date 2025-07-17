import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import RiveAnimation from './RiveAnimation';

// 웹용 대체 Rive 컴포넌트
function WebRiveDemo({ animationType = 'vehicles' }) {
  const getAnimationDescription = () => {
    switch(animationType) {
      case 'vehicles':
        return {
          title: '🚗 차량 애니메이션',
          description: '움직이는 자동차와 트럭들',
          features: ['자동 재생', '루프 애니메이션', '부드러운 움직임']
        };
      case 'avatar':
        return {
          title: '👤 아바타 애니메이션', 
          description: '인터랙티브 아바타 캐릭터',
          features: ['상태 머신', '클릭 반응', '표정 변화']
        };
      case 'localAsset':
        return {
          title: '📁 로컬 Asset 애니메이션',
          description: '앱 내부에 저장된 Rive 파일',
          features: ['빠른 로딩', '오프라인 지원', '번들 최적화']
        };
      case 'interactive':
        return {
          title: '🎮 인터랙티브 애니메이션',
          description: '실시간 터치/클릭 제어',
          features: ['상태 머신', '이벤트 처리', '실시간 반응', '감정 변화']
        };
      case 'character':
        return {
          title: '🚗 오프로드 차량',
          description: '험난한 지형을 달리는 차량',
          features: ['물리 기반 애니메이션', '복잡한 움직임', '오프로드 액션', '동적 서스펜션']
        };
      case 'loading':
        return {
          title: '🧃 쥬스 애니메이션',
          description: '상쾌한 쥬스 로딩 효과',
          features: ['유체 물리학', '무한 루프', '부드러운 전환', '매력적인 UI']
        };
      case 'button':
        return {
          title: '❤️ 좋아요 버튼',
          description: '인터랙티브 좋아요 버튼',
          features: ['터치 피드백', '하트 애니메이션', '상태 변화', '마이크로 인터랙션']
        };
      case 'particles':
        return {
          title: '🤖 마빈 로봇',
          description: '귀여운 로봇 캐릭터',
          features: ['캐릭터 애니메이션', '표정 변화', '부드러운 움직임', '개성 표현']
        };
      case 'logo':
        return {
          title: '🎭 Rive 로고',
          description: 'Rive 브랜드 로고 애니메이션',
          features: ['브랜드 정체성', '기계적 움직임', '로고 변형', '프로페셔널']
        };
      case 'weather':
        return {
          title: '👤 아바타 2',
          description: '다른 아바타 캐릭터 (날씨 테마)',
          features: ['다중 아트보드', '캐릭터 변형', '아바타 시스템', '테마 변경']
        };
      default:
        return {
          title: '🎬 Rive 애니메이션',
          description: '고품질 벡터 애니메이션',
          features: ['벡터 기반', '작은 파일 크기', '인터랙티브']
        };
    }
  };

  const animation = getAnimationDescription();

  return (
    <View style={styles.webRiveContainer}>
      <View style={styles.animationPreview}>
        <Text style={styles.animationIcon}>
          {animation.title.split(' ')[0]}
        </Text>
        <Text style={styles.animationTitle}>{animation.title}</Text>
        <Text style={styles.animationDescription}>{animation.description}</Text>
        <Text style={styles.platformIndicator}>
          {animationType === 'interactive' ? '웹 인터랙티브 모드' : '웹 실제 애니메이션 모드'}
        </Text>
        
        {/* 실제 웹 애니메이션 추가 */}
        <View style={styles.webAnimationContainer}>
          <RiveAnimation animationType={animationType} />
        </View>
        
        {/* 인터랙티브 모드일 때 웹용 컨트롤 버튼 추가 */}
        {animationType === 'interactive' && (
          <View style={styles.webControlPanel}>
            <Text style={styles.webControlTitle}>🎮 웹 인터랙티브 컨트롤</Text>
            
            <View style={styles.webControlButtons}>
              <TouchableOpacity 
                style={[styles.webControlBtn, styles.webPlayBtn]}
                onPress={() => {
                  // 웹에서 RiveAnimation에 신호 전달
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'play' } 
                  }));
                }}
              >
                <Text style={styles.webControlBtnText}>▶️ 재생</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.webControlBtn, styles.webPauseBtn]}
                onPress={() => {
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'pause' } 
                  }));
                }}
              >
                <Text style={styles.webControlBtnText}>⏸️ 정지</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.webControlBtn, styles.webResetBtn]}
                onPress={() => {
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'reset' } 
                  }));
                }}
              >
                <Text style={styles.webControlBtnText}>🔄 리셋</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.webInteractionButtons}>
              <TouchableOpacity 
                style={[styles.webInteractionBtn, styles.webHappyBtn]}
                onPress={() => {
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'emotion', emotion: 'happy' } 
                  }));
                }}
              >
                <Text style={styles.webInteractionBtnText}>😊 행복</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.webInteractionBtn, styles.webSadBtn]}
                onPress={() => {
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'emotion', emotion: 'sad' } 
                  }));
                }}
              >
                <Text style={styles.webInteractionBtnText}>😢 슬픔</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.webInteractionBtn, styles.webSurpriseBtn]}
                onPress={() => {
                  window.dispatchEvent(new CustomEvent('riveControl', { 
                    detail: { action: 'emotion', emotion: 'surprise' } 
                  }));
                }}
              >
                <Text style={styles.webInteractionBtnText}>😲 놀람</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <View style={styles.featureList}>
          {animation.features.map((feature, index) => (
            <Text key={index} style={styles.featureItem}>• {feature}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

// 모바일용 실제 Rive 컴포넌트 (동적 import)
function MobileRiveDemo({ animationType = 'vehicles' }) {
  const [RiveComponent, setRiveComponent] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentState, setCurrentState] = useState('idle');

  React.useEffect(() => {
    // 동적으로 rive-react-native 로드
    import('rive-react-native')
      .then((RiveModule) => {
        const Rive = RiveModule.default;
        
        const getProps = () => {
          switch(animationType) {
            case 'vehicles':
              return {
                url: "https://cdn.rive.app/animations/vehicles.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'avatar':
              return {
                url: "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv",
                artboardName: "Avatar 1",
                stateMachineName: "avatar",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false),
                onStateChanged: (stateMachineName, stateName) => {
                  setCurrentState(stateName);
                  console.log(`🎭 State changed: ${stateName}`);
                }
              };
            case 'character':
              return {
                url: "https://cdn.rive.app/animations/off_road_car_0_6.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'loading':
              return {
                url: "https://cdn.rive.app/animations/juice_v7.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'button':
              return {
                url: "https://cdn.rive.app/animations/like_button_demo.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'particles':
              return {
                url: "https://cdn.rive.app/animations/marvin.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'logo':
              return {
                url: "https://cdn.rive.app/animations/rive_logo_machine.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'weather':
              return {
                url: "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv",
                artboardName: "Avatar 2",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStop: () => setIsPlaying(false)
              };
            case 'localAsset':
              // 플랫폼별 처리
              if (Platform.OS === 'web') {
                // 웹에서는 CDN 사용 (번들링 문제로 인한 시뮬레이션)
                return {
                  url: "https://cdn.rive.app/animations/vehicles.riv",
                  autoplay: true,
                  onPlay: () => setIsPlaying(true),
                  onPause: () => setIsPlaying(false)
                };
              } else {
                // 모바일에서는 로컬 asset 사용
                try {
                  const localAssetPath = require('./assets/vehicles.riv');
                  // 빈 모듈이 반환된 경우 처리
                  if (localAssetPath && typeof localAssetPath === 'string') {
                    return {
                      resourceName: localAssetPath,
                      autoplay: true,
                      onPlay: () => setIsPlaying(true),
                      onPause: () => setIsPlaying(false)
                    };
                  } else {
                    // 웹에서 빈 모듈이 반환된 경우 CDN 사용
                    return {
                      url: "https://cdn.rive.app/animations/vehicles.riv",
                      autoplay: true,
                      onPlay: () => setIsPlaying(true),
                      onPause: () => setIsPlaying(false)
                    };
                  }
                } catch (error) {
                  console.log('로컬 asset 로드 실패, CDN 사용:', error);
                  return {
                    url: "https://cdn.rive.app/animations/vehicles.riv",
                    autoplay: true,
                    onPlay: () => setIsPlaying(true),
                    onPause: () => setIsPlaying(false)
                  };
                }
              }
            case 'interactive':
              return {
                url: "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv",
                artboardName: "Avatar 1",
                stateMachineName: "avatar",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false),
                onStateChanged: (stateMachineName, stateName) => {
                  setCurrentState(stateName);
                  console.log(`🎭 Interactive state: ${stateName}`);
                }
              };
            default:
              return {
                url: "https://cdn.rive.app/animations/vehicles.riv",
                autoplay: true,
                onPlay: () => setIsPlaying(true),
                onPause: () => setIsPlaying(false)
              };
          }
        };

        const props = getProps();
        
        // Rive 컴포넌트에 ref 추가하여 제어 가능하게 만들기
        const RiveComponentWithControls = (
          <View style={styles.interactiveContainer}>
            <Rive
              ref={(ref) => {
                // ref를 통해 컴포넌트 제어 함수들 저장
                if (ref && animationType === 'interactive') {
                  window.riveRef = ref;
                }
              }}
              {...props}
              style={{ width: 300, height: 300 }}
            />
            
            {/* 인터랙티브 컨트롤 버튼들 */}
            {animationType === 'interactive' && (
              <View style={styles.controlPanel}>
                <Text style={styles.statusText}>
                  상태: {isPlaying ? '재생 중' : '일시정지'} | 현재: {currentState}
                </Text>
                
                <View style={styles.controlButtons}>
                  <TouchableOpacity 
                    style={[styles.controlBtn, styles.playBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.play();
                        setIsPlaying(true);
                      }
                    }}
                  >
                    <Text style={styles.controlBtnText}>▶️ 재생</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.controlBtn, styles.pauseBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.pause();
                        setIsPlaying(false);
                      }
                    }}
                  >
                    <Text style={styles.controlBtnText}>⏸️ 일시정지</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.controlBtn, styles.resetBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.reset();
                        setIsPlaying(false);
                        setCurrentState('idle');
                      }
                    }}
                  >
                    <Text style={styles.controlBtnText}>🔄 리셋</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.interactionButtons}>
                  <TouchableOpacity 
                    style={[styles.interactionBtn, styles.happyBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.fireState('avatar', 'happy');
                        setCurrentState('happy');
                      }
                    }}
                  >
                    <Text style={styles.interactionBtnText}>😊 행복</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.interactionBtn, styles.sadBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.fireState('avatar', 'sad');
                        setCurrentState('sad');
                      }
                    }}
                  >
                    <Text style={styles.interactionBtnText}>😢 슬픔</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[styles.interactionBtn, styles.surpriseBtn]}
                    onPress={() => {
                      if (window.riveRef) {
                        window.riveRef.fireState('avatar', 'surprise');
                        setCurrentState('surprise');
                      }
                    }}
                  >
                    <Text style={styles.interactionBtnText}>😲 놀람</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        );
        
        setRiveComponent(RiveComponentWithControls);
      })
      .catch((err) => {
        console.error('Rive 로드 실패:', err);
        setError('Rive 라이브러리를 로드할 수 없습니다.');
      });
  }, [animationType]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return RiveComponent || (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>로딩 중...</Text>
    </View>
  );
}

export default function App() {
  const [currentDemo, setCurrentDemo] = useState('vehicles');

  const getAnimationName = (demo) => {
    const names = {
      'vehicles': '차량 애니메이션',
      'avatar': '아바타 애니메이션',
      'localAsset': '로컬 Asset 애니메이션',
      'interactive': '인터랙티브 애니메이션',
      'character': '오프로드 차량',
      'loading': '쥬스 애니메이션',
      'button': '좋아요 버튼',
      'particles': '마빈 로봇',
      'logo': 'Rive 로고',
      'weather': '아바타 2'
    };
    return names[demo] || '기본 애니메이션';
  };

  const renderCurrentDemo = () => {
    if (Platform.OS === 'web') {
      return <WebRiveDemo animationType={currentDemo} />;
    } else {
      return <MobileRiveDemo animationType={currentDemo} />;
    }
  };
    
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Rive 애니메이션 학습</Text>
      <Text style={styles.subtitle}>
        현재: {getAnimationName(currentDemo)}
      </Text>
      <Text style={styles.platformInfo}>
        플랫폼: {Platform.OS === 'web' ? '웹 (실제 애니메이션)' : '모바일 (실제 애니메이션)'}
      </Text>
      
      {renderCurrentDemo()}

      <View style={styles.buttonContainer}>
        {/* 첫 번째 행 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'vehicles' && styles.activeButton]}
            onPress={() => setCurrentDemo('vehicles')}
          >
            <Text style={styles.buttonText}>🚗 차량</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.smallButton, currentDemo === 'avatar' && styles.activeButton]}
            onPress={() => setCurrentDemo('avatar')}
          >
            <Text style={styles.buttonText}>👤 아바타</Text>
          </TouchableOpacity>
          
            <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'localAsset' && styles.activeButton]}
            onPress={() => setCurrentDemo('localAsset')}
            >
            <Text style={styles.buttonText}>📁 로컬</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'interactive' && styles.activeButton]}
            onPress={() => setCurrentDemo('interactive')}
            >
            <Text style={styles.buttonText}>🎮 인터랙티브</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'character' && styles.activeButton]}
            onPress={() => setCurrentDemo('character')}
            >
            <Text style={styles.buttonText}>🚗 오프로드</Text>
            </TouchableOpacity>
        </View>
        
        {/* 두 번째 행 */}
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'loading' && styles.activeButton]}
            onPress={() => setCurrentDemo('loading')}
          >
            <Text style={styles.buttonText}>🧃 쥬스</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'button' && styles.activeButton]}
            onPress={() => setCurrentDemo('button')}
          >
            <Text style={styles.buttonText}>❤️ 좋아요</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'particles' && styles.activeButton]}
            onPress={() => setCurrentDemo('particles')}
          >
            <Text style={styles.buttonText}>🤖 마빈</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'logo' && styles.activeButton]}
            onPress={() => setCurrentDemo('logo')}
          >
            <Text style={styles.buttonText}>🎭 로고</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.smallButton, currentDemo === 'weather' && styles.activeButton]}
            onPress={() => setCurrentDemo('weather')}
          >
            <Text style={styles.buttonText}>👤 아바타2</Text>
          </TouchableOpacity>
        </View>
        </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>📖 학습 정보</Text>
        <Text style={styles.infoText}>
          {currentDemo === 'interactive'
            ? '• 인터랙티브: 상태 머신과 이벤트 처리\n• 터치/클릭으로 애니메이션 제어\n• 실시간 상태 변경\n• 감정 표현 변화'
            : currentDemo === 'character'
              ? '• 오프로드 차량: 물리 기반 애니메이션\n• 복잡한 지형 처리\n• 동적 서스펜션 시스템\n• 현실적인 차량 움직임'
            : currentDemo === 'loading'
              ? '• 쥬스 애니메이션: 유체 물리학\n• 무한 루프 구조\n• 매력적인 UI 디자인\n• 로딩 상태 표현'
            : currentDemo === 'button'
              ? '• 좋아요 버튼: 마이크로 인터랙션\n• 터치 피드백 시스템\n• 하트 애니메이션 효과\n• 상태 변화 시각화'
            : currentDemo === 'particles'
              ? '• 마빈 로봇: 캐릭터 애니메이션\n• 표정 변화 시스템\n• 부드러운 움직임\n• 개성 표현 기법'
            : currentDemo === 'logo'
              ? '• Rive 로고: 브랜드 애니메이션\n• 기계적 움직임 구현\n• 로고 변형 효과\n• 프로페셔널 표현'
            : currentDemo === 'weather'
              ? '• 아바타 2: 다중 아트보드\n• 캐릭터 변형 기법\n• 아바타 시스템 구조\n• 테마별 캐릭터 변화'
            : currentDemo === 'localAsset' 
              ? Platform.OS === 'web' 
                ? '• 웹: 로컬 Asset 시뮬레이션 (CDN 사용)\n• 실제 모바일에서는 로컬 파일 사용\n• 빠른 로딩 속도\n• 오프라인 지원 (모바일)' 
                : '• 모바일: 실제 로컬 Asset 사용\n• 앱 내부에 저장된 Rive 파일\n• 빠른 로딩 속도\n• 오프라인 지원'
              : Platform.OS === 'web' 
                ? '• 웹: CDN을 통한 실제 Rive 애니메이션\n• Canvas 기반 렌더링\n• 브라우저에서 바로 실행\n• 다양한 스타일과 효과' 
                : '• 모바일: rive-react-native 사용\n• 네이티브 성능으로 실행\n• 터치 인터랙션 지원\n• 최적화된 렌더링'
          }
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  platformInfo: {
    fontSize: 14,
    marginBottom: 20,
    color: '#999',
    fontStyle: 'italic',
  },
  webRiveContainer: {
    width: 400,
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    } : {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  animationPreview: {
    alignItems: 'center',
  },
  animationIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  animationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  animationDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  platformIndicator: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  webAnimationContainer: {
    width: 300,
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  featureList: {
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  featureItem: {
    fontSize: 12,
    color: '#888',
    marginVertical: 2,
  },
  playButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#ffebee',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  loadingContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  smallButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 18,
    minWidth: 65,
  },
  activeButton: {
    backgroundColor: '#1976d2',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)'
    } : {
      shadowColor: '#1976d2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  interactiveContainer: {
    position: 'relative',
  },
  controlPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  controlButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  controlBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
  },
  controlBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playBtn: {
    backgroundColor: '#4CAF50',
  },
  pauseBtn: {
    backgroundColor: '#f44336',
  },
  resetBtn: {
    backgroundColor: '#2196f3',
  },
  interactionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  interactionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
  },
  interactionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  happyBtn: {
    backgroundColor: '#4CAF50',
  },
  sadBtn: {
    backgroundColor: '#f44336',
  },
  surpriseBtn: {
    backgroundColor: '#2196f3',
  },
  webControlPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webControlTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  webControlButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 15,
  },
  webControlBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
  },
  webControlBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  webPlayBtn: {
    backgroundColor: '#4CAF50',
  },
  webPauseBtn: {
    backgroundColor: '#f44336',
  },
  webResetBtn: {
    backgroundColor: '#2196f3',
  },
  webInteractionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  webInteractionBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
  },
  webInteractionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  webHappyBtn: {
    backgroundColor: '#4CAF50',
  },
  webSadBtn: {
    backgroundColor: '#f44336',
  },
  webSurpriseBtn: {
    backgroundColor: '#2196f3',
  },
});