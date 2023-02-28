import React from "react"

const OrderCreatePageLazy = React.lazy(() => import("./OrderCreatePage"))
const InfoPageLazy = React.lazy(() => import("./InfoPage"))
const TrackPageLazy = React.lazy(() => import("./TrackPage"))

export { OrderCreatePageLazy, InfoPageLazy, TrackPageLazy }
