# Zeldara round 71: THE LAST SAGA, PAINTED (docs/30 section 15, docs/08 round 71, answers E1-E4).
#   1. Odin and Freya as painted characters (4 sheets: standing, talking, casting, walking) - first, because the rest uses them.
#   2. The feast hall of Asgard (scenery wave 81, 5 sheets): the walk-in room painted whole (dim, and alive again), the two joined orbs
#      (whole, cracking, bursting), the hall's doors and high seats, the gods' spells (lightning, vines, shards, halo).
#   3. The saga panels for everything after Solmyrk (scenery wave 82, 26 panels): the two glimpses still missing, the feast hall
#      (the doors, the cast and the truth each in a Zeldara and a Zeldor version), the gods at the Bifrost, the village moment,
#      the celebration, time passing, children again, the credits backdrop and the last picture.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round75.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round75.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_room_3','sc_asg_keep_opts','sc_fx_blast','sc_pn_end_dawn_b','sc_pn_end_cast_a','sc_pn_sol_0','hero_m.model','hero_f.model')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$gods = 'god_odin.core.f,god_freya.core.f,god_odin.walk,god_freya.walk'
Write-Host "`n1/4  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $gods --dry-run
node tools/sprites/generate.mjs --set scenery --wave 81 --dry-run
node tools/sprites/generate.mjs --set scenery --wave 82 --dry-run
Write-Host "`n2/4  Odin and Freya (4 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $gods --concurrency 2
Write-Host "`n3/4  The feast hall, the orbs, the doors and seats, the gods' spells (scenery wave 81, 5 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 81 --concurrency 2
Write-Host "`n4/4  The last saga in panels (scenery wave 82, 26 panels) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 82 --concurrency 3
Write-Host "`nDone. Tell Claude the round 75 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
