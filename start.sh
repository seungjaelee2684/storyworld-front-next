#!/bin/bash

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 프로덕션 환경 시작...${NC}"

# 로그 디렉토리 생성
mkdir -p logs

# 환경 변수 확인
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}⚠️  .env.production 파일이 없습니다.${NC}"
fi

# Yarn이 설치되어 있는지 확인
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}❌ Yarn이 설치되지 않았습니다. 먼저 Yarn을 설치해주세요.${NC}"
    echo -e "${YELLOW}💡 설치 방법: npm install -g yarn${NC}"
    exit 1
fi

# 종속성 설치
echo -e "${GREEN}📦 종속성 설치 중...${NC}"
yarn install --frozen-lockfile --production=false

# 빌드
echo -e "${GREEN}🔨 애플리케이션 빌드 중...${NC}"
yarn build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 빌드에 실패했습니다.${NC}"
    exit 1
fi

# PM2가 설치되어 있는지 확인
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}📦 PM2 설치 중...${NC}"
    yarn global add pm2
fi

# 기존 프로세스 중지
echo -e "${GREEN}🛑 기존 프로세스 중지 중...${NC}"
pm2 delete storyworld-front 2>/dev/null || true

# 새 프로세스 시작
echo -e "${GREEN}▶️  새 프로세스 시작 중...${NC}"
pm2 start ecosystem.config.js --env production

# PM2 프로세스 저장
pm2 save

# 시스템 재부팅 시 자동 시작 설정
pm2 startup

echo -e "${GREEN}✅ 프로덕션 환경이 성공적으로 시작되었습니다!${NC}"
echo -e "${GREEN}🌐 애플리케이션이 http://localhost:3000 에서 실행 중입니다.${NC}"
echo -e "${GREEN}📊 상태 확인: pm2 status${NC}"
echo -e "${GREEN}📝 로그 확인: pm2 logs storyworld-front${NC}"