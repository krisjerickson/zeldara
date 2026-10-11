# Zeldara round 44: a pilot of three adventure-site floors painted as one whole picture each (Crystal Grotto, Elven Library,
# Ember Cave hall), to compare with painted tile sets in the Lab (Adventure sites, section 2). 3 images (wave 45).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\rooms.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\rooms.ps1
# The key is read from this window and never written to disk. A picture already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent - the three pilot rooms (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 45 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 45 --concurrency 2
Write-Host "`nDone. Tell Claude the pilot rooms are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
