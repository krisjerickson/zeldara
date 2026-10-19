# Zeldara round 66: ASGARD'S GOLDEN ROADS painted, and THE HERO WITH THE LODESTAR.
#   Scenery wave 73 (2 sheets): the road paving (gold-inlaid flagstones, the gold rune border, the gold-and-white mosaic ring) and four
#   round rune medallions set into the roads.
#   Hero sheets (8 sheets, the boy and the girl): spells with the Lodestar and Godsbane in front, side and back view; and, in the side view,
#   raising the Lodestar to the sky and setting it in the notch - with the Lodestar's picked painting as a reference (lodestar_ref.png).
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round69.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round69.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not (Test-Path 'sprites\incoming\lodestar_ref.png')) { Write-Host "Missing sprites\incoming\lodestar_ref.png - ask Claude to put it back." -ForegroundColor Red; exit 1 }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$hero = 'hero_m.lodestar.s,hero_m.lodestar.f,hero_m.lodestar.b,hero_m.lodestar_b.s,hero_f.lodestar.s,hero_f.lodestar.f,hero_f.lodestar.b,hero_f.lodestar_b.s'
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 73 --dry-run
node tools/sprites/generate.mjs --ids $hero --dry-run
Write-Host "`n2/3  Asgard's golden roads (scenery wave 73) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 73 --concurrency 2
Write-Host "`n3/3  The hero with the Lodestar (8 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $hero --concurrency 2
Write-Host "`nDone. Tell Claude the round 69 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
