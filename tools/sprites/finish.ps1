# Zeldara sprites - finish the set (Oct 4): sends ONLY what is still missing (8 sheets). The two sheets flagged earlier were a cutting fault and need no repaint.
# Run from PowerShell:   cd C:\Claude\games\Zeldara-v4 ;  .\tools\sprites\finish.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\finish.ps1
# Run it in ONE window only. The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What is missing (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 0,1,1.5,2,3,3.5,4,4.5,5,5.5,6,6.5,7.5,8 --dry-run
Write-Host "`n2/2  Sending the missing sheets (6 new hero walk sheets, Sprint trainer, fire familiar):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 0,1,1.5,2,3,3.5,4,4.5,5,5.5,6,6.5,7.5,8 --concurrency 2
Write-Host "`nDone. Tell Claude the sheets are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
