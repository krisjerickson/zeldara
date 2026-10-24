# Zeldara round 81: THE STORY FRAMES BEFORE THE TWINS, PAINTED AGAIN (Kris: "there are many points in the story that zeldara and zeldor
# are not yet born or at the age of the game, but they show up in the image. they need to be removed for all of the frames where they are
# not yet grown up and part of the saga yet"). 34 frames: the opening's first frames (1, 2, 4, 5), all seven of each realm's fall (the Long
# Quiet, the Ash Night, the Stone-Fall, the Black Tide) and the truth's two memories (4, 5). Their requests no longer carry the hero
# style picture, match the old saga panels instead (no heroes in them) and say plainly that the twins are not there (src/js/07zt6).
# The old pictures are moved to sprites\_replaced_r81 (never deleted); a picture already moved is not moved again, so it is safe to run
# this again to retry anything that failed.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round81.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
$ids = 'sc_sb_opening_01,sc_sb_opening_02,sc_sb_opening_04,sc_sb_opening_05,sc_sb_truth_04,sc_sb_truth_05,sc_sb_quiet_01,sc_sb_quiet_02,sc_sb_quiet_03,sc_sb_quiet_04,sc_sb_quiet_05,sc_sb_quiet_06,sc_sb_quiet_07,sc_sb_ashnight_01,sc_sb_ashnight_02,sc_sb_ashnight_03,sc_sb_ashnight_04,sc_sb_ashnight_05,sc_sb_ashnight_06,sc_sb_ashnight_07,sc_sb_stonefall_01,sc_sb_stonefall_02,sc_sb_stonefall_03,sc_sb_stonefall_04,sc_sb_stonefall_05,sc_sb_stonefall_06,sc_sb_stonefall_07,sc_sb_blacktide_01,sc_sb_blacktide_02,sc_sb_blacktide_03,sc_sb_blacktide_04,sc_sb_blacktide_05,sc_sb_blacktide_06,sc_sb_blacktide_07'
foreach ($r in @('sc_pn_saga_quiet_b','sc_pn_saga_cradles','sc_pn_saga_ashnight_b','sc_pn_saga_stonefall_b','sc_pn_saga_blacktide_b','sc_pn_saga_storm_b','sc_pn_saga_basket','sc_vill_core_1','vf_elder.core.f','god_odin.core.f','god_freya.core.f','sc_room_feast_lit')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
# 1. the old pictures out of the way (kept in sprites\_replaced_r81)
New-Item -ItemType Directory -Force -Path 'sprites\_replaced_r81' | Out-Null
$moved = 0
foreach ($id in $ids.Split(',')) { $src = "sprites\incoming\$id.png"; $dst = "sprites\_replaced_r81\$id.png"
  if ((Test-Path $src) -and -not (Test-Path $dst)) { Move-Item $src $dst; $moved++ } }
Write-Host "$moved old picture(s) moved to sprites\_replaced_r81" -ForegroundColor Cyan
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --dry-run | Select-Object -First 3
Write-Host "`n2/3  The 34 frames - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --concurrency 3
Write-Host "`n3/3  Second pass - retrying anything that failed:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --concurrency 3 | Select-String 'request\(s\) to send|^Done'
$line = node tools/sprites/generate.mjs --set scenery --ids $ids --dry-run | Select-Object -First 1
if ($line -match '^0 request') { Write-Host "`nAll 34 are in. Tell Claude the round 81 frames are in." -ForegroundColor Green }
else { Write-Host "`n$line - run  .\tools\sprites\round81.ps1  again (it only sends what is missing)." -ForegroundColor Yellow }
