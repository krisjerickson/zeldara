# Zeldara round 57: Surtharn's six phases with one head, the spirit walls round two and the Lodestar round two (wave 60, three sheets),
# and the four forge-masters painted - Brokk, Hissa, Krag and Sinda, a form for every phase (wave 7.6, the boss sprite sheets).
# (Kris: "we need to keep the head very similar throughout", "need more working and mining spirits", "You choose, then paint").
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round57.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round57.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing (the boss sheets wait for each form's first sheet, so a second run may be needed to finish them).
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/4  Scenery - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 60 --dry-run
Write-Host "`n2/4  Scenery - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 60 --concurrency 2
Write-Host "`n3/4  Forge-masters - what will be sent:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.6 --dry-run
Write-Host "`n4/4  Forge-masters - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.6 --concurrency 2
node tools/sprites/generate.mjs --wave 7.6 --concurrency 2
Write-Host "`nDone. Tell Claude the round 57 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
