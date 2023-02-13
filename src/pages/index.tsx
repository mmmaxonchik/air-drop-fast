import React from "react"

const DeliveryPageLazy = React.lazy(() => import("./DeliveryPage"))
const InfoPageLazy = React.lazy(() => import("./InfoPage"))
const TrackPageLazy = React.lazy(() => import("./TrackPage"))

export { DeliveryPageLazy, InfoPageLazy, TrackPageLazy }
