const VITAL_THRESHOLDS = {
  ttfb: { good: 800, needsImprovement: 1800, unit: 'ms' },
  lcp: { good: 2500, needsImprovement: 4000, unit: 'ms' },
  inp: { good: 200, needsImprovement: 500, unit: 'ms' },
  cls: { good: 0.1, needsImprovement: 0.25, unit: '' },
}

const STATUS_STYLES = {
  good: 'color: #16a34a; font-weight: 700;',
  needsImprovement: 'color: #ea580c; font-weight: 700;',
  poor: 'color: #dc2626; font-weight: 700;',
}

let initialized = false

function getStatus(value, threshold) {
  if (value <= threshold.good) return 'good'
  if (value <= threshold.needsImprovement) return 'needsImprovement'
  return 'poor'
}

function logVital(name, value, threshold) {
  const status = getStatus(value, threshold)
  const label = status === 'good'
    ? 'GOOD'
    : status === 'needsImprovement'
      ? 'NEEDS IMPROVEMENT'
      : 'POOR'

  const formattedValue = threshold.unit ? `${value.toFixed(0)} ${threshold.unit}` : value.toFixed(3)

  console.log(
    `%c${name}%c ${formattedValue}  %c${label}`,
    'color: #2563eb; font-weight: 700;',
    'color: inherit; font-weight: 600;',
    STATUS_STYLES[status],
  )
}

function supportsEntryType(entryType) {
  return PerformanceObserver.supportedEntryTypes?.includes(entryType) ?? false
}

/**
 * Starts native PerformanceObservers for the page's Core Web Vitals (TTFB, LCP, INP, CLS).
 *
 * LCP, INP, and CLS are reported when the document is hidden, which gives
 * metrics their final value for the page visit.
 */
export function initPerfDiagnostics() {
  if (initialized || typeof PerformanceObserver === 'undefined') return

  initialized = true
  let lcpValue
  let clsValue = 0
  let sessionValue = 0
  let sessionEntries = []
  const interactions = new Map()
  let hasLoggedLcp = false
  let hasLoggedInp = false
  let hasLoggedCls = false

  if (supportsEntryType('navigation')) {
    const navigationObserver = new PerformanceObserver((list) => {
      const navigation = list.getEntries()[0]
      if (navigation) {
        logVital('TTFB', navigation.responseStart - navigation.startTime, VITAL_THRESHOLDS.ttfb)
      }
      navigationObserver.disconnect()
    })

    navigationObserver.observe({ type: 'navigation', buffered: true })
  }

  if (supportsEntryType('largest-contentful-paint')) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) lcpValue = lastEntry.startTime
    })

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        lcpObserver.disconnect()
        if (lcpValue !== undefined && !hasLoggedLcp) {
          hasLoggedLcp = true
          logVital('LCP', lcpValue, VITAL_THRESHOLDS.lcp)
        }
      }
    }, { once: true })
  }

  if (supportsEntryType('layout-shift')) {
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0]
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1]

          if (
            sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value
            sessionEntries.push(entry)
          } else {
            sessionValue = entry.value
            sessionEntries = [entry]
          }

          if (sessionValue > clsValue) {
            clsValue = sessionValue
          }
        }
      }
    })

    clsObserver.observe({ type: 'layout-shift', buffered: true })

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        clsObserver.disconnect()
        if (!hasLoggedCls) {
          hasLoggedCls = true
          logVital('CLS', clsValue, VITAL_THRESHOLDS.cls)
        }
      }
    }, { once: true })
  }

  if (supportsEntryType('event-timing')) {
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.interactionId === 0) continue

        const currentDuration = interactions.get(entry.interactionId) ?? 0
        interactions.set(entry.interactionId, Math.max(currentDuration, entry.duration))
      }
    })

    inpObserver.observe({ type: 'event-timing', buffered: true, durationThreshold: 16 })

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        inpObserver.disconnect()
        if (interactions.size > 0 && !hasLoggedInp) {
          hasLoggedInp = true
          logVital('INP', Math.max(...interactions.values()), VITAL_THRESHOLDS.inp)
        }
      }
    }, { once: true })
  }
}