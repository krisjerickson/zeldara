# Zeldara round 70: A MIXED RUNEHEIM, AND THE CHILDREN (docs/08 round 70).
#   Redrawn with a mix of backgrounds (Kris: "about half that are racially white, but remainder should be more variety of races, and racial
#   mixes"): 20 of the 40 hamlet folk (same clothes, trade and age), about half the village folk and shopkeepers (11 people, 17 sheets),
#   and the 8 saga panels that show groups of people (Raised now shows only the twins as children).
#   New: 24 children (48 sheets: standing, talking, playing, walking), the hamlet homes in more colours, newborns in their cradles.
#   The sheets being redrawn are first MOVED (not deleted) to sprites\_replaced_r74, so the old ones are kept.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round74.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round74.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_int_1','sc_hf_midwife','sc_hamlet_homes','sc_vill_houses','sc_pn_saga_cradles','sc_pn_saga_storm_b','sc_pn_end_dawn_b','sc_pn_end_home_b')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
New-Item -ItemType Directory -Force sprites\_replaced_r74 | Out-Null
if (-not (Test-Path sprites\_replaced_r74\.moved)) {
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_bersi.core.f.png sprites\_replaced_r74\hk_bersi.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_eyvind.core.f.png sprites\_replaced_r74\hk_eyvind.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_geir.core.f.png sprites\_replaced_r74\hk_geir.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_ingolf.core.f.png sprites\_replaced_r74\hk_ingolf.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_ketil.core.f.png sprites\_replaced_r74\hk_ketil.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_magni.core.f.png sprites\_replaced_r74\hk_magni.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_oddny.core.f.png sprites\_replaced_r74\hk_oddny.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_sigrid.core.f.png sprites\_replaced_r74\hk_sigrid.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_ulf.core.f.png sprites\_replaced_r74\hk_ulf.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_yrsa.core.f.png sprites\_replaced_r74\hk_yrsa.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_bodil.core.f.png sprites\_replaced_r74\hk_bodil.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_einar.core.f.png sprites\_replaced_r74\hk_einar.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_hakon.core.f.png sprites\_replaced_r74\hk_hakon.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_joreid.core.f.png sprites\_replaced_r74\hk_joreid.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_lofn.core.f.png sprites\_replaced_r74\hk_lofn.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_njal.core.f.png sprites\_replaced_r74\hk_njal.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_ranveig.core.f.png sprites\_replaced_r74\hk_ranveig.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_thora.core.f.png sprites\_replaced_r74\hk_thora.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_vali.core.f.png sprites\_replaced_r74\hk_vali.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\hk_brand.core.f.png sprites\_replaced_r74\hk_brand.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\npc_shop.core.f.png sprites\_replaced_r74\npc_shop.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\npc_forge.core.f.png sprites\_replaced_r74\npc_forge.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\npc_stables.core.f.png sprites\_replaced_r74\npc_stables.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\npc_jeweler.core.f.png sprites\_replaced_r74\npc_jeweler.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\npc_apothecary.core.f.png sprites\_replaced_r74\npc_apothecary.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_farmer.core.f.png sprites\_replaced_r74\vf_farmer.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_farmer.walk.png sprites\_replaced_r74\vf_farmer.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_fisher.core.f.png sprites\_replaced_r74\vf_fisher.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_fisher.walk.png sprites\_replaced_r74\vf_fisher.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_kid1.core.f.png sprites\_replaced_r74\vf_kid1.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_kid1.walk.png sprites\_replaced_r74\vf_kid1.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_guard.core.f.png sprites\_replaced_r74\vf_guard.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_guard.walk.png sprites\_replaced_r74\vf_guard.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_vendor.core.f.png sprites\_replaced_r74\vf_vendor.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_vendor.walk.png sprites\_replaced_r74\vf_vendor.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_keeper.core.f.png sprites\_replaced_r74\vf_keeper.core.f.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\vf_keeper.walk.png sprites\_replaced_r74\vf_keeper.walk.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_raised.png sprites\_replaced_r74\sc_pn_saga_raised.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_eyes.png sprites\_replaced_r74\sc_pn_saga_eyes.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_sendoff.png sprites\_replaced_r74\sc_pn_saga_sendoff.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_basket.png sprites\_replaced_r74\sc_pn_saga_basket.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_ashnight_b.png sprites\_replaced_r74\sc_pn_saga_ashnight_b.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_stonefall_b.png sprites\_replaced_r74\sc_pn_saga_stonefall_b.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_blacktide_b.png sprites\_replaced_r74\sc_pn_saga_blacktide_b.png
Move-Item -Force -ErrorAction SilentlyContinue sprites\incoming\sc_pn_saga_quiet_b.png sprites\_replaced_r74\sc_pn_saga_quiet_b.png
  New-Item -ItemType File sprites\_replaced_r74\.moved | Out-Null
}
$redo = 'hk_bersi.core.f,hk_eyvind.core.f,hk_geir.core.f,hk_ingolf.core.f,hk_ketil.core.f,hk_magni.core.f,hk_oddny.core.f,hk_sigrid.core.f,hk_ulf.core.f,hk_yrsa.core.f,hk_bodil.core.f,hk_einar.core.f,hk_hakon.core.f,hk_joreid.core.f,hk_lofn.core.f,hk_njal.core.f,hk_ranveig.core.f,hk_thora.core.f,hk_vali.core.f,hk_brand.core.f,npc_shop.core.f,npc_forge.core.f,npc_stables.core.f,npc_jeweler.core.f,npc_apothecary.core.f,vf_farmer.core.f,vf_farmer.walk,vf_fisher.core.f,vf_fisher.walk,vf_kid1.core.f,vf_kid1.walk,vf_guard.core.f,vf_guard.walk,vf_vendor.core.f,vf_vendor.walk,vf_keeper.core.f,vf_keeper.walk'
$kids = 'ck_ylva.core.f,ck_ylva.walk,ck_bjorn.core.f,ck_bjorn.walk,ck_saga.core.f,ck_saga.walk,ck_kai.core.f,ck_kai.walk,ck_amara.core.f,ck_amara.walk,ck_eirik.core.f,ck_eirik.walk,ck_noor.core.f,ck_noor.walk,ck_tove.core.f,ck_tove.walk,ck_ravi.core.f,ck_ravi.walk,ck_ingrid.core.f,ck_ingrid.walk,ck_tariq.core.f,ck_tariq.walk,ck_mei.core.f,ck_mei.walk,ck_olaf.core.f,ck_olaf.walk,ck_zuri.core.f,ck_zuri.walk,ck_finn.core.f,ck_finn.walk,ck_asta.core.f,ck_asta.walk,ck_mateo.core.f,ck_mateo.walk,ck_sunniva.core.f,ck_sunniva.walk,ck_leif.core.f,ck_leif.walk,ck_priya.core.f,ck_priya.walk,ck_gunnar.core.f,ck_gunnar.walk,ck_hana.core.f,ck_hana.walk,ck_odin.core.f,ck_odin.walk,ck_lena.core.f,ck_lena.walk'
$pan = 'sc_pn_saga_raised,sc_pn_saga_eyes,sc_pn_saga_sendoff,sc_pn_saga_basket,sc_pn_saga_ashnight_b,sc_pn_saga_stonefall_b,sc_pn_saga_blacktide_b,sc_pn_saga_quiet_b'
Write-Host "`n1/5  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $redo --dry-run
node tools/sprites/generate.mjs --ids $kids --dry-run
node tools/sprites/generate.mjs --set scenery --ids $pan --dry-run
node tools/sprites/generate.mjs --set scenery --wave 80 --dry-run
Write-Host "`n2/5  The hamlet folk and village folk redrawn (37 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $redo --concurrency 3
Write-Host "`n3/5  The children (48 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $kids --concurrency 3
Write-Host "`n4/5  The saga panels with groups, redrawn (8) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $pan --concurrency 3
Write-Host "`n5/5  The homes in more colours and the newborns (scenery wave 80, 2 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 80 --concurrency 2
Write-Host "`nDone. Tell Claude the round 74 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
