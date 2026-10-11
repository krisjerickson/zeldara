# Zeldara round 45, part 2: the new bows and the Tome's missing pictures, all in one go (wave 48, 5 sheets).
#   - the six elemental bows, three warbows and the Squall Pearl, plus the last 9 fairy-quest treasures   (1 sheet)
#   - a small painted scene for each of the 40 regions of the world                                       (2 sheets)
#   - a small painted scene for each of the 20 boss arenas                                                (1 sheet)
#   - the first 20 fairy-quest treasures (Silver Acorn, Dewdrop Pearl ...)                                (1 sheet)
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round45b.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round45b.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 48 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 48 --concurrency 2
Write-Host "`nDone. Tell Claude the round 45 part 2 sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
