# Zeldara animation frames, round 43: everything in the terrain that moves or sways gets painted frames —
# crab, frog, leaping fish, gull, crow, dragonfly, butterfly, will-o'-wisp, firefly, tumbling leaf, lava bubble,
# steam vent (4 frames each), and reeds, cattails, irises, dry reeds, dune grass, three grass tufts, wildflowers,
# mountain flowers, fern and hanging ivy (3 frames each: lean left, upright, lean right).
# 7 sheets, 84 frames (wave 43). Each sheet is sent with the round 38/42 edge sheets as references, so the frames
# match the pictures already in the game.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\frames.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\frames.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent - the seven animation sheets (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 43 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 43 --concurrency 2
Write-Host "`nDone. Tell Claude the animation frames are in. (Lines starting with an X failed - run this script again to retry only those.)" -ForegroundColor Green
