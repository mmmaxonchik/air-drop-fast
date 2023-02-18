import React from "react"
import { Route, Routes } from "react-router-dom"
import { Loading } from "../../../../shared/Loading"
import { routeConfig } from "../config/routeConfig"

function AppRouter() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
      </Routes>
    </React.Suspense>
  )
}
export default AppRouter
