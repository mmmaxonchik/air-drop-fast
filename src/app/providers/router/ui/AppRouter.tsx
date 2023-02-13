import React from "react"
import { Route, Routes } from "react-router-dom"
import { routeConfig } from "../config/routeConfig"

function AppRouter() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route path={path} key={path} element={element} />
        ))}
      </Routes>
    </React.Suspense>
  )
}
export default AppRouter
