# Zeldara round 47: nine sheets (wave 50).
#   - what fills the space round the adventure sites: rock and sea textures, their creatures (gargoyles, moles ...), fog, sky, night sky   (5 sheets)
#   - smoother butterflies and dragonflies (8 frames each)                                                                                (1 sheet)
#   - painted area effects: warnings and ground patches, bursts, the hero's own skills                                                    (3 sheets)
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round47.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round47.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 50 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 50 --concurrency 2
Write-Host "`nDone. Tell Claude the round 47 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
