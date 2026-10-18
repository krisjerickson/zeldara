# Zeldara round 64d / 65: painted art for two of Kris's requests (scenery wave 67, 2 sheets):
#   - the monster shots (Kris, fighting Xal'zor: "old pixel effects, like a circle with a plus sign in the middle") - eight painted shots;
#   - the collapse of Muspelheim (Kris: the falling rocks "should put up barriers ... we might need new sprite images") - rubble heaps and a falling boulder.
#   - the city of Asgard (scenery wave 68, 3 sheets; Kris: "asgard needs to be filled up with other buildings" - card: "A living city").
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round65.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round65.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Painted shots, the collapse rubble (scenery wave 67) and the city of Asgard (wave 68) - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 67,68 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 67,68 --concurrency 2
Write-Host "`nDone. Tell Claude the round 65 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
