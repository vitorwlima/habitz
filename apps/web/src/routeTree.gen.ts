/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TrackerImport } from './routes/tracker'
import { Route as HistoryImport } from './routes/history'
import { Route as HabitsImport } from './routes/habits'

// Create/Update Routes

const TrackerRoute = TrackerImport.update({
  path: '/tracker',
  getParentRoute: () => rootRoute,
} as any)

const HistoryRoute = HistoryImport.update({
  path: '/history',
  getParentRoute: () => rootRoute,
} as any)

const HabitsRoute = HabitsImport.update({
  path: '/habits',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/habits': {
      preLoaderRoute: typeof HabitsImport
      parentRoute: typeof rootRoute
    }
    '/history': {
      preLoaderRoute: typeof HistoryImport
      parentRoute: typeof rootRoute
    }
    '/tracker': {
      preLoaderRoute: typeof TrackerImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  HabitsRoute,
  HistoryRoute,
  TrackerRoute,
])

/* prettier-ignore-end */
