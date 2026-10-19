# Zeldara round 65d: SOLMYRK FROM YOUR PICKS - straight away (Kris: "Yes, straight away").
#   Sprite wave 7.95 again (9 sheets): the Gilded Seraph, the Cracked Seraph (phase 1's helm, cracked), the Hollow King - each in
#   front, side and back like the walking bosses, with your picked painting of each form as a reference (sol_ref_*.png in sprites\incoming).
#   Scenery wave 72 (5 panels): his intro as he first rises, and his two changes of form (two panels each).
# The round-64 sheets are kept, renamed to grim_*.r64.png (only the first time this script runs), so the new ones are painted.
# A sheet already in sprites\incoming is skipped, so nothing is paid for twice - it is safe to run this again to retry.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round68.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round68.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
$in = 'sprites\incoming'
foreach ($r in 'sol_ref_1','sol_ref_2','sol_ref_2d','sol_ref_3') { if (-not (Test-Path "$in\$r.png")) { Write-Host "Missing $in\$r.png - ask Claude to put it back." -ForegroundColor Red; exit 1 } }
if (-not (Test-Path "$in\grim_1.core.s.r64.png")) {
  Write-Host "`nKeeping the round-64 sheets as grim_*.r64.png:" -ForegroundColor Cyan
  foreach ($f in Get-ChildItem "$in\grim_[123].*.png" | Where-Object { $_.Name -notmatch '\.(r64|prev)\.png$' }) {
    $new = $f.Name -replace '\.png$', '.r64.png'; Rename-Item $f.FullName $new; Write-Host "  $($f.Name) -> $new"
  }
}
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/5  Solmyrk's sheets (sprite wave 7.95) and panels (scenery wave 72) - what will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --dry-run
node tools/sprites/generate.mjs --set scenery --wave 72 --dry-run
Write-Host "`n2/5  His cut-scene panels (scenery wave 72) - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 72 --concurrency 2
Write-Host "`n3/5  His sheets - the Gilded Seraph first:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --concurrency 2
Write-Host "`n4/5  His sheets - the ones that were waiting for the first form:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --concurrency 2
Write-Host "`n5/5  His sheets - the last ones (front/back and extra moves of forms 2 and 3):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --wave 7.95 --tier all --concurrency 2
Write-Host "`nDone. Tell Claude the round 68 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
