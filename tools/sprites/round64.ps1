# Zeldara round 64: SOLMYRK, THE BLACK SUN (Grimnir renamed) - his sprite sheets, straight away (Kris: "just go straight into the sprite
# sheet"): his three picked forms - the Allfather's Mask, the Cracked Mask, the Storm That Ends the World - each in front, side and back like
# the walking bosses (sprite wave 7.95, 9 sheets). Form 1's first sheet is painted first; forms 2 and 3 use it as their reference, so the
# script waits for it. Also sends the round 63 ending panels (scenery wave 65) if they are not in yet.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice.
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
Write-Host "`n1/4  Solmyrk's sheets (sprite wave 7.95) - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --dry-run
Write-Host "`n2/4  Solmyrk's sheets - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --concurrency 2
Write-Host "`n3/4  Solmyrk's sheets - a second pass for any sheet that was waiting for form 1:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --concurrency 2
Write-Host "`n4/4  The ending's story panels (scenery wave 65), if not in yet:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 65 --concurrency 2
Write-Host "`nDone. Tell Claude the round 64 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
