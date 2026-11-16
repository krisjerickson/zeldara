# 63 — Round 111: shops show your gold; big prices; buy without the window closing

Kris: "when buying things in village stores and elsewhere, it should be very obvious how much gold you have, and how much gold things cost. make a banner at the top for how much gold you have that scrolls down with you, and make the costs larger, bold and colored. Also, you should be able to buy multiple things at a time without the screen with items closing".

## What changed (22k-shop-gold.js)

- **A gold banner** at the top of every shop window reads "💰 YOUR GOLD 1,240". It stays at the top while you scroll the list, and when you spend or sell it flashes and shows the change (−500 in red, +200 in green).
  - **Where:** every village store, the merchant's Buy and Sell, the camp shop, the island traders and the forge, plus the stables, the tavern menu and the sky port's shop.
- **Prices** are large (15 px), bold and gold.
  - Red when you can't afford them, green for what you would get selling.
  - They recolour as your gold changes.
  - The old small "You have …g" line at the foot is gone, since the banner says it.
- **Buying or selling no longer closes the window.** It is drawn again in place, at the same scroll, so you can buy one thing after another. This covers:
  - buying
  - selling at the merchant
  - selling all marked items
  - the Buy/Sell toggle
  - selling gems and wood
  - buying arrows in packs
  - forge crafting

Switch: `ZSHOP.on`.

## Test

`tests/test_round111.py` (6):

- the sticky banner
- prices large, bold and coloured, red when you can't afford them
- two buys in a row, the window still open at the same scroll, the banner counting down
- a merchant sale keeps the window open, with green prices
- the stables' banner
