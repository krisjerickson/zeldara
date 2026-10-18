# Zeldara round 63: the ending's story panels — two options each, for the Lab (scenery wave 65): Godsbane into the sky, the Bifrost remade
# into heaven, the spirits going home, dawn over the village. Grimnir is painted next, after you pick his three forms in the Lab
# (Bosses tab -> the "Grimnir" button at the top).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round63.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round63.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Scenery wave 65 - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 65 --dry-run
Write-Host "`n2/2  Scenery wave 65 - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 65 --concurrency 2
Write-Host "`nDone. Tell Claude the round 63 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
