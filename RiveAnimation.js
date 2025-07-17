import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

// 로컬 asset 파일 import (웹에서 사용 시 Metro 번들러가 처리)
// import vehiclesRiv from './assets/vehicles.riv';

const RiveAnimation = ({ animationType = 'vehicles' }) => {
  const canvasRef = useRef(null);
  const riveInstanceRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentState, setCurrentState] = useState('idle');

  useEffect(() => {
    // 웹에서 인터랙티브 이벤트 리스너 등록
    const handleRiveControl = (event) => {
      if (!riveInstanceRef.current) return;
      
      const { action, emotion } = event.detail;
      console.log('🎮 Received control event:', action, emotion);
      
      switch(action) {
        case 'play':
          try {
            riveInstanceRef.current.play();
            setIsPlaying(true);
            console.log('▶️ Animation started');
          } catch (error) {
            console.error('Play error:', error);
          }
          break;
        case 'pause':
          try {
            riveInstanceRef.current.pause();
            setIsPlaying(false);
            console.log('⏸️ Animation paused');
          } catch (error) {
            console.error('Pause error:', error);
          }
          break;
        case 'reset':
          try {
            riveInstanceRef.current.reset();
            setIsPlaying(false);
            setCurrentState('idle');
            console.log('🔄 Animation reset');
          } catch (error) {
            console.error('Reset error:', error);
          }
          break;
        case 'emotion':
          try {
            // 아바타 애니메이션에서 감정 상태 변경
            if (animationType === 'interactive' && riveInstanceRef.current.stateMachines) {
              const stateMachine = riveInstanceRef.current.stateMachines.find(
                sm => sm.name === 'avatar'
              );
              if (stateMachine) {
                const trigger = stateMachine.inputs.find(
                  input => input.name === emotion
                );
                if (trigger) {
                  trigger.fire();
                  setCurrentState(emotion);
                  console.log(`😊 Emotion changed to: ${emotion}`);
                }
              }
            }
          } catch (error) {
            console.error('Emotion change error:', error);
          }
          break;
      }
    };

    if (animationType === 'interactive') {
      window.addEventListener('riveControl', handleRiveControl);
    }

    // CDN에서 Rive 라이브러리 로드
    const loadRive = async () => {
      try {
        // 이미 로드된 경우 건너뛰기
        if (window.rive) {
          initializeRive();
          return;
        }

        // Rive 라이브러리 CDN 로드
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/@rive-app/canvas@2.17.3/rive.js';
        
        script.onload = () => {
          console.log('✅ Rive library loaded successfully');
          initializeRive();
        };
        script.onerror = () => {
          console.error('❌ Failed to load Rive library');
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('❌ Error loading Rive:', error);
      }
    };

    const initializeRive = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas || !window.rive) return;

        console.log('🎬 Initializing Rive animation...');

        // 애니메이션 타입에 따른 URL 설정
        const getRiveUrl = () => {
          switch(animationType) {
            case 'vehicles':
              return 'https://cdn.rive.app/animations/vehicles.riv';
            case 'avatar':
              return 'https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv';
            case 'interactive':
              return 'https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv';
            case 'character':
              // 검증된 공개 애니메이션 사용 - 워키 캐릭터
              return 'https://cdn.rive.app/animations/off_road_car_0_6.riv';
            case 'loading':
              // 검증된 공개 로딩 애니메이션 사용
              return 'https://cdn.rive.app/animations/juice_v7.riv';
            case 'button':
              // 검증된 공개 버튼 애니메이션 - 좋아요 버튼
              return 'https://cdn.rive.app/animations/like_button_demo.riv';
            case 'particles':
              // 검증된 공개 파티클 애니메이션 - 마빈
              return 'https://cdn.rive.app/animations/marvin.riv';
            case 'logo':
              // 검증된 공개 로고 애니메이션 - Rive 로고
              return 'https://cdn.rive.app/animations/rive_logo_machine.riv';
            case 'weather':
              // 아바타 파일을 다른 아트보드로 사용 (날씨 테마)
              return 'https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv';
            case 'localAsset':
              // 로컬 asset 사용 - 웹에서는 require를 통해 번들된 asset 사용
              try {
                // Metro 번들러가 처리한 asset 경로 사용
                return require('./assets/vehicles.riv');
              } catch (error) {
                console.log('Asset require failed, using fallback path');
                // 대체 경로 사용
                return '/assets/vehicles.riv';
              }
            default:
              return 'https://cdn.rive.app/animations/vehicles.riv';
          }
        };

        const riveUrl = getRiveUrl();
        const { Rive, Layout, Fit, Alignment } = window.rive;

        // 인터랙티브 모드일 때 특별한 설정 사용
        const isInteractive = animationType === 'interactive';
        
        // 각 애니메이션 타입별 특별한 설정
        const getAnimationConfig = () => {
          switch(animationType) {
            case 'interactive':
              return {
                autoplay: false,
                artboard: 'Avatar 1',
                stateMachines: ['avatar']
              };
            case 'character':
              return {
                autoplay: true,
                // 게임 캐릭터는 특별한 아트보드나 상태 머신이 있을 수 있음
              };
            case 'loading':
              return {
                autoplay: true,
                // 로딩 애니메이션은 무한 루프로 설정
              };
            case 'button':
              return {
                autoplay: true,
                // 버튼 효과는 호버나 클릭 상태 머신이 있을 수 있음
              };
            case 'particles':
              return {
                autoplay: true,
                // 파티클 효과는 물리 시뮬레이션 설정
              };
            case 'logo':
              return {
                autoplay: true,
                // 로고는 시퀀스 애니메이션 설정
              };
            case 'weather':
              return {
                autoplay: true,
                // 날씨 효과는 환경 변수에 따른 설정
              };
            default:
              return {
                autoplay: !isInteractive
              };
          }
        };

        const animationConfig = getAnimationConfig();
        
        // Rive 인스턴스 생성
        riveInstanceRef.current = new Rive({
          src: riveUrl,
          canvas: canvas,
          autoplay: animationConfig.autoplay,
          artboard: animationConfig.artboard,
          stateMachines: animationConfig.stateMachines,
          layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center
          }),
          onLoad: () => {
            console.log(`🎯 Rive animation loaded successfully: ${animationType}`);
            
            if (isInteractive) {
              console.log('🎮 Interactive mode enabled');
              setIsPlaying(false);
              setCurrentState('idle');
              
              // 상태 머신 정보 로그
              if (riveInstanceRef.current.stateMachines) {
                console.log('🎛️ Available state machines:', 
                  riveInstanceRef.current.stateMachines.map(sm => sm.name));
                riveInstanceRef.current.stateMachines.forEach(sm => {
                  console.log(`📋 Inputs for ${sm.name}:`, 
                    sm.inputs.map(input => input.name));
                });
              }
            } else {
              setIsPlaying(animationConfig.autoplay);
              
              // 각 애니메이션 타입별 특별한 로그
              switch(animationType) {
                case 'character':
                  console.log('🎮 Game character animation loaded');
                  break;
                case 'loading':
                  console.log('⏳ Loading spinner animation loaded');
                  break;
                case 'button':
                  console.log('🎛️ Button interaction animation loaded');
                  break;
                case 'particles':
                  console.log('✨ Particle system animation loaded');
                  break;
                case 'logo':
                  console.log('🏢 Logo branding animation loaded');
                  break;
                case 'weather':
                  console.log('🌤️ Weather environment animation loaded');
                  break;
                default:
                  console.log(`🎬 ${animationType} animation loaded`);
              }
            }
            
            // 애니메이션 크기 조정
            riveInstanceRef.current.resizeDrawingSurfaceToCanvas();
          },
          onLoadError: (error) => {
            console.error('❌ Rive loading error:', error);
            // 로컬 asset 실패 시 CDN으로 폴백
            if (animationType === 'localAsset') {
              console.log('🔄 Falling back to CDN for local asset...');
              fallbackToCDN();
            } else {
              createFallbackAnimation();
            }
          },
          onPlay: () => {
            console.log('▶️ Animation playing');
            setIsPlaying(true);
          },
          onPause: () => {
            console.log('⏸️ Animation paused');
            setIsPlaying(false);
          },
          onStop: () => {
            console.log('⏹️ Animation stopped');
            setIsPlaying(false);
          }
        });

      } catch (error) {
        console.error('❌ Error initializing Rive:', error);
        createFallbackAnimation();
      }
    };

    // 로컬 asset 실패 시 CDN으로 폴백
    const fallbackToCDN = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas || !window.rive) return;

        const { Rive, Layout, Fit, Alignment } = window.rive;
        
        riveInstanceRef.current = new Rive({
          src: 'https://cdn.rive.app/animations/vehicles.riv',
          canvas: canvas,
          autoplay: true,
          layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center
          }),
          onLoad: () => {
            console.log('🎯 Fallback CDN animation loaded');
            riveInstanceRef.current.resizeDrawingSurfaceToCanvas();
            setIsPlaying(true);
          },
          onLoadError: (error) => {
            console.error('❌ Fallback CDN loading error:', error);
            createFallbackAnimation();
          }
        });
      } catch (error) {
        console.error('❌ Error in fallback:', error);
        createFallbackAnimation();
      }
    };

    // 대체 애니메이션 (Rive 로딩 실패 시)
    const createFallbackAnimation = () => {
      // 로딩 시작 메시지
      console.log(`🎨 Starting fallback animation for ${animationType}`);
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 애니메이션 타입별 메시지 출력
      switch(animationType) {
        case 'character':
          console.log('🚗 오프로드 차량 fallback 애니메이션 시작');
          break;
        case 'loading':
          console.log('🧃 쥬스 fallback 애니메이션 시작');
          break;
        case 'button':
          console.log('❤️ 좋아요 버튼 fallback 애니메이션 시작');
          break;
        case 'particles':
          console.log('🤖 마빈 로봇 fallback 애니메이션 시작');
          break;
        case 'logo':
          console.log('🎭 Rive 로고 fallback 애니메이션 시작');
          break;
        case 'weather':
          console.log('👤 아바타 2 fallback 애니메이션 시작');
          break;
        default:
          console.log('🎬 기본 fallback 애니메이션 시작');
      }

      let angle = 0;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 배경 그라데이션
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 애니메이션 타입에 따른 다른 fallback 애니메이션
        if (animationType === 'localAsset') {
          // 로컬 asset 테마 - 파일 아이콘 애니메이션
          drawFileAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'interactive') {
          // 인터랙티브 테마 - 게임패드 아이콘 애니메이션
          drawInteractiveAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'character') {
          // 오프로드 차량 테마 - 차량 아이콘 애니메이션
          drawCharacterAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'loading') {
          // 쥬스 애니메이션 테마 - 쥬스 아이콘 애니메이션
          drawLoadingAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'button') {
          // 좋아요 버튼 테마 - 하트 아이콘 애니메이션
          drawButtonAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'particles') {
          // 마빈 로봇 테마 - 로봇 아이콘 애니메이션
          drawParticleAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'logo') {
          // Rive 로고 테마 - 로고 아이콘 애니메이션
          drawLogoAnimation(ctx, centerX, centerY, angle);
        } else if (animationType === 'weather') {
          // 아바타 2 테마 - 아바타 아이콘 애니메이션
          drawWeatherAnimation(ctx, centerX, centerY, angle);
        } else {
          // 기본 회전 원 애니메이션
          drawDefaultAnimation(ctx, centerX, centerY, angle);
        }

        angle += 0.05;
        requestAnimationFrame(animate);
      };

      const drawFileAnimation = (ctx, centerX, centerY, angle) => {
        // 파일 아이콘 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const scale = 1 + Math.sin(angle * 2) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.fillText('📁', 0, 0);
        ctx.restore();
        
        // 주변 점들
        for (let i = 0; i < 6; i++) {
          const x = centerX + Math.cos(angle + i * Math.PI / 3) * 80;
          const y = centerY + Math.sin(angle + i * Math.PI / 3) * 80;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#4CAF50';
          ctx.fill();
        }
      };

      const drawInteractiveAnimation = (ctx, centerX, centerY, angle) => {
        // 인터랙티브 게임패드 아이콘 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const scale = 1 + Math.sin(angle * 2) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.fillText('🎮', 0, 0);
        ctx.restore();
        
        // 펄스 링
        const pulseRadius = 60 + Math.sin(angle * 3) * 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 상태 표시 텍스트
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText(`상태: ${currentState}`, centerX, centerY + 80);
        ctx.fillText(`재생: ${isPlaying ? '중' : '정지'}`, centerX, centerY + 100);
      };

      const drawCharacterAnimation = (ctx, centerX, centerY, angle) => {
        // 오프로드 차량 아이콘 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const bounceScale = 1 + Math.sin(angle * 4) * 0.15;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(bounceScale, bounceScale);
        ctx.fillText('🚗', 0, 0);
        ctx.restore();
        
        // 주변 액션 라인들
        for (let i = 0; i < 6; i++) {
          const startX = centerX + Math.cos(angle + i * Math.PI / 3) * 40;
          const startY = centerY + Math.sin(angle + i * Math.PI / 3) * 40;
          const endX = centerX + Math.cos(angle + i * Math.PI / 3) * 70;
          const endY = centerY + Math.sin(angle + i * Math.PI / 3) * 70;
          
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = '#FF9800';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      };

      const drawLoadingAnimation = (ctx, centerX, centerY, angle) => {
        // 쥬스 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const scale = 1 + Math.sin(angle * 3) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(scale, scale);
        ctx.fillText('🧃', 0, 0);
        ctx.restore();
        
        // 로딩 스피너 원
        ctx.beginPath();
        ctx.arc(centerX, centerY, 80, 0, angle * 2);
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // 로딩 텍스트
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('로딩 중...', centerX, centerY + 110);
      };

      const drawButtonAnimation = (ctx, centerX, centerY, angle) => {
        // 하트 아이콘 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const heartScale = 1 + Math.sin(angle * 6) * 0.2;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(heartScale, heartScale);
        ctx.fillText('❤️', 0, 0);
        ctx.restore();
        
        // 클릭 파동 효과
        const rippleRadius = (Math.sin(angle * 2) + 1) * 40;
        ctx.beginPath();
        ctx.arc(centerX, centerY, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#E91E63';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 버튼 텍스트
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('좋아요 버튼', centerX, centerY + 80);
      };

      const drawParticleAnimation = (ctx, centerX, centerY, angle) => {
        // 마빈 로봇 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const robotScale = 1 + Math.sin(angle * 2) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(robotScale, robotScale);
        ctx.fillText('🤖', 0, 0);
        ctx.restore();
        
        // 파티클 효과 (작은 점들)
        for (let i = 0; i < 12; i++) {
          const particleAngle = angle + i * (Math.PI * 2 / 12);
          const distance = 60 + Math.sin(angle * 3 + i) * 20;
          const x = centerX + Math.cos(particleAngle) * distance;
          const y = centerY + Math.sin(particleAngle) * distance;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#64B5F6';
          ctx.fill();
        }
      };

      const drawLogoAnimation = (ctx, centerX, centerY, angle) => {
        // Rive 로고 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const logoScale = 1 + Math.sin(angle * 2) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(logoScale, logoScale);
        ctx.fillText('🎭', 0, 0);
        ctx.restore();
        
        // 로고 테두리 효과
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.strokeStyle = '#673AB7';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // 회전하는 장식 요소
        for (let i = 0; i < 8; i++) {
          const decorAngle = angle + i * (Math.PI * 2 / 8);
          const x = centerX + Math.cos(decorAngle) * 90;
          const y = centerY + Math.sin(decorAngle) * 90;
          
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#673AB7';
          ctx.fill();
        }
      };

      const drawWeatherAnimation = (ctx, centerX, centerY, angle) => {
        // 아바타 2 애니메이션
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const avatarScale = 1 + Math.sin(angle * 2) * 0.1;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(avatarScale, avatarScale);
        ctx.fillText('👤', 0, 0);
        ctx.restore();
        
        // 아바타 주변 효과
        const effectRadius = 60 + Math.sin(angle * 3) * 15;
        ctx.beginPath();
        ctx.arc(centerX, centerY, effectRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#9C27B0';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // 아바타 변형 표시
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Arial';
        ctx.fillText('Avatar 2', centerX, centerY + 90);
      };

      const drawDefaultAnimation = (ctx, centerX, centerY, angle) => {
        // 회전하는 원들
        for (let i = 0; i < 8; i++) {
          const x = centerX + Math.cos(angle + i * Math.PI / 4) * 60;
          const y = centerY + Math.sin(angle + i * Math.PI / 4) * 60;
          
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${(angle * 180 / Math.PI + i * 45) % 360}, 70%, 60%)`;
          ctx.fill();
        }

        // 중앙 펄스 원
        const pulseRadius = 30 + Math.sin(angle * 2) * 10;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      };

      console.log(`🎨 Starting fallback animation for ${animationType}`);
      setIsPlaying(true);
      animate();
    };

    loadRive();

    // 정리 함수
    return () => {
      if (riveInstanceRef.current) {
        riveInstanceRef.current.cleanup();
        riveInstanceRef.current = null;
      }
      
      // 이벤트 리스너 제거
      if (animationType === 'interactive') {
        window.removeEventListener('riveControl', handleRiveControl);
      }
    };
  }, [animationType]);

  const { width, height } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <canvas
        ref={canvasRef}
        width={Math.min(width * 0.9, 400)}
        height={Math.min(height * 0.6, 400)}
        style={styles.canvas}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  canvas: {
    borderRadius: 20,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    backgroundColor: '#fff',
  },
});

export default RiveAnimation; 