# Zeldara round 68: THE SOUL-LINES PAINTED (Lab round C, doc 30).
#   Scenery wave 74 (3 sheets), for Kris's picks - the World-Tree design drawn as the rune vein with a wave of light motes:
#   eight glowing rune stamps; the joins of the line (two crossings, a fork, two line ends, the seed at the runestone, two light motes);
#   and the ring of light round a freed runestone (plain and knotted) - the ring that becomes a hamlet's outline at the end.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round70.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round70.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
foreach ($r in @('sc_spirit_sets','sc_rune_green')) { if (-not (Test-Path "sprites\incoming\$r.png")) { Write-Host "Missing sprites\incoming\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 74 --dry-run
Write-Host "`n2/2  The soul-lines (scenery wave 74, 3 sheets) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 74 --concurrency 3
Write-Host "`nDone. Tell Claude the round 70 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
