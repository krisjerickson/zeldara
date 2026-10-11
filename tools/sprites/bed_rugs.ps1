# Zeldara round 44: the hero asleep in the home bed and waking up (boy and girl, 16 frames, sent with the bed's sheet and both
# hero model sheets as references), and rugs and runners shaped to fit the rooms (8 rugs). 2 sheets (wave 44).
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\bed_rugs.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\bed_rugs.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent - the two new sheets (sleeping in bed, rugs) (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 44 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 44 --concurrency 2
Write-Host "`nDone. Tell Claude the bed and rug sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
