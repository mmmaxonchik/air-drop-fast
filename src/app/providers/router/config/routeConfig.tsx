import {
  DeliveryPageLazy,
  InfoPageLazy,
  TrackPageLazy,
} from "../../../../pages"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
  MAIN = "main",
  INFO = "info",
  TRACK = "track",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.INFO]: "/info",
  [AppRoutes.TRACK]: "/track",
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    element: <DeliveryPageLazy />,
  },
  [AppRoutes.INFO]: {
    path: RoutePath.info,
    element: <InfoPageLazy />,
  },
  [AppRoutes.TRACK]: {
    path: RoutePath.track,
    element: <TrackPageLazy />,
  },
}
