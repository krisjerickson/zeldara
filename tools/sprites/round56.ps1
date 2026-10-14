# Zeldara round 56 prep: four option sheets for Muspelheim to pick in the Lab (wave 58) - Surtharn, the spirit walls, the challenge halls' pieces, the great hearth, the Lodestar and the ash-wardens
# (Kris: "Lab options first").
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round56.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round56.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 58 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 58 --concurrency 2
Write-Host "`nDone. Tell Claude the round 56 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
