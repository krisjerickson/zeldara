# Zeldara round 79: STORY CUT-SCENES IN PICTURES (Kris: "propose both story lines as well as develop images for about 6-12 different
# parts of the story being told … develop the requests for the images i can send for processing"). Every cut-scene told in 4-12 frames
# (src/js/07zt6-storyboards.js, doc 35, Lab -> Story cut-scenes); frames with the twin you play come in a Zeldor and a Zeldara version.
#   wave 85  the first spirit freed and the four builders              (101 pictures)
#   wave 86  the opening and the four realms' falls                     (42)
#   wave 87  the glimpses, the Lodestar, Muspelheim, Asgard, Godsbane, the Bifrost (78)
#   wave 88  Surtharn's and Solmyrk's forms                             (63)
#   wave 89  the feast hall, the truth, home, the land changed, the celebration, the World Tree (68)
# 352 pictures in all - about 27 times round 78. A picture already in sprites\incoming is skipped, so nothing is paid for twice and it is
# safe to run again to retry. Read the story lines in the Lab first (Story cut-scenes) - a note there may change a frame before it is sent.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round79.ps1              all five waves, one after another
#   .\tools\sprites\round79.ps1 -Wave 85     one wave (start here to judge the look)
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round79.ps1
# The key is read from this window and never written to disk.
param([int]$Wave = 0)
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_pn_end_dawn_b','sc_pn_end_cast_a','sc_bindstone_opts_a','sc_spirit_opts_a','sc_pn_binders_free','hero_m.model','hero_f.model','sc_vill_core_1','crafts_1.core.f','crafts_2.core.f','crafts_3.core.f','crafts_4.core.f','vf_elder.core.f','sc_pn_saga_orbs','sc_pn_forges_lodestar','sc_lodestar2','sc_pn_musp_sink_a','sc_pn_asg_sky_c','sc_pn_asg_lake_a','sc_notch_opts','sc_pn_twin_teach_m','sc_twin_study','sc_bifrost_opts','sc_surth_phases','sc_gd_sol_1','sc_pn_sol_0','sc_pn_sol_12_a','sc_pn_sol_23_a','sc_room_feast','sc_pn_fh_orbs','god_odin.core.f','god_freya.core.f','sc_room_feast_lit','sc_asg_circle_opts','sc_pn_end_gods_lead','sc_pn_vil_vines','vf_kid1.core.f','vf_kid2.core.f','sc_pn_cel_feast','sc_pn_credits','sc_pn_after','sc_pn_world_tree','sc_pn_saga_tattoo')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$waves = if ($Wave -gt 0) { @($Wave) } else { @(85, 86, 87, 88, 89) }
foreach ($w in $waves) {
  Write-Host "`nWave $w - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
  node tools/sprites/generate.mjs --set scenery --wave $w --dry-run | Select-Object -First 4
  Write-Host "`nWave $w - sending:" -ForegroundColor Cyan
  node tools/sprites/generate.mjs --set scenery --wave $w --concurrency 3
}
Write-Host "`nDone. Tell Claude the round 79 pictures are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
