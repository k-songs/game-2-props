const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// 웹에서 rive-react-native 패키지 제외
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// 웹 플랫폼에서 특정 패키지 제외
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// 웹에서 사용할 수 없는 패키지들을 대체
config.resolver.alias = {
  // 웹에서 rive-react-native를 빈 모듈로 대체
  ...config.resolver.alias,
};

// 플랫폼별 조건부 해상도
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Asset 확장자 추가 (Rive 파일 지원)
config.resolver.assetExts = [
  ...config.resolver.assetExts,
  'riv'  // Rive 파일 확장자 추가
];

// 정적 asset 경로 설정
config.resolver.alias = {
  ...config.resolver.alias,
  // 웹에서 assets 폴더에 직접 접근 가능하도록 설정
  '~assets': require('path').resolve(__dirname, 'assets'),
};

// 웹에서만 특정 파일 처리 방식 변경
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // 웹에서 .riv 파일 요청 시 빈 모듈로 대체
  if (platform === 'web' && moduleName.endsWith('.riv')) {
    return {
      type: 'empty',
    };
  }
  
  // 기본 해상도 로직 사용
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config; 