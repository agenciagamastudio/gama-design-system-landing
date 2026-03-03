# ═══════════════════════════════════════════════════════════════
# Gama Studio Design System - Landing Page Server Starter
# ═══════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "🎨 Gama Studio Design System - Landing Page" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

# Verifica se Python 3 está instalado
$pythonCheck = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python 3 não encontrado. Instale em python.org" -ForegroundColor Red
    Read-Host "Pressione ENTER para sair"
    exit 1
}

Write-Host "✅ Python encontrado: $pythonCheck" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Iniciando servidor em http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Pressione CTRL+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""

# Inicia servidor HTTP
python -m http.server 8000

Read-Host "Pressione ENTER para sair"
