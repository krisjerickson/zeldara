# Zeldara round 45: the new paintings, all in one go.
#   - wave 46: icons for the new weapons, the seven rare forging items and Petal Step (1 sheet)
#   - wave 47: sky-port flights (2 backdrop sheets, 1 sheet of galleons / wingman / cloud bunker / power-ups) and the adventure sites'
#              big set-pieces (2 sheets)                                                                                  (5 sheets)
#   - Petal-dancer Senna, the Sunflower Chateau's new teacher (1 character sheet)
# 7 sheets in all.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round45.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round45.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 46,47 --dry-run
node tools/sprites/generate.mjs --ids tc_petal.core.f --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 46,47 --concurrency 2
node tools/sprites/generate.mjs --ids tc_petal.core.f
Write-Host "`nDone. Tell Claude the round 45 sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
