import { QueryClientProvider, QueryClient } from "react-query"
import { TrackForm } from "../../../widgets/Track"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function TrackPage() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TrackForm />
      </QueryClientProvider>
    </>
  )
}

export default TrackPage
