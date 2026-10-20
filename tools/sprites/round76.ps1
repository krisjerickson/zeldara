# Zeldara round 72: THREE PANELS REDONE (Kris's checks of round 75, docs/08 round 72).
#   pn_vil_green and pn_vil_forges: the teal-maned lion from the style reference crept in - redrawn without any animal.
#   pn_fh_cast_f: Zeldara's Godsbane was painted outdoors - redrawn inside the feast hall (the Zeldor one is already indoors).
#   The old pictures are first MOVED (not deleted) to sprites\_replaced_r76, so they are kept.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round76.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round76.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_pn_end_dawn_b','sc_pn_end_cast_a','sc_pn_fh_orbs','god_odin.core.f','god_freya.core.f','hero_f.model')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
New-Item -ItemType Directory -Force sprites\_replaced_r76 | Out-Null
if (-not (Test-Path sprites\_replaced_r76\.moved)) {
  foreach ($r in @('sc_pn_vil_green','sc_pn_vil_forges','sc_pn_fh_cast_f')) { Move-Item -Force -ErrorAction SilentlyContinue "sprites\incoming\$r.png" "sprites\_replaced_r76\$r.png" }
  New-Item -ItemType File sprites\_replaced_r76\.moved | Out-Null
}
$pan = 'sc_pn_vil_green,sc_pn_vil_forges,sc_pn_fh_cast_f'
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $pan --dry-run
Write-Host "`n2/2  The three panels (scenery) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $pan --concurrency 3
Write-Host "`nDone. Tell Claude the round 76 panels are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
