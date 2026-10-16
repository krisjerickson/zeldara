# Zeldara round 60: the eight new forge monsters (wave 7.8, two per forge, each with its own attacks), the forge hearths and the great hearth
# moving in the painting, the Honour guard remade, the village sheep, the apothecary's magic-weapon furniture (scenery wave 62, eight sheets),
# and one Surtharn sheet painted again (surt_2.extra.s came out without its poses).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round60.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round60.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing (the boss sheets wait for each form's first sheet, so a second run may be needed to finish them).
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/4  Scenery - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 62 --dry-run
Write-Host "`n2/4  Scenery - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 62 --concurrency 2
Write-Host "`n3/4  Forge monsters and the Surtharn redo - what will be sent:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.8 --tier all --dry-run
Write-Host "`n4/4  Forge monsters and the Surtharn redo - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids surt_2.extra.s --concurrency 1
node tools/sprites/generate.mjs --wave 7.8 --tier all --concurrency 2
node tools/sprites/generate.mjs --wave 7.8 --tier all --concurrency 2
Write-Host "`nDone. Tell Claude the round 60 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
