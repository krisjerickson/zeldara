# Zeldara round 69: THE HAMLET FOLK, THEIR WORKSHOPS' FURNITURE AND THE SPIRITS' KEEPSAKES (doc 30).
#   40 character sheets: the kin who keep each freed spirit's workshop (idle, talk, at work - front view).
#   Scenery wave 78 (20 sheets): the furniture of each trade's workshop. Scenery wave 79 (5 sheets): the forty keepsakes on the walls.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round73.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round73.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_int_1','sc_int_3','sc_int_wall')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$folk = 'hk_asa.core.f,hk_bersi.core.f,hk_dagny.core.f,hk_eyvind.core.f,hk_frida.core.f,hk_geir.core.f,hk_hallveig.core.f,hk_ingolf.core.f,hk_jorunn.core.f,hk_ketil.core.f,hk_liv.core.f,hk_magni.core.f,hk_nanna.core.f,hk_oddny.core.f,hk_ragna.core.f,hk_sigrid.core.f,hk_torvi.core.f,hk_ulf.core.f,hk_vigdis.core.f,hk_yrsa.core.f,hk_arnor.core.f,hk_bodil.core.f,hk_dalla.core.f,hk_einar.core.f,hk_gudrun.core.f,hk_hakon.core.f,hk_ingrid.core.f,hk_joreid.core.f,hk_kolbein.core.f,hk_lofn.core.f,hk_mord.core.f,hk_njal.core.f,hk_orm.core.f,hk_ranveig.core.f,hk_sverri.core.f,hk_thora.core.f,hk_unn.core.f,hk_vali.core.f,hk_alfhild.core.f,hk_brand.core.f'
Write-Host "`n1/4  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $folk --dry-run
node tools/sprites/generate.mjs --set scenery --wave 78 --dry-run
node tools/sprites/generate.mjs --set scenery --wave 79 --dry-run
Write-Host "`n2/4  The hamlet folk (40 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --ids $folk --concurrency 3
Write-Host "`n3/4  The workshops' furniture (scenery wave 78, 20 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 78 --concurrency 3
Write-Host "`n4/4  The keepsakes (scenery wave 79, 5 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 79 --concurrency 3
Write-Host "`nDone. Tell Claude the round 73 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
