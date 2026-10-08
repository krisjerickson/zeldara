# Zeldara edge pieces (round 38): small painted pieces set along the line where two kinds of ground meet -
# grass tufts, reeds, pebbles, driftwood, rubble at cliff feet, snow drifts, lava crust. 2 sheets, 24 pieces.
# They are only used if you pick "Layered + pieces" in the Lab's Terrain edges tab.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\edges.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\edges.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent - the two edge sheets (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 38 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 38 --concurrency 2
Write-Host "`nDone. Tell Claude the edge sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
