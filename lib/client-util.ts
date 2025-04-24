/**
 * Utility functions for client-side only operations
 */

/**
 * Safely check if code is running in browser
 */
export function isBrowser(): boolean {
    return typeof window !== "undefined"
  }
  
  /**
   * Get window width safely (returns 0 if not in browser)
   */
  export function getWindowWidth(): number {
    return isBrowser() ? window.innerWidth : 0
  }
  
  /**
   * Get window height safely (returns 0 if not in browser)
   */
  export function getWindowHeight(): number {
    return isBrowser() ? window.innerHeight : 0
  }
  
  /**
   * Safely open a URL in a new tab
   */
  export function safeOpenUrl(url: string): void {
    if (isBrowser()) {
      window.open(url, "_blank")
    }
  }
  