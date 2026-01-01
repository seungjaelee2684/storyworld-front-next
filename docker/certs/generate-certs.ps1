# SSL 인증서 생성 스크립트
$certPath = Join-Path $PSScriptRoot "local.pem"
$keyPath = Join-Path $PSScriptRoot "local-key.pem"

# OpenSSL이 설치되어 있는지 확인
$opensslPath = Get-Command openssl -ErrorAction SilentlyContinue
if (-not $opensslPath) {
    Write-Host "OpenSSL이 설치되어 있지 않습니다. Git Bash의 OpenSSL을 사용합니다."
    $opensslPath = "C:\Program Files\Git\usr\bin\openssl.exe"
    if (-not (Test-Path $opensslPath)) {
        Write-Host "OpenSSL을 찾을 수 없습니다."
        exit 1
    }
}

# 인증서 생성
Set-Location $PSScriptRoot

# 개인 키 생성
& $opensslPath genrsa -out local-key.pem 2048

# 인증서 생성 (입력 자동화)
$input = @"
KR
Seoul
Seoul
Development
IT
storyworld.com


"@

$input | & $opensslPath req -new -x509 -key local-key.pem -out local.pem -days 365

Write-Host "인증서가 생성되었습니다:"
Write-Host "  - $certPath"
Write-Host "  - $keyPath"

