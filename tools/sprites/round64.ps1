# Zeldara round 64: Grimnir as a god - painted concept options for the Lab (scenery wave 66): for each of his three forms, the three NEW
# options radiant (top row) and the same three turned black (bottom row). Also sends the round 63 ending panels (wave 65) if they are not
# in yet - a sheet already in sprites\incoming is skipped, so nothing is paid for twice.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round64.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round64.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Scenery waves 65 and 66 - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 65,66 --dry-run
Write-Host "`n2/2  Scenery waves 65 and 66 - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 65,66 --concurrency 2
Write-Host "`nDone. Tell Claude the round 64 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
