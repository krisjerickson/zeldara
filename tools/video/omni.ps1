# Zeldara: MAKE A CUT-SCENE VIDEO FROM ITS FOLDER (round 125) — the way the Bram video was made in Flow: one short clip per painting,
# each starting exactly on its painting, joined with hard cuts. Uses Google's Gemini API (Gemini Omni Flash, image to video).
#   cd C:\Claude\games\Zeldara-v4
#   .\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1             every shot of that folder (only the ones not made yet)
#   .\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1 -Shots 3,5  just shots 3 and 5 (rename clips\shot03.mp4 first to make it again)
#   .\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1 -Dry        show what would be sent, send nothing
#   .\tools\video\omni.ps1 -Folder 04_bram_zeldara_p1 -Test       one tiny 3 s clip (a few cents): can this key make video at all?
# Safe to stop and start again. The key is read from this window and never written to disk.
param([string]$Folder = '', [string]$Shots = '', [string]$Model = '', [int]$Secs = 4, [switch]$Dry, [switch]$Test)
Set-Location (Join-Path $PSScriptRoot '..\..')
if (-not $Folder) { Write-Host 'Give -Folder <name>, e.g. -Folder 04_bram_zeldara_p1 (the folders are in video_requests)'; exit 1 }
if (-not $Dry -and -not $env:GEMINI_API_KEY) {
  $k = Read-Host 'Paste your Gemini API key (from aistudio.google.com - it stays in this window only)'
  if (-not $k) { Write-Host 'No key given - stopping.'; exit 1 }
  $env:GEMINI_API_KEY = $k.Trim()
}
$a = @('tools/video/omni.mjs', '--folder', $Folder, '--secs', $Secs)
if ($Shots) { $a += @('--shots', $Shots) }
if ($Model) { $a += @('--model', $Model) }
if ($Dry) { $a += '--dry' }
if ($Test) { $a += '--test' }
node @a
