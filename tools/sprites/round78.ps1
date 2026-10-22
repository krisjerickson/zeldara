# Zeldara round 78 (round 73 in the docs): THE MISSING SAGA IMAGES from Kris's saga feedback (wave 84, src/js/07zt5-art-r73.js) -
# the bound spirits freed, the three builders, the forges and the Lodestar, the soul-lines bringing life back, the twin teaching Godsbane
# (a Zeldor and a Zeldara version), both twins casting Godsbane, the orbs glimpse remade (the twins the same size), the World Tree under
# the lake, the twin at their books (for the village) and the World Tree's light (for the lake). 13 pictures.
# These panels are also the first frames of the cut-scene videos (answer C1).
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round78.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round78.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_pn_end_dawn_b','sc_pn_end_cast_a','god_odin.core.f','god_freya.core.f','hero_m.model','hero_f.model','crafts_1.core.f','crafts_2.core.f','crafts_3.core.f','sc_bindstone_opts_a','sc_fx_blast')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
# the old orbs glimpse (the twins drawn at different sizes) is kept aside, not deleted
New-Item -ItemType Directory -Force sprites\_replaced_r78 | Out-Null
if (-not (Test-Path sprites\_replaced_r78\.moved)) {
  foreach ($r in @('sc_pn_saga_orbs')) { Move-Item -Force -ErrorAction SilentlyContinue "sprites\incoming\$r.png" "sprites\_replaced_r78\$r.png" }
  New-Item -ItemType File sprites\_replaced_r78\.moved | Out-Null
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 84 --dry-run
Write-Host "`n2/2  Wave 84, the missing saga images - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 84 --concurrency 3
Write-Host "`nDone. Tell Claude the round 78 images are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
