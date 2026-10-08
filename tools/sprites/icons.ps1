# Zeldara icons (round 32): painted icons for the control bar, the menus and every item. 16 sheets, about 310 icons.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\icons.ps1          the pilot: 2 sheets (control-bar icons + melee weapons), to judge the look first
#   .\tools\sprites\icons.ps1 -All     every icon sheet still missing (19 sheets)
#   .\tools\sprites\icons.ps1 -New     round 37 only: the 3 sheets for the new axes, crossbows, staffs, gems and the Sovereign set
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\icons.ps1
# It can run beside the scenery script in its own window. The key is read from this window and never written to disk.
# A sheet that is already in sprites\incoming is skipped, so running it again only sends what is missing.
param([switch]$All, [switch]$New)
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$what = @('--ids', 'sc_ic_ui_1,sc_ic_melee'); $label = 'the pilot (control-bar icons and melee weapons)'
if ($All) { $what = @('--wave', '33,34,35,36,37'); $label = 'every icon sheet still missing' }
if ($New) { $what = @('--wave', '37'); $label = 'the round 37 sheets: axes and crossbows, staffs and arrows, gems and the Sovereign set (3 sheets)' }
Write-Host "`n1/2  What will be sent - $label (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery @what --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery @what --concurrency 2
Write-Host "`nDone. Tell Claude the icon sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
if (-not $All -and -not $New) { Write-Host 'This was the pilot. The other sheets copy the look of the control-bar sheet, so look at it before sending the rest with  -All.' -ForegroundColor Yellow }
