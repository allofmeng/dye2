# DYE2 KV Contract

How DYE2 persists auto-favourites and recipes, and how a read-only consumer
(the Streamline dashboard) should read and apply them.

## Storage

The Streamline Bridge has no `/recipes` or `/auto-favourites` REST resource. DYE2
persists each collection as a **single JSON array** under one key in the generic
plugin KV store:

- Namespace: `dye2.reaplugin`
- Keys: `autoFavourites`, `recipes`
- URL: `GET/POST /api/v1/store/{namespace}/{key}`
- `GET` returning **404** ⇒ the key has never been written; treat as `[]`.
- Each value is a JSON array of item objects (never an object/map).

## Single-writer rule

**DYE2 is the sole writer.** It rewrites the whole array on every mutation. A
consumer (skin/dashboard) is **read-only**: `GET` these keys, never `POST` them.
Do not merge, dedupe, or write back — you will clobber concurrent DYE2 edits.

## Freshness

There is **no push channel** for the KV store. A consumer must **poll** — re-`GET`
the key on page focus and on `visibilitychange` (and/or a light interval) to pick
up changes DYE2 made while the consumer was idle.

## Applying an item to the workflow

Every item written by this version carries a `workflow` field that is a
ready-to-PUT `WorkflowRequest` body: `{ context, profile? }`. To apply (e.g. on
tapping a card):

```
PUT /api/v1/workflow   with body = item.workflow
```

No transformation needed. `PUT /api/v1/workflow` accepts
`{ context, profile?, steamSettings?, hotWaterData?, rinseData? }`; the stored
`workflow` only ever sets `context` and optionally `profile`.

## Optional fields — MUST fall back

`workflow`, `subtitle`, and (on recipes) `title` / `capturedAt` are present **only
on items written by this version of DYE2**. Older items lack them. Consumers MUST
treat these as optional:

- No `workflow` ⇒ derive the apply-payload from the legacy fields yourself
  (favourite: `snapshot` + `copyMask`; recipe: `dashboardVariables` + top-level
  fields), or skip apply.
- No `subtitle` ⇒ derive a label from `snapshot` / `beverage` / `beanName`.
- No recipe `title` ⇒ fall back to `name`.

Legacy fields (`snapshot`, `copyMask`, `dashboardVariables`, `name`, …) are **kept**
— DYE2's own pages still read them. Do not assume they were removed.

## Item schemas

### `autoFavourites[]`

```
{
  id, title, beverage,
  alwaysOnDashboard, favSlot,
  copyMask: { profile, beans, roastDate, grinder, grindSetting,
              dose, drink, barista, drinker, note },   // booleans; absent ⇒ on
  snapshot: {
    profileId, profileTitle, beanBatchId, coffeeName, coffeeRoaster,
    roastDate, grinderId, grinderModel, grindSetting, rpm,
    dose, drink, barista, drinker, note
  },
  capturedAt,                 // ISO 8601

  // added by this version (optional for consumers):
  subtitle,                   // "roaster · coffee" || beverage || ''
  workflow: { context, profile? }   // ready-to-PUT WorkflowRequest
}
```

### `recipes[]`

```
{
  id,                          // '1'..'5'
  name, beverage, barista, drinker,
  beanId, beanName, profileId, profileTitle,
  showOnStreamlineDashboard,
  dashboardVariables: {
    dose, drink, brewC, steamMode, steamTimeS, steamFlowMls,
    flushS, hotWaterMode, hotWaterMl, hotWaterTempC, grind, rpm, grinderId
  },

  // added by this version (optional for consumers):
  title,                       // name || 'Recipe <id>'
  subtitle,                    // beanName || beverage || ''
  capturedAt,                  // ISO 8601 (recipes had no timestamp before)
  workflow: { context, profile? }   // ready-to-PUT WorkflowRequest
}
```
