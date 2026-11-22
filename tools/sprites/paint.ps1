# Zeldara: PAINT NEW PICTURES (round 116). Use this for every new request list Claude writes.
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\paint.ps1 -List r116_shots_rest          the list Claude wrote in sprites\requests\r116_shots_rest.txt
#   .\tools\sprites\paint.ps1 -Ids sc_ss_orbs_01_1_m,vf_glass.core.f
# Safe to stop and start again at any time: it never moves or repaints a picture that is already in sprites\incoming\ — each run
# sends only what is missing. (redo.ps1 is only for pictures you asked to have painted AGAIN; it moves the old ones aside.)
# It sends scenery sheets (shots, story frames, seasons…) and character sheets (villagers, monsters…) alike, and keeps going,
# pass after pass, until everything is in or a whole pass brings nothing new. A request that hangs is abandoned after 4 minutes and
# tried again, so the run never stalls. The key is read from this window and never written to disk.
param([string]$Ids = '', [string]$List = '', [int]$Passes = 6, [switch]$NewKey)
# Round 129: -NewKey asks for a fresh key even if this window (or Windows) already holds one; and if OpenAI says the key is expired or wrong,
# the script asks for a new one once and tries the pass again.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
if ($List) { $Ids = ((Get-Content "sprites\requests\$List.txt") | Where-Object { $_ -and -not $_.StartsWith('#') }) -join ',' }
if (-not $Ids) { Write-Host 'Give -List name or -Ids a,b'; exit 1 }
$todo = $Ids.Split(',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
$missing = { @($todo | Where-Object { -not (Test-Path "sprites\incoming\$_.png") }) }
$left = @(& $missing)      # round 129: @() so a list of one stays a list (it printed 'first: s')
Write-Host "$($todo.Count) picture(s) on the list - $($todo.Count - $left.Count) already in, $($left.Count) to paint." -ForegroundColor Cyan
if (-not $left.Count) { Write-Host 'All in. Tell Claude.' -ForegroundColor Green; exit 0 }
if ($NewKey -or -not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$asked = $false
for ($p = 1; $p -le $Passes; $p++) {
  $before = $left.Count; $joined = $left -join ','
  Write-Host "`nPass $p - sending $before picture(s):" -ForegroundColor Cyan
  $o1 = @(); $o2 = @()
  node tools/sprites/generate.mjs --set scenery --ids $joined --concurrency 3 --timeout 240 | Where-Object { $_ -notmatch '^0 request' } | Tee-Object -Variable o1
  node tools/sprites/generate.mjs --set characters --ids $joined --concurrency 3 --timeout 240 | Where-Object { $_ -notmatch '^0 request' } | Tee-Object -Variable o2
  $left = @(& $missing)
  if (($left.Count -eq $before) -and (-not $asked) -and ((@($o1) + @($o2)) -join "`n") -match 'API key|Incorrect API|invalid_api_key|401') {
    $asked = $true; Write-Host "`nOpenAI turned the key down (expired or wrong). Make a new one at platform.openai.com/api-keys." -ForegroundColor Yellow
    $k = Read-Host 'Paste the NEW OpenAI API key (it stays in this window only)'
    if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
    $env:OPENAI_API_KEY = $k.Trim(); $p--; continue }
  Write-Host "$($todo.Count - $left.Count) of $($todo.Count) in." -ForegroundColor Cyan
  if (-not $left.Count) { break }
  if ($left.Count -eq $before) { Write-Host 'A whole pass brought nothing new - stopping here.' -ForegroundColor Yellow; break }
}
if (-not $left.Count) { Write-Host "`nAll in. Tell Claude." -ForegroundColor Green }
else { Write-Host "`n$($left.Count) still missing (first: $($left[0])). Run the same command again - it only sends what is missing." -ForegroundColor Yellow }
