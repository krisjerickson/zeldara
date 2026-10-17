# Zeldara round 62: the realm trials' painted pieces (scenery wave 64: the forge trials — anvil, quench trough, bellows, ore vein, ore-cart, rail
# switch, spirit door; Asgard's citadel — Heimdall's lens, horn-brazier, golden thread post, world-tree knot, the three Norns, Grimtooth, Ratatoskr
# running) and the four Asgard monsters (sprite wave 7.9: three einherjar and the Gjallar Warden).
# Grímnir is not painted yet: pick his three forms first in the Lab (Bosses tab → "Grímnir of Asgard").
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round62.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round62.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/4  Scenery wave 64 - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 64 --dry-run
Write-Host "`n2/4  Scenery wave 64 - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 64 --concurrency 2
Write-Host "`n3/4  Asgard monsters (wave 7.9) - what will be sent:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.9 --tier all --dry-run
Write-Host "`n4/4  Asgard monsters (wave 7.9) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.9 --tier all --concurrency 2
node tools/sprites/generate.mjs --wave 7.9 --tier all --concurrency 2
Write-Host "`nDone. Tell Claude the round 62 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
