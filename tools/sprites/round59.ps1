# Zeldara round 59: Asgard and the Bifrost - options for the Lab (wave 61, twelve sheets: the walls, towers and gate in three styles, the citadel,
# the ground, the Bifrost, the pier notch, the rune circle at Asgard's heart, and six story panels), and Surtharn painted - his six approved
# phases as boss sprite sheets (wave 7.7; each phase's approved painting rides along as a reference so the head stays the same).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round59.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round59.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing (the boss sheets wait for each form's first sheet, so a second run may be needed to finish them).
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/4  Scenery - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 61 --dry-run
Write-Host "`n2/4  Scenery - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 61 --concurrency 2
Write-Host "`n3/4  Surtharn - what will be sent:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.7 --dry-run
Write-Host "`n4/4  Surtharn - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.7 --concurrency 2
node tools/sprites/generate.mjs --wave 7.7 --concurrency 2
Write-Host "`nDone. Tell Claude the round 59 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
