# Zeldara round 65: SOLMYRK REMADE - painted options for his three phases (scenery wave 69: phase 1 the golden angel x3, phase 2 the cracked
# mask x3 radiant + black, phase 3 the shadow x8), and Surtharn's cut-scene panels (scenery wave 70, five panels, one per change of form).
# Pick in the Lab (Bosses -> Solmyrk, at the top); then his sprite sheets and his cut-scene panels are ordered from your picks.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round66.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round66.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  Solmyrk's options (wave 69) and Surtharn's cut-scene panels (wave 70) - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 69,70 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 69,70 --concurrency 2
Write-Host "`nDone. Tell Claude the round 66 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
