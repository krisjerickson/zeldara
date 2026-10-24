# Zeldara round 81c: THE STORY MONTAGES PUT RIGHT (Kris's notes on the montages; doc 37 section 6). About 126 frames:
#   - the glimpses' Asgard frames without the heroes; every frame that both versions share without the boy hero ("we need to plan the
#     entire scenes with zeldara instead of zeldor") - where the hero belongs, a Zeldor and a Zeldara version
#   - Surtharn whole in every step, in his own colours and with his own hands and sword; Solmyrk whole in every step, as the three approved
#     forms, the last one a dark demon
#   - a new montage, Solmyrk defeated (8 frames, to the golden doors); the feast hall montage on its own, empty of people, Odin and Freya
#     inside the orbs
#   - the Lodestar at Asgard's heart; Zeldara (not Freya) after the spring; one Zeldara through the celebration; the first parents and
#     Pip and Wren's parents are other villagers
# The list is in sprites\requests\storyboards.json (redo81c, made by node build.mjs). The old pictures of those frames - and old frames that
# no longer exist (the feast hall was split) - are moved to sprites\_replaced_r81c (never deleted); a picture already moved is not moved
# again, so it is safe to run this again to retry anything that failed.
# Run from PowerShell:
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\sprites\round81c.ps1
# The key is read from this window and never written to disk.
Set-Location (Join-Path $PSScriptRoot '..\..')
node build.mjs | Out-Null
$redo = (Get-Content 'sprites\requests\storyboards.json' -Raw | ConvertFrom-Json).redo81c
$all = @{}; (Get-Content 'sprites\requests\scenery.json' -Raw | ConvertFrom-Json).requests | ForEach-Object { $all[$_.id] = 1 }
$scenes = @{}; foreach ($id in $redo) { if ($id -match '^sc_sb_([a-z0-9]+)_') { $scenes[$Matches[1]] = 1 } }
New-Item -ItemType Directory -Force -Path 'sprites\_replaced_r81c' | Out-Null
$moved = 0
foreach ($f in Get-ChildItem 'sprites\incoming\sc_sb_*.png') {
  $id = $f.BaseName; if ($id -notmatch '^sc_sb_([a-z0-9]+)_') { continue }; if (-not $scenes.ContainsKey($Matches[1])) { continue }
  if (($redo -contains $id) -or -not $all.ContainsKey($id)) {
    $dst = "sprites\_replaced_r81c\$id.png"
    if (-not (Test-Path $dst)) { Move-Item $f.FullName $dst; $moved++ } elseif (-not $all.ContainsKey($id)) { Move-Item $f.FullName "sprites\_replaced_r81c\$id.$(Get-Date -Format yyyyMMddHHmmss).png"; $moved++ } } }
Write-Host "$moved old picture(s) moved to sprites\_replaced_r81c" -ForegroundColor Cyan
if (-not $env:OPENAI_API_KEY) {
  $k = Read-Host 'Paste your OpenAI API key (it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:OPENAI_API_KEY = $k.Trim()
}
$ids = $redo -join ','
Write-Host "`n1/3  What will be sent (nothing is sent in this step):" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --dry-run | Select-Object -First 3
Write-Host "`n2/3  The frames - sending:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --concurrency 3
Write-Host "`n3/3  Second pass - retrying anything that failed:" -ForegroundColor Cyan
node tools/sprites/generate.mjs --set scenery --ids $ids --concurrency 3 | Select-String 'request\(s\) to send|^Done'
$line = node tools/sprites/generate.mjs --set scenery --ids $ids --dry-run | Select-Object -First 1
if ($line -match '^0 request') { Write-Host "`nAll $($redo.Count) are in. Tell Claude the round 81c frames are in." -ForegroundColor Green }
else { Write-Host "`n$line - run  .\tools\sprites\round81c.ps1  again (it only sends what is missing)." -ForegroundColor Yellow }
