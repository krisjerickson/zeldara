# Zeldara round 53: seven sheets (wave 54) - eight spirit looks, eight groupings and eight bindstones to choose from in the Lab, Mira's workshop furniture, and the soul gem, metal and hearth tray icons
# (Kris: "the spirits are not very impressive looking. come up with more designs").
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round53.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round53.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 54 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 54 --concurrency 2
Write-Host "`nDone. Tell Claude the round 53 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
