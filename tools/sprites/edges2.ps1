# Zeldara edge pieces, round 42: logs, stones, flowers, shore and snow details, fire rocks, and the small creatures
# and drifting things of the moving terrain (crabs, dragonflies, fish, frogs, gulls, crows, butterflies, wisps,
# fireflies, leaves). 4 sheets, 48 pieces (wave 42). The round 38 sheets are done and are skipped.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\edges2.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\edges2.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent - the four new edge sheets (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 42 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 42 --concurrency 2
Write-Host "`nDone. Tell Claude the edge sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
