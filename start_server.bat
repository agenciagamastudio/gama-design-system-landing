@echo off
REM Script para iniciar servidor local da landing page Gama Studio

echo.
echo ═══════════════════════════════════════════════════════════════
echo 🎨 Gama Studio Design System - Landing Page
echo ═══════════════════════════════════════════════════════════════
echo.

REM Verifica se Python 3 está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python 3 não encontrado. Instale Python em python.org
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo.
echo 🚀 Iniciando servidor em http://localhost:8000
echo.
echo Pressione CTRL+C para parar o servidor
echo.

REM Inicia servidor HTTP
python -m http.server 8000

pause
