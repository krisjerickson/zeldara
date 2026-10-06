# Zeldara scenery (round 28): sends the scenery sheets to the image service. 74 sheets in all; the pilot is 12 (one per family).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\scenery.ps1            the pilot: 12 sheets, to judge the look first (about $0.50 at list prices)
#   .\tools\sprites\scenery.ps1 -All       everything that is still missing (74 sheets, about $3 at list prices)
#   .\tools\sprites\scenery.ps1 -Wave 21,22    only these waves (21 village buildings, 22 village props, 23 interiors, 24 runes and waystones,
#                                              25 entrances, 26 trees and plants, 27 rocks and ruins, 28 bridges and harbors, 29 ground textures,
#                                              30 camp and trial props, 31 tower / castle / mage-tower furnishings, 32 dungeon pieces)
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\scenery.ps1
# Run it in ONE window only. The key is read from this window and never written to disk.
# A sheet that is already in sprites\incoming is skipped, so running it again only sends what is missing.
param([switch]$All, [string]$Wave = '')
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$what = @('--pilot')
$label = 'the pilot (12 sheets, one per family)'
if ($Wave) { $what = @('--wave', $Wave); $label = "wave(s) $Wave" }
elseif ($All) { $what = @('--wave', '21,22,23,24,25,26,27,28,29,30,31,32'); $label = 'every scenery sheet still missing' }
if (-not (Test-Path 'sprites\requests\scenery.json')) {
  Write-Host "`nMaking the request list from the game files (about two minutes):" -ForegroundColor Cyan
  node build.mjs | Select-String -Pattern 'scenery'
}
Write-Host "`n1/2  What will be sent - $label (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery @what --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery @what --concurrency 2
Write-Host "`nDone. Tell Claude the scenery sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
if (-not $All -and -not $Wave) { Write-Host 'This was the pilot. Sheets of the same family copy the look of their pilot sheet, so look at the pilot before sending the rest with  -All.' -ForegroundColor Yellow }
