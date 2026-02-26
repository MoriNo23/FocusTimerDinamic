from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Desktop (1920x1080)
    ctx = browser.new_context(viewport={"width": 1920, "height": 1080})
    page = ctx.new_page()
    page.goto("http://localhost:5173", timeout=10000)
    page.wait_for_load_state("domcontentloaded", timeout=10000)

    display = page.locator(".app").evaluate("el => getComputedStyle(el).display")
    print(f"Desktop: {display}")
    page.screenshot(path="desktop-verify.png", full_page=True)

    # Mobile (375x667)
    ctx2 = browser.new_context(viewport={"width": 375, "height": 667})
    page2 = ctx2.new_page()
    page2.goto("http://localhost:5173", timeout=10000)
    page2.wait_for_load_state("domcontentloaded", timeout=10000)

    display2 = page2.locator(".app").evaluate("el => getComputedStyle(el).display")
    print(f"Mobile: {display2}")
    page2.screenshot(path="mobile-verify.png", full_page=True)

    print(f"Desktop: {display} (expected: grid)")
    print(f"Mobile: {display2} (expected: flex)")

    browser.close()
