# Zeldara round 61: the new potions' icons (two sheets, 33 icons) and the joined story panel "Asgard opens in the sky" (option C: A's night
# harbour, lantern and rocks + B's island coming down and the spirits, no lion) — scenery wave 63, three sheets.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round61.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round61.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Scenery wave 63 - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 63 --dry-run
Write-Host "`n2/2  Scenery wave 63 - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 63 --concurrency 2
Write-Host "`nDone. Tell Claude the round 61 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
