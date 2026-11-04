# Zeldara: PAINT CHOSEN PICTURES AGAIN (round 84 - for Kris's picture fixes, e.g. a montage frame with the wrong hero).
# Claude fixes the words in the game files and tells you the ids; this moves the old pictures to sprites\_replaced_redo (never deleted)
# Round 88 fix: the id list is $todo (PowerShell names ignore case, so $list was the -List text and squashed every id into one).
# and paints just those again, with the new words.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\redo.ps1 -Ids sc_sb_spirit_12_f
#   .\tools\sprites\redo.ps1 -Ids sc_sb_spirit_12_f,sc_sb_home_03_f      several at once (comma, no spaces)
#   .\tools\sprites\redo.ps1 -List redo84                                 the list Claude wrote in sprites\requests\redo84.txt
# The key is read from this window and never written to disk. Safe to run again: a picture already moved is kept, and only what is
# missing is sent.
param([string]$Ids = '', [string]$List = '')
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if ($List) { $Ids = ((Get-Content "sprites\requests\$List.txt") | Where-Object { $_ -and -not $_.StartsWith('#') }) -join ',' }
if (-not $Ids) { Write-Host 'Give -Ids a,b or -List name'; exit 1 }
$todo = $Ids.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
New-Item -ItemType Directory -Force -Path 'sprites\_replaced_redo' | Out-Null
$moved = 0
foreach ($id in $todo) {
  $src = "sprites\incoming\$id.png"
  if (Test-Path $src) { $dst = "sprites\_replaced_redo\$id.$(Get-Date -Format yyyyMMddHHmmss).png"; Move-Item $src $dst; $moved++ } }
Write-Host "$moved old picture(s) moved to sprites\_replaced_redo" -ForegroundColor Cyan
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$joined = $todo -join ','
Write-Host "`n1/2  Sending $($todo.Count) picture(s):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $joined --concurrency 3
Write-Host "`n2/2  Second pass - retrying anything that failed:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $joined --concurrency 3 | Select-String 'request\(s\) to send|^Done'
$line = node tools/sprites/generate.mjs --set scenery --ids $joined --dry-run | Select-Object -First 1
if ($line -match '^0 request') { Write-Host "`nAll in. Tell Claude the redo pictures are in." -ForegroundColor Green }
else { Write-Host "`n$line - run the same command again (it only sends what is missing)." -ForegroundColor Yellow }
