#!/usr/bin/env python3
"""Round 129: brings the comparison clips (video_requests/compare_r129/shotN/{kling,flow_omni,flow_lite}.mp4) to the Lab: each one made
the same size (1280×720, 24 fps, 4 s, H.264, no sound) so the Lab plays them in step, plus a poster frame.
    python tools/video/compare_intake.py           → lab/preview/vidcmp/shotN_<tool>.mp4 and .jpg; prints what is still missing"""
import os, subprocess
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IN = os.path.join(ROOT, 'video_requests', 'compare_r129')
OUT = os.path.join(ROOT, 'lab', 'preview', 'vidcmp'); os.makedirs(OUT, exist_ok=True)
TOOLS = ['kling', 'flow_omni', 'flow_lite']
miss = []
for n in (1, 2, 3):
    for t in TOOLS:
        src = os.path.join(IN, 'shot%d' % n, t + '.mp4'); dst = os.path.join(OUT, 'shot%d_%s.mp4' % (n, t))
        if not os.path.exists(src): miss.append('shot%d/%s.mp4' % (n, t)); continue
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-t', '4', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24',
                        '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', dst], check=True)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '2', '-i', dst, '-frames:v', '1', '-q:v', '4', dst[:-4] + '.jpg'], check=True)
        print('✓ shot%d %s' % (n, t))
print('still missing:', ', '.join(miss) if miss else 'nothing')
