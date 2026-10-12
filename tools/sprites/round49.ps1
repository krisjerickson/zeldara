# Zeldara round 49: two sheets (wave 51) - painted attack effects for the familiars and monsters (Kris: "some of the attack effects
# from familiars and monsters still show poor resolution pixel things. request painted images for these").
#   - small lights, sparks and streams: spirit mote, ember, frost glint, lash, life drain, spirit wave, lightning arc, force ring      (1 sheet)
#   - thrown and set pieces: thrown stone, fire bomb, snare, rune mine, frost rune, raised stone, smoke puff, spirit ring              (1 sheet)
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round49.ps1
# If PowerShell refuses to run scripts:   powershell -ExecutionPolicy Bypass -File .\tools\sprites\round49.ps1
# The key is read from this window and never written to disk. A sheet already in sprites\incoming is skipped, so running it again only
# sends what is missing.
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
Write-Host "`n1/2  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 51 --dry-run
Write-Host "`n2/2  Sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --wave 51 --concurrency 2
Write-Host "`nDone. Tell Claude the round 49 sheets are in. (Lines starting with an X failed - run this script again to retry.)" -ForegroundColor Green
